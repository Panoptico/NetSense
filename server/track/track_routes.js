var dbMethods = require('../../db/database_controllers.js');

module.exports = function(router) {
  router.route('/track/:trackName')
  .get(function(req, res) {
    var trackName = req.params.trackName;
    if (trackName) {
      dbMethods.findTrackByName(trackName, function(err, data) {
        if (err) {
          console.log('error:', err);
          res.send(404);
        } else {
          res.send(data);
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
    var trackName = req.params.trackName;
    dbMethods.findTrackByName(trackName, function(err, data){
      if(err) {
        res.send(500, err);
      } else if(data) {
        res.send(409, data);
      } else {
        dbMethods.saveNewTrackByName(trackName, function(err, data) {
          res.send(201, data);
        });
      }
    });
  });
};
