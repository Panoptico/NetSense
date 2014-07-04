var processor = require('../processing_controllers.js');
var ringDoorbell = require('./ringDoorbell.js').ringDoorbell;
var Wit = require('../wit/wit_controllers.js');
var sendEmail = require('./sendEmail.js');
var getInformation = require('./getInformation.js');
var googleCalendar = require('../gCalendar/google_calendar_controllers');

// General natural language processing for any text and callback
exports.NLP = function(text, next){
  Wit.sendTextToWit(text, next);
};

// Specific use case of NLP on a tweet object with automations router
exports.automate = function(tweet, trackName){
  exports.NLP(tweet.text, function(nlp){
    if (nlp && nlp.intent && nlp.intent !== 'donothing'){
      console.log('automating: ', nlp.intent);      
    }
    route(tweet, nlp, trackName);
  });
};

var route = function(tweet, nlp, trackName){
  if(automations[nlp.intent]){
    automations[nlp.intent](tweet, nlp, trackName);
  }
};

// Each key equates to an intent
// Each value is the automation function to call
//   and takes (tweet, nlp, trackName) as their arguments
var automations = {
  ringDoorbell: ringDoorbell,
  getInformation: getInformation,
  schedule_event: googleCalendar.createNetsenseEvent
  /* sendEmail could be automated, but for now
   * it's just a helper method for ringDoorbell
   * parameters would have to be changed for sendEmail
   * to be functional in automation router
   * sendEmail: sendEmail */
};

