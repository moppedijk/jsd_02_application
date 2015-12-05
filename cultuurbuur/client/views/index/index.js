/**
 *	Index.js
 */

// When template is rendered
Template.index.onRendered(function(){
	this.$('#inputSearch').focus();
});

// Helpers
Template.index.helpers({
	title: 'In welke buurt zoek je cultuur?',
	placeholder: 'Bijv. Amsterdam',
	errorMessage: function() {
		return Session.get('inputSearchError');
	}
});

// Events
Template.index.events({
	'click #btnSubmit': function (event, template) {
		Template.index.onSubmitForm(template);
	},
	'keypress #inputSearch': function (event, template) {
		if(event.keyCode == 13) {
			Template.index.onSubmitForm(template);
		}
	}
});

// Show error function
Template.index.showError = function(msg, template) {
	var el = template.$("#error");
	var visibleClass = el.attr("visible-class");

	Session.set('inputSearchError', msg);

	$(el).addClass(visibleClass);
}

// Submit form event
Template.index.onSubmitForm = function (template) {
	var inputSearch = template.$('#inputSearch')[0].value;
	var searchType = $('input:radio[name=searchType]:checked').attr('typeId');

	if(inputSearch) {

		switch(searchType) {
			case 'venues':
				Router.go('venues', {_id:1}, {query: 'search=' + inputSearch, hash: 'list' });
				break;
			case 'events':
				Router.go('events', {_id:1}, {query: 'search=' + inputSearch, hash: 'list' });
				break;
			default:
				alert("Something went wrong!");
				break;
		}

	} else {
		Template.index.showError('Vul a.u.b een stad in', template);
	}
}
