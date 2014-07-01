var gcal = require('google-calendar');
var request = require('request');
var TokenCache = require('google-oauth-jwt').TokenCache;
var tokens = new TokenCache();
var onehour = 1000*60*60;
var oneday = onehour*24;
var oneweek = 7 * oneday;
var email = require('../automations/sendEmail.js');


var formatDatetime = function (nlp) {
    if (nlp && nlp.entities && nlp.entities.datetime && !Array.isArray(nlp.entities.datetime)) {
      nlp.entities.datetime = [nlp.entities.datetime];
    }
    //TODO:
    // else if !datetime,
      //check for next free spot (with some buffer/warning time)
      //add event as an hour-long block by default

    return nlp;
};



var googleEventifyEntities = function (outcome, callback) {
    var gEvent = {};
    var summary;
    if (outcome.entities.agenda_entry && outcome.entities.agenda_entry.value){
      gEvent.summary = outcome.entities.agenda_entry.value;      
      console.log(gEvent.summary);
    }
    if(outcome.entities.datetime && outcome.entities.datetime[0].value && outcome.entities.datetime[0].value.to && outcome.entities.datetime[0].value.from) {
      gEvent.end = {dateTime: outcome.entities.datetime[0].value.to};
      gEvent.start = {dateTime: outcome.entities.datetime[0].value.from}; 
      callback(gEvent);
    } else {
      console.log('nodatetime!')
      getFreeBusy(function(err, res, body) {
        var result = JSON.parse(body);
        if (result && result.calendars && result.calendars['netsensehr@gmail.com'] && result.calendars['netsensehr@gmail.com'].busy && result.calendars['netsensehr@gmail.com'].busy[0]) {
          var busy = result.calendars['netsensehr@gmail.com'].busy;
            gEvent.start = {dateTime: busy[0].end};
            var end = new Date(gEvent.start.dateTime);
            end.setHours(end.getHours() + 1);
            console.log(end);
            gEvent.end = {dateTime: end};
        } else {
          var now = Date.now();
          var start = new Date(now + oneday);
          var end = new Date(start + onehour);
          start = start.toISOString();
          end = end.toISOString();
          gEvent.start = {dateTime: start};
          gEvent.end = {dateTime: end};
        }
        console.log('//Event: ', gEvent);
        callback(gEvent);
      });
    }


}; 

var getFreeBusy = function (callback) { //callback takes (err, body, res) params
  var now = Date.now();
  var tomorrow = new Date(now + oneday);
  var nextWeek = new Date(now + oneweek);
  var body = {
    timeMin: tomorrow.toISOString(),
    timeMax: nextWeek.toISOString(),
    items: [{id: 'netsensehr@gmail.com'}]
  };
  body = JSON.stringify(body);

  tokens.get({
      // use the email address of the NetSense google service account, as seen in the google dev API console
        email: process.env.GOOGLE_SERVICE_EMAIL,
        key: (process.env.GOOGLE_PRIV_KEY).replace(/\\n/g, '\n'),
        // specify the scopes you wish to access
        scopes: ['https://www.googleapis.com/auth/calendar']
      },  function (err, token) {
            var google_calendar = new gcal.GoogleCalendar(token);
          
            var headers = {
              Authorization: 'Bearer ' + token,
              "Content-Type": 'application/json' 
            };
          
            var options = {
              url: 'https://www.googleapis.com/calendar/v3/freeBusy',
              headers: headers,
              key: process.env.GOOGLE_SERVICE_KEY,
              body: body
            };

            request.post(options, callback);
          }
    );
};
 

module.exports = exports = {
  createNetsenseEvent: function(tweet, nlp, trackName) {
  /////get event
    googleEventifyEntities(formatDatetime(nlp), function(gCalEvent) {
      console.log(gCalEvent, '!!!!!!!!');


      gCalEvent.summary = gCalEvent.summary || tweet.text;
      
      //expect gCalEvent to be an object with start, end, and summary properties
      var body = JSON.stringify(gCalEvent);

      tokens.get({
        // use the email address of the NetSense google service account, as seen in the API console
          email: process.env.GOOGLE_SERVICE_EMAIL,
          key: (process.env.GOOGLE_PRIV_KEY).replace(/\\n/g, '\n'),
          // specify the scopes you wish to access
          scopes: ['https://www.googleapis.com/auth/calendar']
        },  function (err, token) {
              var google_calendar = new gcal.GoogleCalendar(token);
            
              var headers = {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json' 
              };
            
              var options = {
                url: process.env.NETSENSE_CALENDAR_URL,
                headers: headers,
                keyFile: 'key-file.pem',
                // key: process.env.GOOGLE_SERVICE_KEY,
                body: body
              };

              request.post(options, function(err, res, body){
                      if(err) return console.error(err);
                      email("NetSense <NetSenseHR@gmail.com>", 'LOG', err + body);
                      body = JSON.parse(body);
                      console.log(body);
                    });
            }
      );
    });

  },


};

// getFreeBusy(function(err, res, body){
//                     if(err) return console.error(err);
//                     console.log(body);
//                     body = JSON.parse(body);
//                     console.log(body.calendars['netsensehr@gmail.com'].busy)
//             });







//gCalEvent must have start, end, and summary properties


/*
///////////
//example of createNetsenseEvent:
var newevent = {
 end: {
    dateTime: '2014-06-26T15:00:00.000-07:00'//"2014-06-27"
   },
 start: {
    dateTime: '2014-06-26T14:00:00.000-07:00'
   },
 summary: "LOLCATS!!!!!!-"
};

exports.createNetsenseEvent(newevent);
//creates a new gCalEvent on the netsense calendar


//example getfreebusy response from google: 
{
 "kind": "calendar#freeBusy",
 "timeMin": "2014-06-29T19:30:17.562Z",
 "timeMax": "2014-07-05T19:30:17.562Z",
 "calendars": {
  "netsensehr@gmail.com": {
   "busy": [
    {
     "start": "2014-06-29T22:00:00Z",
     "end": "2014-06-30T02:00:00Z"
    },
    {
     "start": "2014-06-30T16:30:00Z",
     "end": "2014-06-30T21:30:00Z"
    }
   ]
  }
 }
}

*/

