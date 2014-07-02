NetSense.SentimentGraphController = Ember.ObjectController.extend({
  renderGraph: function() {
/*    // sets up input box modal
    $("#input-box").dialog({
      autoOpen: false,
      height: 260,
      width: 400,
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
    });*/

    var trackName = this.get('model').id;
    console.log('sending ajax request for track name', trackName);

    // gets data using an ajax call, gives server a track name by the body and expects an array of tweets
    $.ajax({
      url: window.__netsense_url + '/api/v1/ajax/gettweets?trackName=' + trackName,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        data = data.tweets;
        console.log('Got back an array of tweets from ajax request', data);

        // sentiment graph
        // sets dimensions
        var margin = {
          top: 50,
          right: 30,
          bottom: 30,
          left: 50
        };
        var width = 900 - margin.left - margin.right;
        var height = 550 - margin.top - margin.bottom;

        // time format: Wed Jul 02 16:46:58 +0000 2014
        // TODO: need to make a date variable and specify format here
        var parseDate = d3.time.format("%H:%M").parse;

        // sets axis scale
        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        // sets axis unit labels
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("top");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.sentimentScore); });

        // creates svg element
        var svg = d3.select("#scatterplot").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        /*// draws the tooltips
        var tooltip = d3.tip()
            .attr('class', 'd3-tooltip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>" + d.userName + "</strong>" +
                     "<div>" + d.text + "</div>" +
                     "<br><i>Sentiment Score:</i> <span style='color:" + d.color + "'>" + d.sentimentScore + "</span>";
            });

        svg.call(tooltip);*/

        data.forEach(function(d) {
          // sets the date
          var dateObj = new Date(d.createdAt);
          var byDate = '' + dateObj.getMonth()+1 + '-' + dateObj.getDate();
          var byHour = '' + dateObj.getHours() + ':' + dateObj.getMinutes();
          d.date = parseDate(byHour);

          // sets the color by sentiment score
          if (d.sentimentScore < 0) {
            d.color = 'red';
          } else if (d.sentimentScore === 0) {
            d.color = 'blue';
          } else if (0 < d.sentimentScore) {
            d.color = 'green';
          }
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.sentimentScore; }));

        // draw the x axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0,0)")
            .call(xAxis)
          .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -30)
            .style("text-anchor", "end")
            .text("Time");

        // draw the y axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height+70)
            .attr("y", -40)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Sentiment Score");

        // draw the data points
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        /*svg.selectAll(".dot")
            .data(data)
          .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5)
            .attr("cx", function(d) { return x(d.createdAt); })
            .attr("cy", function(d) { return y(d.sentimentScore); })
            .style("fill", function(d) { return d.color; })
            .on('mouseover', tooltip.show)
            .on('mouseout', tooltip.hide);*/
            /*.on('click', function(tweet) {
              window.__netsense_currentTweetId = tweet.tweetId;
              window.__netsense_currentUserName = tweet.user.name;
              $("#input-box").dialog("open");
            });*/
      },
      error: function (data) {
        console.error('Failed to get back an array of tweets from ajax request:', data);
      }
    });
  }
});
