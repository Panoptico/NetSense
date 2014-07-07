/* global google, NetSense, Ember, io, console, $ */
NetSense.TweetMapComponent = Ember.Component.extend({
  classNames: ['google-map'],
  socket: io.connect(window.__netsense_url),
  renderMap: function() {
    // sets custom overlay for Google Map
    var customStyle = [
      {
        featureType: 'landscape',
        stylers: [
          {saturation: -100},
          {lightness: 65},
          {visibility: 'on'}
        ]
      },
      {
        featureType: 'poi',
        stylers: [
          {saturation: -100},
          {lightness: 51},
          {visibility: 'simplified'}
        ]
      },
      {
        featureType: 'road.highway',
        stylers: [
          {saturation: -100},
          {visibility: 'simplified'}
        ]
      },
      {
        featureType: 'road.arterial',
        stylers: [
          {saturation: -100},
          {lightness: 30},
          {visibility: 'on'}
        ]
      },
      {
        featureType: 'road.local',
        stylers: [
          {saturation: -100},
          {lightness: 40},
          {visiblity: 'on'}
        ]
      },
      {
        featureType: 'transit',
        stylers: [
          {saturation: -100},
          {visiblity: 'simplified'}
        ]
      },
      {
        featureType: 'administrative.province',
        stylers: [
          {visibility: 'off'}
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels',
        stylers: [
          {visibility: 'on'},
          {lightness: -25},
          {saturation: -100}
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {hue: '#ffff00'},
          {lightness: -25},
          {saturation: -97}
        ]
      }
    ];

    // create map
    var map = new google.maps.Map(document.getElementById(this.get('elementId')), {
      center: new google.maps.LatLng(40.4333, 3.7000),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: customStyle
    });

    // creates socket connection
    // var socket = io.connect(window.__netsense_url);

    // sends track name to the server
    this.socket.emit('track', this.get('track'));

    // processes a tweet from the socket connection
    this.socket.on('tweet', function(data) {
      console.log('Received new tweet: ', data.id_str, data.user.screen_name);

      // only render markers for tweets with gelocation data
      if (data.geo) {
        var location = new google.maps.LatLng(data.geo.coordinates[0], data.geo.coordinates[1]);

        // creates tooltip
        var infoWindow = new google.maps.InfoWindow({
          content: '<strong>' + data.user.name + '</strong><div>' + data.text + '</div><div><em><strong>Sentiment Score: ' + data.sentimentScore + '</strong></em></div>'
        });

        // sets the image for the marker depending on sentiment score
        var birdIcon = 'bird_original.png';
        if (data.sentimentScore < -3) {
          birdIcon = 'bird_worst.png';
        } else if (data.sentimentScore < 0) {
          birdIcon = 'bird_bad.png';
        } else if (data.sentimentScore === 0) {
          birdIcon = 'bird_neutral.png';
        } else if (data.sentimentScore > 3) {
          birdIcon = 'bird_best.png';
        } else if (data.sentimentScore > 0) {
          birdIcon = 'bird_good.png';
        }

        // creates the marker
        var marker = new google.maps.Marker({
          position: location,
          title: 'Tweet',
          icon: './img/' + birdIcon,
          animation: google.maps.Animation.DROP,
          draggable: false
        });

        // renders the marker on the map
        marker.setMap(map);

        // adds event listeners to show and hide the tooltip on mouse over
        google.maps.event.addListener(marker, 'mouseover', function() {
          infoWindow.open(map, marker);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
          infoWindow.close();
        });

        // adds event listener to display a reply to tweet box on mouse click
        google.maps.event.addListener(marker, 'click', function() {
          window.__netsense_currentTweetId = data.id_str;
          window.__netsense_currentUserName = data.user.screen_name;
          $('#input-box').dialog('open');
        });
      }
    });
    
    // sets up input box modal
    $('#input-box').dialog({
      autoOpen: false,
      height: 260,
      width: 400,
      modal: true,
      buttons: {
        Send: function() {
          $.ajax({
            url: window.__netsense_url + '/api/v1/tweet',
            type: 'POST',
            data: JSON.stringify({
              text: $('#reply').val(),
              tweetId: window.__netsense_currentTweetId,
              userName: window.__netsense_currentUserName
            }),
            contentType: 'application/json',
            success: function() {
              console.log('Replied to tweet!');
            },
            error: function(err) {
              console.error('Failed to reply to tweet:', err);
            }
          });
          $(this).dialog('close');
        },
        Cancel: function() {
          $(this).dialog('close');
        }
      },
      close: function() {
        $('#reply').val('');
      }
    });
  },
  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
      this.renderMap();
    });
  }
});