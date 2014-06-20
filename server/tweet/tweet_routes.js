var dbMethods = require('../../db/database_controllers.js');

module.exports = function(router) {
  router.route('/:tweetId')
    .get(function(req, res) {
      var tweetId = req.params.tweetId;
      dbMethods.findTweetById('' + tweetId, function(err, data) {
        res.send(data);      
      });
    });
};
