/**
 *	Index.js
 */

// When template is rendered
Template.index.onRendered(function(){
	// Focus on input
	this.$('#inputSearch').focus();
	// Remove loader
	$("#loader").removeClass("loader--show");
	$("#index").addClass("index--animatein");
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
	this.$('#inputSearch').focus();
}

// Submit form event
Template.index.onSubmitForm = function (template) {
	var inputSearch = template.$('#inputSearch')[0].value.toLowerCase();
	var searchType = $('input:radio[name=searchType]:checked').attr('typeId');

	if(inputSearch) {
		switch(searchType) {
			case 'list':
				Router.go('list', {_id:1}, {query: 'search=' + inputSearch});
				break;
			case 'map':
				Router.go('map', {_id:1}, {query: 'search=' + inputSearch});
				break;
			default:
				alert("Something went wrong!");
				break;
		}
	} else {
		Template.index.showError('Vul a.u.b een stad in', template);
	}
}
