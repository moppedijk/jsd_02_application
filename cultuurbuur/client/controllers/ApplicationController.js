/*
 *	Application Controller object
 *	Reference for this controller is in the router.js
 *	This is the abstract controller for all the other controllers
 */

ApplicationController = RouteController.extend({
	getCycles:function(page) {
		// Get params
		var locality = this.params.query.search;
		var pageCount = page;

		// Set search query in session
		Session.set('inputSearch', locality);

		try {
			// Try http request
			var result = HTTP.get("/api/cycles", {
				params: {
					city: locality
				}
			}, function (error, result) {
				this.requestCompleteHandler(error, result);
			}.bind(this));

		} catch (e) {
			console.log(e);
		}
	},
	getCycle:function(id) {

	}
});