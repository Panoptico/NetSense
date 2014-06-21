var dbMethods = require('../../db/database_controllers.js');

module.exports = function(router) {
  router.route('/')
  .get(function(req, res) {
   dbMethods.findAllTracks(function(err, data) {
     res.send({tracks: data});
   });
 });

  router.route('/:trackName')
  .get(function(req, res) {
    var trackName = req.params.trackName;
    if (trackName) {
      dbMethods.findTrackByName(trackName, function(err, data) {
        if (err) {
          console.log('error:', err);
          res.send(404);
        } else {
          res.send({track: data});
        }
      });
    } else {
      throw "error: no trackName on get request to /track/:trackName";
    }
  },
  dbMethods.findTrackByName,
  function(err, data) {
    if (err) {
      console.log('error:', err);
      res.send(404);
    } else {
      res.send(data);
    }
  })
  .post(function(req, res) {

       var userId = req.user;
   if(userId) {
     dbMethods.findUserById(userId, function(err, data){
       // TODO: Check if track is already in data.tracks
       data.tracks.push(trackName);
       data.save(function(err){
         if(err) {
           console.error('Error:', err);
           res.send(500, err);
         } else {
           res.send(201, data);
         }
       });
     });
   }
  });
};
