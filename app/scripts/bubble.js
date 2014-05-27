var width = 300,
    height = 300,
    gridSpacing = 10;
 
var svg = d3.select("#bubble").append("svg")
    .attr("width",width)
    .attr("height",height);
 
//Scales for item positions
var xBubble = d3.scale.linear().domain([0,10]).range([0,width]);
var yBubble = d3.scale.linear().domain([0,10]).range([height,0]);
 
//x axis
svg.append("path")
  .attr("class","axis")
  .attr("d","M0,"+height/2+" L"+width+","+height/2);
 
//y axis
svg.append("path")
  .attr("class","axis")
  .attr("d","M"+width/2+",0 L"+width/2+","+height);

//Color scale attributes each color to the first points in the Item List.
//Eventually should change these to gradient against axes.
var colorScale = d3.scale.ordinal().range(["red", "yellow", "blue", "green", "teal"]);

//x coordinate correlates to positive/negative feeling. 
//y coordinate correlates to passive/active
//radius correlates to frequency
//need date or some kind of order for the slider to be able to filter data
var itemList = [
  {
    x: 5, //mood from 1-10, 1 being negative, 10 being positive
    y: 1, //activity from 1-10, 1 being passive, 10 being active
    r: 20, //frequency of word mentioned
    date: "March 13, 2014", //date of entry
    description: "neutral, positive" //string e.g. angry, calm, happy
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
    description: "active, positive"
  },
  {
    x: 3,
    y: 2,
    r: 3,
    date: "March 17, 2014",
    description: "passive, positive"
  },
  {
    x: 6,
    y: 2,
    r: 8,
    date: "March 18, 2014",
    description: "passive, positive"
  },
  {
    x: 7,
    y: 8,
    r: 5,
    date: "March 19, 2014",
    description: "neutral, negative"
  }];

//create items from data
var items = svg.selectAll("g.item").data(itemList).enter().append("g")
  .attr("class","item");;

function drawBubbles(bubbleItems) {
  //remove previous bubbles
  svg.selectAll("g.item").remove();

  //(re)initialize bubbles
  var items = svg.selectAll("g").data(bubbleItems);

  items.enter().append("g")
  .attr("class","item");
  //dots
  items.append("circle")
    .attr("r", function(d){
    	return d.r;
    })
    .attr("cx",function(d){
      return xBubble(d.x);
    })
    .attr("cy",function(d){
      return yBubble(d.y);
    })
    .style("fill", function(d) {
      return colorScale(d.description);
    })
    .style("stroke-width", "2px")
    .style("stroke", "black")
    .style("opacity",".75");
    
  //labels

  items.append("text")
    .attr("x",function(d){
      return xBubble(d.x);
    })
    .attr("y",function(d){
      return yBubble(d.y);
    })
    .attr("dy","1.25em")
    .attr("text-anchor","middle")
    .text(function(d){return d.description;});
};

//initial bubbles with original data array
drawBubbles(itemList);
