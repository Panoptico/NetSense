var processor = require('../processing_controllers.js');
var ringDoorbell = require('ringDoorbell.js')
exports.route = function(tweet, trackName){
  nlp = processor.NLP(tweet);

  // default automation is ringDoorbell
  if(!nlp.intent){
    nlp.intent = ringDoorbell;
  }

  automations[nlp.intent](tweet, nlp, trackName);
}


// Each key equates to an intent
// Each value is the automation function to call
//   and takes (tweet, nlp, trackName) as their arguments
var automations = {
  ringDoorbell: ringDoorbell
}