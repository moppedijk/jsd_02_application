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

// Define local collection
CyclesCollection = new Meteor.Collection("cycles");

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

// List route
Router.route('/list', {
	name: 'list',
	controller: 'ListController'
});
// List route
Router.route('/map', {
	name: 'map',
	controller: 'MapController'
});

// Detail route
Router.route('detail/:id', {
	name: 'detail',
	controller: 'DetailController'
});

