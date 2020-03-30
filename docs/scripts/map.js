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


  var sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'left'
        });

  //Add circle markers to map
  //tool-tip w/ station name
  //Animated icon
  $.get( "data/station_info.csv", function(CSVdata) {
     // CSVdata is populated with the file contents
      var station_info = $.csv.toObjects(CSVdata);
      console.log(station_info)

      var markers = L.markerClusterGroup();

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

        marker.on('click', function(e) {
          
          //map.removeControl(sidebar);
          var content = "Bike station: " + station_info[i].station_name.bold();
          sidebar.setContent(content)
          //map.addControl(sidebar);
          sidebar.toggle();
        })

        markers.addLayer(marker);
        marker.addTo(map);
      }
      map.addLayer(markers);
    });
    map.addControl(sidebar);


