var _ = require('underscore');
var sentiment = require('../sentiment/sentiment_controllers.js');

module.exports = {
  processTweet: function(tweet) {
    // rename properties to our tweet schema and save the properties we want
    if (tweet.geo) {
      var latitude = tweet.geo.coordinates[0];
      var longitude = tweet.geo.coordinates[1];
    }

    var mentionedIds = _.pluck(tweet.entities.user_mentions, 'id_str');

    // calculate sentiment score and save as a new property on the tweet schema
    var sentimentScore = sentiment.analyze(tweet.text).score;

    return {
      tweetId: tweet.id_str,
      createdAt: tweet.created_at,
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
      sentimentScore: sentimentScore
    };
  };
};
