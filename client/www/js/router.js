NetSense.Router.map(function(){
  this.resource('NetSense', {path: '/'}, function(){
    this.route('dashboard');
    this.route('settings');
    this.route('login');
  });
});

NetSense.NetSenseDashboardRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/dashboard', {
      controller: controller
    });
  }
});

NetSense.NetSenseSettingsRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/settings', {
      controller: controller
    });
  }
});

NetSense.NetSenseLoginRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/login', {
      controller: controller
    });
  }
});