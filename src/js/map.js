function initMap() {
	const heritageCords = { lat: 33.4460307, lng: -79.1597138 };
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	const mapOptions = {
		// How zoomed in you want the map to start at (always required)
		zoom: 12,

		// The latitude and longitude to center the map (always required)
		center: heritageCords,

		// How you would like to style the map.
		// This is where you would paste any style found on Snazzy Maps.
		styles: [
			{
				featureType: "all",
				elementType: "labels",
				stylers: [
					{
						visibility: "on"
					}
				]
			},
			{
				featureType: "all",
				elementType: "labels.text.fill",
				stylers: [
					{
						saturation: 36
					},
					{
						color: "#000000"
					},
					{
						lightness: 40
					}
				]
			},
			{
				featureType: "all",
				elementType: "labels.text.stroke",
				stylers: [
					{
						visibility: "on"
					},
					{
						color: "#000000"
					},
					{
						lightness: 16
					}
				]
			},
			{
				featureType: "all",
				elementType: "labels.icon",
				stylers: [
					{
						visibility: "off"
					}
				]
			},
			{
				featureType: "administrative",
				elementType: "geometry.fill",
				stylers: [
					{
						color: "#000000"
					},
					{
						lightness: 20
					}
				]
			},
			{
				featureType: "administrative",
				elementType: "geometry.stroke",
				stylers: [
					{
						color: "#000000"
					},
					{
						lightness: 17
					},
					{
						weight: 1.2
					}
				]
			},
			{
				featureType: "administrative.country",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#5bd8b4"
					}
				]
			},
			{
				featureType: "administrative.locality",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#c4c4c4"
					}
				]
			},
			{
				featureType: "administrative.neighborhood",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#5bd8b4"
					}
				]
			},
			{
				featureType: "landscape",
				elementType: "geometry",
				stylers: [
					{
						color: "#000000"
					},
					{
						lightness: 20
					}
				]
			},
			{
				featureType: "poi",
				elementType: "geometry",
				stylers: [
					{
						color: "#000000"
					},
					{
						lightness: 21
					},
					{
						visibility: "on"
					}
				]
			},
			{
				featureType: "poi.business",
				elementType: "geometry",
				stylers: [
					{
						visibility: "on"
					}
				]
			},
			{
				featureType: "road.highway",
				elementType: "geometry.fill",
				stylers: [
					{
						color: "#5bd8b4"
					},
					{
						lightness: "0"
					}
				]
			},
			{
				featureType: "road.highway",
				elementType: "geometry.stroke",
				stylers: [
					{
						visibility: "off"
					}
				]
			},
			{
				featureType: "road.highway",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#ffffff"
					}
				]
			},
			{
				featureType: "road.highway",
				elementType: "labels.text.stroke",
				stylers: [
					{
						color: "#5bd8b4"
					}
				]
			},
			{
				featureType: "road.arterial",
				elementType: "geometry",
				stylers: [
					{
						color: "#000000"
					},
					{
						lightness: 18
					}
				]
			},
			{
				featureType: "road.arterial",
				elementType: "geometry.fill",
				stylers: [
					{
						color: "#484848"
					}
				]
			},
			{
				featureType: "road.arterial",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#ffffff"
					}
				]
			},
			{
				featureType: "road.arterial",
				elementType: "labels.text.stroke",
				stylers: [
					{
						color: "#212121"
					}
				]
			},
			{
				featureType: "road.local",
				elementType: "geometry",
				stylers: [
					{
						color: "#000000"
					},
					{
						lightness: 16
					}
				]
			},
			{
				featureType: "road.local",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#999999"
					}
				]
			},
			{
				featureType: "transit",
				elementType: "geometry",
				stylers: [
					{
						color: "#000000"
					},
					{
						lightness: 19
					}
				]
			},
			{
				featureType: "water",
				elementType: "geometry",
				stylers: [
					{
						color: "#000000"
					},
					{
						lightness: 17
					}
				]
			}
		]
	};

	// Get the HTML DOM element that will contain your map
	// We are using a div with id="map" seen below in the <body>
	const mapElement = document.getElementById("map-canvas");

	// Create the Google Map using our element and options defined above
	const map = new google.maps.Map(mapElement, mapOptions);

	// Let's also add a marker while we're at it
	const marker = new google.maps.Marker({
		position: heritageCords,
		map,
		title: "Snazzy!"
	});
}
