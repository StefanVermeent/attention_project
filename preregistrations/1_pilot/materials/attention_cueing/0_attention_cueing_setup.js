//------------------------- Variables to hide cursor during trials
var cursor_off = {
    type: 'call-function',
    func: function() {
        document.body.style.cursor= "none";
    }
}

var cursor_on = {
    type: 'call-function',
    func: function() {
        document.body.style.cursor= "auto";
    }
}

var fullscreenmode = {
  type: 'fullscreen',
  fullscreen_mode: true
}


// Target and cue locations
var location1_x = 0
var location1_y = -300

var location2_x = -212.135
var location2_y = -212.135

var location3_x = -300
var location3_y = 0

var location4_x = -212.135
var location4_y = 212.135

var location5_x = 0
var location5_y = 300

var location6_x = 212.135
var location6_y = 212.135

var location7_x = 300
var location7_y = 0

var location8_x = 212.135
var location8_y = -212.135



// Fixation cross
var fixation = {
  obj_type: 'cross',
  line_length: 25,
  startX: 0,
  startY: 0,
  show_start_time: 0,
  show_end_time: 1000,
  origin_center: true
}


// Memory stimuli
var cue = {
  obj_type: "text",
  content: "*",
  font: "40px 'Arial'",
  startX: jsPsych.timelineVariable('cue_x'),
  startY: jsPsych.timelineVariable('cue_y'),
  show_start_time: 1000,
  show_end_time: 1250,
  origin_center: true
}

var target = {
  obj_type: "text",
  content: jsPsych.timelineVariable('target'),
  font: "30px 'Arial'",
  startX: jsPsych.timelineVariable('target_x'),
  startY: jsPsych.timelineVariable('target_y'),
  show_start_time: 1250,
  origin_center: true
}