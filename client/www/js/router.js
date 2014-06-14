NetSense.Router.map(function(){
  this.resource('NetSense', {path: '/'}, function(){
    this.route('dashboard');
    this.route('settings');
    this.route('login');
  });
});

NetSense.NetSenseRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this._super(this, arguments);
    this.render('NetSense/dashboard', {
      outlet: 'ContentView',
      into: 'NetSense'
    });
  }
});

NetSense.NetSenseDashboardRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/dashboard', {
      outlet: 'ContentView',
      into: 'NetSense',
      controller: controller
    });
  }
});

NetSense.NetSenseSettingsRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/settings', {
      outlet: 'ContentView',
      into: 'NetSense',
      controller: controller
    });
  }
});

NetSense.NetSenseLoginRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/login', {
      outlet: 'ContentView',
      into: 'NetSense',
      controller: controller
    });
  }
});