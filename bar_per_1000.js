    var svg2 = d3.select("#vis2"),
    margin = {top: 20, right: 80, bottom: 60, left: 60},
    width = svg2.attr("width") - margin.left - margin.right,
    height = svg2.attr("height") - margin.top - margin.bottom,
    g2 = svg2.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  	var battalions = ["B02","B03","B01","B04","B10","B09","B08","B05","B06","B07","B99"];
 
  	var bats = d3.scaleBand().domain(battalions).rangeRound([0, width])
    .paddingInner(0.1).paddingOuter(0.05);
    act = d3.scaleLinear().domain([0,9]).rangeRound([height, 0]).nice();
  
  	var color = d3.scaleSequential(d3.interpolateBlues).domain([251,5161]);
  
    d3.csv("secondBar.csv", function(error, data) {
  		if (error) throw error;
      
    g2.append("g")
    	.attr("class", "axis axis--x")
    	.attr("transform", "translate(0," + height + ")")
    	.call(d3.axisBottom(bats)
           );
      
    g2.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(act));
  
    // add the Y gridlines
 	  g2.append("g")
    	.attr("class","gridlines y-gridlines")
    	.style("opacity",0.3)
      .call(d3.axisRight(act)
          .ticks(7)
          .tickSize(width)
          .tickSizeOuter(0)
          .tickFormat("")
      );
      
      //title
    g2.append("text")
    	.attr("transform","translate(-25,350) rotate(-90)")
    	.text("Negative Times Recorded per 1000 Calls");
      
      //legend
      var l_x = 695, l_y = 450, l_w = 100, l_h = 22;
      g2.append("rect")
      	.attr("transform","translate("+ (l_x-1) +","+(l_y-1)+")")
      	.attr("width",l_w + 2)
      	.attr("height",l_h + 2)
      	.attr("fill","black")
      
      g2.append("rect")
      	.attr("transform","translate("+l_x+ "," + l_y + ")")
      	.attr("width", l_w)
          .attr("height", l_h)
          .style("fill", "url(#gradient)");
      
      g2.append("text")
      	.attr("transform","translate(" + (l_x-35) + "," + (l_y+16) + ")")
      	.text("251");
      
      g2.append("text")
      	.attr("transform","translate(" + (l_x + l_w + 6) + "," + (l_y+16) + ")")
      	.text("5161");
      
      var gradient = svg2.append("defs")
        .append("linearGradient")
          .attr("id", "gradient")
          .attr("x1", "100%")
          .attr("y1", "0%")
          .attr("x2", "0%")
          .attr("y2", "0%")
          .attr("spreadMethod", "pad");

      gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "#2800cc")
          .attr("stop-opacity", 1);

      gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#ffffff")
          .attr("stop-opacity", 1);
      
      g2.append("text")
      	.style("font-size","12px")
      	.attr("transform","translate(" + (l_x + 25) + "," + (l_y - 3) + ")")
      	.text("Total Calls");
      
      g2.append("line")
        .attr("stroke","mediumblue")
        .attr("stroke-width","2px")
        .attr("x1",700)
        .attr("x2",635)
        .attr("y1",act(5.65))
        .attr("y2",act(3.53));
      
      var x_off = 670, y_off = 91;
      
      g2.append("text")
      	.style("fill","mediumblue")
      	.style("font-size","60px")
      	.attr("transform","translate("+(x_off + 5)+","+y_off+")")
      	.text("0.35%");
      
      g2.append("text")
      	.style("fill","mediumblue")
      	.style("font-size","40px")
      	.attr("transform","translate("+x_off+","+(y_off + 33)+")")
      	.text("of all calls");
      
      g2.append("text")
      	.style("fill","mediumblue")
      	.style("font-size","30px")
      	.attr("transform","translate("+(x_off + 15)+","+(y_off + 57)+")")
      	.text("had negative");
      
      g2.append("text")
      	.style("fill","mediumblue")
      	.style("font-size","30px")
      	.attr("transform","translate("+(x_off + 50)+","+(y_off + 80)+")")
      	.text("times");
      
      g2.append("text")
      	.attr("transform","translate(375,460)")
      	.text("Battalion");
          
      
    var bars = g2.selectAll("bar").data(data).enter().append("rect")
    .attr("class", "bar")
    .attr("width", bats.bandwidth())
    .attr("stroke","grey")
    .attr("fill", function(d) {
      return color(d.Activity);
    })
    .attr("x", function(d) {
      return bats(d.Battalion);
    })
    .attr("y", function(d) {
      return act(d.Rate);
    })
    .attr("height", function(d) {
      return height - act(d.Rate);
    });
      
      g2.append("line")
        .attr("stroke","red")
        .attr("stroke-width","2px")
        .attr("x1",0)
        .attr("x2",width)
        .attr("y1",act(3.53))
        .attr("y2",act(3.53));
      
    });