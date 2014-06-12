var Q = require('q');
var Tweets = require('./tweet.js');
var Users = require('./user.js');

module.exports = exports = {
  saveTweet: function(tweet, next) {
    //save to DB
    Tweets.create(tweet, function(err, data) {
      if (err) {
        next(err);
        return err;
      } else {
        next(data);
        return data;
      }
    });
  },
  findTweetById: function(tweetId, next) {
    Tweets.find({TweetId: tweetId}, 
    function(err, data) {
      if (err) {
          next(err);
          return err;
        } else {
          next(data);
          return data;
        }
    });
  },
  saveNewUser: function(user, next) {
    Users.create(user, function(err, data) {
      if(err) {
        next(err);
        return err;
      } else {
        next(data);
        return data;
      }
    }); 
  }
};
