var Users = require('../db/user.js');
var Tweets = require('../db/tweet.js');
var dbMethods = require('../db/databaseHelpers.js')

module.exports = exports = function(router) {
  router.route('/emberTest')
  .get(function(req, res){
    res.redirect('/emberTest.html');
  });
};
