var dbMethods        = require('../../../db/database_controllers');
var TwitterStrategy  = require('passport-twitter').Strategy;
var twitStream       = require('../../twitter/stream_controllers');

module.exports = exports = {
  twitterStrategy: new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMERKEY,
    consumerSecret: process.env.TWITTER_CONSUMERSECRET,
    callbackURL: "/api/v1/login/twitter/callback"
  }, function(token, tokenSecret, profile, done) {
    var userId = '' + profile.id;
    var twitterHandle = profile.username;
    var user = {
      twitterUserId: userId,
      twitterHandle: twitterHandle,
      name: profile.displayName,
      token: token,
      tokenSecret: tokenSecret
    };
    
    dbMethods.findUserById(userId, function(err, data) {
      if (!err) {
        if (data.length === 0) {
          dbMethods.saveNewUser(user, function(err, data) {
            if (data) {
              twitStream.saveTrack(twitterHandle, token, tokenSecret);
            }
            done(null, profile.id);
          });
        } else {
          dbMethods.updateUserInfo(user, function(err, data) {
            if (err) {console.error(err);}
            if (data) {
              twitStream.saveTrack(twitterHandle, token, tokenSecret);
            }
            done(null, profile.id);
          });
        }
      }
    });
  })
};
