var Twit = require('Twit');
var sentiment = require('../sentiment/sentiment_controllers.js');

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMERKEY_MAP,
  consumer_secret: process.env.TWITTER_CONSUMERSECRET_MAP,
  access_token: process.env.TWITTER_ACCESSTOKEN_MAP,
  access_token_secret: process.env.TWITTER_ACCESSTOKENSECRET_MAP
});

module.exports = {
  sendTrackStream: function(socket, trackName) {
    console.log('Creating stream for:', trackName);

    var stream = T.stream('statuses/filter', {
      track: trackName/*,
      locations: [-180, -90, 180, 90],
      locations: [-122.75, 36.8, -121.75, 37.8, -74, 40, -73, 41]*/
    });

    stream.on('tweet', function(tweet) {
      console.log(trackName, 'streamed new tweet:', tweet.id_str);

      tweet.sentimentScore = sentiment.analyze(tweet.text).score;
      socket.emit('tweet', tweet);
    });
  },
  
  listenForDoorbell: function(socket, message) {
    socket.emit('ding', {message: message});
  }
};
