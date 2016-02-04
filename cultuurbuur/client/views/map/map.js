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
	
	// Create breadcrumb
	var breadcrumb = [
		{
			name: 'Zoeken',
			href: '/',
			title: 'Terug naar zoeken'
		},
		{
			name: 'Fietsenstallingen',
			href: '/list',
			title: 'Zoeken naar fietsenstallingen'
		},
		{
			name: 'Map',
			href: '/map',
			title: 'Overzicht in lijst'
		}
	];

	Session.set('breadcrumb', breadcrumb);
});
