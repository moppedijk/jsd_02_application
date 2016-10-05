/**
 *	Index.js
 */

// When template is rendered
Template.error.onRendered(function(){
	// Remove loader
	$("#loader").removeClass("loader--show");
});

Template.error.helpers({
	message: function() {
		return Session.get('errorMessage')
	}
});

Template.error.onRendered(function () {
	// Create breadcrumb
	var breadcrumb = [
		{
			name: 'Zoeken',
			href: '/',
			title: 'Terug naar zoeken'
		}
	];
	// Set breadcrumb in session
	Session.set('breadcrumb', breadcrumb);
});