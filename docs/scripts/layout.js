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
    d3.select('p#value-time').text(d3.timeFormat("%H")(val));
    //sliderHandler(val);
  });

function customtimeFormat(date) {
  var formatHour = d3.timeFormat("%I")
      getHour = d3.timeFormat("%H")
  var data = getHour(date)
    return        data == 0 ?  "12 am"
                : data == 12 ? "12 noon"
                : data == 13 ? "1 pm"
                : data == 23 ? "11 pm"
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
    hour = sliderStep.value();
  }
  // var date = document.getElementById("dateSelect").value;
  // var month = date.substring(5,7);
  // var day = date.substring(8,10);

  var month = 1;
  var day = 2;
  var hour = 14;
  var flow = document.getElementById("flowBtn").innerHTML;
  var filename="";
  if(flow=="Incoming"){
    filename="data/end-station.csv";
  }else{
    filename="data/start-station.csv";
  }
  // console.log(day)
  console.log(filename)

  //fetching data
  var data_array = {};
  d3.csv(filename, function(row){
    return {month:row.month, dow:row.dow, hour:row.hour, numTrips:row.num_trips};
  }).then(function(data){
   data_array = data;
   // const filterTime = ;
   const arr1 = data_array.filter(d => d.month == month && d.dow == day);
   const arr2 = arr1.filter(d => d.hour == hour);

   console.log(arr2)
  });


  
  // console.log(filtered);

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


/*
var customTimeFormat = timeFormat([
  ["1:00 am", function () { return true; }],
  ["2:00", function (d) { return 1 <= d.getHours() && d.getHours() < 2; }],
  ["3:00", function (d) { return 2 <= d.getHours() && d.getHours() < 3; }],

  ["4:00", function (d) { return 3 <= d.getHours() && d.getHours() < 4; }],
  ["5:00", function (d) { return 4 <= d.getHours() && d.getHours() < 5; }],

  ["6:00", function (d) { return 5 <= d.getHours() && d.getHours() < 6; }],
  ["7:00", function (d) { return 6 <= d.getHours() && d.getHours() < 7; }],

  ["8:00", function (d) { return 7 <= d.getHours() && d.getHours() < 8; }],
  ["9:00", function (d) { return 8 <= d.getHours() && d.getHours() < 9; }],

  ["10:00", function (d) { return 9 <= d.getHours() && d.getHours() < 10; }],
  ["11:00", function (d) { return 10 <= d.getHours() && d.getHours() < 11; }],

  ["12 noon", function (d) { return 11 <= d.getHours() && d.getHours() < 12; }],
  ["1:00 pm", function (d) { return 12 <= d.getHours() && d.getHours() < 13; }],

  ["2:00", function (d) { return 13 <= d.getHours() && d.getHours() < 14; }],
  ["3:00", function (d) { return 14 <= d.getHours() && d.getHours() < 15; }],

  ["4:00", function (d) { return 15 <= d.getHours() && d.getHours() < 16; }],
  ["5:00", function (d) { return 16 <= d.getHours() && d.getHours() < 17; }],

  ["6:00", function (d) { return 17 <= d.getHours() && d.getHours() < 18; }],
  ["7:00", function (d) { return 18 <= d.getHours() && d.getHours() < 19; }],

  ["8:00", function (d) { return 19 <= d.getHours() && d.getHours() < 20; }],
  ["9:00", function (d) { return 20 <= d.getHours() && d.getHours() < 21; }],

  ["10:00", function (d) { return 21 <= d.getHours() && d.getHours() < 22; }],
  ["11:00 pm", function (d) { return 22 <= d.getHours() && d.getHours() <== 23; }],

]); */

