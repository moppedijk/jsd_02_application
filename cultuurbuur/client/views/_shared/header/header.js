/*
 *	Header.js
 */

// Helpers
Template.header.helpers({
	title: "Fietsenstalling gezocht!",
	isIndex: function () {
		if(Router.current().route.getName() == "index") {
			return true;
		}else {
			return false;
		}
	}
});