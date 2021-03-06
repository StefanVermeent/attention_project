var cueing_trial = {
  timeline: [
    {
      type: 'psychophysics',
      stimuli: [
        fixation,
        cue,
        target,
      ],
      choices: ["ArrowLeft", "ArrowRight"],
      response_start_time: 1250,
      canvas_width: 800,
      canvas_height: 800,
      background_color: '#ffffff',
          data: {
            variable: 'test',
            task: 'cueing',
            condition: jsPsych.timelineVariable('type'),
            target: jsPsych.timelineVariable('target'),
            cue_x: jsPsych.timelineVariable('cue_x'),
            cue_y: jsPsych.timelineVariable('cue_y'),
            target_x: jsPsych.timelineVariable('target_x'),
            target_y: jsPsych.timelineVariable('target_y'),
            correct_response: jsPsych.timelineVariable('correct_response')
          },
    },
  ],
  on_finish: function(data) {
    if(jsPsych.pluginAPI.compareKeys(data.response, jsPsych.timelineVariable('correct_response', true))) {
      data.correct = true;
    } else {
      data.correct = false;
    }
  },
  timeline_variables: [
    // Neutral trials - left-pointing arrows
    {type: 'neutral', target: '\u2190', correct_response: 'ArrowLeft', cue_x: 0, cue_y: 12, target_x: location1_x, target_y: location1_y},
    {type: 'neutral', target: '\u2190', correct_response: 'ArrowLeft', cue_x: 0, cue_y: 12, target_x: location2_x, target_y: location2_y},
    {type: 'neutral', target: '\u2190', correct_response: 'ArrowLeft', cue_x: 0, cue_y: 12, target_x: location3_x, target_y: location3_y},
    {type: 'neutral', target: '\u2190', correct_response: 'ArrowLeft', cue_x: 0, cue_y: 12, target_x: location4_x, target_y: location4_y},
    {type: 'neutral', target: '\u2190', correct_response: 'ArrowLeft', cue_x: 0, cue_y: 12, target_x: location5_x, target_y: location5_y},
    {type: 'neutral', target: '\u2190', correct_response: 'ArrowLeft', cue_x: 0, cue_y: 12, target_x: location6_x, target_y: location6_y},
    {type: 'neutral', target: '\u2190', correct_response: 'ArrowLeft', cue_x: 0, cue_y: 12, target_x: location7_x, target_y: location7_y},
    {type: 'neutral', target: '\u2190', correct_response: 'ArrowLeft', cue_x: 0, cue_y: 12, target_x: location8_x, target_y: location8_y},
    
    // Neutral trials - right-pointing arrows
    {type: 'neutral', target: '\u2192', correct_response: 'ArrowRight', cue_x: 0, cue_y: 12, target_x: location1_x, target_y: location1_y},
    {type: 'neutral', target: '\u2192', correct_response: 'ArrowRight', cue_x: 0, cue_y: 12, target_x: location2_x, target_y: location2_y},
    {type: 'neutral', target: '\u2192', correct_response: 'ArrowRight', cue_x: 0, cue_y: 12, target_x: location3_x, target_y: location3_y},
    {type: 'neutral', target: '\u2192', correct_response: 'ArrowRight', cue_x: 0, cue_y: 12, target_x: location4_x, target_y: location4_y},
    {type: 'neutral', target: '\u2192', correct_response: 'ArrowRight', cue_x: 0, cue_y: 12, target_x: location5_x, target_y: location5_y},
    {type: 'neutral', target: '\u2192', correct_response: 'ArrowRight', cue_x: 0, cue_y: 12, target_x: location6_x, target_y: location6_y},
    {type: 'neutral', target: '\u2192', correct_response: 'ArrowRight', cue_x: 0, cue_y: 12, target_x: location7_x, target_y: location7_y},
    {type: 'neutral', target: '\u2192', correct_response: 'ArrowRight', cue_x: 0, cue_y: 12, target_x: location8_x, target_y: location8_y},
    
    // Cued trials - left-pointing arrows
    {type: 'cued', target: '\u2190', correct_response: 'ArrowLeft', cue_x: location1_x, cue_y: location1_y, target_x: location1_x, target_y: location1_y},
    {type: 'cued', target: '\u2190', correct_response: 'ArrowLeft', cue_x: location2_x, cue_y: location2_y, target_x: location2_x, target_y: location2_y},
    {type: 'cued', target: '\u2190', correct_response: 'ArrowLeft', cue_x: location3_x, cue_y: location3_y, target_x: location3_x, target_y: location3_y},
    {type: 'cued', target: '\u2190', correct_response: 'ArrowLeft', cue_x: location4_x, cue_y: location4_y, target_x: location4_x, target_y: location4_y},
    {type: 'cued', target: '\u2190', correct_response: 'ArrowLeft', cue_x: location5_x, cue_y: location5_y, target_x: location5_x, target_y: location5_y},
    {type: 'cued', target: '\u2190', correct_response: 'ArrowLeft', cue_x: location6_x, cue_y: location6_y, target_x: location6_x, target_y: location6_y},
    {type: 'cued', target: '\u2190', correct_response: 'ArrowLeft', cue_x: location7_x, cue_y: location7_y, target_x: location7_x, target_y: location7_y},
    {type: 'cued', target: '\u2190', correct_response: 'ArrowLeft', cue_x: location8_x, cue_y: location8_y, target_x: location8_x, target_y: location8_y},
    
    // Cued trials - right-pointing arrows
    {type: 'cued', target: '\u2192', correct_response: 'ArrowRight', cue_x: location1_x, cue_y: location1_y, target_x: location1_x, target_y: location1_y},
    {type: 'cued', target: '\u2192', correct_response: 'ArrowRight', cue_x: location2_x, cue_y: location2_y, target_x: location2_x, target_y: location2_y},
    {type: 'cued', target: '\u2192', correct_response: 'ArrowRight', cue_x: location3_x, cue_y: location3_y, target_x: location3_x, target_y: location3_y},
    {type: 'cued', target: '\u2192', correct_response: 'ArrowRight', cue_x: location4_x, cue_y: location4_y, target_x: location4_x, target_y: location4_y},
    {type: 'cued', target: '\u2192', correct_response: 'ArrowRight', cue_x: location5_x, cue_y: location5_y, target_x: location5_x, target_y: location5_y},
    {type: 'cued', target: '\u2192', correct_response: 'ArrowRight', cue_x: location6_x, cue_y: location6_y, target_x: location6_x, target_y: location6_y},
    {type: 'cued', target: '\u2192', correct_response: 'ArrowRight', cue_x: location7_x, cue_y: location7_y, target_x: location7_x, target_y: location7_y},
    {type: 'cued', target: '\u2192', correct_response: 'ArrowRight', cue_x: location8_x, cue_y: location8_y, target_x: location8_x, target_y: location8_y},
  ],
  randomize_order: true,
  repetitions: 2
}