window.onload = loadOneRoute;

function loadOneRoute() {
	var service = new google.maps.DirectionsService();
	var map = new google.maps.Map(document.getElementById('map'));

	axios.get(`http://localhost:3000/rutas/predefinidasjson/${window.selectedRoute}`).then((routeInfo) => {
		var stations = routeInfo.data.waypoints;

		// Zoom and center map automatically by stations (each station will be in visible map area)
		var lngs = stations.map((station) => {
			return station.lng;
		});
		var lats = stations.map((station) => {
			return station.lat;
		});

		// center route in the map
		map.fitBounds({
			west: Math.min.apply(null, lngs),
			east: Math.max.apply(null, lngs),
			north: Math.min.apply(null, lats),
			south: Math.max.apply(null, lats)
		});

		// Show stations on the map as markers
		for (var i = 0; i < stations.length; i++) {
			new google.maps.Marker({
				position: stations[i],
				map: map,
				title: stations[i].name
			});
		}

		// Divide route to several parts because max stations limit is 25 (23 waypoints + 1 origin + 1 destination)
		// Parts will be an array of two arrays: [[25 coordinates][3 coordinates]] (28 stations)
		for (var i = 0, parts = [], max = 25 - 1; i < stations.length; i = i + max)
			parts.push(stations.slice(i, i + max + 1));

		// Service callback to process service results
		var service_callback = function(response, status) {
			if (status != 'OK') {
				console.log('Directions request failed due to ' + status);
				return;
			}
			var renderer = new google.maps.DirectionsRenderer();
			renderer.setMap(map);
			renderer.setOptions({ suppressMarkers: true, preserveViewport: true });
			renderer.setDirections(response);
		};

		// Send requests to service to get route (for stations count <= 25 only one request will be sent)
		for (var i = 0; i < parts.length; i++) {
			// Waypoints does not include first station (origin) and last station (destination)
			var waypoints = [];
			//j recorre cada array, i marca el array en el que se encuentra
			for (var j = 1; j < parts[i].length - 1; j++) waypoints.push({ location: parts[i][j], stopover: false });
			// Service options
			var service_options = {
				origin: parts[i][0],
				destination: parts[i][parts[i].length - 1],
				waypoints: waypoints,
				travelMode: 'WALKING'
			};
			// Send request
			service.route(service_options, service_callback);
		}
	});
}
