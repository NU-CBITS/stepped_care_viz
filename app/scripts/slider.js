$("#slider").dateRangeSlider({
    defaultValues:{
      min: minDate,
      max: getDate(itemList[itemList.length-2])
    },
    bounds:{
      min: minDate,
      max: maxDate
    }
});
//set date range bounds
var minFilterDate;
var maxFilterDate;

$("#slider").on("valuesChanging", function(e, itemList){
  minFilterDate = itemList.values.min;
  maxFilterDate = itemList.values.max;
  xLine.domain([itemList.values.min, itemList.values.max]);
  graph.transition().duration(0)
    .select(".x.axis").call(xAxis);
  drawLine();
});

//filter array of date range
var filteredItems;

function dateRangeFilter() {
  filteredItems = [];
  for (i = 0; i < itemList.length; i++) {
    if(getDate(itemList[i]) >= new Date(minFilterDate) && getDate(itemList[i]) <= new Date(maxFilterDate)) {
      filteredItems.push(itemList[i]);
    }
  }
}
//redraw bubble
$("#slider").bind("valuesChanged", function() {
    dateRangeFilter();
    items.data(filteredItems);
    console.log(filteredItems);
    drawBubbles();
});
