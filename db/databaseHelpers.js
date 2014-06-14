var Tweets = require('./tweet.js');
var Users = require('./user.js');

var handleDatabaseResponse = function(err, data, next) {
  if (err) {
    next(err);
    return err;
  } else {
    next(null, data);
    return data;
  }
};

module.exports = exports = {
  saveTweet: function(tweet, next) {
    //save to deleteUserById
    Tweets.create(tweet, function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  },

  findTweetById: function(tweetId, next) {
    Tweets.find({tweetId: tweetId}, function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  },

  findTweetsContainingUserId: function(userId, next) {
    var tweets = Tweets.find().or([
      {userId: userId}, 
      {inReplyToUserIdStr: userId},
      {mentionedUserIds: userId}
    ]).exec();

    tweets.then( function(err, tweetData) {
      handleDatabaseResponse(err, tweetData, next);
    });
  },

  saveNewUser: function(user, next) {
    Users.create(user, function(err, data) {
      handleDatabaseResponse(err, data, next);
    }); 
  },

  updateUserInfo: function(user, next) {
    if(user.twitterUserId) {
      Users.update({twitterUserId: user.twitterUserId}, user, function(err, numberAffected, raw) {
        handleDatabaseResponse(err, numberAffected, next);
      });
    } else {
      next(null);
    }
  },

  findUserById: function(twitterUserId, next) {
    Users.find({twitterUserId: twitterUserId}, function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  },

  deleteUserById: function(twitterUserId, next) {
    Users.remove({twitterUserId: twitterUserId}, function(err, data) {
      handleDatabaseResponse(err, data, next);
    });
  }

};
