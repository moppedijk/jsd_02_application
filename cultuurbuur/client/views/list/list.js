Template.list.helpers({
	cycles: function() {
		return CyclesCollection.find({});
	}
});

Template.list.onRendered(function () {
	var city = Session.get('inputSearch');
	// Create breadcrumb
	var breadcrumb = [
		{
			name: 'Zoeken',
			href: '/',
			title: 'Terug naar zoeken'
		},
		{
			name: city,
			href: '/list?search=' + city,
			title: city
		}
	];
	// Set breadcrumb in session
	Session.set('breadcrumb', breadcrumb);
});