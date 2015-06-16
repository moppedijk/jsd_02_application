Meteor.methods({
	getVenues: function(locality) {
		
		this.unblock();

		try {

			var result = HTTP.call("GET", "http://api.artsholland.com/rest/venue.json", 
				{
					params: {
						locality: locality,
						per_page: 200
					}
				});

			return result.data.results;

			} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				return e;
			}
	},
	getVenue: function(cuid) {

		this.unblock();

		// try {

		// } catch (e) {
			
		// }

		return "Server respond: " + cuid;
	}
});
