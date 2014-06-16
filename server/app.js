var express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport'), 
TwitterStrategy = require('passport-twitter').Strategy;
var app = express();

// app.use(cookieParser()) ;
// app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new TwitterStrategy({
//     consumerKey: //TWITTER_CONSUMER_KEY,
//     consumerSecret: //TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://localhost:8080/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate({ twitterId: profile.id }, function (err, user) {
//       return done(null, profile);
//     });
//     console.log('>>>>>>',token, tokenSecret, profile);
//     done();
//   }
// ));
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', function(err, user, info) {console.log(err, user, info);}
));
var routers = {
  staticAssetsRouter: express.Router(),
  tweetDataRouter: express.Router()
};

require('./config.js')(app, express, routers);
require('./routers/staticAssetsRouter.js')(routers.staticAssetsRouter);
require('./routers/tweetDataRouter.js')(routers.tweetDataRouter);

module.exports = exports = app;
