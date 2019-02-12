document.addEventListener(
	'DOMContentLoaded',
	() => {
		console.log('IronGenerator JS imported successfully!');
	},
	false
);

// function startMap() {
// 	const roqueNublo = {
// 		lat: 27.967,
// 		lng: -15.57886
// 	};
// 	map = new google.maps.Map(document.getElementById('map'), {
// 		zoom: 10.3,
// 		center: roqueNublo
// 	});
// }

// function showMarkers() {
// 	axios.get(`http://localhost:3000/map`).then((places) => {
// 		places.data.forEach((place) => {
// 			new google.maps.Marker({
// 				map: map,
// 				position: {
// 					lat: place.location.coords.lat,
// 					lng: place.location.coords.lng
// 				},
// 				title: place.name
// 			});
// 		});
// 	});
// }

// startMap();
// showMarkers();

// document.getElementById('myPosition').onclick = myLocation;

// function myLocation() {
// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(
// 			function(position) {
// 				const user_location = {
// 					lat: position.coords.latitude,
// 					lng: position.coords.longitude
// 				};

// 				// Center map with user location
// 				map.setCenter(user_location);

// 				// Add a marker for your user location
// 				const ironhackBCNMarker = new google.maps.Marker({
// 					position: {
// 						lat: user_location.lat,
// 						lng: user_location.lng
// 					},
// 					map: map,
// 					title: 'You are here.'
// 				});
// 			},
// 			function() {
// 				console.log('Error in the geolocation service.');
// 			}
// 		);
// 	} else {
// 		console.log('Browser does not support geolocation.');
// 	}
// }
