/*
 *	About Route Controller object
 *	Reference for this controller is in the router.js
 *	Data calls and view rendering happens in the Controller object
 */

AboutController = RouteController.extend({
	
	// Calls layout template with name "layout"
	layoutTemplate: 'layout',

	// Calls about template with name "about" for the layout
	template: 'about',

	// data: function(){},

	// Render action
	action: function() {
		this.render();
	}
});