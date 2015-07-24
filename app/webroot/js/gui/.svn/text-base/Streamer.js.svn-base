// constructor 
function Streamer(cfg)
{
	var streamer = this;
	this.timeout = 4000; // slideshow mode timeout
	this.cfg = cfg;		
	this.current_index = -1;
	this.current_slide = 1;
	this.interval_id = 0;
	this.current = 1;
	this.events = {};		
	this.mainview = undefined;
}

Streamer.prototype.setMainView = function(mainview)
{
	this.mainview = mainview;
}

Streamer.prototype.showMetaData = function()
{
		
		
};

Streamer.prototype.setData = function(umos)
{
	this.umos = umos;
};

Streamer.prototype.showLoader = function()
{
	$('#stream-loader').show();	
	
};

Streamer.prototype.hideLoader = function()
{
	$('#stream-loader').hide();	
};

Streamer.prototype.open = function(streamer, index)
{	
	var i = 0;
	if(index) i = index;	
	streamer.current_index = i;		
		
	streamer.showLoader($('#stream-umo1'));	
				
	var umo = streamer.cfg.umos[i];						
	objImg = new Image();
	objImg.src = 'http://piction.bpoc.org/piction/'+umo.w;
	objImg.onload = function() 
	{   
		    
		streamer.hideLoader();                                                       
		$('#stream-umo1').css("background-image","url(http://piction.bpoc.org/piction/"+umo.w+")");	
		//$('div.stream-header').empty().append(umo.n);	
	}
	
	//$('#view-container').fadeOut(700, function()
	//{
		//$('#streamer-holder').fadeIn(700);
		//$('div.stream-header2').append(umo.n)	
	//});		
	
}

Streamer.prototype.close = function(e)
{
	var streamer = e.data.obj;
	$('#streamer-holder').fadeOut(700, 
	function() 
	{
		
		$('#view-container').fadeIn(700);
		clearInterval(streamer.interval_id);	
		streamer.resetSlides();
	
		var hide = streamer.cfg.hideElementsOnOpen;
		if(!hide) return;
		for(var i = 0; i<hide.length; i++)
		{
			$('#'+hide[i]).fadeIn(700);
		}
	});
};



Streamer.prototype.resetSlides = function()
{
	$curr_slide = $('#stream-umo1');
	$next_slide = $('#stream-umo2');
				
	$curr_slide.after($next_slide);  	
	$curr_slide.removeAttr('style');
	$curr_slide.removeClass('stream-slide-right,stream-slide-view,stream-slide-left');		
	$curr_slide.addClass('stream-slide-view');
	  	  
	$next_slide.removeAttr('style');
	$next_slide.removeClass('stream-slide-right,stream-slide-view,stream-slide-left');		
	$next_slide.addClass('stream-slide-right');  	
}

Streamer.prototype.setGui = function(cfg, streamer)
{	
	if(cfg.trigger)
	{
		$('#'+cfg.trigger).children().each(function(i)		 
		{		
			$(this).click(function()
			{				
					streamer.open(streamer, i);	
										
			});
		});	
	}
				
	$('a.stream-Next').bind('click', {obj:streamer}, streamer.next );
	$('a.stream-Back').bind('click', {obj:streamer}, streamer.back );
	$('a.stream-Close').bind('click', {obj:streamer}, streamer.close );
	$('a.stream-Play').bind('click', {obj:streamer}, streamer.play );
	$('a.stream-Pause').bind('click', {obj:streamer}, streamer.stop );
	$('a.stream-Add').bind('click', {obj:streamer}, streamer.add );	
	$('a.stream-Info').bind('click', {obj:streamer}, streamer.information );	
};

Streamer.prototype.add = function(e)
{
	var streamer = e.data.obj;	
	if(typeof $this.onAdd == 'function') 
	{
		$this.onAdd();
	}
};



/**
 * Starts slideshow by opening up a slide then playing
 */
