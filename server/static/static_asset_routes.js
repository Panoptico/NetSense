var databaseHelpers = require('../../db/database_controllers.js');

module.exports = function(router) {
  router.route('/emberTest')
  .get(function(req, res){
    res.redirect('/emberTest.html');
  });

  router.route('/NetSense')
  .get(function(req, res){
    if(req.user) {
      res.redirect('/NetSense.html');      
    } else {
      res.redirect('/NetSense.html#/login');
    }
  });
};
