NetSense.SentimentGraphController = Ember.ObjectController.extend({
  renderGraph: function() {
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

    // sets dimensions
    var margin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 50
    };
    var width = 900 - margin.left - margin.right;
    var height = 550 - margin.top - margin.bottom;

    // sets axis scale
    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    // sets axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var tooltip = d3.tip()
        .attr('class', 'd3-tooltip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>" + d.user.name + "</strong>" +
                 "<div>" + d.text + "</div>" +
                 "<br><i>Sentiment Score:</i> <span style='color:" + d.color + "'>" + d.sentimentScore + "</span>";
        });

    // creates svg element
    var svg = d3.select("#scatterplot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tooltip);

    // var data = this.get('model').get('tweets');

    // sets dummy data
    var data = [
      {
        tweetId: '1',
        user: {name: 'jake'},
        text: 'hello',
        createdAt: 1,
        sentimentScore: 3
      },
      {
        tweetId: '2',
        user: {name: 'hoover'},
        text: 'yo',
        createdAt: 2,
        sentimentScore: -3
      },
      {
        tweetId: '483682759651905536',
        user: {name: 'footballwheel'},
        text: 'hi',
        createdAt: 3,
        sentimentScore: 0
      },
      {
        tweetId: '4',
        user: {name: 'erin'},
        text: 'hello world!',
        createdAt: 4,
        sentimentScore: 1
      },
      {
        tweetId: '5',
        user: {name: 'kris'},
        text: 'doh',
        createdAt: 5,
        sentimentScore: -1
      }
    ];
    console.log(data);

    // sets the color by sentiment score
    data.forEach(function(d) {
      if (d.sentimentScore < 0) {
        d.color = 'red';
      } else if (d.sentimentScore === 0) {
        d.color = 'blue';
      } else if (0 < d.sentimentScore) {
        d.color = 'green';
      }
    });

    // calculates the domains
    x.domain(d3.extent(data, function(d) { return d.createdAt; })).nice();
    y.domain(d3.extent(data, function(d) { return d.sentimentScore; })).nice();

    // draw the x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height/2 + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Time");

    // draw the y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Sentiment Score")

    // draw the data points
    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.createdAt); })
        .attr("cy", function(d) { return y(d.sentimentScore); })
        .style("fill", function(d) { return d.color; })
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide)
        .on('click', function(tweet) {
          window.__netsense_currentTweetId = tweet.tweetId;
          window.__netsense_currentUserName = tweet.user.name;
          $("#input-box").dialog("open");
        });
  }
});
