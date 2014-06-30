NetSense.TweetMapController = Ember.ObjectController.extend({
  renderMap: function() {
    // creates map
    var map = new google.maps.Map(document.getElementById("google-map"), {
      center: new google.maps.LatLng(37.7749300, -122.4194200),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    // creates socket connection
    var socket = io.connect(window.__netsense_url);

    // sends track name to the server
    socket.emit('track', this.get('model').id);

    // processes a tweet from the socket connection
    socket.on("tweet", function(data) {
      console.log('Recieved new tweet:', data.id_str);

      // only render markers for tweets with geolocation data
      if (data.geo) {
        var location = new google.maps.LatLng(data.geo.coordinates[0], data.geo.coordinates[1]);

        // creates tooltip
        var infoWindow = new google.maps.InfoWindow({
          content: "<strong>" + data.user.name + "</strong><div>" + data.text + "</div>"
        });

        // sets the image for the marker depending on sentiment score
        var birdIcon = "bird_original.png";
        if (data.sentimentScore < 0) {
          birdIcon = "bird_negative.png";
        } else if (data.sentimentScore === 0) {
          birdIcon = "bird_neutral.png";
        } else if (0 < data.sentimentScore) {
          birdIcon = "bird_positive.png";
        }

        // creates the marker
        var marker = new google.maps.Marker({
          position: location,
          title: "Tweet",
          icon: "./img/" + birdIcon,
          animation: google.maps.Animation.DROP,
          draggable: false
        });

        // centers the map on the new tweet
        // map.setCenter(location);

        // renders the marker on the map
        marker.setMap(map);

        // adds event listeners to show and hide the tooltip on mouse over
        google.maps.event.addListener(marker, "mouseover", function() {
          infoWindow.open(map, marker);
        });
        google.maps.event.addListener(marker, "mouseout", function() {
          infoWindow.close();
        });

        // adds event listener to display a reply to tweet box on mouse click
        google.maps.event.addListener(marker, "click", function() {
          window.__netsense_currentTweetId = data.id_str;
          window.__netsense_currentUserName = data.user.screen_name;
          $("#input-box").dialog("open");
        });
      }
    });

    // sets up input box modal
    $("#input-box").dialog({
      autoOpen: false,
      height: 160,
      width: 350,
      modal: true,
      buttons: {
        Send: function() {
          $.ajax({
            url: window.__netsense_url + '/api/v1/tweet/',
            type: 'POST',
            data: JSON.stringify({
              text: $('#reply').val(),
              tweetId: window.__netsense_currentTweetId,
              userName: window.__netsense_currentUserName
            }),
            contentType: 'application/json',
            success: function (data) {
              console.log('Replied to tweet!');
            },
            error: function (data) {
              console.error('Failed to reply to tweet:', data);
            }
          });
          $(this).dialog("close");
        },
        Cancel: function() {
          $(this).dialog("close");
        }
      },
      close: function() {
        $('#reply').val("");
      }
    });
  }
});
