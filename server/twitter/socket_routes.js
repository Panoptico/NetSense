var socketMethods = require('./socket_controllers');

module.exports = function(router) {
  router.route('/:trackId')
  .get(function(req, res) {
    socketMethods.makeTweetMap(req.params.trackId);
    res.send(200);
  });
};
