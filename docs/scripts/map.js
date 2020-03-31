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

//For marker layers & cluster
var marker_group = new L.LayerGroup();
var cluster = L.markerClusterGroup();

/* Map */

 //Add circle markers to map
  //tool-tip w/ station name
  //Animated icon
  /*$.get( "data/station_info.csv", function(CSVdata) {
     // CSVdata is populated with the file contents
      var station_info = $.csv.toObjects(CSVdata);

      for (var i = 0; i < station_info.length; i++) {
      
        marker = new L
        .circleMarker([station_info[i].lat,station_info[i].lon], {
          radius: 7, //use value
          color: "#FA8072", //use value
          className: 'circle-transition',
          opacity: 1,
          fillOpacity: 0.4,
        });

        marker.bindTooltip(station_info[i].station_name);

        marker.on('mouseover', function(e) {
          this.openPopup();
        })

        marker.on('mouseout', function(e) {
          this.closePopup();
        })

        cluster.addLayer(marker);
        marker_group.addLayer(marker);
      }
      cluster.addTo(map);
      marker_group.addTo(map)
    });*/

    //Remove markers and clusters and resets their layers
    function remove_markers(){
      marker_group.remove()
      cluster.remove()

      marker_group.clearLayers()
      cluster.clearLayers()
    }

    function map_markers(station_info, color){
      for (var i = 0; i < station_info.length; i++) {
        radius = Math.min(45,Math.max(5, 10 * Math.log(parseInt(station_info[i].trips))))
        marker = new L
        .circleMarker([station_info[i].lat,station_info[i].lon], {
          radius: radius, //use value
          color: color, //use value
          className: 'circle-transition',
          opacity: 1,
          fillOpacity: 0.4,
        });
        marker.bindTooltip(station_info[i].name + ": " + station_info[i].trips);

        marker.on('mouseover', function(e) {
          this.openPopup();
        })

        marker.on('mouseout', function(e) {
          this.closePopup();
        })

        cluster.addLayer(marker);
        marker_group.addLayer(marker);
      }
      cluster.addTo(map);
      marker_group.addTo(map)
    }
