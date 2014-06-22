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
  renderTemplate: function(controller){
    this.render('NetSense');
  }
});


// want to find user, so we have only that user's tracks
// must give the userId with model  ============================================================
NetSense.DashboardIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user', 1);
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
    this.render('NetSense/dashboard/track');
  }
});

NetSense.TweetMapRoute = Ember.Route.extend({
  model: function(controller, transition){
    var trackId = transition.state.params.track.trackId;
    return this.store.find('track', trackId);
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
    var trackId = transition.state.params.track.trackId;
    return this.store.find('track', trackId);
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