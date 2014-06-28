var gcal = require('google-calendar');
var request = require('request')
var TokenCache = require('google-oauth-jwt').TokenCache;
var tokens = new TokenCache();


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



var googleEventifyEntities = function (outcome) {
    var gEvent = {};
    var summary;
    gEvent.end = {dateTime: outcome.entities.datetime[0].value.to};
    gEvent.start = {dateTime: outcome.entities.datetime[0].value.from};

    if (outcome.entities.agenda_entry && outcome.entities.agenda_entry.value){
      gEvent.summary = outcome.entities.agenda_entry.value;      
    }

    return gEvent;
}; 



module.exports = exports = {
  createNetsenseEvent: function(tweet, nlp, trackName) {
/////get event
    var gCalEvent = googleEventifyEntities(formatDatetime(nlp));

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
              key: process.env.GOOGLE_SERVICE_KEY,
              body: body
            };

            request.post(options, function(err, res, body){
                    if(err) return console.error(err);
                    body = JSON.parse(body);
                    console.log(body);
                  });
          }
    );
  },



};

//gCalEvent must have start, end, and summary properties


///////////
//example of createNetsenseEvent:
/////
/*
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
*/

//creates a new gCalEvent on the netsense calendar


