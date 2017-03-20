var svg_x = 0;
var svg_y = 0;

var width = 800,
    size = 100,
    padding = 0;



var svg = d3.select("svg"),
    //.append(svg)
    margin = {top: 20, right: 40, bottom: 40, left: 20},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%m/%d/%Y %I:%M:%S %p");

var x = d3.scaleLinear().rangeRound([0, width]);

var y = d3.scaleLinear().rangeRound([height, 0]);



var area = d3.area()
    .x(function(d) { return x(d["Minutes"]); })
    .y1(function(d) { return y(d["Count"]); });
//
// var verticalLine =


d3.csv("lineData.csv", function(d) {
  return d;
}, function(error, data) {
  if (error) throw error;
/*
  time_to_count = {};
  for(var i = 0; i < data.length; i++){
	  time1 = parseTime(data[i]["Hospital DtTm"]);
	  time2 = parseTime(data[i]["Transport DtTm"]);
	  time_interval = d3.timeMinute.count(time1, time2);
	  if(time_interval in time_to_count){
	      time_to_count[time_interval] += 1;
	  }
	  else{
	      time_to_count[time_interval] = 1;
	  }
  }

  x_axis_max = 0;
  y_axis_max = 0;
  for(var k in time_to_count){
	  x_axis_max = Math.max(x_axis_max, +k);
	  y_axis_max = Math.max(y_axis_max, time_to_count[k]);
  }
*/
  x.domain([-40, 80]);

  y.domain([0, d3.max(data, function(d){ return +d["Count"]})]);
  area.y0(y(0));
/*
  line_array = [];
  for(var k in time_to_count){
	  line_array.push({x: +k, y: time_to_count[k]});
  }*/

  g.append("path")
      .datum(data)
      .attr("fill", "steelblue")
	  .attr("stroke", "steelblue")
	  .attr("stroke-width", 3)
      .attr("d", area);

  //x axis
  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("fill", "#000")
      .attr("x", 400)
      .attr("y", 25)
      .attr("dx", "0.71em")
      .attr("text-anchor", "end")
      .text("Time (minutes)");

      g.append("line")
           .attr("x1", x(0))
           .attr("x2",x(0))
           .attr("y1", y(0))
           .attr("y2", y(380))
           .attr("stroke", "red");

  //y axis
  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Count");
});
