Amendment to preregistration
================

Go to [this
link](https://github.com/stefanvermeent/attention_project/tree/main/preregistrations/3_study2)
for the original preregistration.

## Amendment to preregistration for study 2 on 2023-06-06

### Global-Local performance

In the original preregistration, we specified that we would exclude
participants who performed at chance on either the Flanker Task or the
Global-Local Task, which was defined as an accuracy of 59.4% or lower.
However, initial inspections of the Global-Local Task data showed that a
substantial part of the sample did not reach this cut-off, suggesting
that the task was more difficult than anticipated. Thus, we developed a
more fine-grained approach (described below) in an attempt to
distinguish between 1) participants who did not understand the task and
2) participants who understood the task, but found it difficult to
perform well. Given the assumptions of DDM, the first group would have
to be excluded because they likely did not go through a process of
information accumulation. However, the model should be able to
adequately fit the data of the second group.

The amended analysis approach for the Global-Local Task looks as
follows:

1)  Fit the data to the cleaned data of the full sample, including
    participants who performed at or below chance level (i.e., after
    trial-level exclusions but before case-wise exclusions);
2)  Based on recovered parameter estimates for each participant,
    simulate the same number of trials (reaction times and accuracy)
    using the `RWiener` package, separately for Global and Local trials.
3)  For each participant, calculate the 25th, 50th and 75th quantile of
    both their real RTs and the simulated RTs. In addition, we calculate
    mean accuracies based on the real and simulated data.

<!-- -->

4.  Compute standardized residuals between the real and simulated data
    for RTs at each quantile and for accuracy. In case of good fit, the
    residual should be close to zero.
5.  Exclude the data of participants with any standardized residual \>
    3.2 SD.

### Multiverse analyses

In the preregistration, we planned to include three variables as
covariates that were previously featured as arbitrary exclusion
decisions in the multiverse specification: 1) whether or not
participants rescaled the screen; 2) whether or not participants exited
fullscreen mode at some point during the tasks; 3) Whether or not
participants experienced interruptions during the tasks. Our reasoning
was that these three factors were consistently found to have a large
impact on model results. However, we realized later on that adding these
factors as covariates was not a good approach from a causal inference
standpoint. That is, it is more likely that each of these factors added
random noise to our estimates than that they had a causal effect on the
outcome. Therefore, we decided instead to include these factors as
arbitrary decisions in the multiverse analyses, similarly as the
previous two studies. This will allow for a coherent assessment of
influential factors across all three experiments.
