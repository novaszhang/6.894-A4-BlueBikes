var parentDiv = document.getElementById('slider-step');

var data = [];

for (var i = 0; i <= 23; i++) {
   data.push(i);
}

var sliderStep = d3
  .sliderBottom()
  .min(d3.min(data))
  .max(d3.max(data))
  .width(parentDiv.clientWidth-50)
  .tickFormat(d3.format(""))
  .ticks(24)
  .step(1)
  .default(0)
  .on('onchange', val => {
    d3.select('p#value-step').text(d3.format("")(val));
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
d3.select('p#value-step').text(d3.format("")(sliderStep.value()));
