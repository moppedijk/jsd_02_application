/*
 *	Application Controller object
 *	Reference for this controller is in the router.js
 *	This is the abstract controller for all the other controllers
 */

ApplicationController = RouteController.extend({
	getCyclesByLocality:function(locality) {
		
		if(Session.get('initialPage') == "detail" ) {
			// This is a little hacky
			Session.set('initialPage', "initialPageWasDetail");
			CyclesCollection._collection.remove({});
			this._loadCyclesByLocality(locality);
		}else{
			if(Session.get("currentLocationLoaded") == undefined) {
				CyclesCollection._collection.remove({});
				this._loadCyclesByLocality(locality);
			} else {
				if(locality.toLowerCase() == Session.get("currentLocationLoaded").toLowerCase()) {
					this.dataRequestCompleteHandler();
				} else {
					CyclesCollection._collection.remove({});
					this._loadCyclesByLocality(locality);
				}
			}
		}
	},
	_loadCyclesByLocality:function(locality) {
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

				var resultObj = JSON.parse(result.content);

				Session.set('latLng', resultObj[0].coordinates);
				Session.set("currentLocationLoaded", locality.toLowerCase());

			}.bind(this));

		} catch (e) {
			Session.set('errorMessage', e);
			Router.go('error');
		}
	},
	getCyclesById:function(id) {
		// Set detail id in session
		Session.set('detailId', id);

		try {
			// Try http request
			var result = HTTP.get("/api/cycles/" + id, {}, function (error, result) {
				this.requestCompleteHandler(error, result);

				var resultObj = JSON.parse(result.content);

				if(resultObj[0].city) {
					Session.set("currentLocationLoaded", resultObj[0].city.toLowerCase());
				} else {
					Session.set("currentLocationLoaded", undefined);
				}

				if(!Session.get('inputSearch')) {
					if(resultObj[0].city) {
						Session.set('inputSearch', resultObj[0].city.toLowerCase());
					} else {
						Session.set('inputSearch', undefined);
					}
				}

			}.bind(this));

		} catch (e) {
			Session.set('errorMessage', e);
			Router.go('error');
		}
	},
});