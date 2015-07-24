function Mainview(cfg)
{	
	var mainview = this;
	this.cfg = cfg;
	this.setGui(cfg, mainview);
	this.currentUmo = undefined;
	this.metaDataEl = $('#main-metadata');
	//this.streamerOn = $('#stream-loader');
	
	// thumbnail click handlers
	this.eventObj = new PEvent("onThumbnailClick");
	// display metadata
	
	this.eventObj.addEventHandler('onThumbnailClick', 
		function() {
			this.displayMetadata(this, this.currentUmo); 
		}, this);
	// save umoid to session
	this.eventObj.addEventHandler('onThumbnailClick', 
		function() {
			Umo.saveToSession(this.currentUmo);
		}, this);
}

Mainview.prototype.showLoader = function()
{
	$('#stream-loader').show();	
};

Mainview.prototype.hideLoader = function()
{
	$('#stream-loader').hide();	
};

Mainview.prototype.show = function()
{
	
}

Mainview.prototype.setGui = function(cfg, mainview)
{	
	if(cfg.trigger)
	{
		$('#'+cfg.trigger).children().each(function(i)		 
		{		
			if($(this).find('img.thumb-lazyload').length < 1) // Isn't lazy loaded, so attach event now 
				mainview.setThumbClick($(this), i, mainview);
		});	
	}
}

Mainview.prototype.setThumbClick = function(el, index, mainview)
{	
	$(el).click(function()
	{				
		//mainview.open(mainview, index);						
	});
}

Mainview.prototype.open = function(mainview, index)
{	 
	
	var i = 0;
	if(index) i = index;	
	mainview.current_index = i;		
		
	mainview.showLoader($('#stream-umo1'));	
	
	var umo = mainview.cfg.umos[i];			
	mainview.currentUmo = umo;
	console.log(umo);
				
	objImg = new Image();
	objImg.src = 'http://piction.bpoc.org/piction/'+umo.w;
	objImg.onload = function() 
	{        
		console.log(objImg);
		mainview.hideLoader();                                                       
		$('#stream-umo1').css("background-image","url(http://piction.bpoc.org/piction/"+umo.w+")");	     
		
		if ($('div.stream-header').is('.commons-meta-title')) {
		//has the class
		} else {
		$('div.stream-header').empty().append(umo.n);
		$('div.stream-header2').empty().append(umo.n);
		}
		

		
	}
	//removed for now not used in v5.2
	//$('#view-container').fadeOut(700, function()
	//{			 
	//	$('#streamer-holder').fadeIn(700);
	//});
	
	mainview.eventObj.executeEvent('onThumbnailClick');
	console.log("Mainview.open executed on thumbnailClick");
};



Mainview.prototype.displayMetadata = function(mainview, umo)
{
    
		mainview.metaDataEl.empty();
		$('#meta-data-message').empty();
		//mainview.metaDataEl.append('<tr class="meta-data-row"><td class="meta-data-lable">institution</td><td class="meta-data-value"><div id="copy-logo">'+umo.d+'</div></td></tr>');
		//copy class for now
	  	var logo = $("#hover-user-panel-information-logo").attr("class");
	  	$("#copy-logo").addClass(logo).css('height', '30px');
	
		//if(mainview.currentUmo && mainview.metaDataEl)
		//{
		
	    for(var i = 0; i<umo.md.length; i++)
		{   
		   mainview.metaDataEl.append('<tr class="meta-data-row"><td class="meta-data-lable '+umo.md[i].mt.toLowerCase()+'">'+umo.md[i].d+':</td><td class="meta-data-value">'+umo.md[i].mv+'</td></tr>');  
		}		
		//}
		
		if(umo.md[0] ==undefined ){
			$('#meta-data-container-title').empty().append('Title Not Set').addClass('commons-missinf-meta-title');
	    	$('#meta-data-message').append('<span>This object record may be incomplete and may include outdated information. Other information may exist in a non-digital form. The Museum continues to update and add new research to collection records.</span>');
	    	console.log("no meta data first option !");	
		} 
		
		if(umo.md[0].mt =='PUBLIC COMMONS.TITLE'){
		   	$('#meta-data-container-title').empty().append(umo.md[0].mv).addClass('commons-meta-title');
		   	$('div.stream-header').empty().append(umo.md[0].mv).addClass('commons-meta-title');
			$('div.stream-header2').empty().append(umo.md[0].mv).addClass('commons-meta-title');
			$('.activity-message-meta-title').next().animate({top: '+=20px'})
		    var message = "<p>"+Session.username+" viewed: "+umo.md[0].mv+"</p><br />" ;
			$('#activity-message-holder').append(message).addClass('activity-message-meta-title').fadeIn();
		    
		    console.log("score ! meta data title found !");	
		     } 
		         
		else {
			$('#meta-data-container-title').empty().append('Title Not Set').addClass('commons-missinf-meta-title');
	   	 	$('#meta-data-message').append('<span>This object record may be incomplete and may include outdated information. Other information may exist in a non-digital form. The Museum continues to update and add new research to collection records.</span>');
	    	console.log("no meta data last option !");
	    	}
	  
}		

Mainview.prototype.metaDataMissing = function (mainview, umo) {
	
  $('#meta-data-message').append('<span>This object record may be incomplete and may include outdated information. Other information may exist in a non-digital form. The Museum continues to update and add new research to collection records.</span>');
	    	    	
}
