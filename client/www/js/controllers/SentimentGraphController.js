NetSense.SentimentGraphController = Ember.ObjectController.extend({
  renderGraph: function() {
    var trackName = this.get('model').id;
    console.log('sending ajax request for track name', trackName);

    // gets data using an ajax call, gives server a track name by the body and expects an array of tweets
    $.ajax({
      url: window.__netsense_url + '/api/v1/ajax/gettweets?trackName=' + trackName,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('Got back an array of tweets from ajax request', data);
        data = data.tweets;

        // averages out the sentiment score with it's neighbors
        var timeInterval = 2;
        var averagedData = data.slice();

        for (var j = 0; j < data.length; j++) {
          if (j !== 0 && j !== 1 && j !== data.length-2 && j !== data.length-1) {
            averagedData[j].sentimentScore = (data[j-2].sentimentScore + data[j-1].sentimentScore + data[j].sentimentScore + data[j+1].sentimentScore + data[j+2].sentimentScore) / 5;
          }

          var dateObj = new Date(data[j].createdAt);
          averagedData[j].byHour = '' + dateObj.getHours() + ':' + (dateObj.getMinutes() - (dateObj.getMinutes() % timeInterval));
        }

        // squashes all the sentiment scores together (averaging) by the byHour value
        var squashedData = [];
        var sameDate = {
          time: averagedData[0].byHour,
          score: [averagedData[0].sentimentScore]
        };

        for (var k = 1; k < averagedData.length; k++) {
          if (averagedData[k].byHour === averagedData[k-1].byHour) {
            sameDate.score.push(averagedData[k].sentimentScore);
          } else {
            squashedData.push(sameDate);
            sameDate = {
              time: averagedData[k].byHour,
              score: [averagedData[k].sentimentScore]
            };
          }
        }

        for (var l = 0; l < squashedData.length; l++) {
          var total = 0;
          for (var m = 0; m < squashedData[l].score.length; m++) {
            total += squashedData[l].score[m];
          }
          squashedData[l].score = total/(m+1);
        }

        data = squashedData;
        console.log('Data to be graphed', data);

        // sentiment graph
        // sets dimensions
        var margin = {top: 50, right: 30, bottom: 30, left: 50};
        var width = 900 - margin.left - margin.right;
        var height = 550 - margin.top - margin.bottom;

        // sets the expected time formatting in the to be graphed data
        var parseDate = d3.time.format("%H:%M").parse;

        // sets axis scale
        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
            .range([height, height*9/10, height*8/10, height*7/10, height*6/10, height*5/10, height*4/10, height*3/10, height*2/10, height*1/10, 0]);

        // sets axis unit labels
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("top");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.score); });

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
          d.date = parseDate(d.time);
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));
        // y.domain(d3.extent(data, function(d) { return d.score; }));

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
      },
      error: function (data) {
        console.error('Failed to get back an array of tweets from ajax request:', data);
      }
    });
  }
});
