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
  .get(function(req, res, next) {
    var userId = req.params.userId;
    if (userId) {
      next(userId);
    } else {
      throw "error: no userId on get request to /user/:userId";
    }
  },
  dbMethods.findUserById,
  function(err, data, res) {
    if (err) {
      console.log('error:', err);
      res.send(404);
    } else {
      res.send(data);
    }
  });

/*
  router.route('/track/:trackName')
  .get(function(req, res, next) {
    var trackName = req.params.trackName;
    if (trackName) {
      next(trackName);
    } else {
      throw "error: no trackName on get request to /track/:trackName";
    }
  },
  dbMethods.findTrackByName,
  function(err, data, res) {
    if (err) {
      console.log('error:', err);
      res.send(404);
    } else {
      res.send(data);
    }
  });
*/
};
