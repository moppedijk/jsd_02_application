Template.venues.helpers({
	venues: function() {
		return Venues.find({});
	},
	locality: function() {
		var controller = Iron.controller();

		return controller.getLocality();
	}
});

Template.venues.onRendered(function () {

});