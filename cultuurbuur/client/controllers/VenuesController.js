/* 
	Define local collection Venues
	Use this collection for all de venues and single venue types
	If single venue type, us data in collection and add data from API
*/

Venues = new Meteor.Collection("venues");

// Venues Controller definition
VenuesController = RouteController.extend({
	
	layoutTemplate: 'layout',

	template: 'venues',

	data: function () {

		// Return the data from the collection
		return Venues.find({});
	},

	/**
	 * 	OnReRun
	*/

	onRerun: function () {
		console.log("OnReRun");
	},

	/**
	 * 	OnBeforeAction
	*/
	
	onBeforeAction: function () {
		console.log("onBeforeAction");
		console.log("loading");

		// Show loader
		$("#loader").addClass("loader--show");

		// Get params
		var locality = this.params.query.search;

		try {
			// Try http request
			var result = HTTP.get("/api/sparql/venues/", {
				params: { 
					locality: locality 
				} 
			}, this.requestCompleteHandler);

		} catch (e) {
			console.log(e);
		}

		// Go to next rendering phase
		this.next();
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

			// // Push items in local collection
			for(var i = 0; i < result.data.length; i++) {
				console.log(result.data[i]);
				Venues._collection.insert(result.data[i]);
			}

			// Loading done
			console.log("loading done");
			$("#loader").removeClass("loader--show");

			return true;
		}
	},

	/**
	 *	OnAfterAction
	 */

  	onAfterAction: function () {
  		
  	},

  	/**
  	 * Action
  	*/

	action: function () {
		this.render();
	}
});