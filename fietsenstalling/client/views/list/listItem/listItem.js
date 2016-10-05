Template.listItem.onRendered(function(){
	setTimeout(function() {
		$(this.firstNode).addClass('listitem--animatein');
	}.bind(this), 100);
})