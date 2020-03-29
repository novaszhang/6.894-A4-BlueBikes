/* Map */

// initialize the map
  var map = L
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
  L.svg().addTo(map); //Needed for bubblemap
  var svg = d3 //Needed for tooltip
    .select("#map")
    .append("svg")

  $.get( "data/station_info.csv", function(CSVdata) {
     // CSVdata is populated with the file contents
      var station_info = $.csv.toObjects(CSVdata);
      console.log(station_info)

// Select the svg area and add circles:
d3.select("#map")
  .select("svg")
  .selectAll("myCircles")
  .data(station_info)
  .enter()
  .append("circle")
    .attr("id", "circleCustomTooltip")
    .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).x })
    .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).y })
    .attr("r", 7)
    .style("fill", "red")
    .attr("stroke", "red")
    .attr("stroke-width", 1)
    .attr("fill-opacity", .4)

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
/* var mouseover = function(d) {
  Tooltip
    .transition()
    .duration(200)
  Tooltip
    .style("opacity", 1)
    .html(d.station_name + "<br>")
    .style("left", (d3.mouse(this)[0]+10) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
}
var mousemove = function(d) {
  Tooltip
    .style("left", (d3.mouse(this)[0]+10) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
}
var mouseleave = function(d) {
  Tooltip
    .transition()
    .duration(200)
    .style("opacity", 0)
}

// create a tooltip
var Tooltip = d3.select("#map") //body not working
  .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absolute")


d3.select("#circleCustomTooltip")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

 */ 
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

// load GeoJSON from an external file
/*  $.getJSON("data/map.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded

    var geojsonMarkerOptions = {
      radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
  });*/