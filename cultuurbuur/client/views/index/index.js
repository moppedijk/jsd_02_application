/**
 *	Index.js
 */

// When template is rendered
Template.index.onRendered(function(){
	// Focus on input
	this.$('#inputSearch').focus();
});

// Helpers
Template.index.helpers({
	title: 'Waar wil jij je fiets stallen?',
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

	if(inputSearch) {
		Router.go('cycles', {_id:1}, {query: 'search=' + inputSearch, hash: 'list' });
	} else {
		Template.index.showError('Vul a.u.b een stad in', template);
	}
}
