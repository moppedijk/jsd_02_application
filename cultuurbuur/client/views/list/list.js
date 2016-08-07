Template.list.helpers({
	cycles: function() {
		return CyclesCollection.find({});
	}
});

Template.list.onRendered(function () {
	var city = Session.get('inputSearch');
	// Create breadcrumb
	var breadcrumb = [
		{ name: city }
	];
	// Set breadcrumb in session
	Session.set('breadcrumb', breadcrumb);
});