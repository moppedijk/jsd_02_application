VenueDetailController = RouteController.extend({
	
	// Calls layout template with name "layout"
	layoutTemplate: 'layout',

	// Calls venue template with name "venue" for the layout
	template: 'venueDetail',

	data: function() {

		// Find the document in local collection by id
		// Todo: check if data is undefined
		return Venues.findOne( { cidn: this.params.cidn });
	},

	onBeforeAction: function () {

		// Cal the server
		Meteor.call('getVenue', this.params.cidn, function (error, result) {
			if(result) {
				console.log(result);
			}
			if(error)
				alert(error);
		}.bind(this) );

		// Go to next rendering phase
		this.next();
	},

	// Render action
	action: function() {
		this.render();
	}
});