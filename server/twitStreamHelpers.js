var Twit = require('Twit');

module.exports = exports = {
  makeNewStream: function(track, token, secret) {
    var T = new Twit({
      consumer_key: process.env.CONSUMERKEY,
      consumer_secret: process.env.CONSUMERSECRET,
      access_token: token,
      access_token_secret: tokenSecret
    });
    var stream = T.stream('statuses/filter', {track: track});
    return stream;
  },
  saveTweets: function(stream) {
    stream.on('tweet', function (tweet) {
    // save processed tweet to DB
      databaseHelpers.saveTweet(processTweet(tweet), function(err, data) {console.log(err, data)};);
    });
  }
};

module.exports = stream;
