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
//redraw line
$("#slider").bind("valuesChanging", function(e, itemList){
  x.domain([itemList.values.min, itemList.values.max]);
  graph.transition().duration(0)
    .select(".x.axis").call(xAxis);
  drawLine();
  items.filter(function(d) {
  	console.log('debug');
    return new Date(d.date) > (itemList.values.min);
  	});
  drawBubbles();
});

