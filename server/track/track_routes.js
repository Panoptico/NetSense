var dbMethods = require('../../db/database_controllers.js');
var streamControllers = require('../twitter/stream_controllers');

module.exports = function(router) {
  router.route('/')
  .post(function(req, res) {
    var userId = req.user;
    var track = req.body.track;
    streamControllers.saveTrack(track.name, process.env.TWITTER_ACCESSTOKEN, process.env.TWITTER_ACCESSTOKENSECRET);

    if(userId) {
      dbMethods.findUserById(userId, function(err, data){
        // TODO: Check if track is already in data.tracks
        var userInfo = {};
        userInfo.twitterUserId = data[0].twitterUserId;
        userInfo.tracks = data[0].tracks;
        userInfo.tracks.push(track.name);
        dbMethods.updateUserInfo(userInfo, function(err, data){
          if(err) {
            console.log('Error: ', err);
            res.send(500, err);
          } else {
            res.send(201, {user: userInfo});
          } 
        });
      });
    } else {
      res.send(401);
    }
  })
  .get(function(req, res) {
    if (req.query.ids) {
      dbMethods.findTracksByNames(req.query.ids, function(err, data) {
        res.send({tracks: data});
      });
    } else {
      dbMethods.findAllTracks(function(err, data) {
        res.send({tracks: data});
      });
    }
 });

  router.route('/:trackName')
  .get(function(req, res) {
    var trackName = req.params.trackName;
    trackName = trackName.replace(/\s/g,'');
    if (trackName) {
      dbMethods.findTrackByName(trackName, function(err, data) {
        if (err) {
          console.log('error: ', err);
          res.send(404);
        } else {
          res.send({track: data});
        }
      });
    } else {
      throw "error: no trackName on get request to /track/:trackName";
    }
  });
  /*,
  dbMethods.findTrackByName,
  function(err, data) {
    if (err) {
      console.log('error:', err);
      res.send(404);
    } else {
      res.send(data);
    }
  });*/
};
