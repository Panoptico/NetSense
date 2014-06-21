NetSense.DashboardController = Ember.ArrayController.extend({
  actions:{
    onSubmit: function(trackName){
      var track = this.store.createRecord('track', {
        name: trackName
      });
      track.save();
      trackName = ""
    }
  }
});
