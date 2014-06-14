// var url = require('url');
// tweetid: 477685207185645569
var dbMethods = require('../../db/databaseHelpers');
module.exports = exports = function(router) {
  router.route('/users/*')
  .get(function(req, res){
    // console.log(req.query);
    var tweetId = '477685207185645569'; //req.query.tweetId;
    dbMethods.findTweetById('' + tweetId, function(err, data){
      console.log(data);
      res.send(data);      
    });
  });

};
  