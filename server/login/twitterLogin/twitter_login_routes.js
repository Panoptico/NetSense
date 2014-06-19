var dbMethods = require('../../../db/database_controllers.js');
var controller = require('./twitter_login_controllers');

module.exports = function(router, passport) {
  passport.use(controller.twitterStrategy);

  router.route('/')
  .get(passport.authenticate('twitter'));

  router.route('/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: process.env.BASE_URL + '/static/NetSense',
    failureRedirect: process.env.BASE_URL
  }));
};
