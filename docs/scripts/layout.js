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
  .width(parentDiv.clientWidth-50)
  .tickFormat(d3.timeFormat("%H"))
  .tickValues(dataTime)
  .ticks(24)
  .step(60 * 60)
  .default(new Date('Jan 1, 2019 00:00:00'))
  .on('onchange', val => {
    d3.select('p#value-time').text(d3.timeFormat("%H")(val));
    //sliderHandler(val);
  });

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
  var date = document.getElementById("dateSelect").value;
  var month = date.substring(5,7);
  var day = date.substring(8,10);
  var flow = document.getElementById("flowBtn").innerHTML;
  var filename="";
  if(flow=="Incoming"){
    filename="data/end-station.csv";
  }else{
    filename="data/start-station.csv";
  }
  console.log(day)
  console.log(filename)

  //fetching data
  $.get(filename, function(CSVdata) {
    
  })

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
