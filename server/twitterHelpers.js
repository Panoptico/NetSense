var _ = require('underscore');
var Twit = require('Twit');
var sentiment = require('./sentimentHelpers.js');
var databaseHelpers = require('../db/databaseHelpers.js');

var T = new Twit({
  consumer_key: process.env.CONSUMERKEY,
  consumer_secret: process.env.CONSUMERSECRET,
  access_token: process.env.ACCESSTOKEN,
  access_token_secret: process.env.ACCESSTOKENSECRET
});

var sanFrancisco = ['-122.75', '36.8', '-121.75', '37.8'];

var stream = T.stream('statuses/filter', {locations: sanFrancisco});

var processTweet = function(tweet) {
  // rename properties to our tweet schema and save the properties we want
  if (tweet.geo) {
    var latitude = tweet.geo.coordinates[0];
    var longitude = tweet.geo.coordinates[1];
  }

  var mentionedIds = _.pluck(tweet.entities.user_mentions, 'id_str');

  // calculate sentiment score and save as a new property on the tweet schema
  var sentimentScore = sentiment.analyze(tweet.text);

  var processedTweet = {
    createdAt: tweet.created_at,
    tweetId: tweet.id_str,
    text: tweet.text,
    twitterUserId: tweet.user.id_str,
    userName: tweet.user.name,
    userScreenName: tweet.screen_name,
    userLocation: tweet.user.location,
    latitude: latitude,
    longitude: longitude,
    retweetCount: tweet.retweet_count,
    inReplyToUserIdStr: tweet.in_reply_to_user_id_str,
    mentionedIds: mentionedIds,
    sentimentScore: sentimentScore.score,
  };

  return processedTweet;
};

stream.on('tweet', function (tweet) {
  // save processed tweet to DB
  databaseHelpers.saveTweet(processTweet(tweet), function(err, data) {console.log(err, data)});
});

module.exports = stream;
