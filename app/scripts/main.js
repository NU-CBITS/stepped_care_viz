var m = [80, 80, 80, 80]; // margins
var w = 1000 - m[1] - m[3]; // width
var h = 400 - m[0] - m[2]; // height

var data = [
  {
    x: 5, //mood from 1-10, 1 being negative, 10 being positive
    y: 1, //activity from 1-10, 1 being passive, 10 being active
    r: 20, //frequency of word mentioned
    date: "March 13, 2014", //date of entry
    description: "Passive, neutral" //string e.g. angry, calm, happy
  },
  {
    x: 8,
    y: 5,
    r: 10,
    date: "March 14, 2014",
    description: "neutral, positive"
  },
  {
    x: 3,
    y: 7,
    r: 7,
    date: "March 15, 2014",
    description: "active, negative"
  },
  {
    x: 9,
    y: 2,
    r: 2,
    date: "March 16, 2014",
    description: "passive, positive"
  },
  {
    x: 3,
    y: 2,
    r: 2,
    date: "March 17, 2014",
    description: "passive, positive"
  },
  {
    x: 6,
    y: 2,
    r: 2,
    date: "March 18, 2014",
    description: "passive, positive"
  },
  {
    x: 10,
    y: 2,
    r: 2,
    date: "March 19, 2014",
    description: "passive, positive"
  }];

function getDate(d) {
    return new Date(d.date);
}

var minDate = getDate(data[0]),
    maxDate = getDate(data[data.length-1]);
var x = d3.time.scale()
    .domain([minDate, maxDate]).range([0, w]);
x.tickFormat(d3.time.format("%m-%d"));
var y = d3.scale.linear().domain([0, 10]).range([h, 0]);


var line = d3.svg.line()
 .x(function(d) {
	return x(new Date(d.date)); 
 })
 .y(function(d) {
   return y(d.x);
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


var path = graph.append("svg:path").attr("class","path").attr("clip-path", "url(#clip)").attr("d", line(data));

$("#slider").dateRangeSlider({
    defaultValues:{
      min: minDate,
      max: getDate(data[data.length-2])
    },
    bounds:{
      min: minDate,
      max: maxDate
    }
});

$("#slider").bind("valuesChanging", function(e, data){
 console.log("Something moved. min: " + data.values.min + " max: " + data.values.max);
  x.domain([data.values.min, data.values.max]);
  graph.transition().duration(750)
    .select(".x.axis").call(xAxis);
    path.selectAll(".path").attr("d", line(data)); //can't get the line to redraw to scale
});

