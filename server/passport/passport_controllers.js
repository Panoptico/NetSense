var passport = require('passport');
var dbMethods = require('../../db/database_controllers.js');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  dbMethods.findUserById(user, function(err, data) {
    done(null, user);
  });
});

module.exports = passport;
