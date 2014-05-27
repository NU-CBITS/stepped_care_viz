var m = [50, 50, 50, 50]; // margins
var w = 400 - m[1] - m[3]; // width
var h = 350 - m[0] - m[2]; // height

function getDate(d) {
    return new Date(d.date);
}

var minDate = getDate(itemList[0]),
    maxDate = getDate(itemList[itemList.length-1]);
var xLine = d3.time.scale()
    .domain([minDate, maxDate]).range([0, w]);
xLine.tickFormat(d3.time.format("%m-%d"));
var yLine = d3.scale.linear().domain([0, 10]).range([h, 0]);

// grab data for the line
var line = d3.svg.line()
 .x(function(d) {
	return xLine(getDate(d)); 
 })
 .y(function(d) {
   return yLine(d.x);
 });

// add an SVG element with the desired dimensions and margin.
var graph = d3.select("#chart").append("svg:svg")
  .attr("width", w + m[1] + m[3])
  .attr("height", h + m[0] + m[2])
  .append("svg:g")
  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

// create x axis
var xAxis = d3.svg.axis().scale(xLine).tickSize(-h).ticks(4);

graph.append("svg:g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis);


// create y axis
var yAxisLeft = d3.svg.axis().scale(yLine).ticks(4).orient("left");

graph.append("svg:g")
  .attr("class", "y axis")
  .attr("transform", "translate(-25,0)")
  .call(yAxisLeft);

// create clip for zoom/pan

var clip = graph.append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attr("id", "clip-rect")
  .attr("x", "0")
  .attr("y", "0")
  .attr("width", w)
  .attr("height", h);


function drawLine() {
  graph.selectAll(".path").remove(); //remove previous line
  var path = graph.append("svg:path").attr("class","path").attr("clip-path", "url(#clip)").attr("d", line(itemList)); //redraw new line
};

// initialize line drawing
drawLine();
