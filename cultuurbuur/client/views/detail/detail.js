Template.detail.onRendered(function () {
	// Create breadcrumb
	var breadcrumb = [
		{ name: Session.get("currentLocationLoaded") },
		{ name: 'Detail' }
	];

	console.log("name", name);

	Session.set('breadcrumb', breadcrumb);
});