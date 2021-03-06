window.onload = loadOneRoute;

function loadOneRoute() {
	var service = new google.maps.DirectionsService();
	var map = new google.maps.Map(document.getElementById('map'));

	axios.get(`${window.host}/rutas/predefinidasjson/${window.selectedRoute}`).then((routeInfo) => {
		var stations = routeInfo.data.waypoints;

		// ESTO ES PARA RECOGER LA LAT Y LNG DEL PRIMER PUNTO DE NUESTRO TREKKING
		var firstLat = routeInfo.data.waypoints[0].lat;
		var firstLng = routeInfo.data.waypoints[0].lng;
		// var firstWaypoint = [ firstLat, firstLng ];
		// console.log(firstWaypoint);

		var postCodes = [];

		var done = 0;

		for (var i = 0; i < 1; i++) {
			geocodeLatLng(
				{
					lat: firstLat,
					lng: firstLng
				},
				postCodes,
				function() {
					done++;

					if (done === 1) {
						axios
							.post(`/rutas/meteo-data/`, { postCodes })
							.then((weather) => {
								const { name, province } = weather.data;

								const newCharacterHtml = `
							
								<h3> Localidad: ${name} </h3>
								<p> Provincia: ${province} </p>
								<h4>Today</h3>
								<p>Temp min: ${weather.data.today.tmp.min}</p>
								<p>Temp min: ${weather.data.today.tmp.max}</p>
								<h4>Tomorrow</h3>
                <p>Temp min: ${weather.data.tomorrow.tmp.min}</p>
                <p>Temp max: ${weather.data.tomorrow.tmp.max}</p>
                <p>Prevision Lluvia: ${weather.data.next2.description}</p>
                <p>Probabilidad: ${weather.data.next2.rainProb}%</p>
							`;
								document.getElementById('weather-list').innerHTML += newCharacterHtml;
							})
							.catch((error) => {
								console.log('Error is: ', error);
							});
					}
				}
			);
		}

		// {{!-- <h3> ${weather.data.name} </h3>
		// <li>Localidad:{{weather.data.name}}</li>
		// <li>Provincia: {{weather.data.province}}</li>
		// <h3>Today</h3>
		// <li>Temp min: {{weather.data.today.tmp.min}}</li>
		// <li>Temp max: {{weather.data.today.tmp.max}}</li>
		// <h3>Tomorrow</h3>
		// <li>Temp min: {{weather.data.tomorrow.tmp.min}}</li>
		// <li>Temp max: {{weather.data.tomorrow.tmp.min}}</li>
		// <li>Prevision Lluvia: {{weather.data.next2.description}}</li>
		// <li>Probabilidad: {{weather.data.next2.rainProb}}</li>
		//  --}}

		// var geocoder = new google.maps.Geocoder;
		// var infowindow = new google.maps.InfoWindow;

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

function geocodeLatLng(latlng, postCodes, cb) {
	new google.maps.Geocoder().geocode(
		{ location: latlng },
		function(results, status) {
			if (status === 'OK') {
				if (results[0]) {
					var code = results[0].address_components.filter((address) => {
						return address.types[0] === 'postal_code';
					})[0].long_name;

					postCodes.push(code);
					cb();
				} else {
					window.alert('No results found');
				}
			} else {
				window.alert('Geocoder failed due to: ' + status);
			}
		}.bind(this)
	);
}
