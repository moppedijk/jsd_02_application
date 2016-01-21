/* 
	MapController
	Google maps:
	https://github.com/dburles/meteor-google-maps#api
*/

MapController = RouteController.extend({
	
	layoutTemplate: 'layout',

	template: 'map',

	data: function () {

		// Return the data from the collection
		return CyclesCollection.find({});
	},

	/**
	 * 	OnBeforeAction
	*/
	
	onBeforeAction: function () {
		// Show loader
		$("#loader").addClass("loader--show");

		// Get cycles page 0
		this.getCycles(0);

		// Go to next rendering phase
		this.next();
	},

	getCycles:function(page) {
		// Get params
		var locality = this.params.query.search;
		var pageCount = page;

		try {
			// Try http request
			var result = HTTP.get("/api/cycle",{
				params: {
					perPage: 20,
					page: pageCount,
					city: locality
				}
			}, this.requestCompleteHandler);

		} catch (e) {
			console.log(e);
		}
	},

	/**
	 *	Request Complete Handler
	*/

	requestCompleteHandler: function (error, result) {
		
		// Error handling
		if(error){
			console.log(error);

			return true;
		}

		if(result) {

			var resultObj = JSON.parse(result.content);

			// Check this
			// if there is no coordinates
			Session.set('latLng', resultObj[0].coordinates);

			// // Push items in local collection
			for(var i = 0; i < resultObj.length; i++) {
				// Only documents with coordinates
				if (resultObj[i].coordinates)
					CyclesCollection._collection.insert(resultObj[i]);
			}

			// Load Google map
			GoogleMaps.load();

			// Loading done
			$("#loader").removeClass("loader--show");

			return true;
		}
	},

  	/**
  	 * Action
  	*/

	action: function () {
		this.render();
	},

	onStop: function () {
		// delete session
		delete Session.keys['latLng']
		// empty collection
		CyclesCollection._collection.remove({});
	}
});