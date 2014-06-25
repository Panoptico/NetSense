NetSense.TweetMapController = Ember.ObjectController.extend({
  renderMap: function() {
    var map = new google.maps.Map(document.getElementById("google-map"), {
      center: new google.maps.LatLng(37.7749300, -122.4194200),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var socket = io.connect("http://localhost:8080");
    socket.emit('track', 'worldcup');

    socket.on("tweet", function(data) {
      console.log('Recieved new tweet:', data.id_str);

      if (data.geo) {
        var location = new google.maps.LatLng(data.geo.coordinates[0], data.geo.coordinates[1]);

        var infoWindow = new google.maps.InfoWindow({
          content: "<h4>" + data.user.name + "</h4><div>" + data.text + "</div>"
        });

        var birdIcon = "bird_original.png";
        if (data.sentimentScore < 0) {
          birdIcon = "bird_negative.png";
        } else if (data.sentimentScore === 0) {
          birdIcon = "bird_neutral.png";
        } else if (0 < data.sentimentScore) {
          birdIcon = "bird_positive.png";
        }

        var marker = new google.maps.Marker({
          position: location,
          title: "Tweet",
          icon: "./img/" + birdIcon,
          animation: google.maps.Animation.DROP,
          draggable: false
        });

        map.setCenter(location);
        marker.setMap(map);

        google.maps.event.addListener(marker, "mouseover", function() {
          infoWindow.open(map, marker);
        });
        google.maps.event.addListener(marker, "mouseout", function() {
          infoWindow.close();
        });
      }
    });
  }
});
