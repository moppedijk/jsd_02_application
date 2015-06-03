Meteor.methods({
	venuesList: function() {
		var list = [
			{name: 'Karel'},
			{name: 'Appel'},
			{name: 'Peter'},
			{name: 'jan'}
		]

		return list;
	}
});