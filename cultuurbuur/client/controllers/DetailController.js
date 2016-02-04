DetailController = ApplicationController.extend({
	
	// Calls layout template with name "layout"
	layoutTemplate: 'layout',

	// Calls venue template with name "venue" for the layout
	template: 'detail',

	data: function() {
		return CyclesCollection.find({});
	},

	onBeforeAction: function () {
		// Show loader
		$("#loader").addClass("loader--show");

		this.getCyclesById(this.params.id);

		// Go to next rendering phase
		this.next();
	},

	requestCompleteHandler: function(error, result) {
		if(error) {
			throw error;
		}

		if(result) {
			var resultObj = JSON.parse(result.content);

			// Add first object to collection
			CyclesCollection._collection.insert(resultObj[0]);

			if(!Session.get('inputSearch')) {
				Session.set('inputSearch', resultObj[0].city.toLowerCase());
			}

			// Loading done
			$("#loader").removeClass("loader--show");
		}
	},

	// Render action
	action: function() {
		this.render();
	},

	onStop: function () {
		CyclesCollection._collection.remove({});
	}
});