Streamer.prototype.start = function(streamer, index)
{
	var i = 0;
	if(index) i = index;
	
	streamer.current_index = i;					
	var umo = streamer.cfg.umos[i];						
	objImg = new Image();
	objImg.src = 'http://piction.bpoc.org/piction/'+umo.w;
	objImg.onload = function() 
	{                                                                          
	   $('#'+streamer.cfg.main).css("background-image","url(http://piction.bpoc.org/piction/"+umo.w+")");
	  // $('div.stream-header').append(umo.n);  	  
	  // $('div.stream-header2').append(umo.n); 
		
	}						
	$('#'+streamer.cfg.trigger).fadeOut(700, function()
	{
		$('#streamer-holder').fadeIn(700); 
	});
	console.log("Streamer.start executed");
}


Streamer.prototype.render = function()
{	
	$('#'+this.cfg.holder).append('<div id="stream-umo1" class="stream-umo stream-slide-view"></div>');
	$('#stream-umo1').after('<div id="stream-umo2" class="stream-umo stream-slide-right"></div>');
	
	$('#'+this.cfg.holder).hide();

	$('div.stream-header2').empty(); 

	$('div.stream-umo').append('<div class="stream-header"></div>');
	$('div.stream-umo').append('<img id="stream-loader" alt="loading gif" src="/img/loading.gif">'); // loader
	this.hideLoader();
		
	var buttons = new Array('Close', 'Back', 'Play', 'Pause', 'Next', 'Info');
	var buttons_holder = $('<div id="streamer-buttons"></div>');		
	$('div.stream-umo').append('<div class="stream-toolbar"></div>');
	
	for(var i = 0; i<buttons.length; i++)
	{		
		$('div.stream-toolbar').append($('<a>').addClass("stream-"+buttons[i]).append(buttons[i]));	
		$('div.stream-toolbar').css('display', 'none');
	}	
	
	$("a.stream-Info").attr(
		{
		title: 'Click to view image meta data and interact',
		href: '#'
	     });
	     
    $("a.stream-Info").addClass("meta-data-container-open");
    
	$('.stream-Pause').hide();
	  
	this.cfg.main = 'stream-umo1';
	this.cfg.second = 'stream-umo2';
	this.onHover(); // setup hover
	this.setGui(this.cfg, this);
	
	//console.log("Streamer.render executed");
};

Streamer.prototype.onHover = function()
{
	$('div.stream-umo').mouseenter(function() 
	{
		$('div.stream-toolbar').fadeIn(300);
		$('div.stream-header').fadeIn(300);
	});	
	
	$('div.stream-umo').mouseleave(function() 
	{
		$('div.stream-toolbar').fadeOut(300);
		$('div.stream-header').fadeOut(300);
	});
};

Streamer.prototype.draw = function(obj, slideFn)
{	
	var $curr_slide;
	var $next_slide;
	if(this.current%2==0)
	{
		$curr_slide = $('#stream-umo2');
		$next_slide = $('#stream-umo1');
		this.current = 1;			
	}
	else
	{
		$curr_slide = $('#stream-umo1');
		$next_slide = $('#stream-umo2');			
		this.current = 0;	
	}
	obj.showLoader($curr_slide);
	var umo = obj.cfg.umos[obj.current_index];						
	var objImg = new Image();
	objImg.src = 'http://piction.bpoc.org/piction/'+umo.w;
	objImg.onload = function() 
	{
		obj.hideLoader();
		$next_slide.css("background-image","url(http://piction.bpoc.org/piction/"+umo.w+")");	

		slideFn($curr_slide, $next_slide);	
		
		if(obj.is_playing==true)
		{
			obj.interval_id = setTimeout(function(){obj.next(obj); }, obj.timeout+1500);
		}		
 
  }		
	console.log("Streamer.draw executed");
}

/***
 * Will move current slide to left
 */
