var mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    middle     = require('./middleware'),
    cors       = require('cors');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport     = require('passport'), 
TwitterStrategy  = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
  consumerKey: process.env.CONSUMERKEY,
  consumerSecret: process.env.CONSUMERSECRET,
  callbackURL: "http://127.0.0.1:8080/static/v1/auth/twitter/callback"
}, function(token, tokenSecret, profile, done) {
  // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
  //   return done(null, profile);
  // });
  console.log('>>>>>>',token, tokenSecret, profile);
  done();
}));

mongoose.connect(process.env.DB_URL);

module.exports = exports = function(app, express, routers) {
  app.set('port', process.env.PORT || 8080);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(cors());
  app.use(express.static(__dirname.substr(0, __dirname.length-7) + '/client/www'));
  app.use(cookieParser()) ;
  app.use(bodyParser());
  app.use(session({secret: 'secret'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/static/v1', routers.staticAssetsRouter);
  app.use('/tweetdata/v1', routers.tweetDataRouter);
  app.use(middle.logError);
  app.use(middle.handleError);

  routers.staticAssetsRouter.route('/auth/twitter')
  .get(passport.authenticate('twitter'));

  routers.staticAssetsRouter.route('/auth/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/success',
    failureRedirect: '/fail'
  }));

  /*.get(function(req, res, next){
    // console.log(req.session);
    next(req, res);
  }, passport.authenticate('twitter', function(err, user, info) {
    console.log('here');
    console.log(err, user, info);
  }));*/
};
