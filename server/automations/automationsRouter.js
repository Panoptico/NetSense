var processor = require('../processing_controllers.js');
var ringDoorbell = require('./ringDoorbell.js')
var Wit = require('../wit/wit_controllers.js');
var googleCalendar = require('../gCalendar/google_calendar_controllers');

// General natural language processing for any text and callback
exports.NLP = function(text, next){
  Wit.sendTextToWit(text, next);
}

// Specific use case of NLP on a tweet object with automations router
exports.automate = function(tweet, trackName){
  exports.NLP(tweet.text, function(nlp){
    route(tweet, nlp, trackName);
  });
}

var route = function(tweet, nlp, trackName){
  if(automations[nlp.intent]){
    automations[nlp.intent](tweet, nlp, trackName);
  }
}

// Each key equates to an intent
// Each value is the automation function to call
//   and takes (tweet, nlp, trackName) as their arguments
var automations = {
  ringDoorbell: ringDoorbell,
  schedule_event: googleCalendar.createNetsenseEvent
}

