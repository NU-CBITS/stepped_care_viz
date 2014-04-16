//Options
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
 
//gridlines
/*svg.append("path")
  .attr("class","grid")
  .attr("d",function() {
    var d = "";
 
    for (var i = gridSpacing; i < width; i += gridSpacing ) {
      d += "M"+i+",0 L"+i+","+height;
    }
 
    for (var i = gridSpacing; i < height; i += gridSpacing ) {
      d += "M0,"+i+" L"+width+","+i;
    }
 
    return d;
  })*/
 
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



var itemList = [
  {
    x: 5,
    y: 1,
    r: 20,
    description: "Passive, neutral"
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
 
//Add a dot
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
 
//Add a label
//would need to use .getBBox() to make sure this doesn't hit the sides
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