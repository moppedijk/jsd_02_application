DetailController = ApplicationController.extend({
	
	// Calls layout template with name "layout"
	layoutTemplate: 'layout',

	// Calls venue template with name "venue" for the layout
	template: 'detail',

	data: function () {
		return CyclesCollection._collection.findOne({"id": this.params.id});
	},

	onRun: function () {
		// Show loader
		$("#loader").addClass("loader--show");

		console.log("onRun");

		var data = CyclesCollection._collection.findOne({"id": this.params.id});

		if(data) {
			$("#loader").removeClass("loader--show");
			this.action();
		}else {
			this.getCyclesById(this.params.id);
		}

		// Go to next rendering phase
		this.next();
	},

	requestCompleteHandler: function(error, result) {

		if(result) {

			if(result.statusCode == 400) {
				var resultObj = JSON.parse(result.content);
				Session.set('errorMessage', resultObj.message);
				Router.go('error');
			}
			
			var resultObj = JSON.parse(result.content);

			CyclesCollection._collection.remove({});

			// Add first object to collection
			CyclesCollection._collection.insert(resultObj[0]);

			// Loading done
			$("#loader").removeClass("loader--show");
		} else {
			Router.go('error');
		}
	},

	// Render action
	action: function() {
		this.render();
	},
});