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
			console.log(resultObj);	

			// Push items in local collection
			for(var i = 0; i < resultObj.length; i++) {
				console.log(resultObj[i]);
				CyclesCollection._collection.insert(resultObj[i]);
			}

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
		CyclesCollection._collection.remove({});
	}
});