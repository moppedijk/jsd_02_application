Template.breadcrumb.helpers({
	listItems: function() {

		var breadcrumb = [
			{name: 'Zoeken', href: '/', title: 'Haal me hier weg!'}
		]

		var currentRouter = Router.current();

		// Types
		breadcrumb.push({
			name: 'Lokaties',
			href: '/venues',
			title: 'Zoeken naar lokaties'
		})

		// Search
		if(currentRouter.params.query.search) {
			breadcrumb.push({
				name: currentRouter.params.query.search,
				href: currentRouter.originalUrl,
				title: 'Hier naar zoeken' 
			});
		}

		// Detail
		if(currentRouter.params.query.cidn) {
			breadcrumb.push({
				name: currentRouter.params.query.cidn,
				href: currentRouter.originalUrl,
				title: 'Id van de locatie'
			});
		}

		return breadcrumb;
	}
});