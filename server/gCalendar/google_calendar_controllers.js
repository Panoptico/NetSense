var http = require('http');
var calendarOptions = {
  host: 'www.google.com',
  port: 80,
  path: '/index.html'
};

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

module.exports = exports = {
  createNewEvent: function(calendar, event) {

  }

};

var serverKey = AIzaSyB1KaJ9DAecI3nOTXUw6xdcNx3ATO3GaSM;


//TODO: set env variables for netsense calendar and key
// 

/*
  example event:
  {
  name: googleeventsummary,
  start: datetime,
  end: datetime,
  organizer: optionalname,

  }

/////

  example calendar:

  {
    id: googlecalname@gmail.com,
    key: googleapikeystring
  
  }
*/