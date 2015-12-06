Template.cycleItem.onRendered(function(){
	setTimeout(function() {
		$(this.firstNode).addClass('cycleitem--animatein');
	}.bind(this), 100);
})