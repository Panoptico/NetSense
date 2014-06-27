var dbMethods = require('../../db/database_controllers.js');

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
      console.log('Tweet query:', req.query);
      if (req.query.ids) {
        dbMethods.findTweetsByIds(req.query.ids, function(err, data) {
          res.send({tweets: data});
        });
      } else {
        dbMethods.findAllTweets(function(err, data) {
          res.send({tweets: data});
        });
      }
    });
};
