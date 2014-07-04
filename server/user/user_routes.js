var dbMethods = require('../../db/database_controllers.js');

module.exports = function(router) {
  router.route('/')
  .get(function(req, res) {
    dbMethods.findUserById(req.user, function(err, data) {
      res.send({user: data});
    });
  });

  router.route('/:userId')
  .get(function(req, res) {
    var userId = req.params.userId;
    if (userId) {
      dbMethods.findUserById(userId, function(err, data) {
        if (err) {
          console.log('error: ', err);
          res.send(404);
        } else {
          res.send(data);
        }
      });
    } else {
      throw "error: no userId on get request to /user/:userId";
    }
  });
};
