Template.list.helpers({
	cycles: function() {
		return CyclesCollection.find({});
	}
});

Template.list.onRendered(function () {
	
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
			name: 'List',
			href: '/list',
			title: 'Overzicht in lijst'
		}
	];

	Session.set('breadcrumb', breadcrumb);
});