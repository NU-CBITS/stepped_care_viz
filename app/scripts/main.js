/*var m = [80, 80, 80, 80]; // margins
var w = 1000 - m[1] - m[3]; // width
var h = 400 - m[0] - m[2]; // height

var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5];
var startTime = new Date(1394773200000);
var endTime = new Date(1395637200000);
var timeStep = 8.64e+7;

var x = d3.time.scale().domain([startTime, endTime]).range([0, w]);
x.tickFormat(d3.time.format("%m-%d"));
var y = d3.scale.linear().domain([0, 10]).range([h, 0]);

// automatically determining max range can work something like this
// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

var line = d3.svg.line()
 .x(function(d,i) {
	return x(startTime.getTime() + (timeStep*i)); 
 })
 .y(function(d) {
   return y(d);
 });



// Add an SVG element with the desired dimensions and margin.
var graph = d3.select("#chart").append("svg:svg")
.attr("width", w + m[1] + m[3])
.attr("height", h + m[0] + m[2])
.append("svg:g")
.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

// create yAxis
var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
// Add the x-axis.
graph.append("svg:g")
.attr("class", "x axis")
.attr("transform", "translate(0," + h + ")")
.call(xAxis);


// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
// Add the y-axis to the left
graph.append("svg:g")
.attr("class", "y axis")
.attr("transform", "translate(-25,0)")
.call(yAxisLeft);


var clip = graph.append("defs").append("svg:clipPath")
.attr("id", "clip")
.append("svg:rect")
.attr("id", "clip-rect")
.attr("x", "0")
.attr("y", "0")
.attr("width", w)
.attr("height", h);

  
  // Add the line by appending an svg:path element with the data line we created above
  // do this AFTER the axes above so that the line is above the tick-lines
var path = graph.append("svg:path").attr("class","path").attr("clip-path", "url(#clip)").attr("d", line(data));

$(function() {
	$("#slider").slider({
		range: true,
		min: 1394773200000,
		max: 1395637200000,
		values: [startTime,endTime],
		slide: function( event, ui ) {
		var maxv = d3.min([ui.values[1], endTime]);
		var minv = d3.max([ui.values[0], ui.values[0]]);

		x.domain([minv, maxv-1]);
		graph.transition().duration(750)
		  .select(".x.axis").call(xAxis);
		graph.transition().duration(750)
		  .select(".path").attr("d", line(data));
	}});
});

$("#slider").prepend("<label class='left'>March 14</label>").append("<label class='right'>March 23</label>");
*/