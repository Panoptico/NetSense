NetSense.Router.map(function(){
  this.resource('NetSense', {path: '/'}, function(){
    this.resource('dashboard', function(){
      this.resource('track', {path: '/track/:trackId'}, function(){
        this.resource('tweetMap');
        this.resource('sentimentGraph');
      });
    });
    this.route('settings');
    this.route('login');
  });
});

NetSense.NetSenseRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('track');
  },
  renderTemplate: function(controller){
    this.render('NetSense');
  }
});

NetSense.DashboardRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('track');
  },
  renderTemplate: function(controller){
    this.render('NetSense/dashboard', {
    });
  }
});

NetSense.TrackIndexRoute = Ember.Route.extend({
  model: function(object, transition){
    var trackId = transition.state.params.track.trackId;
    return this.store.find('track', trackId);
  },
  renderTemplate: function(controller){
    this.render('NetSense/dashboard/track')
  }
});

NetSense.TweetMapRoute = Ember.Route.extend({
  model: function(controller, transition){
    return this.store.find('track', transition.state.params.track.trackId)
  },
  renderTemplate: function(controller){
    this.render('NetSense/dashboard/track');
    this.render('NetSense/dashboard/track/tweetMap', {
      into: 'NetSense/dashboard/track'
    });
  }
});

NetSense.SentimentGraphRoute = Ember.Route.extend({
  model: function(controller, transition){
    return this.store.find('track', transition.state.params.track.trackId)
  },
  renderTemplate: function(controller){
    this.render('NetSense/dashboard/track');
    this.render('NetSense/dashboard/track/sentimentGraph', {
      into: 'NetSense/dashboard/track'
    });
  }
});

NetSense.NetSenseSettingsRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/settings', {
    });
  }
});

NetSense.NetSenseLoginRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('NetSense/login', {
    });
  }
});