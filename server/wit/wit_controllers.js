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
      body = JSON.parse(body);
      var intent = body.outcome.intent;
      console.log('outcome:', body.outcome);
      next(body);
    });
  }
}
