/* 
	Define local collection Venues
	Use this collection for all de venues and single venue types
	If single venue type, us data in collection and add data from API
*/

// Local collection
CyclesCollection = new Meteor.Collection("cycles");

// Venues Controller definition
CyclesController = RouteController.extend({
	
	layoutTemplate: 'layout',

	template: 'cycles',

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

		// Get params
		var locality = this.params.query.search;

		try {
			// Try http request
			var result = HTTP.get("/api/cycle", this.requestCompleteHandler);

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

			var resultObj = JSON.parse(result.content);
			var cycleObj = resultObj.Fietsenstallingen.Fietsenstalling;

			// Push items in local collection
			for(var i = 0; i < 10; i++) {
				
				console.log(cycleObj[i]);
				CyclesCollection._collection.insert(cycleObj[i]);
			}

			// Loading done
			$("#loader").removeClass("loader--show");

			return true;
		}
	},

	/*
	 *	Bind _local data with saved user data
	*/
	bindUserAndLocalData: function (localCollecion, userCollection) {
		var collection = {};

		// Map collections with each other

		return collection;
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