var app = require('./server/app.js');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport'), 
TwitterStrategy = require('passport-twitter').Strategy;

// app.use(cookieParser()) ;
// app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new TwitterStrategy({
//     consumerKey: TWITTER_CONSUMER_KEY,
//     consumerSecret: TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://localhost:8080/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // });
//     console.log('>>>>>>',token, tokenSecret, profile);
//     done(null, profile);
//   }
// ));
// app.get('/auth/twitter',
//   passport.authenticate('twitter'));

// app.get('/auth/twitter/callback', 
//     passport.authenticate('twitter', { successRedirect: '/Netsense.html',
//                                        failureRedirect: '/' }
// ));

var port  = app.get('port'),
    log   = 'Listening on ' + app.get('base url') + ':' + port;

app.listen(port);
console.log(log);
