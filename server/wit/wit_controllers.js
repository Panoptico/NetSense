var request = require('request');

module.exports = exports = {
  sendTextToWit: function(text, next) {
    var headers = {
      Authorization: 'Bearer ' + process.env.WIT_AI_KEY
    };

    var options = {
      url: 'https://api.wit.ai/message',
      headers: headers,
      form: {q: text, v: '20140624'}
    };

    request.get(options, function(err, res, body){
      if(err) return console.error(err);
      outcomes = ( JSON.parse(body) ).outcomes[0];
      var intent = outcomes.intent;
      next(outcomes);
    });
  }
}
