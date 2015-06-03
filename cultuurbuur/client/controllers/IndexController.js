/*
 *	Index Route Controller object
 *	Reference for this controller is in the router.js
 *	Data calls and view rendering happens in the Controller object
 */

IndexController = RouteController.extend({
	
	// Calls layout template with name "layout"
	layoutTemplate: 'layout',

	// Calls index template with name "index" for the layout
	template: 'index',

	// data: function(){},

	// Render action
	action: function() {
		this.render();
	}
});