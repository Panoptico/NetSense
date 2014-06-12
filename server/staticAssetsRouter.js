var Users = require('../db/user.js');
var Tweets = require('../db/tweet.js');
var dbMethods = require('../db/databaseHelpers.js');

module.exports = exports = function(router) {
  router.route('/emberTest')
  .get(function(req, res){
    res.redirect('/emberTest.html');
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
