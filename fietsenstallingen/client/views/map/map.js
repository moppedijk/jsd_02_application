Template.map.helpers({
	mapOptions: function() {
		var latLng = Session.get('latLng');

		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(latLng[1], latLng[0]),
				zoom: 13
			};
		}
	}
});

Template.map.onRendered(function () {
	var city = Session.get('inputSearch');
	// Create breadcrumb
	var breadcrumb = [
		{ name: city }
	];
	// Set breadcrumb in session
	Session.set('breadcrumb', breadcrumb);
});
