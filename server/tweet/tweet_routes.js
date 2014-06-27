var dbMethods = require('../../db/database_controllers.js');
var streamControllers = require('../twitter/stream_controllers');

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
      dbMethods.findAllTweets(function(err, data) {
        res.send({tweets: data});
      });
    })
    .post(function(req, res) {
      var text = req.body.text;
      var tweetId = req.body.tweetId;
      // need user token and tokensecret
      streamControllers.sendTweet(text, tweetId, token, tokenSecret);
    });
};
