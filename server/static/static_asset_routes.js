var databaseHelpers = require('../../db/database_controllers.js');

module.exports = function(router) {
  router.route('/emberTest')
  .get(function(req, res){
    res.redirect('/emberTest.html');
  });
};
