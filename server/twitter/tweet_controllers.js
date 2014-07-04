var _ = require('underscore');
var Twit = require('twit');

module.exports = {
  processTweet: function(tweet) {
    // rename properties to our tweet schema and save the properties we want
    var latitude;
    var longitude;

    if (tweet.geo) {
      latitude = tweet.geo.coordinates[0];
      longitude = tweet.geo.coordinates[1];
    }

    var mentionedIds = _.pluck(tweet.entities.user_mentions, 'id_str');

    return {
      tweetId: tweet.id_str,
      createdAt: tweet.created_at,
      text: tweet.text,
      twitterUserId: tweet.user.id_str,
      userName: tweet.user.name,
      userScreenName: tweet.user.screen_name,
      userLocation: tweet.user.location,
      latitude: latitude,
      longitude: longitude,
      retweetCount: tweet.retweet_count,
      inReplyToUserIdStr: tweet.in_reply_to_user_id_str,
      mentionedIds: mentionedIds,
      sentimentScore: tweet.sentimentScore
    };
  }, 

  sendRetweet: function(tweetId, token, tokenSecret) {
    var T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMERKEY,
      consumer_secret: process.env.TWITTER_CONSUMERSECRET,
      access_token: token,
      access_token_secret: tokenSecret
    });

    T.post('statuses/retweet/' + tweetId, {id: tweetId}, function(err, data, response) {
      if (err) {
        console.log('error:', err);
      } else {
        console.log('Retweeted!');
      }
    });
  },

  sendTweet: function(text, tweetId, userName, token, tokenSecret) {
    var T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMERKEY,
      consumer_secret: process.env.TWITTER_CONSUMERSECRET,
      access_token: token,
      access_token_secret: tokenSecret
    });

    var params = {};
    var status = text;
    if (tweetId && userName) {
      status = '@' + userName + ' ' + status;
      params.in_reply_to_status_id = tweetId;
    }
    params.status = status;

    T.post('statuses/update', params, function(err, data, response) {
      if (err) {
        console.log('error:', err);
      } else {
        console.log("Tweeted!", data);
      }
    });
  }
};
