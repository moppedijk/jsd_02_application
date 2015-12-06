Template.cycleItem.onRendered(function(){
	setTimeout(function() {
		$(this.firstNode).addClass('venueitem--animatein');
	}.bind(this), 100);
})