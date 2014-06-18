var dbMethods = require('../../db/database_controllers.js');
var controller = require('./twitter_login_controllers');

module.exports = function(router, passport) {
  passport.use(controller.twitterStrategy);

  router.route('/auth/twitter')
  .get(passport.authenticate('twitter'));

  router.route('/auth/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: 'http://127.0.0.1:8080',
    failureRedirect: 'http://127.0.0.1:8080/api/v1/static/emberTest'
  }));
};
