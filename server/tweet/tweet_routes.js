var dbMethods = require('../../db/database_controllers.js');

module.exports = function(router) {
  router.route('/:tweetId')
    .get(function(req, res) {
      var tweetId = req.params.tweetId;
      console.log('tweetId', tweetId);
      dbMethods.findTweetById('' + tweetId, function(err, data) {
        if (err) {
          console.log('error:', err);
          return;
        }
        res.send(data);      
      });
    });
};
