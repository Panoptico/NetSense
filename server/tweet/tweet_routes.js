var dbMethods = require('../../db/database_controllers.js');
var tweetMethods = require('../twitter/tweet_controllers');

module.exports = function(router) {
  router.route('/:tweetId')
    .get(function(req, res) {
      var tweetId = req.params.tweetId;
      console.log('tweetId', tweetId);
      dbMethods.findTweetById('' + tweetId, function(err, data) {
        if (err) {
          console.log('error: ', err);
          return;
        }
        res.send(data);      
      });
    });

  router.route('/')
    .get(function(req, res) {
      if (req.query.ids) {
        dbMethods.findTweetsByIds(req.query.ids, function(err, data) {
          res.send({tweets: data});
        });
      } else {
        dbMethods.findAllTweets(function(err, data) {
          res.send({tweets: data});
        });
      }
    })
    
    .post(function(req, res) {
      // TODO: replace netsensehr token and tokenSecret with the user that's currently logged in
      tweetMethods.sendTweet(req.body.text, req.body.tweetId, req.body.userName, process.env.TWITTER_ACCESSTOKEN, process.env.TWITTER_ACCESSTOKENSECRET);
      res.send(200);
    });
};
