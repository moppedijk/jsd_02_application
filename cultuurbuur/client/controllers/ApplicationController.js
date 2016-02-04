/*
 *	Application Controller object
 *	Reference for this controller is in the router.js
 *	This is the abstract controller for all the other controllers
 */

ApplicationController = RouteController.extend({
	getCycles:function() {
		// Get params
		var locality = this.params.query.search;

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
	getCycle:function() {
		var cycleId = this.params.id;

		// Set detail id in session
		Session.set('detailId', cycleId);

		try {
			// Try http request
			var result = HTTP.get("/api/cycles/" + cycleId, {}, function (error, result) {
				this.requestCompleteHandler(error, result);
			}.bind(this));

		} catch (e) {
			console.log(e);
		}
	}
});