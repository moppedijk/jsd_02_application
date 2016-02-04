DetailController = RouteController.extend({
	
	// Calls layout template with name "layout"
	layoutTemplate: 'layout',

	// Calls venue template with name "venue" for the layout
	template: 'detail',

	data: function() {

		// Find the document in local collection by id
		// Todo: check if data is undefined
		return CyclesCollection.find({});
	},

	onBeforeAction: function () {
		// Show loader
		$("#loader").addClass("loader--show");

		// Go to next rendering phase
		this.next();
	},

	// Render action
	action: function() {
		$("#loader").removeClass("loader--show");
		this.render();
	}
});