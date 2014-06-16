var mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    middle     = require('./middleware'),
    cors       = require('cors');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport'), 
TwitterStrategy = require('passport-twitter').Strategy;

mongoose.connect(process.env.DB_URL);

module.exports = exports = function(app, express, routers) {
  app.set('port', process.env.PORT || 8080);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(cors());
  app.use(cookieParser()) ;
  app.use(bodyParser());
  app.use(session({ secret: 'keyboard cat', cookie: { secure: true }}));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new TwitterStrategy({
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:8080/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
      User.findOrCreate({ twitterId: profile.id }, function (err, user) {
        return done(null, profile);
      });
      console.log('>>>>>>',token, tokenSecret, profile);
      done();
    }
  ));

  app.use('/static/v1', routers.staticAssetsRouter);
  app.use('/tweetdata/v1', routers.tweetDataRouter);
  app.use(express.static(__dirname.substr(0, __dirname.length-7) + '/client/www'));
  app.use(middle.logError);
  app.use(middle.handleError);
};
