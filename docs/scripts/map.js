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

  //Add circle markers to map
  //tool-tip w/ station name

  //Animated icon
  $.get( "data/station_info.csv", function(CSVdata) {
     // CSVdata is populated with the file contents
      var station_info = $.csv.toObjects(CSVdata);
      console.log(station_info)

      var markers = L.markerClusterGroup();

      for (var i = 0; i < station_info.length; i++) {

        var MarkerOptions = {
          radius: 4,
          fillColor: "#0163FF",
          color: "#0163FF",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.4,
        }

        var MarkerOptions_clicked = {
          radius: 4,
          fillColor: "#0163FF",
          color: "#0163FF",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.4,
        }
      
        marker = new L
        .circleMarker([station_info[i].lat,station_info[i].lon], {
          radius: 5, //use value
          color: "#FA8072", //use value
          className: 'circle-transition'
        });

        marker.bindTooltip(station_info[i].station_name);

        marker.on('mouseover', function(e) {
          this.openPopup();
        })

        marker.on('mouseout', function(e) {
          this.closePopup();
        })

        //Show usage stats?
        //marker.on('click', function(e) {
        //  //this.
        //})

        markers.addLayer(marker);
        marker.addTo(map);
      }
      map.addLayer(markers);
    });
