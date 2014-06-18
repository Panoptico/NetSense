var mongoose         = require('mongoose'),
    cors             = require('cors'),
    cookieParser     = require('cookie-parser'),
    bodyParser       = require('body-parser'),
    session          = require('express-session'),
    middle           = require('./middleware'),
    passport         = require('./passportHelpers.js'),
    TwitterStrategy  = require('passport-twitter').Strategy,
    dbMethods        = require('../db/databaseHelpers'),
    twitStream       = require('./TwitStreamHelpers');

passport.use(new TwitterStrategy({
  consumerKey: process.env.CONSUMERKEY,
  consumerSecret: process.env.CONSUMERSECRET,
  callbackURL: "http://127.0.0.1:8080/login/v1/auth/twitter/callback"
}, function(token, tokenSecret, profile, done) {
  // TODO: store/use token, tokensecret, profile.id
  var userId = '' + profile.id;
  var twitterHandle = profile.username;
  var user = {twitterUserId: userId,
              token: token,
              tokenSecret: tokenSecret,
              twitterHandle: twitterHandle
             };
  dbMethods.findUserById(userId, function(err, data) {
    if (!err) {
      if (data.length === 0) {
        dbMethods.saveNewUser(user, function(err, data) {
          if (data) {
            twitStream.makeNewStream(twitterHandle, token, tokenSecret);
          }
            done(null, profile.id);
        });
      } else {
        dbMethods.updateUserInfo(user, function(err, data) {
          if(err) {console.error(err);}
          if (data) {
            twitStream.makeNewStream(twitterHandle, token, tokenSecret);
          }
          done(null, profile.id);
        });
      }
    }
  });
}));

mongoose.connect(process.env.DB_URL);

module.exports = exports = {
  config: function(app, express, routers) {
    app.set('port', process.env.PORT || 8080);
    app.set('base url', process.env.URL || 'http://localhost');
    app.use(cors());
    app.use(express.static(__dirname.substr(0, __dirname.length-7) + '/client/www'));
    app.use(cookieParser()) ;
    app.use(bodyParser());
    app.use(session({secret: 'secret'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/login/v1', routers.loginRouter);
    app.use('/static/v1', routers.staticAssetsRouter);
    app.use('/tweetdata/v1', routers.tweetDataRouter);
    app.use(middle.logError);
    app.use(middle.handleError);
  },

  passport: passport
};
