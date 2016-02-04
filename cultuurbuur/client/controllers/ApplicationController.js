/*
 *	Application Controller object
 *	Reference for this controller is in the router.js
 *	This is the abstract controller for all the other controllers
 */

ApplicationController = RouteController.extend({
	getCyclesByLocality:function(locality) {
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
	getCyclesById:function(id) {
		// Set detail id in session
		Session.set('detailId', id);

		try {
			// Try http request
			var result = HTTP.get("/api/cycles/" + id, {}, function (error, result) {
				this.requestCompleteHandler(error, result);
			}.bind(this));

		} catch (e) {
			console.log(e);
		}
	}
});