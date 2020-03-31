var parentDiv = document.getElementById('slider-step');



var data = [];
for (var i = 0; i <= 23; i++) {
   data.push(i);
}

var dataTime = d3.range(0, 24).map(function(d) {
    return new Date(2019, 0, 1, 0+d);
  });
console.log(dataTime)

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
  .on('onchange', val => {
    //d3.select('p#value-time').text(customtimeFormat_r(val));
    sliderHandler(val);
  });

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


var end_data = d3.csv("data/end-station.csv")
var start_data = d3.csv("data/start-station.csv")


function triggerHandler(slide,value){
  var hour = 0;
  if(slide==true){
    hour = value;
  }
  else{
    hour =  sliderStep.value()
  }
  var hour = getHour(hour)
  var month = document.getElementById("month").value; //month input
  var day = document.getElementById("day").value; //day of week input
  var flow = document.getElementById("flowBtn").innerHTML; //incoming/outgoing
  var filename="";
  if(flow=="Incoming"){
    filename="data/incoming_trips.csv";
  }else{
    filename="data/outgoing_trips.csv";
  }
  console.log(day)
  console.log(month)
  console.log(filename)
  console.log(hour)

  //fetching data
  //$.get(filename, function(CSVdata) {
  //  
  //})

}

//Change from incoming to outgoing or vice versa
function clickFlow(){
  var currFlow = document.getElementById("flowBtn").innerHTML;
  var newFlow ="";
  if(currFlow == "Incoming"){
    newFlow="Outgoing";
  }else {
    newFlow="Incoming"
  }
  document.getElementById("flowBtn").innerHTML=newFlow;
  triggerHandler(false,0);
}

function sliderHandler(value){
  triggerHandler(true,value); 
}
