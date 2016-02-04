/* 
	MapController
	Google maps:
	https://github.com/dburles/meteor-google-maps#api
*/

MapController = ApplicationController.extend({
	
	layoutTemplate: 'layout',

	template: 'map',

	data: function () {
		return CyclesCollection.find({});
	},

	/**
	 * 	OnBeforeAction
	*/
	
	onBeforeAction: function () {
		// Show loader
		$("#loader").addClass("loader--show");

		// in ApplicationController
		this.getCycles();

		// Go to next rendering phase
		this.next();
	},

	/**
	 *	Request Complete Handler
	*/

	requestCompleteHandler: function (error, result) {
		
		// Error handling
		if(error){
			console.log(error);
		}

		if(result) {
			var resultObj = JSON.parse(result.content);

			// if there is no coordinates
			// set latng in session
			Session.set('latLng', resultObj[0].coordinates);

			// Push items in local collection
			for(var i = 0; i < resultObj.length; i++) {
				// Only documents with coordinates
				if (resultObj[i].coordinates)
					CyclesCollection._collection.insert(resultObj[i]);
			}

			// Load map
			this.loadMap();
		}
	},

	loadMap: function () {
		// Load Google map
		GoogleMaps.load({
			// add load options
			v: '3', 
			key: 'AIzaSyCtKqFdKMD9Fn99HVDIudRbE3pQMIFbKm8',
			libraries: 'geometry, places'
		});

		// Google map ready listener
		GoogleMaps.ready('map', function(map) {
			this.mapReady(map);
		}.bind(this));
	},

	mapReady: function(map) {
		// Get all cycles for map
		var cycles = CyclesCollection.find({});
		// Create empty LatLngBounds object
		var bounds = new google.maps.LatLngBounds();
		// Create count variable
		var count = 0;

		// Loop trough collection and create markers
		cycles.forEach(function(row) {
			var mapPosition = new google.maps.LatLng(row.coordinates[1], row.coordinates[0]);
			// Extend the bounds to include each marker's position
			bounds.extend(mapPosition);
			// Add marker
			this.addMarker({
				position: mapPosition, 
				timeout: count * 50, 
				map: map,
				cycleData: row
			});

			count++;

		}.bind(this));

		// Fit the map to the newly inclusive bounds
		map.instance.fitBounds(bounds);

		// Loading done
		$("#loader").removeClass("loader--show");
	},

	addMarker: function(options) {
		var infowindow = new google.maps.InfoWindow({
			content: this.generateInfoWindowContent(options.cycleData),
			maxWidth: 200
		});
		// setTimeout adding marker
		window.setTimeout(function() {
			// create marker
			var marker = new google.maps.Marker({
				position: options.position,
				map: options.map.instance,
				animation: google.maps.Animation.DROP
			});

			marker.addListener('click', function() {
				infowindow.open(options.map.instance, marker);
			});

		}, options.timeout);
	},

	generateInfoWindowContent: function (cycleData) {
		var html = "<div>";
			html+= "<h3>" + cycleData.name + "</h3>";
			html+= "<div><p>type: " + cycleData.type + "</p></div>";
			html+= "<div><p>street: " + cycleData.street + "</p></div>";
			html+= "<div><p>zipcode: " + cycleData.zipcode + "</p></div>";
			html+= "<div><p>city: " + cycleData.city + "</p></div>";
			html+= "<div><p><a href=\"/detail/" + cycleData.id + "\"/>detail</a></p></div>";

			// End div
			html+= "<div>";

		return html;
	},

  	/**
  	 * Action
  	*/

	action: function () {
		this.render();
	},

	onStop: function () {
		// delete session
		delete Session.keys['latLng']
		// empty collection
		CyclesCollection._collection.remove({});
		// unload google map
	}
});