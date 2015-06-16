/**
 *	Index.js
 */

// Helpers
Template.index.helpers({
	title: 'In welke buurt zoek je cultuur?',
	placeholder: 'Bijv. Amsterdam'
});

// Events
Template.index.events({
	'click #btn-submit': function (event, template) {
		var input = template.$('#input-city');
		var inputVal = input[0].value;

		console.log(inputVal);
		
		if(inputVal) {
			Router.go('venues.list', {_id:1}, {query: 'search=' + inputVal, hash: 'list' });
		} else {
			alert("Vul a.u.b. wat in");
		}
	}
})