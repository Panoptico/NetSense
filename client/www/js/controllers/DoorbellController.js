window.__netsense_url = 'http://localhost:8080';

$(function(){
  var glow = function() {
    $('.doorbell').fadeTo('slow', 0.5, function() {
      $(this).fadeTo('slow', 1);
    });
  };
  var audio = document.getElementsByTagName("audio")[0];

  var ringDoorbell = function() {
    audio.play();
    glow();
  };

  var socket = io.connect(window.__netsense_url);
      socket.emit('doorbell', {message: 'listening for the doorbell'});
  socket.on('ding', function(data) {console.log('ding!!!'); glow();});
});

