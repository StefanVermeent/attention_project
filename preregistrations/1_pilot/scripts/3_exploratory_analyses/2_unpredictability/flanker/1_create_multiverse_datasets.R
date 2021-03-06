
# Libraries ---------------------------------------------------------------

library(tidyverse)
library(tidymodels)
library(here)

source(here("preregistrations", "1_pilot", "scripts", "3_exploratory_analyses", "1_efa.R"))

# Transfrom data to long format and prepare for analyses
multiverse_data <- cleaned_data %>%
  select(id, scale_factor, fullscreenenter, fullscreenexit, meta_captcha, attention_interrupt_sum, att_noise, unpredictability_composite,
         contains("flanker"), -flanker_data_long, -starts_with(c("rt_var", "acc_", "event_during")), -starts_with("start"),
         starts_with("efa")) %>%
  rename(flanker_congruent_rt_raw = rt_flanker_congruent, flanker_incongruent_rt_raw = rt_flanker_incongruent) %>%
  pivot_longer(starts_with("flanker"),
               names_to = c("condition", ".value"),
               names_pattern = "([a-z]*_[a-z]*_)(.*)"
               ) %>%
  mutate(
    condition            = ifelse(condition == "flanker_congruent_", "congruent", "incongruent"),
    condition_sum        = ifelse(condition == "congruent", -1, 1),
    rt_raw               = rt_raw * 1000,
    rt_log               = log(rt_raw),
    flanker_interference = ifelse(rd_flanker > 0, sda_flanker / rd_flanker, NA)
  ) %>%
  # Center IVs
  mutate(across(c(efa_daily_unp, efa_routine, efa_spatial_unp, efa_chaos_clutter, efa_social_unp), 
                ~scale(., scale = F), .names = "{.col}_c"))

# arbitrary decision grid -------------------------------------------------

spec_grid <- 
  expand_grid(
    dv_type         = c(0,1,2),
    iv_type         = c(0,1,2,3,4),
    no_resize       = c(0,1),
    no_fullscreen   = c(0,1),
    exit_fullscreen = c(0,1),
    interrupted     = c(0,1),
    noise           = c(0,1),
    outliers        = c(0,1),
  ) %>%
  rownames_to_column("spec_number") %>%
  mutate(spec_number = as.numeric(spec_number)) %>%
  pivot_longer(!spec_number, names_to = "spec_var", values_to = "spec_value") %>% 
  left_join(
    tribble(
      ~spec_var,         ~spec_value, ~spec_expr,                                                      ~name,
      "dv_type",         0,           "p_flanker",                                                     "Perceptual input (p)",
      "dv_type",         1,           "rd_flanker",                                                    "Rate of spotlight\nshrinking (rd)",
      "dv_type",         2,           "flanker_interference",                                          "Interference\n(sda/rd)",
      "iv_type",         0,           "efa_daily_unp",                                                 "EFA - daily",
      "iv_type",         1,           "efa_routine",                                                   "EFA - routine",
      "iv_type",         2,           "efa_spatial_unp",                                               "EFA - spatial",
      "iv_type",         3,           "efa_chaos_clutter",                                             "EFA - clutter",
      "iv_type",         4,           "efa_social_unp",                                                "EFA - social",
      "no_resize",       0,           "scale_factor > 0",                                              "All scalers",
      "no_resize",       1,           "round(scale_factor, 4) != '0.3081'",                            "Correct scalers Only",
      "no_fullscreen",   0,           "fullscreenenter %in% c(0,1)",                                   "Include no fullscr. enter",
      "no_fullscreen",   1,           "fullscreenenter == 1",                                          "Exclude no fullscr. enter",
      "exit_fullscreen", 0,           "fullscreenexit %in% c(0,1)",                                    "Include fullscr. exit",
      "exit_fullscreen", 1,           "fullscreenexit == 0",                                           "Exclude fullscr. exit",
      "interrupted",     0,           "attention_interrupt_sum %in% c(0,1,2)",                         "All interruptions",
      "interrupted",     1,           "attention_interrupt_sum < 1",                                   "No extreme interruptions",
      "noise",           0,           "att_noise %in% c(0,1,2,3,4)",                                   "All noise levels",
      "noise",           1,           "att_noise %in% c(0,1,2)",                                       "No high noise levels",
      "outliers",        0,           "< 10",                                                          "Include all scores",
      "outliers",        1,           "< 3.2",                                                         "Exclude scores > 3.2SD",
    ),
    by = c("spec_var", "spec_value")
  )

# Multiverse dataset list -----------------------------------------------------
## This loop applies specifications from the grid from above to the data
## We proceed in 3 steps
### 1. Split the grid by specification
### 2. Apply the expression associated with the specifications for each variable to the data
### 3. Arrange the data in long form for mixed-models (if mixed models are used)
### 4. Let the user know the data were created and return a list of the data in long and wide form, the specs, and the n

## Datasets in wide format ----

multi_data_list <-
  # 1
  spec_grid %>% 
  split(.$spec_number) %>% 
  map(function(x){
    spec_number <- unique(x$spec_number)
    spec_expressions <- 
      x %>% 
      select(spec_var, spec_expr) %>% 
      pivot_wider(names_from = "spec_var", values_from = "spec_expr")
    
    # 2
    data_raw <-
      multiverse_data %>% 
      filter(
        eval(parse(text = paste(spec_expressions$no_resize))), 
        eval(parse(text = paste(spec_expressions$no_fullscreen))), 
        eval(parse(text = paste(spec_expressions$exit_fullscreen))),
        eval(parse(text = paste(spec_expressions$interrupted))),
        eval(parse(text = paste(spec_expressions$noise))),
        eval(parse(text = paste0("scale(", spec_expressions$dv_type, ") ", spec_expressions$outliers)))
      ) %>% 
      drop_na(spec_expressions$dv_type, spec_expressions$iv_type) %>%
      mutate(
        mt_dataset = spec_number
      )
    
    data_ssp <- data_raw %>%
      select(-matches(c("rt_raw", "condition_sum", "rt_log", "condition"))) %>%
      distinct()
    
    
    results <- list(
      n              = nrow(data),
      data_analysis  = list(data_raw = data_raw, data_ssp = data_ssp),
      specifications = x %>% select(-spec_value)
    )
    
    # 4
    message("dataset ", spec_number, " created")
    results
  })

# Save environment --------------------------------------------------------
save(multi_data_list, file = here("data", "1_pilot", "3_exploratory_analyses", "2_unpredictability", "flanker", "1_multiverse_objects.Rdata"))
