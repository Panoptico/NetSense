var databaseHelpers = require('../../db/databaseHelpers.js');
var authHelpers = require('../authHelpers.js');

module.exports = function(router) {
  router.route('/emberTest')
  .get(function(req, res){
    res.redirect('/emberTest.html');
  });

  router.route('/signup')
  .post(function(req, res, next){
    var data = req.body.data;
    var newUser = authHelpers.processSignup(data);
    databaseHelpers.saveNewUser(newUser, next);
  }, function(err, data, res) {
    if (!err) {
      authHelpers.loginUser(newUser);
      res.redirect('index.html');
    } else {
      res.send(err);
    }
  });

  router.route('/login')
  .post(function(req, res, next){
    var data = req.body.data;
    var user = authHelpers.processLogin(data);
    databaseHelpers.findUserById(user.twitterUserId, next);
  }, function(err, data, res) {
    if (!err) {
      authHelpers.loginUser(newUser);
      res.redirect('index.html');
    } else {
      res.send(err);
    }
  });
};
