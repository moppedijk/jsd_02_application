Template.cycles.helpers({
	cycles: function() {
		return CyclesCollection.find({});
	}
});

Template.cycles.onRendered(function () {
	
	// Create breadcrumb
	var breadcrumb = [
		{
			name: 'Zoeken',
			href: '/',
			title: 'Terug naar zoeken'
		},
		{
			name: 'Fietsenstallingen',
			href: '/cycles',
			title: 'Zoeken naar fietsenstallingen'
		}
	];

	Session.set('breadcrumb', breadcrumb);
});