var waypts = [];

document.getElementById('visualizeRoute').onclick = visualRoute;

// const server = `http://localhost:3000`

// function showMarkers() {
// 	axios.get(`${server}//predefinidas/:id/`).then((waypoints) => {
// 			route.data.forEach((waypoints) => {
// 		if (airport.coords === undefined || airport.coords.coordinates === undefined) return
// 		if (typeof airport.coords.coordinates[0] === "number" && typeof airport.coords.coordinates[1] === "number") {
// 				new google.maps.Marker({
// 						map: theMap,
// 						position: {
// 								lat: airport.coords.coordinates[1],
// 								lng: airport.coords.coordinates[0]
// 						},
// 						title: airport.name
// 				})
// 		}
// })
// 	})
// }

function visualRoute() {
	var service = new google.maps.DirectionsService();
	var map = new google.maps.Map(document.getElementById('map'));

	// list of points
	var stations = [
		{ lat: 28.059552, lng: -15.547752, name: 'Station 1' },
		{ lat: 28.059523, lng: -15.547698, name: 'Station 2' },
		{ lat: 28.059578, lng: -15.547656, name: 'Station 3' },
		{ lat: 28.059575, lng: -15.547657, name: 'Station 4' },
		{ lat: 28.059577, lng: -15.547655, name: 'Station 5' },
		{ lat: 28.059591, lng: -15.54764, name: 'Station 6' },
		{ lat: 28.059619, lng: -15.547668, name: 'Station 7' },
		{ lat: 28.059579, lng: -15.547584, name: 'Station 8' },
		{ lat: 28.059643, lng: -15.547524, name: 'Station 9' },
		{ lat: 28.060125, lng: -15.546919, name: 'Station 10' },
		{ lat: 28.060815, lng: -15.546439, name: 'Station 11' },
		{ lat: 28.061605, lng: -15.546489, name: 'Station 12' },
		{ lat: 28.145358, lng: -15.567643, name: 'Station 13' },
		{ lat: 28.144209, lng: -15.569096, name: 'Station 14' },
		{ lat: 28.143619, lng: -15.569954, name: 'Station 15' }
	];

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
}
