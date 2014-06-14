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
};