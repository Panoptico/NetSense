// to grab a tweet by it's id:
// localhost:8080/tweetdata/v1/tweet/<tweetId>
// e.g. localhost:8080/tweetdata/v1/tweet/477685207185645569

var dbMethods = require('../../db/databaseHelpers');

module.exports = exports = function(router) {
  router.route('/tweet/:tweetId')
    .get(function(req, res) {
      var tweetId = req.params.tweetId;
      dbMethods.findTweetById('' + tweetId, function(err, data) {
        res.send(data);      
      });
    });

  router.route('/user/:userId')
  .get(function(req, res) {
    var userId = req.params.userId;
    if (userId) {
      dbMethods.findUserById(userId, function(err, data) {
        if (err) {
          console.log('error:', err);
          res.send(404);
        } else {
          res.send(data);
        }
      });
    } else {
      throw "error: no userId on get request to /user/:userId";
    }
  });

  router.route('/track/:trackName')
  .get(function(req, res) {
    var trackName = req.params.trackName;
    if (trackName) {
      dbMethods.findTrackByName(trackName, function(err, data) {
        if (err) {
          console.log('error:', err);
          res.send(404);
        } else {
          res.send(data);
        }
      });
    } else {
      throw "error: no trackName on get request to /track/:trackName";
    }
  });
};
