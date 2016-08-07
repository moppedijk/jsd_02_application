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
	
	onRun: function () {
		// Show loader
		$("#loader").addClass("loader--show");

		this.getCyclesByLocality(this.params.query.search);
		this.next();
	},
	

	dataRequestCompleteHandler: function () {
		this.render();

		$("#loader").removeClass("loader--show");
	},

	/**
	 *	Request Complete Handler
	*/

	requestCompleteHandler: function (error, result) {

		if(result) {

			// Error handling
			if(result.statusCode == 400) {
				var resultObj = JSON.parse(result.content);
				Session.set('errorMessage', resultObj.message);
				Router.go('error');
			}

			var resultObj = JSON.parse(result.content);

			// Push new items in local collection
			for(var i = 0; i < resultObj.length; i++) {
				CyclesCollection._collection.insert(resultObj[i]);
			}

			// Loading done
			$("#loader").removeClass("loader--show");
		} else {
			Router.go('error');
		}
	},

  	/**
  	 * Action
  	*/

	action: function () {
		this.render();
	},

	onStop: function () {
		
	}
});