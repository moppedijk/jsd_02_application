Template.detail.helpers({
	cycles: function() {
		return CyclesCollection.find({});
	}
});

Template.detail.onRendered(function () {
	
	// Create breadcrumb
	var breadcrumb = [
		{
			name: 'Zoeken',
			href: '/',
			title: 'Terug naar zoeken'
		},
		{
			name: 'Detail',
			href: '/detail',
			title: 'Detail pagina van'
		}
	];

	Session.set('breadcrumb', breadcrumb);
});