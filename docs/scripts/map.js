// Initialize SVG
var pi = Math.PI,
    tau = 2 * pi;

var width = window.innerWidth,
    height = window.innerHeight;

// Initialize the projection to fit the world in a 1×1 square centered at the origin.
var projection = d3.geoAlbers()
    .scale(1/tau)
    .rotate([71.08, 0])
    .center([0, 42.35])
    .translate([width/2, height/2]);

var path = d3.geoPath()
    .projection(projection);

var tile = d3.tile()
    .size([width, height]);

var zoom = d3.zoom()
    //.scaleExtent([1 << 11, 1 << 14])
    .on("zoom", zoomed);

var svg = d3
  .select("body")
  .select("svg")
  .attr("width", width)
  .attr("height", height);

var raster = svg.append("g");

svg
  .call(zoom)
  .call(zoom.transform, d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(1 << 12));

function zoomed() {
  var transform = d3.event.transform;

  var tiles = tile
      .scale(transform.k)
      .translate([transform.x, transform.y])
      ();

  projection
      .scale(transform.k/tau)
      .translate([transform.x, transform.y]);

  //vector.attr("d", path);

  var image = raster
      .attr("transform", stringify(tiles.scale, tiles.translate))
    .selectAll("image")
    .data(tiles, function(d) { return d; });

  image.exit().remove();

  image.enter().append("image")
      .attr("xlink:href", function(d) { return "http://" + "abc"[d[1] % 3] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
      .attr("x", function(d) { return d[0] * 256; })
      .attr("y", function(d) { return d[1] * 256; })
      .attr("width", 256)
      .attr("height", 256);
}

function stringify(scale, translate) {
  var k = scale / 256, r = scale % 1 ? Number : Math.round;
  return "translate(" + r(translate[0] * scale) + "," + r(translate[1] * scale) + ") scale(" + k + ")";
}

$.get( "data/station_info.csv", function(CSVdata) {
    // CSVdata is populated with the file contents
    var stations = $.csv.toObjects(CSVdata);
    console.log(stations)

    svg .append("g")
        .selectAll("circle")
        .data(stations)
        .enter()
        .append("circle")
        .attr("class", "circles")
        .attr("cx", function(d){ return projection([d.lon, d.lat])[0];})
        .attr("cy", function(d){ return projection([d.lon, d.lat])[1];})
        .attr("r", 7)
        .style("fill", "red")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("fill-opacity", .4)

    // add labels
    svg.selectAll("text")
        .data(stations)
        .enter()
        .append("text")
        .text(function(d) {
            return d.name;
            })
        .attr("x", function(d) {return projection([d.lon, d.lat])[0] + 5;})
        .attr("y", function(d) {return projection([d.lon, d.lat])[1] + 15;})
        .attr("class","labels");
});
