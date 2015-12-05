/**
 *	App Router
 *	Apps router is based on the Iron:Router plugin for Meteor
 *
 *	Iron router looks at router options in this order:
 *	1. Route
 *	2. RouteController
 *	3. Router
 *
 *	Reference: https://github.com/iron-meteor/iron-router
 */

// Configuration
Router.configure({
  	// Default Controller for the application
  	controller: 'ApplicationController'
});

// Index route
Router.route('/', {
	name: 'index',
	controller: 'IndexController'
});

// About route
Router.route('/about', {
	name: 'about',
	controller: 'AboutController'
});

// Venue route
Router.route('/venues', {
	name: 'venues',
	controller: 'VenuesController'
});

// Venue route
Router.route('venue-detail/:cidn', {
	name: 'venueDetail',
	controller: 'VenueDetailController'
});

// Redirect /
// Router.route('/', function() {
// 	this.redirect('/index');
// });
