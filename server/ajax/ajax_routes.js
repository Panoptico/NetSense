var dbMethods = require('../../db/database_controllers.js');
var tweetMethods = require('../twitter/tweet_controllers');

module.exports = function(router) {
  // handle ajax requests from the client for all tweets given an array of tweet ids
  router.route('/gettweets')
    .get(function(req, res) {
      var trackName = req.query.trackName;
      console.log('recieved ajax request with track name', trackName);

      dbMethods.findTrackByName(trackName, function(err, data) {
        if (err) {
          console.error('DB: could not find the trackname provided');
          res.send(404);
        }
        console.log('DB: looked up this track name', trackName, 'and got back ' + data.tweets.length + ' tweet ids');
        dbMethods.findTweetsByIds(data.tweets, function(err, data) {
          if (err) {
            console.error('DB: could not find the tweets from the array of tweet ids');
            res.send(404);
          }
          console.log('DB: retrieved ' + data.length + ' tweets from track', trackName);
          res.send({tweets: data});
        });
      });
    });
};
