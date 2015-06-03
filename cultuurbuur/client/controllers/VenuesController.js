VenuesController = RouteController.extend({
	
	layoutTemplate: 'layout',

	template: 'venues',

	data: function () {
		Meteor.call('venuesList', function(error, result) {
			if(error) {
				console.log(error);
			}else {
				console.log("Result:");
				console.log(result);
				return result;
			}
		})
	},

	action: function () {
		this.render();
	}
});