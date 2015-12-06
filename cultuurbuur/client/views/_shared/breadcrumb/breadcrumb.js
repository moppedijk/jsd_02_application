Template.breadcrumb.helpers({
	listItems: function() {

		// var breadcrumb = [
		// 	{name: 'Zoeken', href: '/', title: 'Haal me hier weg!'}
		// ]

		// var session = Session.get('breadcrumb');

		// // Types
		// breadcrumb.push({
		// 	name: 'Lokaties',
		// 	href: '/venues',
		// 	title: 'Zoeken naar lokaties'
		// })

		return Session.get('breadcrumb');
	}
});