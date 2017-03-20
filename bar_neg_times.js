<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <script src="https://d3js.org/d3.v4.min.js"></script>
  <style>
    body { margin:0;position:fixed;top:0;right:0;bottom:0;left:0; }
    
  </style>
</head>

<body>
  <svg width="960" height="500" id = "vis2"></svg>
<script>
  var svg = d3.select("#vis2"),
    margin = {top: 20, right: 80, bottom: 30, left: 60},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
var mins = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    cts = d3.scaleLinear().rangeRound([height, 0]);
  
  	var dmn = [-35,-34,-33,-32,-31,-30,-29,-28,-27,-26,-25,-24,-23,-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1];
  
  
    d3.csv("barData.csv", function(error, data) {
  		if (error) throw error;
        mins.domain(dmn);   
    	cts.domain([0,18]);
      
    g.append("g")
    	.attr("class", "axis axis--x")
    	.attr("transform", "translate(0," + height + ")")
    	.call(d3.axisBottom(mins)
            .tickFormat("")
           );
      
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(cts));
  
    // add the Y gridlines
 	  g.append("g")
    	.attr("class","gridlines y-gridlines")
   		.style("opacity",0.3)
      .call(d3.axisRight(cts)
          .ticks(7)
          .tickSize(width)
          .tickSizeOuter(0)
          .tickFormat("")
      );
      
    var bars = g.selectAll("bar").data(data).enter().append("rect")
    .attr("class", "bar")
    .attr("width", mins.bandwidth())
    .attr("fill", "red")
    .attr("x", function(d) {
      return mins(d.Minutes);
    })
    .attr("y", function(d) {
      return cts(d.Count);
    })
    .attr("height", function(d) {
      return height - cts(d.Count);
    });
      
    });
  </script>
</body>