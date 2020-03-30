/* Map */

// initialize the map
  var map = new L
    .map('map')
    .setView([42.35, -71.08], 13); // center position + zoom

  // load a tile layer
  L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
    {
      attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
      maxZoom: 17,
      minZoom: 9
    }).addTo(map);

  // bike lanes
  L.tileLayer('http://tiles.mapc.org/trailmap-onroad/{z}/{x}/{y}.png',
  {
    maxZoom: 17,
    minZoom: 9
    }).addTo(map); 

  // Add a svg layer to the map
  L.svg().addTo(map); 

  //May need translate + transform
  // append the svg object to the body of the page
  var svg = d3
    .select(map.getPanes().overlayPane)
    .append("svg")

  var g = svg
    .append("g")
    .attr("class", "leaflet-zoom-hide");

  d3.json("data/station_info.json", function(error, collection) {
    if (error) throw error;

    var transform = d3
      .geo
      .transform({point: projectPoint}),
      path = d3.geo.path().projection(tranform);

    map.on("viewreset", reset);
    reset;

  // Reposition the SVG to cover the features.
  function reset() {
    var bounds = path.bounds(collection),
        topLeft = bounds[0],
        bottomRight = bounds[1];

    svg .attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");

    g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    feature.attr("d", path);
  }

  // Use Leaflet to implement a D3 geometric transformation.
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }
});
/*
  $.get( "data/station_info.csv", function(CSVdata) {
     // CSVdata is populated with the file contents
      var station_info = $.csv.toObjects(CSVdata);
      console.log(station_info)

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3
    .select("#map")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")
      .style("position", "absolute")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Location: " + d.station_name)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

// Select the svg area and add circles:
svg // may be an issue
  .selectAll("circle")
  .data(station_info)
  .enter()
  .append("circle")
    .attr("class", "bubbles")
    .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).x })
    .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).y })
    .attr("r", 7)
    .style("fill", "red")
    .attr("stroke", "red")
    .attr("stroke-width", 1)
    .attr("fill-opacity", .4)
  .on("mouseover", showTooltip )
  .on("mousemove", moveTooltip )
  .on("mouseleave", hideTooltip )

// Function that update circle position if something change
function update() {
  d3.selectAll("circle")
    .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).x })
    .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).y })
}

// If the user change the map (zoom or drag), I update circle position:
map.on("moveend", update)

});
//Filter data

// Three function that change the tooltip when user hover / move / leave a cell
/*
d3.csv("data/start-station.csv", function(data) {
  console.log(data);
});
*/
/*
  // load GeoJSON from an external file
  $.getJSON("data/map.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
    L.geoJson(data).addTo(map);
  });
*/