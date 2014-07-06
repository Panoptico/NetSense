NetSense.SentimentGraphController = Ember.ObjectController.extend({
  getData: function() {
    // gets data using an ajax call, gives server a track name by the body and expects an array of tweets
    var trackName = this.get('model').id;
    console.log('sending ajax request for track name', trackName);

    $.ajax({
      url: window.__netsense_url + '/api/v1/ajax/gettweets?trackName=' + trackName,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('Got back an array of tweets from ajax request', data);

        $("#loading").removeClass(".loading").addClass(".loading-hide");
        window.__netsense_sentiment_graph_data = data.tweets;
        window.renderGraph = function(data, timeInterval) {
          $("#scatterplot").html("");

          var averagedData = data.slice();

          for (var j = 0; j < data.length; j++) {
            // averages out the sentiment score with it's 4 closests neighbors
            // if (j !== 0 && j !== 1 && j !== data.length-2 && j !== data.length-1) {
            //   averagedData[j].sentimentScore = (data[j-2].sentimentScore + data[j-1].sentimentScore + data[j].sentimentScore + data[j+1].sentimentScore + data[j+2].sentimentScore) / 5;
            // }

            var dateObj = new Date(data[j].createdAt);
            var dateOfMonth = '' + dateObj.getDate();
            if (Number(dateOfMonth) < 10) {
              dateOfMonth = '0' + dateOfMonth;
            }
            var monthOfYear = '' + (dateObj.getMonth()+1);
            if (Number(monthOfYear) < 10) {
              monthOfYear = '0' + monthOfYear;
            }
            averagedData[j].byHour = '' + monthOfYear + '/' + dateOfMonth + ' ' + dateObj.getHours() + ':' + (dateObj.getMinutes() - (dateObj.getMinutes() % timeInterval));
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
            squashedData[l].baseline = 0;
          }

          data = squashedData;
          console.log('Data to be graphed', data);

          // sentiment graph
          // sets dimensions
          var margin = {top: 50, right: 100, bottom: 30, left: 50};
          var width = 1050 - margin.left - margin.right;
          var height = 550 - margin.top - margin.bottom;

          // sets the expected time formatting in the to be graphed data
          var parseDate = d3.time.format("%m/%d %H:%M").parse;

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
              .interpolate('basis')
              .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.score); });

          var baseline = d3.svg.line()
              .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.baseline); });

          // creates svg element
          var svg = d3.select("#scatterplot").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          data.forEach(function(d) {
            // sets the date
            d.date = parseDate(d.time);
          });

          x.domain(d3.extent(data, function(d) { return d.date; }));

          // draw the x axis
          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0,0)")
              .call(xAxis)
            .append("text")
              .attr("class", "label")
              .attr("x", width-5)
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
              .attr("x", -height+130)
              .attr("y", -40)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Sentiment Score");

          // draws the baseline
          svg.append("path")
              .datum(data)
              .attr("class", "baseline")
              .attr("d", baseline);

          // draws the data points
          svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);

          // draws the labels for each line
          var lastPoint = data[data.length-1];

          svg.append("text")
              .datum(lastPoint)
              .attr("class", "label")
              .attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.baseline) + ")"; })
              .attr("x", 3)
              .attr("dy", ".35em")
              .text("Baseline");

          svg.append("text")
              .datum(lastPoint)
              .attr("class", "label")
              .attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.score) + ")"; })
              .attr("x", 3)
              .attr("dy", ".35em")
              .text("Sentiment");
        };

        window.renderGraph(window.__netsense_sentiment_graph_data, 15);
      },
      error: function (data) {
        console.error('Failed to get back an array of tweets from ajax request:', data);
      }
    });
  }
});
