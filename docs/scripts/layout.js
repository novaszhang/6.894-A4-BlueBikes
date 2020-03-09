// My own range slider
// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value;

// slider.oninput = function() {
//   output.innerHTML = this.value;
// }
var data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];

var sliderRange = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(100)
    .tickFormat(d3.format('.2%'))
    .ticks(5)
    .default([0.015, 0.02])
    .fill('#2196f3')
    .on('onchange', val => {
      d3.select('p#value-range').text(val.map(d3.format('.2%')).join('-'));
    });

  var gRange = d3
    .select('div#slider-range')
    .append('svg')
    .attr('width', "100%")
    .attr('height', "100%")
    .append('g')
    .attr('transform', 'translate(30,30)');

  gRange.call(sliderRange);

  d3.select('p#value-range').text(
    sliderRange
      .value()
      .map(d3.format('.2%'))
      .join('-')
  );

