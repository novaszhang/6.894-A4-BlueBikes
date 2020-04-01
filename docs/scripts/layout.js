var parentDiv = document.getElementById('slider-step');

var dataTime = d3.range(0, 24).map(function(d) {
    return new Date(2019, 0, 1, 0+d);
  });

var sliderStep = d3
  .sliderBottom()
  .min(d3.min(dataTime))
  .max(d3.max(dataTime))
  .width(parentDiv.clientWidth - 50)
  .tickFormat(d => customtimeFormat(d))
  .tickValues(dataTime)
  .ticks(24)
  .step(1000 * 60 * 60)
  .default(new Date('Jan 1, 2019 00:00:00'))
  .on('end', val => {
    sliderHandler(val);
  });
console.log("helloooo")
function customtimeFormat(date) {
  var formatHour = d3.timeFormat("%I")
      getHour = d3.timeFormat("%H")
  var data = getHour(date)
    return        data == 0 ?  "midnight"
                : data == 12 ? "12 noon"
                : data == 13 ? "1 pm"
                : data == 23 ? "11 pm"
                : formatHour(date);
}

function customtimeFormat_r(data) {
    return        data == "midnight" ? 0
                : data == "12 noon" ? 12
                : data == "1 pm" ? 13
                : data == "11 pm" ? 23
                : data;
}

var gStep = d3
  .select('div#slider-step')
  .append('svg')
  .attr('width', parentDiv.clientWidth)
  .attr('height', parentDiv.clientHeight-100)
  .append('g')
  .attr('transform', 'translate(30,10)');

gStep.call(sliderStep);

//This is how you get the value from slider - change to get input stuff
// d3.select('p#value-step').text(d3.format("")(sliderStep.value()));

function triggerHandler(slide,value){
  var hour = 0;
  if(slide==true){
    hour = value;
  }
  else{
    hour =  sliderStep.value()
  }

//set these with selection!
  var month = 1;
  var day = 2;

  var hour = parseInt(getHour(hour));
  var month = document.getElementById("month").value; //month input
  var day = document.getElementById("day").value; //day of week input
  var flow = document.getElementById("flowBtn").innerHTML; //incoming/outgoing
  var filename="";
  var color = "blue"
  if(flow=="Incoming"){
    filename="data/incoming_trips.csv";
    color = "#d6b018";
  }else{
    filename="data/outgoing_trips.csv"
    color = "#32a63b";
  }

  var data_array = {};
  d3.csv(filename, function(row){
    return {
      month:row.month,
      day:row.dow, 
      hour:row.hour,
      station_id:row.station,
      lon:row.lon,
      lat:row.lat,
      trips:row.trips,
      name:row.name
    };
  }).then(function(data){
   data_array = data;
   const arr1 = data_array.filter(d => d.month == month && d.day== day);
   const arr2 = arr1.filter(d => d.hour == hour);
//adjust circle size of each station in this for-loop
   remove_markers()
   if (Array.isArray(arr2) && arr2.length) {
      map_markers(arr2, color)
   }
  });
}

//Change from incoming to outgoing or vice versa
function clickFlow(){
  var currFlow = document.getElementById("flowBtn").innerHTML;
  var newFlow ="";
  if(currFlow == "Incoming"){
    newFlow="Outgoing";
    document.getElementById("flowBtn").className = "outgoing btn btn-primary btn-lg ";
  }else {
    newFlow="Incoming";
    document.getElementById("flowBtn").className = "incoming btn btn-primary btn-lg ";
  }
  document.getElementById("flowBtn").innerHTML=newFlow;
  triggerHandler(false,0);
}

function sliderHandler(value){
  triggerHandler(true,value); 
}




