NetSense.DashboardController = Ember.ObjectController.extend({
  content: {},
  actions:{
    onSubmit: function(trackName){
      trackName = trackName.replace(/\s/g,'')
      var track = this.store.createRecord('track', {
        name: trackName
      });
      track.save();
      this.set('trackName','')
    }
  }
});
