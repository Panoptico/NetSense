NetSense.NetSenseView = Ember.View.extend({
  templateName: 'NetSense',
  didInsertElement: function(){
    Ember.run.scheduleOnce('afterRender', this, this._childViewsRendered);
    $('div').on('click', function(){
      $('.trackLink').on('click', function(){
          $('.trackLink').css('background-color', 'lightsteelblue');
          $(this).css('background-color', 'lightslategrey');
        }); 
    });
  }

});
