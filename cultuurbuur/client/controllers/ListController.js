/* 
	Define local collection Venues
	Use this collection for all de venues and single venue types
	If single venue type, us data in collection and add data from API
*/

// List Controller definition
ListController = ApplicationController.extend({
	
	layoutTemplate: 'layout',

	template: 'list',

	data: function () {
		return CyclesCollection.find({});
	},

	/**
	 * 	OnBeforeAction
	*/
	
	onBeforeAction: function () {
		// Show loader
		$("#loader").addClass("loader--show");

		// in ApplicationController
		this.getCyclesByLocality(this.params.query.search);

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
		}

		if(result) {

			var resultObj = JSON.parse(result.content);

			// Push items in local collection
			for(var i = 0; i < resultObj.length; i++) {
				CyclesCollection._collection.insert(resultObj[i]);
			}

			// Loading done
			$("#loader").removeClass("loader--show");
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