Template.filterOptions.helpers({
	inputSearch: function() {
		return Session.get('inputSearch');
	},
	isList: function() {
		if(Router.current().route.getName() == 'list') {
			return true;
		}else {
			return false;
		}
	},
	isMap: function() {
		if(Router.current().route.getName() == 'map') {
			return true;
		}else {
			return false;
		}
	}
});