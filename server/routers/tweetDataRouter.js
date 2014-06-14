// to grab a tweet by it's id:
// localhost:8080/tweetdata/v1/tweet/<tweetId>
// e.g. localhost:8080/tweetdata/v1/tweet/477685207185645569

var dbMethods = require('../../db/databaseHelpers');
module.exports = exports = function(router) {
  router.route('/tweet/:tweetId')
  .get(function(req, res){
    console.log(req.params);
    var tweetId = req.params.tweetId;
    dbMethods.findTweetById('' + tweetId, function(err, data){
      console.log(data);
      res.send(data);      
    });
  });

  router.route('/middle')
  .get(
    function(req, res, next) {
      dbMethods.saveTweet({tweetId: 'tweet'}, next);
    }, 
    function(data, next) {
      dbMethods.findTweetById(data.tweetId, next);
    },
    function(data) {
      console.log(data);
  });

};