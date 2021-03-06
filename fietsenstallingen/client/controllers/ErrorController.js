/*
 *	Index Route Controller object
 *	Reference for this controller is in the router.js
 *	Data calls and view rendering happens in the Controller object
 */

ErrorController = RouteController.extend({
	
	// Calls layout template with name "layout"
	layoutTemplate: 'layout',

	// Calls index template with name "index" for the layout
	template: 'error',

	onRun: function () {
		// Show loader
		$("#loader").addClass("loader--show");

		// Go to next rendering phase
		this.next();
	},

	// Render action
	action: function() {
		this.render();
	}
});