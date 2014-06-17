var databaseHelpers = require('../../db/databaseHelpers.js');
var authHelpers = require('../authHelpers.js');

module.exports = function(router, passport) {
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
  }),

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
  }),

  router.route('/auth/twitter')
  .get(passport.authenticate('twitter'));

  router.route('/auth/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: 'http://127.0.0.1:8080',
    failureRedirect: 'http://127.0.0.1:8080/static/v1/emberTest'
  }));
};
