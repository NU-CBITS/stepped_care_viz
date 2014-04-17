var width = 480,
    height = 480,
    dotRadius = 10,
    gridSpacing = 10;
 
var svg = d3.select("#bubble").append("svg")
    .attr("width",width)
    .attr("height",height);
 
//Scales for item positions
var x = d3.scale.linear().domain([0,10]).range([0,width]);
var y = d3.scale.linear().domain([0,10]).range([height,0]);
 
//x axis
svg.append("path")
  .attr("class","axis")
  .attr("d","M0,"+height/2+" L"+width+","+height/2);
 
//y axis
svg.append("path")
  .attr("class","axis")
  .attr("d","M"+width/2+",0 L"+width/2+","+height);

//x coordinate correlates to positive/negative feeling. 
//y coordinate correlates to passive/active
//radius correlates to frequency
//need date or some kind of order for the slider to be able to filter data



var itemList = [
  {
    x: 5, //mood from 1-10, 1 being negative, 10 being positive
    y: 1, //activity from 1-10, 1 being passive, 10 being active
    r: 20, //frequency of word mentioned
    date: 2014-2-4, //date of entry
    description: "Passive, neutral" //string e.g. angry, calm, happy
  },
  {
    x: 8,
    y: 5,
    r: 10,
    description: "neutral, positive"
  },
  {
    x: 3,
    y: 7,
    r: 7,
    description: "active, negative"
  },
  {
    x: 9,
    y: 2,
    r: 2,
    description: "passive, positive"
  }];


 
//One group per item
var items = svg.selectAll("g.item").data(itemList).enter().append("g")
  .attr("class","item");
 
//dots
items.append("circle")
  .attr("r", function(d){
  	return d.r;
  })
  .attr("cx",function(d){
    return x(d.x);
  })
  .attr("cy",function(d){
    return y(d.y);
  });
 
//labels
items.append("text")
  .attr("x",function(d){
    return x(d.x);
  })
  .attr("y",function(d){
    return y(d.y);
  })
  .attr("dy","1.25em")
  .attr("text-anchor","middle")
  .text(function(d){return d.description;});

$("#slider2").dateRangeSlider();