Streamer.slideLeft = function($curr_slide, $next_slide)
{	
  $next_slide.removeClass('stream-slide-left');
  $next_slide.addClass('stream-slide-right'); 	
	
	$curr_slide.animate({
    marginLeft: -1024}, 1000, function()
    {		      	
    	$next_slide.after($curr_slide);
    	$curr_slide.removeAttr('style');		
    	$curr_slide.addClass('stream-slide-right');  
    	$curr_slide.removeClass('stream-slide-view');	      			    	     
  	}
  ); 
  $next_slide.animate({
    marginLeft: 0}, 1000, function()
    {		      	
      $next_slide.removeClass('stream-slide-right'); 	  
      $next_slide.addClass('stream-slide-view');     
  	}
  );
}

/***
 * Will move current slide to right
 */
Streamer.slideRight = function($curr_slide, $next_slide)
{	
  $next_slide.removeClass('stream-slide-right');
  $next_slide.addClass('stream-slide-left'); 	
	
	$curr_slide.animate({
	  marginLeft: 1024}, 1000, function()
	  {		      	
	  	$curr_slide.before($next_slide);
	  	$curr_slide.removeAttr('style');   
	  	$curr_slide.addClass('stream-slide-left');  
	  	$curr_slide.removeClass('stream-slide-view');	
		}
  );       
  $next_slide.animate({
    marginLeft: 0}, 1000, function()
    {		      	
      $next_slide.removeClass('stream-slide-left'); 	  
      $next_slide.addClass('stream-slide-view');     
  	}
  );	
}

Streamer.prototype.callNextEvents = function(e)
{
	
	var obj;
	if(e instanceof Streamer) { obj = e; }
	else { obj = e.data.obj; }
	
	var curUmo = obj.cfg.umos[obj.current_index];
	obj.mainview.displayMetadata(obj.mainview, curUmo);
}

/**
 * Slides to the right
 */
Streamer.prototype.next = function(e)
{	
	
	
	var obj;
	if(e instanceof Streamer) { obj = e; }
	else { obj = e.data.obj; }
	
	obj.current_index++;
	
	obj.callNextEvents(e);
		
	if(obj.current_index==obj.cfg.umos.length) 
	{
		obj.current_index = 0;
	}
	obj.draw(obj, Streamer.slideLeft);	
	
	
}

/**
 * Slides to the left
 */
Streamer.prototype.back = function(e)
{
	var obj;
	if(e instanceof Streamer) { obj = e; }
	else { obj = e.data.obj; }
	
	obj.current_index--;	
	
	if(obj.current_index==-1) {
		obj.current_index = obj.cfg.umos.length-1;
	}	
	obj.draw(obj, Streamer.slideRight);
};

/**
 * Plays slideshow with slider already open
 */
Streamer.prototype.play = function(e)
{
	// toggle play button
	$('.stream-Next').hide();
	$('.stream-Back').hide();
	$('.stream-Play').hide();
	$('.stream-Pause').show();
	
	var obj;
	if(e instanceof Streamer) { obj = e; }
	else { obj = e.data.obj; }
	
	
	//obj.interval_id = setInterval(function(){obj.next(obj); }, obj.timeout);
	obj.is_playing = true;
	obj.interval_id = setTimeout(function(){obj.next(obj); }, obj.timeout);	
};

Streamer.prototype.stop = function(e)
{	
	var obj;
	if(e instanceof Streamer) { obj = e; }
	else { obj = e.data.obj; }
	
	//clearInterval(obj.interval_id);
	
	obj.is_playing=false;	
	$('.stream-Next').show();
	$('.stream-Back').show();	
	$('.stream-Play').show();
	$('.stream-Pause').hide();	
	$('.stream-Info').show();
	$('#stream-loader').hide();
};

Streamer.prototype.information = function(e)
{	
	
	var obj;
	if(e instanceof Streamer) { obj = e; }
	else { obj = e.data.obj; }
	
	View.openMetaData();
	//clearInterval(obj.interval_id);
	
	obj.is_playing=false;	
	$('.stream-Next').show();
	$('.stream-Back').show();	
	$('.stream-Play').show();
	$('.stream-Stop').show();
	View.openMetaData();

};