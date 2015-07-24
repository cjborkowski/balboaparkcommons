var Skyview = function(container, umodata, cfg)
{
	this.scalefactor = 0.12; // Scale factor for the mini map
	
	this.container = $('#'+container);
	this.container.css('overflow', 'hidden');
	
	this.mainMapEl = $('#skyview-mainmap');
	
	// Set the height and width of the main map area based on its contents
	var tmpHeight = $('#skyview-mainmap .col').first().find('.row').last().position().top + 
					$('#skyview-mainmap .col').first().find('.row').last().height() +
					parseInt($('#skyview-mainmap .col').first().find('.row').last().css('marginBottom')); // First col, last item's bottom position
	
	try
	{
		var secondCol = $('#skyview-mainmap .col').first().next().find('.row').last().position().top + 
						$('#skyview-mainmap .col').first().next().find('.row').last().height() + 
						parseInt($('#skyview-mainmap .col').first().next().find('.row').last().css('marginBottom')); // Second col, last item's bottom position

		if( tmpHeight < secondCol ) tmpHeight = secondCol;
			
	}catch(e){};
	
	this.mainMapEl.height(tmpHeight);
	
	this.mainMapEl.width( $('#skyview-mainmap .col').last().position().left + $('#skyview-mainmap .col').last().width() );
	
	this.createMiniMap();

}

Skyview.prototype.createMiniMap = function()
{
	var html = '<div id="skyview-minimap"><div id="skyview-minimap-view"><div class="display"></div></div></div>';
	
	this.container.append(html);

	this.miniMapEl = $('#skyview-minimap');
	this.miniMapViewEl = $('#skyview-minimap-view');
	
	this.miniMapEl.width( this.mainMapEl.width() * this.scalefactor );
	this.miniMapEl.height( this.mainMapEl.height() * this.scalefactor );
	
	this.miniMapViewEl.width( this.container.width() * this.scalefactor );
	this.miniMapViewEl.height( this.container.height() * this.scalefactor );
	
	var thissv = this;
	this.miniMapViewEl.draggable({ 
		containment: "parent",
		drag: function() {
			var posx = $(this).offset().left - thissv.miniMapEl.offset().left - parseInt(thissv.miniMapEl.css('borderLeftWidth'));
			var posy = $(this).offset().top - thissv.miniMapEl.offset().top - parseInt(thissv.miniMapEl.css('borderTopWidth'));
			
			thissv.mainMapEl.css({'left': -(posx / thissv.scalefactor), 'top': -(posy / thissv.scalefactor)});
		} 
	});
	
	var cells = $('#skyview-mainmap .col .row');
	
	for( var i=0; i<cells.length; i++ )
	{
		//$(cells[i]).position()
		$('<div class="cell"><div class="display"></div></div>').css({
			'position': 'absolute',
			'width': parseInt($(cells[i]).width() * this.scalefactor),
			'height': parseInt($(cells[i]).height() * this.scalefactor),
			'left': parseInt($(cells[i]).position().left * this.scalefactor),
			'top': parseInt($(cells[i]).position().top * this.scalefactor)
		}).appendTo(this.miniMapEl);
	}
	
}
