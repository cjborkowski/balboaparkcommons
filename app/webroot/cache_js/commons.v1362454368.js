function PEvent()
{
	//Public vars
	
	// Private vars
	var eventHandlers = {};
	var eventNames = arguments;

	// Public methods
	this.addEventHandler = addEventHandler;
	this.removeEventHandler = removeEventHandler;
	this.executeEvent = executeEvent;
		

	// Methods

	function init()
	{
		for( var i=0; i<eventNames.length; i++ )
		{
			eventHandlers[eventNames[i]] = [];
		}
	}
	init();
	
	/***
	 * Adds an event handler
	 * @eventName string name of the event
	 * @handler function method to run when event is triggered
	 * @thisobj object context of handler (thisobj will be the "this" within handler)
	 */
	function addEventHandler(eventName, handler, thisobj)
	{
		if( $.isArray(eventHandlers[eventName]) && $.isFunction(handler) )
		{
			eventHandlers[eventName].push([handler,thisobj]);
		}
		
	}
	
	/***
	 * Removes an event handler
	 * @eventName string name of the event
	 * @handler function method to remove. Must be the same as the method that was used in addEventHandler
	 */	
	function removeEventHandler(eventName, handler)
	{
		
	}

	/***
	 * Executes an event
	 * @eventName string name of the event to be triggered
	 */		
	function executeEvent(eventName)
	{
		if( $.isArray(eventHandlers[eventName]) )
		{
			for( var i=0; i<eventHandlers[eventName].length; i++ )
			{
				try{
					eventHandlers[eventName][i][0].apply(eventHandlers[eventName][i][1],[eventName]);
				}
				catch(e)
				{
					throw e;
				}
			}
		}
	}
}

var Msgs = function() {}


Msgs.init = function()
{
	//$(document).append('<div id="msgs"></div>');
}

// Methods

Msgs.showMsgDialog = function(msg, title)
{
	$('<div>'+msg+'</div>').dialog( View.createDialogConfig({
		title: title,
		buttons: {
			"Ok": function(){
				$(this).dialog('close');
			}
		},
		close: function(ev, ui) { $(this).remove(); }
	}));
	
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_ok-button");
}

Msgs.showError = function(msg)
{
	var title = 'An error has occured';
	if( typeof msg == 'string' ) 
	{
		if( msg == '' ) this.showMsgDialog('Unknown. Please try again.', title);
		else this.showMsgDialog(msg, title);
	}
	
}


/***
 *
 */

Msgs.showMsg = function(msg)
{
	this.showMsgDialog(msg, 'Info');
}

Msgs.showLoading = function(jqel)
{
	if( jqel.is(":visible") )
	{
		var loader_id = jqel.attr('id')+'__loading';
		
		if( $('#'+loader_id).length > 0 )
		{
			return false;
		}
		
		jqel.prepend('<div id="'+loader_id+'" class="msgs-loading-holder"></div>');
		$('#'+loader_id).position({
			my: 'center center',
			at: 'center center',
			of: jqel
		});
		
		return true;
	}
	else
	{
		return false;
	}
}

Msgs.removeLoading = function(jqel)
{
	var loader_el = $('#'+jqel.attr('id')+'__loading');
	
	loader_el.remove();
}
var Session = function() {}
Session.ajaxurl = 'http://staging.commons.bpoc.org/index.php/ajax/';
Session.host = 'http://staging.commons.bpoc.org/';

//Session.ajaxurl = 'http://www.balboaparkcommons.org/index.php/ajax/';
//Session.host = 'http://www.balboaparkcommons.org/';
Session.surl = '';
Session.username = '';
Session.img_host = "http://piction.bpoc.org/piction/";

Session.isLoggedIn = function()
{
  if( Session.surl != "" ) return true;
  else return false;
};var Profile = function() {}
Profile.eventObj = new PEvent("onlogin", "onlogout");

/***
 * Registers a new user profile 
 * @inputs { }
 * @success function triggered at success
 * @fail function triggered at fail
 */
Profile.register = function(inputs, success, fail)
{
	console.log ('Profile.register called');
	var pars = 
	{
		n: 'REGISTER_PROFILE',
		ACTION:'COPY',
		TEMPLATE_PROFILE:'Joe Public',
		LOGIN:'TRUE',
		USERNAME:inputs.username,
		PASSWORD:inputs.reg_password,
		FIRSTNAME:inputs.firstname,
		LASTNAME:inputs.lastname,
		EMAIL:inputs.email			
	}
	success = function(json)
	{	
		Msgs.removeLoading($('#register-box'));
		
		if( json.s.s == 'T' )
		{
			$('#register-box').dialog('close');	
			Session.login = json;
			Session.surl = json.surl;	
			Session.username = json.username;
			View.setLoggedIn();
		}
		else
		{
			Msgs.showError(json.s.m);
		}
		
					
	}	
	$.ajax({
	  type: 'GET',
	  //cache: false,
	  url: Session.ajaxurl,
	  data: pars,
	  success: success,
	  dataType: 'json'
	});	
	
	Msgs.showLoading($('#register-box'));
}

Profile.edit = function(inputs, success, fail)
{
	console.log ('Profile.edit called');
	var pars = 
	{
		n: 'EDIT_PROFILE',
		USERNAME:Session.username,
		PASSWORD:inputs.password
	   		
	}
	success = function(json)
	{	
		Msgs.removeLoading($('#edit-box'));
		
		if( json.s.s == 'T' )
		{
			Msgs.showMsgDialog('Your password has been updated.', 'Password Update Success');
			//$('#profile-edit-box').dialog('close');	
			View.showProfileEditSucess();
			//View.setLoggedIn();
		}
		else
		{
			Msgs.showError(json.s.m);
		}
		
					
	}	
	$.ajax({
	  type: 'GET',
	  //cache: false,
	  url: Session.ajaxurl,
	  data: pars,
	  success: success,
	  dataType: 'json'
	});	
	
	Msgs.showLoading($('#edit-box'));
}


/***
 * Logs in a user profile
 * @inputs { username, password}
 * @success function triggered at succes
 * @fail function triggered at afail
 */
Profile.login = function(inputs, success, fail)
{	
	console.log ('Profile.login called');			
	var pars = { n: 'Piction_Login', username: inputs.username, password: inputs.password};
	Session.username = inputs.username;
	success = function(json)
	{		
		Msgs.removeLoading($('#login-box'));
		$('#login-form').unbind('submit');
		Session.login = json;
		Session.surl = json.SURL;
		if(json.SURL)
		{	
			/* remove for now		
			$('#login-box').dialog('close');*/			
			View.setLoggedIn();
		}
		else
		{
			Msgs.showError('The username/password was incorrect');
		}		
	
	}	
	$.ajax({
	  type: 'GET',
	  //cache: false,
	  url: Session.ajaxurl,
	  data: pars,
	  success: success,
	  dataType: 'json',
	  context:pars
	});	
	
	Msgs.showLoading($('#login-box'));
}

/***
 * Logs out a user profile
 * @inputs { surl }
 * @success function triggered at succes
 * @fail function triggered at afail
 */
Profile.logout = function(inputs, success, fail)
{
	var pars = { n:'Logout', SURL: Session.surl };
	
	success = function(json)
	{
		Profile.eventObj.executeEvent("onlogout");
		View.LoggedOut();
		Msgs.removeLoading($('#login-box'));
		console.log('session killed in AJAX success function');
		window.location = '/';
	}	
		
	$.ajax({
	  type: 'GET',
	  cache: false,
	  url: Session.ajaxurl,
	  data: pars,
	  success: success,
	  dataType: 'json'
	});

	
	
};var Umo = function() {};

Umo.saveToSession = function(umo)
{
	var pars = { n:'Session_Umo_Save', umoid:umo.pk, thumbnail:umo.u, web:umo.w};

	$.ajax({
	  type: 'GET',
	  url: Session.ajaxurl,
	  data: pars,
	  context: this,
	  success: Umo.saveToSessionSuccess,
	  dataType: 'json'
	});
};

Umo.saveToSessionSuccess = function(umoarr)
{
		var html = "<li><a class=\"thumb\" href=\"/img/carousel-thumb-1.png\" title=\"Title #0\"> <img src=\""+Session.img_host+umoarr[umoarr.length-1].thumbnail+"\" alt=\"Title #0\" /></a></li>";
		$('#history-thumbs').append(html);	
		var count = $("#history-thumbs li").length;
      	console.log(count);	
      	View.setScrollto(count);
};

Umo.loadSessionImages = function()
{
	var pars = { n:'Session_Umo_Get'};

	$.ajax({
	  type: 'GET',
	  url: Session.ajaxurl,
	  data: pars,
	  context: this,
	  success: Umo.loadSessionImagesSucess,
	  dataType: 'json'
	});	
};

Umo.loadSessionImagesSucess = function(umoarr, umo)
{
	for(var i = 0; i<umoarr.length; i++)
	{
		var html = "<li><a class=\"thumb\" href=\"/img/carousel-thumb-1.png\" title=\"Title #0\"> <img src=\""+Session.img_host+umoarr[i].thumbnail+"\" alt=\"Title #0\" /></a></li>";
		$('#history-thumbs').append(html);
		var count = $("#history-thumbs li").length;
      	console.log(count);	
      	View.setScrollto(count);
					
	}
	
};
function PEvent()
{
	//Public vars
	
	// Private vars
	var eventHandlers = {};
	var eventNames = arguments;

	// Public methods
	this.addEventHandler = addEventHandler;
	this.removeEventHandler = removeEventHandler;
	this.executeEvent = executeEvent;
		

	// Methods

	function init()
	{
		for( var i=0; i<eventNames.length; i++ )
		{
			eventHandlers[eventNames[i]] = [];
		}
	}
	init();
	
	/***
	 * Adds an event handler
	 * @eventName string name of the event
	 * @handler function method to run when event is triggered
	 * @thisobj object context of handler (thisobj will be the "this" within handler)
	 */
	function addEventHandler(eventName, handler, thisobj)
	{
		if( $.isArray(eventHandlers[eventName]) && $.isFunction(handler) )
		{
			eventHandlers[eventName].push([handler,thisobj]);
		}
		
	}
	
	/***
	 * Removes an event handler
	 * @eventName string name of the event
	 * @handler function method to remove. Must be the same as the method that was used in addEventHandler
	 */	
	function removeEventHandler(eventName, handler)
	{
		
	}

	/***
	 * Executes an event
	 * @eventName string name of the event to be triggered
	 */		
	function executeEvent(eventName)
	{
		if( $.isArray(eventHandlers[eventName]) )
		{
			for( var i=0; i<eventHandlers[eventName].length; i++ )
			{
				try{
					eventHandlers[eventName][i][0].apply(eventHandlers[eventName][i][1],[eventName]);
				}
				catch(e)
				{
					throw e;
				}
			}
		}
	}
}

function View(){ }

View.setData = function(data)
{
	View.data = data;
}

View.setController = function(controller)
{
	View.controller = controller;
	View.styleSelects(controller);
}

View.setAction = function(action)
{
	View.action = action;
	View.setDisplayButtons(action);
	//return action;
}

View.initPage = function()
{		
	//prioirty
	View.setTabs();
	View.setSlideshow();
	View.setDropupMenu();
	View.styleSelects();
	View.setThirdParty();
	View.hideNav();
	//funtionality
	View.setSearch();
	View.setMiscClicks();
	View.setPager();
	View.setDialogPanels();
	View.setLightboxDraggables();
	View.confirmDeleatePost();
	//styling	
	View.setQtips();
	View.getWindowSize();
	View.dynamicContainer();
	View.setdownloadCookie();
	View.setLoggedIn();
	View.DropUpsClicks();
	View.setDisplayButtons();
	View.setImageScale();
	View.changeToLink();
	View.setScrollBars();
	View.submitEnterLogin();
};

View.showNodload = function (){
	
	
	if(Session.surl){	
	var downLoadMessage  = '<p>Your Download will begin shortly.</p>';
	var downLoadTitle = 'Download Progress';
	} else{
	var downLoadMessage  = '<p>Please register and/or login to download this image.</p>';
	var downLoadTitle = 'Please Login';
	}
	
	$('<div class="share-this-container">'+downLoadMessage+'</div>').dialog(View.createDialogConfig({
		title: downLoadTitle,
		width: 246,
		height: 136,
		modal: true,
		buttons: {
			
			'OK': function(){
				$(this).dialog('close');
			}
		},
		open: Lightbox.onOpenRemoveLB,
		close: function(ev, ui) { $(this).remove(); },
		beforeClose: Lightbox.onCloseRemoveLB
	}));
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_ok-button");

	
}


View.setdownloadCookie =function(){		
	if($.cookie('fileDownload') == null) {
	$.cookie('fileDownload', 'true', {
			path : '/'
		});
	}
}

View.getWindowSize = function(){
	//console.log('getWindowSize recived:' +$.cookie('browse_selects'));
	//var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	var headerPosition = $('#animator').position()
	var headerHeight = $('#header').height(); //100

	if ( $('#floating-title').is(':visible')){
	var floatingTitle = 90 // see View.hideNav
	}else{
	var floatingTitle = 0;	
	}
	
	if($("div#nav-tab").hasClass("open")){
	var openMenu = 0;
	} else {
	var openMenu = 99;
	}
	
	var footerHeight = $('#footer').height(); //162
	var scrollGutter = 16;
	var subThis = viewportHeight - headerHeight - floatingTitle - footerHeight + openMenu ;
	
	//console.log('viewportHeight is : '+viewportHeight);
	//console.log('floatingTitle is : '+floatingTitle);
	//console.log('OpenMenu is: ' + openMenu);
	//console.log('headerHeight is : '+headerHeight);
	//console.log('footerHeight is : '+footerHeight);
	//console.log('subThis is : '+subThis);
	
	$('#view-container, #slideshow-background').css('height', subThis);
	return subThis;
}

View.dynamicContainer =function(){
//A way to timeout on the last event
	var waitForFinalEvent = (function () {
  	var timers = {};
  	return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  	};
	})();

	$(window).resize(function () {
		
    waitForFinalEvent(function(){
      //console.log('Resize...');
      	var subThis = View.getWindowSize();
      	$('#view-container').css('height', subThis);
		$('#animator').css('height', '100%');
		
    }, 50, "some unique string");
	});
}

View.setSearch = function(){
	
	$('#piction-search-button').click(function(){
		var val = $('#piction-search-textfield').val();
		window.location.href = '/objectview/gridview/search/'+escape(val);
		//window.location.href = Session.host + 'objectview/gridview/search/'+escape(val);
		$.cookie('search',escape(val) , {
				path : '/'
			});
		//console.log('redirecting to to seach setting a search cookie to:'+$.cookie('search'));
	});
}

View.submitEnterLogin = function (myfield,e)
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if (keycode == 13)
   {
   //myfield.form.submit();
   $('#login-form').bind('submit');
   View.onSubmitLogin();
   return false;
   }
else
   return true;
}


View.setMiscClicks = function(){
	//Button Sections
	$('#login-submit').button().click(function(){
		
		// TODO bind function ?
		$('#login-form').bind('submit');
		View.onSubmitLogin();
	});
	
	
	$('#logout-submit').button().click(function(e){
		Profile.logout(Session.surl);
		Msgs.showLoading($('#login-box'));
		//will return to View.logged out		
	});
	//end button section
	//clears the value of form inputs with the class name
	//TODO centralize this function
	$('.no-down-load-link').click(function(){
		View.showNodload();	
		//console.log ('no-down-load-link clicked');	
	}); 
	
	// clear values on focus.
	$('#login-username, #login-password, #reg-password, #confirm-password, #piction-search').focus(function(){
		$(this).val('');
	});
	
	$('.new-nav-inputs').click(function()
	{
		$(this).val('');
	});

	$('#new-nav-sets-save a').click(function()
	{
	
	if ( $(this).data('downloadable') === 'false') {
	Msgs.showMsgDialog('This set is empty. There\'s nothing to download. Please add a picture to this set', 'Empty Set');
	return false; 
	}   
	
	View.clickDownloads();
	
	});
	
	$('#remind-link').click(function(){
		View.showProfileEdit();
	});
	
	$('.institution-link').click(function(){
		//reset cookie
		//console.log('institution-link clicked');
		$.cookie('browse_selects', 'collections', {
				path : '/'
			});
		//alert('setting cookie :');
	});
	
}

View.setSlideshow = function(){
	//console.log('in View.setSlideshow');
	$('#slideshow-slides').after('<ul id="slide-controll">');
	$('#slide-controll').wrap('<div id="pager-wrap" />');
	$('#slideshow-slides').cycle({ 
    fx:      'scrollLeft',  
  	speed:  880,
   	timeout: 8000,
    autostop: 1, 
    autostopCount: 5 ,
	pager:  '#slide-controll',
	
	pagerAnchorBuilder: function(idx, slide) { 
        return '<li><a href="#"></a></li>'; 
    } 
	
	});
	
	
}

View.clickDownloads = function(){
	
	$('<div id="download" class="commons-dialog"><p>Your download will begin shortly.</p></div>').dialog(View.createDialogConfig({
		title: 'File Download',
		width: 246,
		height: 136,
		modal: true,
		
		buttons: {
			
			'OK': function(){
				$(this).dialog('close');
			}
		}
	}));
	
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_ok-button");
	$(".ui-dialog-buttonset button:nth-child(1)").css('float','right');
	
	var durl = $('input[name=data[download-radio]]:checked', '#download-piction').val()
	//console.log ('we have this val: '+durl);
	$.fileDownload(durl, {
                    successCallback: function (url) {

                        $('#download').dialog('close');
                    },
                    failCallback: function (responseHtml, url) {

                        $('#download').dialog('close');
                       View.dowloadError();
                    }
              });	
}

View.dowloadError = function (){
	
		$('<div id="download-error" class="commons-dialog"><p>We are sorry. Something went wrong with your download please try again shortly.</p></div>').dialog(View.createDialogConfig({
		title: 'File Download Error',
		width: 246,
		height: 136,
		modal: true,
		
		buttons: {
			
			'OK': function(){
				$(this).dialog('close');
			}
		}
	}));
	
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_ok-button");
	$(".ui-dialog-buttonset button:nth-child(1)").css('float','right');
}

View.setFullDialog = function(lbname){
	
	$('<div id="download" class="commons-dialog"><p>Your set titled '+lbname+' contains 12 images and now is full. No more images can be added at this point</p></div>').dialog(View.createDialogConfig({
		title: 'Your Set is full.',
		width: 246,
		height: 136,
		modal: true,
		
		buttons: {
			
			'OK': function(){
				$(this).dialog('close');
			}
		}
	}));
	
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_ok-button");
	$(".ui-dialog-buttonset button:nth-child(1)").css('float','right');
	
}
//Login Section
View.onSubmitLogin = function(e)
{
	var data = 
	{
		username:$('#login-username').val(),
		password:$('#login-password').val()
		
	}		
	Profile.login(data);
	
}

View.setLoggedIn = function()
{
	if(Session.surl!="")
	{
	   $('#new-nav-login').removeClass('new-nav-login').addClass('new-nav-login-blank');
	   $('#login-submit').hide();
	   $('#logout-submit, #show-set-container, #remind-link').show();
	   $('#registration-link').hide();
	   $('.list-view-share-download-link').each(function(){
	   	 $(this).removeClass('no-down-load-link');
	   })
	  
	  
	  $('.list-view-download-link').each(function(){
			var URLstring = $(this).attr("id");
			//console.log ('URL tring is :'+  URLstring);
			var search = "NOSURL!";
			var newSegment = Session.surl;
			
			var URLstring =URLstring.replace(search, newSegment);
			//text = text.replace(seach, replace);
			$(this).attr('href', URLstring);
			$(this).removeClass('no-down-load-link');
			//console.log ('setLoggedIn is adding '+ URLstring +' and remmoving class: no-down-load-link');
		});
	  
	    
	   var trimName= Session.username
	   if(Session.username.length > 6)
		{
  		trimName = trimName.substr(0,6) + "...";
  		$('#new-nav-main-body-login-text-left').empty().append('<p>Logged in as '+Session.username+'</p>');
		$('#new-nav-login a').empty().append(trimName);
		
		} else{
		$('#new-nav-main-body-login-text-left').empty().append('<p>Logged in as '+Session.username+'</p>');
		$('#new-nav-login a').empty().append(Session.username);
		}	
	
		//console.log("logged in !");
		Profile.eventObj.executeEvent("onlogin");
	}
	else
	{
		$('#new-nav-main-body-login-text-left').empty().append('<p>login</p>');
		$('#logout-submit, #show-set-container, #remind-link').hide();
		
	}
		
}

//logout function
View.LoggedOut= function(){
	//console.log('View.LoggedOut function');
	
	$('#lbarea-dropdown').empty().append('<option value="0" class="none">no sets</option>');
	
	$('#logout-submit').hide();
	$('.new-nave-sets-buttons , #new-nav-user-sets-buttons, #new-nav-downnload-radio').hide();
	$('#registration-link, #login-submit').show();
	$('#lbarea-content').empty();
	$('#new-nav-user-sets-selected-upper-text').empty().append('<p>please register/login to use sets</p>');
	$('#new-nav-main-body-login-text-left').empty().append('<p>login</p>');
	//$('#new-nav-sets-lower').css('opacity','.20');
	$('#new-nav-login').removeClass('new-nav-login-blank').addClass('new-nav-login');
	$('.list-view-download-link').each(function(){
			$(this).attr('href', '#');
			$(this).addClass('no-download-link');
	});
}

//these are orphand 
// TODO: make new event and binding hanlers
View.onOpenLogin = function()
{
	// Register event handlers
	$('#login-form').submit(View.onSubmitLogin);
}

View.onCloseLogin = function()
{
	// Deregister event handlers
	$('#login-form').unbind('submit');
}

//registration section - all display
//TODO: check var form
View.onSubmitRegister = function(e)
{
	//console.log('View.onSubmitRegister is being called');
	var form = $("#register-form");
	var data = {};
	form.find(':input').each(function()
	{
		data[$(this).attr('name')] = $(this).val();
	});				
	Profile.register(data);
}

View.onOpenRegister = function()
{
	//console.log('View.onOpenRegister is being called');
	// Register event handlers
	$('#register-form').submit(View.onSubmitRegister);

}

View.onCloseRegister = function()
{
	//console.log('View.onCloseRegister is being called');
	// Deregister event handlers
	$('#register-form').unbind('submit');
}

View.OpenRegister = function(){
	
		//console.log('in register open');
	var regForm ='';
	regForm += '<div id="register-box" title="" class="commons-dialog">';
	regForm += '<form name="register-form" id="register-form" onSubmit="return false">';
	regForm += '<label id="lfirstname" for="firstname">First Name</label>';
	regForm += '<span class="valid-state"></span>';
	regForm += '<input type="text" name="firstname" id="firstname" value="" class="new-nav-inputs new-reg-inputs" /> ';
	regForm += '<label id="llastname for="lastname">Last Name</label>';
	regForm += '<span class="valid-state"></span>';
	regForm += '<input type="text" name="lastname" id="lastname" value="" class="new-nav-inputs" />';
	regForm += '<label id="lusername" for="username">Username</label>';
	regForm += '<span class="valid-state"></span>';
	regForm += '<input type="text" name="username" id="username" value="" class="new-nav-inputs new-reg-inputs "/>';
	regForm += '<label id="lemail" for"email">Email</label>';
	regForm += '<span class="valid-state"></span>';
	regForm += '<input type="text" name="email" id="email" value="" class="new-nav-inputs new-reg-inputs" />';
	regForm += '<label id="lreg_password" for="reg_password">Password</label>';
	regForm += '<span class="valid-state"></span>';
	regForm += '<input id="reg_password" name="reg_password" type="password" maxlength="50" value="" class="new-nav-inputs new-reg-inputs" /> ';
	regForm += '<label id="lpassword_confirm" for="password_confirm">Confirm Password</label>';
	regForm += '<span class="valid-state"></span>';
	regForm += '<input id="password_confirm" name="password_confirm" type="password" maxlength="50" value=""  class="new-nav-inputs new-reg-inputs" />';
	regForm += '<label id="i-agree">I agree to the &nbsp;<a href="#" id="terms-of-use-link-2">Terms of Use</a></label>';
	regForm += '<span class="valid-state valid-state-last"></span>';
	regForm += '<input type="checkbox" class="new-nav-inputs new-reg-inputs" id="agree" name="agree" validate="required:true" /> ';
	regForm += '<input type=submit style=display:none />';
	regForm += '</form>';
	regForm += '<div style="clear:both;"></div>'; 
	regForm += '</div>';
	
	$(regForm).dialog(View.createDialogConfig({ // register
		title: 'Register',	
		dialogClass: 'register-box',
		width: 250,
		height: 520,
		zIndex: 500,
		modal:true,
		
		buttons: {
			"Register": function()
			{
			
			$('#register-form').submit();
			//$('#register-form').submit(View.onSubmitRegister);
		
			}, //end register funtion,

			"Cancel": function()
			{
				$(this).dialog("close");
			}
		},
		//close: View.onCloseRegister,
		close: function(ev, ui) { $(this).remove(); },
		//open: View.onOpenRegister,
		//open: View.validateRegForm,
		open: function(){
		//console.log('in modal open function');
			//View.onOpenRegister();
		},
		beforeClose: View.onCloseRegister
	}));
	
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_submit-button");
	$(".ui-dialog-buttonset button:nth-child(2)").addClass("dialog_cancel-button");
	//add click functionality
	$('#terms-of-use-link-2').click(function()
	{
		//console.log ('#terms-of-use-link-2 clicked');
		$('#terms-of-use-info-box').dialog('open');	
		return false;
	});
	
	var form = $("#register-form").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			username: {
				required: true,
				minlength: 2
			},
			reg_password: {
				required: true,
				minlength: 5
			},
			password_confirm: {
				required: true,
				minlength: 5,
				equalTo: "#reg_password"
			},
			email: {
				required: true,
				email: true
			},
			agree: {
    			required: true
			}	
		},
		messages: {
			firstname: "Please enter your firstname",
			lastname: "Please enter your lastname",
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			reg_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			password_confirm: {
				required: "Please confrim your password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Passwords Do Not Match !"
			},
			email: "Please enter a valid email address",
			agree: "Please agree to our Terms of Use"
		},
		
		errorPlacement: function(error, element) {
			error.appendTo( element.prev('span') );
		},
		
		success: function(label) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
		},
		
		submitHandler:function(form){ 
			//console.log(' modal function validate submitHandler is called');
			//alert(form+ ' has been submitted');
			View.onSubmitRegister();
			form.trigger('submit');
			form.submit();
		}	
	}); 
	
	$("#username").focus(function() {
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		if(firstname && lastname && !this.value) {
			this.value = firstname + "." + lastname;
		}
	});
	
}

// Profile edit section
View.onSubmitEditProfile = function(e)
{
	var form = $("#edit-profile-form");
	var data = 
	{
	password:$('#edit_password').val()
	}				
	
	Profile.edit(data);
}

View.onOpenEdit = function()
{
	// Register event handlers
	$('#edit-profile-form').submit(View.onSubmitEditProfile);
}

View.onCloseEdit = function()
{
	// Deregister event handlers
	$('#edit-profile-form').unbind('submit');
}

View.showProfileEdit = function(){
		 $('#new-nav-main-body-login-text-left').empty().append('<p>Change Password</p>');
		 $('#login-box').hide();
		 $('#edit-box').show();	
		 
		 
		var editForm='';
		editForm += '<form name="edit-profile-form" id="edit-profile-form" onSubmit="return false">		';
		editForm += '<div class="input password control-group">';
		editForm += '<label for="edit_password">new password</label>';
		editForm += '<span class="valid-state-check"></span>';
		editForm += '<input type="password" name="edit_password" value="" id="edit_password">';
		editForm += '<span class="valid-state"></span>';
		editForm += '</div>';
		editForm += '<div class="input password control-group">';
		editForm += '<label for="edit_confirm_password">confrim new password</label>';
		editForm += '<span class="valid-state-check"></span>';
		editForm += '<input type="password" name="edit_confirm_password" value="" id="edit_confirm_password">';
		editForm += '<span class="valid-state"></span>';
		editForm += '</div>	 ';
		editForm += '<a href="#" id="edit-submit" class="edit-profile-buttons dialog_save-button">save</a>';
		editForm += '<a href="#" id="cancle-submit" class="edit-profile-buttons profile-cancel-button">cancle</a>';
		editForm += '</form>';
		editForm += '<div style="clear:both;"></div>';
		 
		var checkMe = $('div.valid-state-check');
		 
		 $('#edit-box').html(editForm);	
		 $('#edit-submit').click(function(){
			 $('#edit-profile-form').submit();
		 	});
		 
		 $('#cancle-submit').click(function(){
			View.showProfileEditSucess();
			});
		 
		$('#edit-profile-form').unbind('submit');
		 
		var form = $("#edit-profile-form");
		$("#edit-profile-form").validate({
			//errorContainer: "#edit-profile-form-error" ,
			rules: {
				edit_password: {
					required: true,
					minlength: 5
				},
				edit_confirm_password: {
					required: true,
					minlength: 5,
					equalTo: "#edit_password"
				}
			
			},
			messages: {
				edit_password: {
					required: "Please provide a new password",
					minlength: "Your password must be at least 5 characters long"
			},
			edit_confirm_password: {
				required: "Please confrim your password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Passwords do not match !"
			}
			
		},
		errorPlacement: function(error, element) {
			$('#edit-profile-form-error').empty();
			error.appendTo( $('#edit-profile-form-error') );
		},	
		/*
		highlight: function(error, element) {
    	$('#edit-profile-form-error').empty();
    	//$(label).next('#edit-profile-form-error').addClass('error');
    	error.appendTo( $('#edit-profile-form-error') );
  		}, */
		
		submitHandler:function(form){ 
			View.onSubmitEditProfile();
			form.trigger('submit');
			form.submit();
		} ,
		success: function(label) {
    	label
      	.addClass('checked-2');
      	//.next('.valid-state-check').addClass('checked-2');
  		}
				
	}); 
		 		 
}

View.showProfileEditSucess = function(){
		 $('#new-nav-main-body-login-text-left').empty().append('<p>Logged in as '+Session.username+'</p>');
		 $('#login-box').show();
		 $('#edit-box').hide();	
		 $('#edit-profile-form-error').empty();
		 $('#edit-profile-form').unbind('submit');		 
}

View.setDialogPanels = function()
{			

	var Wheight = $(window).height();
	var Wwidth = $(window).width();
	//clicks to open dialog pannels
	$('#register-link').click(function()
	{
		//console.log('clicked register open');
		View.OpenRegister();
		return false;
	});
	
	/*$('#remind-link').click(function()
	{
		$('#remind-box').dialog('open');				
		return false;
	}); */
	
	/*$('#footer-grant-info-link').click(function()
	{
		$('#footer-grant-info-box').dialog('open');				
		return false;
	});*/
			
	
	$('#terms-of-use-link').click(function()
	{
		$('#terms-of-use-info-box').dialog('open');	
		return false;
	});
	
	$('#terms-of-use-link-2').click(function()
	{
		//console.log ('#terms-of-use-link-2 clicked');
		//$('#register-box').dialog('close');
		//$('#terms-of-use-info-box').dialog('open');	
		return false;
	});
	
	
	$('.description-overflow-link').click(function()
	{
		var id = $(this).attr('id');
		//console.log('description id: '+ id +' clicked');
		$('#description-overflow-'+id).dialog('open');				
		return false;
	});
	
	
	$('.single-image-dialog-link').click(function()
	{
	   $('.single-image-dialog-box').dialog('open');				
		return false;
	});
	
	
	$('.list-view-share-link').click(function(){
		
		var id = $(this).attr('id');
		//console.log('list-view-share-link ID is:' +id);
		View.OpenShareContainer(id); 		
		//$(this).next('.share-this-container').dialog('open');
		//$('#share-this-container-'+id).dialog('open');				
		return false;
	}); 
	//lightbox-share-link
	$('.lightbox-share-link').click(function(){
		
		var id = $(this).attr('id');
		//console.log('list-view-share-link ID is:' +id);
		View.OpenShareContainer(id); 		
		//$(this).next('.share-this-container').dialog('open');
		//$('#share-this-container-'+id).dialog('open');				
		return false;
	}); 
	
	
	
	$('.single-view-share-link').click(function(){
		$('.share-this-container').dialog('open');				
		return false;
	}); 
	
	
	//the dialog boxes the above opens	
	$('#remind-box').dialog(View.createDialogConfig({ // reminder
		title: 'Forgot Username/Password',	
		autoOpen: false,
		dialogClass: 'remind-box',
		width: 248,
		height: 500,
		buttons: {
			"Submit": function()
			{
				$('#remind-form').trigger('submit');
			},
			"Cancel": function()
			{
				$(this).dialog('close');
			}
		},
		close: View.onCloseRemind,
		
		open: View.onOpenRemind
	
	}));	
	
	//make relative
	var $divGrant = $('#footer-grant-info-box');
    var left = $divGrant.offset().left;
    var top= $divGrant.offset().top;
	
	$('#footer-grant-info-box').dialog(View.createDialogConfig({ // ILMS Leadership grant info	
		dialogClass: 'dialog-pic dialog-pic-notitle',
		autoOpen: false,
		width: 447,
		height: 220,
		modal: true,
		position: [left + 0, top - 550]			
	}));	
	
	$('#terms-of-use-info-box').dialog(View.createDialogConfig({
		dialogClass: 'termsof-use-dialog-pic dialog-pic dialog-pic-notitle', 	
		autoOpen: false,
		width: 800,
		height: 500,	
		modal: true		
	}));
	
	$('.description-overflow').dialog(View.createDialogConfig({
		dialogClass: 'dialog-pic dialog-pic-notitle', 	
		autoOpen: false,
		modal:true,
		width: 800			
	}));
	
	
	$('.single-image-dialog-box').dialog(View.createDialogConfig({
		dialogClass: 'single-dialog-pic dialog-pic dialog-pic-notitle', 	
		autoOpen: false,
		modal:true,
		width: Wwidth,
		height: Wheight	
				
	}));
	
	//style - make all dialog panesl have left and right bottons when needed
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_submit-button");
	$(".ui-dialog-buttonset button:nth-child(2)").addClass("dialog_cancel-button");
}

/*opens a specific dialig box */
View.OpenShareContainer = function(id){
	//console.log ('in new OpenShareContainer');
	$('#share-this-container-'+id).dialog('open');
	
	$('.add-this-end').click(function(){
		$('#share-this-container-'+id).dialog('close');
	});
	
	$('#share-this-container-'+id).dialog(View.createDialogConfig({
		title: 'Share',
		width: 246,
		height: 136,
		//modal: true,
		buttons: {
			
			'Cancle': function(){
				$('#share-this-container-'+id).dialog('close');
				
			}
		}
		//open: Lightbox.onOpenRemoveLB,
		//close: function(ev, ui) { $(this).remove(); },
		//beforeClose: Lightbox.onCloseRemoveLB
	}));
	
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_cancel-button");
	
}


/**
 * Use this to create a set of options with default settings
 * @options object of additional settings which can override the default
 */
View.createDialogConfig = function(options)
{
	var newoptions = jQuery.extend({
		dialogClass: 'dialog-pic commons-dialog',
		show: 'fade',
	  	hide: 'fade',
		modal: true,
		resizable: false,
		draggable: false,
	
		},
		options
	);
	
	return newoptions;
}

View.setAddtoSetClick = function(action){
		$('#lbADDitem_0').click(function(){
		var toAdd = $('img.show-info-selected-state').attr('id');
		//console.log ('trying to add a image with attr thumb-index='+toAdd);
		//Lightbox.add(View.data.ct[$object.data().index]);
		Lightbox.add(View.data.ct[toAdd]);
	});	
}

View.setLightboxClickables = function(){
	
	//console.log ('we are in setLightboxClickables');
	var pathArray = window.location.pathname.split('/');
	var select2 = '/' + pathArray[1] + '/' + pathArray[2];
		if(pathArray.length > 2) {
			var select2a = '/' + pathArray[3] + '/' + pathArray[4];
		}
	//console.log('patharray 2 is ' +pathArray[2] );
	
	if (pathArray[2] =='item'){
	$('#lbADDitem_0').empty().append('<img src="/img/add-to-set-PLUS-PLUS-button.png">').css('border','1px solid #00AAEF').attr('title', 'click me to add to your set');
	$('#lbADDitem_0').click(function(){
		var toAdd = $('img.show-info-selected-state').attr('id');
		//console.log ('trying to add a image with attr thumb-index='+toAdd);
		//Lightbox.add(View.data.ct[$object.data().index]);
		Lightbox.add(toAdd);
	});
	}
	
	$('div.lightbox-buttons').click(function(){	
	$('.lightbox-buttons img').removeClass('lightbox-selected');
	var toDelete = $(this).attr('pic-umoid');
	var imageName = $(this).attr('title');
	$(this).children('img').addClass('lightbox-selected');
	$('#new-nav-image-delete a').addClass('delete-selected');
	$('#new-nav-image-delete a').attr('pic-umoid', toDelete );
	$('#new-nav-image-delete a').attr('title', 'delete image:' + imageName+' ?' );
	//console.log('clicked light box button: '+toDelete);
	View.setRemoveFromSet();
	});
}


View.setRemoveFromSet = function(){
	
//console.log('setRemoveFromSet');
if( Session.isLoggedIn()){
	
	$('#new-nav-image-delete a').click(function(){
		var deleteThis = $(this).attr('pic-umoid');
		//console.log('deleted: '+deleteThis);
		Lightbox.remove($(this));
		$('#new-nav-image-delete a').removeClass('delete-selected');
	});
  }	
}

View.setLightboxDraggables = function()
{		
	$("img.thumb-lazyload").lazyload({
		container: $('#view-container'),
		event: "scrollstop",
		load: function(){
			var parentEl = $(this).parents('.lightbox-draggable');
			parentEl.data("left", parentEl.position().left)
	           .data("top", parentEl.position().top)
	           .data('index', $(this).attr('thumb-index'));                       
			
			//makes them dragable
			parentEl.draggable({
				start: function(event, ui) 
				{				
					var obj = ui.helper;						 			
					obj.css('z-index',800);
				},
				stop: function(event, ui) 
				{				
					$object = ui.helper;   
	        		$object.css("left",'');         		
	        		$object.css("top",'');	
	        		$object.css('z-index','');			
				}
			});	
			
			//Glb.mainview.setThumbClick(parentEl, $(this).attr('thumb-index'), Glb.mainview);
					
		}
	});
	
	$('#lbarea-body').droppable({
		accept: '.lightbox-draggable',
		hoverClass: 'droppable-hover',
		drop: function( event, ui ) 
		{			
			$object = ui.helper;					
    		$object.css("left",''); 
    		$object.css("top",'');												
			Lightbox.add(View.data.ct[$object.data().index]);
		}
	});		
};

//this lest the items in the lightbox be thrown our
//TODO: Make anyspace the trash
View.setLightboxItemsDraggables = function(lbHolderEl)
{
	Lightbox.lbEl_removelb.droppable({
		activeClass: 'draggable-active',
		hoverClass: 'droppable-hover',
		accept: '.lightbox-item-draggable',
		drop: function( event, ui ) 
		{			
			$object = ui.helper;					
			Lightbox.remove($object);
		}
	});	
	
	lbHolderEl.children().each(
	function(i)
	{
		$(this).data("left", $(this).position().left)
       .data("top", $(this).position().top)
       .data('index', i); 		
				
		$(this).draggable(
		{
			start:function(event, ui)
			{				
				$object = ui.helper;									 		
				$object.css('z-index',800);				
			},
			stop:function(event, ui)
			{
				$object = ui.helper;   
        $object.css("left",'');         		
        $object.css("top",'');	
        $object.css('z-index','');	
			}
		});
	});
	
	
}

View.setDisplayButtons = function(action,controller){
	
	if(controller == 'lightbox'){
		
		$('#new-nav-show-set-2 a').addClass('show-info-selected-state');
		//console.log('action set class:' +action);
	}
	
	if(action == 'userset'){}
	
}

View.setTabs = function() {
	$('#show-set-container').hide();
	
	$("#new-nav-tabs").tabs({
		cookie: {
				// store cookie for a day, without, it would be a session cookie
				expires: 1,
				path: '/' 
		},
		
		 select: function(event, ui){
            var tabNumber = ui.index;
            var tabName = $(ui.tab).text();
            //console.log('Tab number ' + tabNumber + ' - ' + tabName + ' - clicked');
        
			if (tabName =="sets"){
				//console.log('we are in the sets tab!');
				$('#show-set-container').show();
					/*if ( $('#scrollbar1').length > 0 ) {
					var id = $(this);
					id.tinyscrollbar();
					id.tinyscrollbar_update();
					} */
			}     
			
        	if (tabName =="browse"){
        		//console.log('we are in the browse tab!');
        		/*$('#new-nav-select-1').css('margin-top','0px');
				$('.footer_dropup').css('bottom','42px');
					if ( $('#scrollbar2').length > 0 ) {
					var id = $(this);
					id.tinyscrollbar();
					id.tinyscrollbar_update();
					}*/
				
        		
        	} else{
			$('#show-set-container').hide();	
			}   
        
        }
        
			
	}).addClass('ui-tabs-vertical ui-helper-clearfix');
	$("#new-nav-tabs").removeClass('ui-corner-top');
	
	$('#single-intem-meta-tabs').tabs({ selected: 0,
		cookie: {
				// store cookie for a day
				expires: 1,
				path: '/' 
			}
	});
	
}


View.setThirdParty = function(){

		$(".third-party-buttons").buttonset();
		$("#Third-partyT #Third-partyF #Third-partyG ").button();	
		$('.third-party-radio').next('label').addClass('radio-label').text("");		
		//for check boxes
		$("input:checkbox").next("label").addClass("custom-checkbox-label");
		$("input:checkbox").change(function() {
		$(this).next("label").toggleClass("custom-checkbox-label custom-checkbox-label-checked");
		});
		
}

View.setRadioButtons =function(){
	 $(".download-radio-buttons").buttonset();
	 $("#Download-radioPpt #Download-radioPpf #Download-radioZip").button();
	 $('.third-party-radio').next('label').addClass('radio-label');
}

View.setScrollBars = function() {
	
	$("#view-container").jScrollPane({
		horizontalDragMaxWidth: 0,
		hideFocus : true,
		showArrows : true,
		animateTo:true,
		animateInterval:150, 
		animateStep:3,
		autoReinitialise : true,
		verticalDragMinHeight : 98,
		verticalDragMaxHeight : 98
		
	});
	
	$('#terms-of-use-info-box-inner').jScrollPane({
		horizontalDragMaxWidth: 0,
		hideFocus : true,
		showArrows : true,
		animateTo:true,
		animateInterval:150, 
		animateStep:3,
		autoReinitialise : true,
		verticalDragMinHeight : 98,
		verticalDragMaxHeight : 98
		
	});
	
	//scrollbar
	//$('#scrollbar1').tinyscrollbar();
	//$('#scrollbar2').tinyscrollbar();
}

View.setQtips =function(){
	
	$('.grid-view-main-picture').each(function() {
   	$(this).qtip({
      content: $(this).children('.grid-view-details'),
      show: 'mouseover',
      hide: 'mouseout',
      style: {
		classes: 'ui-tooltip-dark ui-tooltip-shadow'
	},
      position: {
            my:'left center',
            at:'right center'
      }
   });
});
	
	$('#new-nav-holder a[href][title]').qtip({
      content: {
         text: false // Use each elements title attribute
      },
     
     show: 'mouseover',
     hide: 'mouseout',
     style: {
		classes: 'ui-tooltip-dark ui-tooltip-shadow'
	},
      position: {
            my:'left center',
            at:'right center'
      }
   });
		
$('.lightbox-image').each(function() {
   	$(this).qtip({
      content:{
      		text: function(api) {
			// Retrieve content from custom attribute of the $('.selector') elements.
			return $(this).attr('title');
			}
		},
      show: 'mouseover',
      hide: 'mouseout',
      style: {
		classes: 'ui-tooltip-dark ui-tooltip-shadow'
	},
      position: {
            my:'left center',
            at:'right center'
      }
   });
});


$('.single-image-dialog-link').each(function() {
   	$(this).qtip({
      content:{
      		text: function(api) {
			// Retrieve content from custom attribute of the $('.selector') elements.
			return $(this).attr('title');
			}
		},
      show: 'mouseover',
      hide: 'mouseout',
      style: {
		classes: 'ui-tooltip-dark ui-tooltip-shadow'
	},
      position: {
            my:'left center',
            at:'center'
      }
   });
});

		
$('.ligtbox-available-space [title]').each(function(){

$(this).qtip({
      content: {
         text: false // Use each elements title attribute
      },
     
     show: 'mouseover',
     hide: 'mouseout',
     style: {
		classes: 'ui-tooltip-dark ui-tooltip-shadow'
	},
      position: {
            my:'left center',
            at:'right center'
      }
   });
		
});

$('.full-view-main-picture').each(function() {
   	$(this).qtip({
      content: $(this).children('.full-view-details'),
      show: 'mouseover',
      hide: 'mouseout',
      style: {
		classes: 'ui-tooltip-dark ui-tooltip-shadow'
	},
      position: {
            my:'left center',
            at:'center'
      }
   });
});


}

 //pagination section
 View.onChangePager = function(){
	
		var str = $("#bpoc-pager").serialize();
		var str = decodeURIComponent(str);
		var str =str.replace ('bpoc-pager=', '');
		window.location = str; // redirect
       //View.setValuesPager();
        return false;  		  
}
 
 View.onAfter = function (curr, next, opts) {
        var index = opts.currSlide;
        $('#bpoc-pager-prev-link')[index == 0 ? 'hide' : 'show']();
        $('#bpoc-pager-next-link')[index == opts.slideCount - 1 ? 'hide' : 'show']();
}


View.setPager = function(){
		//change function
		$("#bpoc-pager").change(View.onChangePager);
		var pathRaw = window.location.pathname;
		var pathLenght =pathRaw.split('/');
		//console.log('pager fired for:'+pathRaw+' lenght is: '+pathLenght.length);			
		//set links active
		$('#bpoc-pager option[value="'+pathRaw+'"]').attr('selected', true).removeClass('none').addClass('select-on');
	
		if(pathLenght.length <=6){
				$('#bpoc-pageination-link-num-1').addClass('bpoc-pager-selected');	
			}else{
				$('.bpoc-pageination-links').each(function(){
				$('a[href="'+pathRaw+'"]').addClass('bpoc-pager-selected');	
			});
		}
		//set select selected
		$('#bpoc-pager option[value="'+pathRaw+'"]').attr('selected', true).removeClass('none').addClass('select-on');
		//pager is mage by the cycle plugin
		if ($('#bpoc-pager-links-container').is(':visible')) 	{
			var totalSlideCount =  $('.bpoc-pager-links-container-pages').length;
			//console.log('page count is ' + totalSlideCount);
			var pagerFound = $('a[href="'+pathRaw+'"]').attr('id');
			//console.log ('pager found this div as current: ' +pagerFound);
			var pagerStart = $('#'+pagerFound).parent('div.bpoc-pager-links-container-pages').attr('id');
			var pagerStartIndex = $('#'+pagerStart).index(); //zero based.
				if (pagerStartIndex <=0){
				pagerStartIndex = 0;
				$('#bpoc-pager-prev-link').hide();
				}
		//console.log ('pager start is: ' +pagerStart +' the index # is: '+pagerStartIndex);
		$('#bpoc-pager-links-container').cycle({ 
    	fx:     'fade', 
    	speed:  'fast', 
    	startingSlide: pagerStartIndex, // zero-based
   		nowrap : 1, // true to prevent slideshow from wrapping
    	timeout : 0,    
    	after: View.onAfter, //see above havled next & prev visibility. this is passed by reference, notice the lack of "();"
    	next:   '#bpoc-pager-next-link', 
    	prev:   '#bpoc-pager-prev-link' 
		}); //end cycle
		
	} //end if
}

View.setDropupMenu = function(){
	$('#footer-nav-1').stickyFooter({
		dropup_speed_show : 30, // Time (in milliseconds) to show a drop down
		dropup_speed_hide : 0, // Time (in milliseconds) to hide a drop down
		dropup_speed_delay : 0, // Time (in milliseconds) before showing a drop down
		footer_effect : 'hover_fade', // Drop down effect, choose between 'hover_fade', 'hover_slide', etc.
		footer_click_outside : 0, // Clicks outside the drop down close it (1 = true, 0 = false)
		showhidefooter : 'show', // Footer can be hidden when the page loads
		hide_speed : 1000, // Time to hide the footer (in milliseconds) if the 'showhidefooter' option is set to 'hide'
		hide_delay : 2000 // Time before hiding the footer (in milliseconds) if the 'showhidefooter' option is set to 'hide'
	});
}

// select menu initialization and styling for browse navigation
View.styleSelects = function(controller) {
		
		//console.log('styleSelects thinks the controller is: '+controller);
		//set defaults
		$('#new-nav-select-2').css('display', 'none');
		$('#new-nav-select-3').css('display', 'none');
		$('#new-nav-select-4').css('display', 'none');
		$('#new-nav-plus-sign').css('display', 'none');
		
		//find it and set it
		if($.cookie('browse_selects') === null) {
			$.cookie('browse_selects', 'home', {
				path : '/'
			});
		}

		//console.log('styleSelects found browse_selects cookie set at: ' + $.cookie('browse_selects'));
		//kick off first selects with variables for evauations
		var str = $("#nav1").serialize();
		var str = decodeURIComponent(str);
		var str = str.replace('navigation1=', '');
		var pathArray = window.location.pathname.split('/');
		var select2 = '/' + pathArray[1] + '/' + pathArray[2];
		//console.log ('select2a is :'+select2a+ ' OK');
		if(pathArray.length >= 2) {
			var select2a = '/' + pathArray[3] + '/' + pathArray[4];
		} 
   		
		
		if (select2 === '/collections/listview' || select2 === '/collections/gridview'  ){
			$.cookie('select2Name','none selected' , {
    		path : '/'
   		 });
   		 
		}
		
		if (pathArray[3]== 'search'){
			$('#new-nav-select-2').css('display', 'none');
			$('#new-nav-select-3').css('display', 'none');
			//Do this and bail !
			//$("#nav1").prepend("<option value='#'>Seach Results</option>");
			//$("#nav1 :nth-child(1)'").attr('selected', true).removeClass('none').addClass('select-on');
			//View.applySelectStyle();
			$('#new-nav-select-1').css('margin-top','18px');
			$('#footer_dropup_1').css('bottom','26px');
			return false;
		}


		
		if(controller == 'pages' || $.cookie('browse_selects')=='home-page' ) {
			//alert('controller is: '+controller);
			$('#new-nav-select-2').css('display', 'none');
			$('#new-nav-select-3').css('display', 'none');		
			$.cookie('browse_selects', 'home-page', {
				path : '/'
			});
			$('#new-nav-results-display-1,#new-nav-results-display-2').removeClass('display-results-active');
			$('#new-nav-select-1').css('margin-top','18px');
		    $('#footer_dropup_1').css('bottom','26px');
			//console.log('home page browse_selects cookie has been set to: ' + $.cookie('browse_selects'));

		}

		if(controller == 'collections') {
			
			$('#new-nav-select-3').css('display', 'none');
			$('#new-nav-select-2').show();
			$('#new-nav-select-1').css('margin-top','0px');
			$.cookie('browse_selects', 'collections', {
				path : '/'
			});
		
		}

		if(controller == 'featured') {
			
			$('#new-nav-select-2').css('display', 'none');
			$('#new-nav-select-3').show();
			$('#new-nav-select-1').css('margin-top','0px');
			$.cookie('browse_selects', 'featured', {
				path : '/'
			});
			
		}
		
		if(controller == 'lightbox') {
			
			$('#new-nav-select-2').css('display', 'none');
			$('#new-nav-select-3').show();
			$('#new-nav-select-1').css('margin-top','0px');
			$('#navigation1-parent-li a').first().text('User Sets');
			$.cookie('browse_selects', 'lightbox', {
				path : '/'
			});
			
			
		}
		
		if(controller == 'usersets') {
			$('#new-nav-select-2').css('display', 'none');
			$('#new-nav-select-3').show();
			$('#new-nav-select-1').css('margin-top','0px');
			$.cookie('browse_selects', 'usersets', {
				path : '/'
			});
		}

		if(controller == 'objectview' && $.cookie('browse_selects') == 'collections') {
			
			$('#new-nav-select-3').css('display', 'none');
			$('#new-nav-select-2').show();
			$('#new-nav-plus-sign').show();
			$('#new-nav-select-4').show();
			$('#new-nav-select-1').css('margin-top','0px');	
		}

		if(controller == 'objectview' && $.cookie('browse_selects') == 'featured') {
			
			$('#new-nav-select-2').css('display', 'none');
			$('#new-nav-select-3').show();
			//$('#nav3').val(select2a).attr('selected', true).removeClass('none').addClass('select-on');
		}

		var setType  = $.cookie('browse_selects');
		//console.log ('setType is: ' + setType);
		switch (setType)
		{
		case 'collections':
 		$('#navigation1-parent-li a').first().text('By Museum');
 		//console.log('collections found');
  		break;
		case 'featured':
  		$('#navigation1-parent-li a').first().text('Featured Sets');	
  		break;
		case 'usersets':
		$('#navigation1-parent-li a').first().text('User Sets');
		break;
		case 'home-page':
		$('#navigation1-parent-li a').first().text('none selected');
		break;
		case '':
		$('#navigation1-parent-li a').first().text('none selected');
		break;
		}
		
		//late styling means order of execution counts. everthing above needs to run before style is applied
		//View.applySelectStyle();

		$('.list-view-institution-title a').click(function(){
		$('#navigation1-parent-li a').first().text('By Museum');
		$.cookie('browse_selects', 'collections', {
				path : '/'
			});
		console.log('list-view-institution-title clicked cookie set');	
		});

	}

View.applySelectStyle =function(){	
			
		if($('#new-nav-select-2').is(":visible") || $('#new-nav-select-3').is(":visible") || $('#new-nav-select-4').is(":visible") ){
		$('#new-nav-select-1').css('margin-top','0px');
		$('.footer_dropup').css('bottom','42px');
		}
	
}

	
View.hideNav = function(context) {
 
  var pane = $("#view-container");
  var api = pane.data("jsp");
  
 // $.cookie('bpoc_nav', 'start');
  //console.log('bpoc_nav cookie is set to: '+$.cookie('bpoc_nav'));
 
 if($.cookie('bpoc_nav') == 'open' || $.cookie('bpoc_nav')== null){ 
  
  if($.cookie('bpoc_nav')== null){
  	//console.log('no bpoc_nav cookie');
  	$.cookie('bpoc_nav', 'open');
  	//console.log('set bpoc_nav cookie to open');
  }
  
  $("div#header").addClass("slide");
  $("div#nav-tab").addClass("load");
  $("div#nav-tab span.nav-hide-text").append("<a href=\"#\" class=\"nav-tab-link\">Hide Menu</div>");
  //console.log('echo bpoc_nav cookie: '+ $.cookie('bpoc_nav'));
 
  }
  
  if($.cookie('bpoc_nav') == 'closed' ){
  $("div#nav-tab span.nav-hide-text").empty().append("<a href=\"#\" class=\"nav-tab-link\">Show Menu</div>");
    $("#animator").css( 'top', '-100');
    $("div#nav-tab").addClass("closed");
    $("div#nav-tab").removeClass("open");
    $("div#nav-tab").removeClass("load");
    
  }
  
  
  $("div#nav-tab").click(function(){
   
    if($("div#nav-tab").hasClass("load")) {
      	$("div#nav-tab").removeClass("load");
       	$("#animator").animate( { top: '-=100' }, 750, function() {
        $("div#nav-tab a").replaceWith("<a href=\"#\" class=\"nav-tab-link\">Show Menu</div>");
        $("div#nav-tab").addClass("closed");
        $("div#nav-tab").removeClass("open");
        
        //$.cookie('bpoc_nav', 'closed', { expires: 7, path: '/', domain: 'commons.bpoc.org' });
		$.cookie('bpoc_nav', 'closed', { expires: 7, path: '/' });
		//console.log('click: bpoc_nav cookie is set to: '+$.cookie('bpoc_nav'));
       // api.reinitialise();  
      var subThis = View.getWindowSize(); 
      $('#view-container').css('height', subThis); 
 	});	
   
    }
    else if($("div#nav-tab").hasClass("open")) {
    	
        $("#animator").animate( { top: '-=100' }, 750, function() {
        $("div#nav-tab a").replaceWith("<a href=\"#\" class=\"nav-tab-link\">Show Menu</div>");
        $("div#nav-tab").addClass("closed");
        $("div#nav-tab").removeClass("open");
        $("div#nav-tab").removeClass("load");
        
 		$.cookie('bpoc_nav', 'closed', { expires: 7, path: '/' });
 		//console.log('click: bpoc_nav cookie is set to: '+$.cookie('bpoc_nav'));
 		//api.reinitialise();
 		var subThis = View.getWindowSize();
 		$('#view-container').css('height', subThis);
      });
   
    }
    else {
       
     	$("#animator").animate( { top: '+=100' }, 750, function() {
        $("div#nav-tab a").replaceWith("<a href=\"#\" class=\"nav-tab-link\">Hide Menu</div>");
        $("div#nav-tab").removeClass("closed");
        $("div#nav-tab").addClass("open");
        $("div#nav-tab").removeClass("load");
        $.cookie('bpoc_nav', 'open', { expires: 7, path: '/' });
         
        //console.log('click: bpoc_nav cookie is set to: '+$.cookie('bpoc_nav'));
        // api.reinitialise();
       var subThis= View.getWindowSize();
       $('#view-container').css('height', subThis);
      });
    
    }
    
    return false;

  });

			
View.DropUpsClicks = function	(){
	
	var pathRaw = window.location.pathname;
	var pathLength = pathRaw.split('/');
	//console.log('DropUpsClicks fired for:'+pathRaw+' lenght is: '+pathLenght.length);
        
   //all others
	$('li.drop-up-1-item a').each(function() {
    //console.log('in drop-up-1-item each function and ' + pathLength[1]);
    if ( $(this).attr('href')  ===  pathRaw || $(this).attr('href').indexOf(pathLength[1]) !== -1) {
     $(this).addClass('current');
    var foundit = $(this).parent('li.drop-up-1-item').attr('id');
   	var newText = $('#'+foundit).text();
   	var upper = $('#'+foundit).parents('.li-parent').attr('id');
   	$('#'+upper+' a').first().text(newText);
   	//console.log('foundit 1 is: '+ foundit2+ ' upper is: '+upper2 + ' the text should be set to '+ newText);
    }
    
    });
    
    $('li.drop-up-2-item a').each(function() {
    if ( $(this).attr('href')  ===  pathRaw || $(this).attr('href').indexOf(pathLength[4]) !== -1) {
     $(this).addClass('current');
    var foundit2 = $(this).parent('li.drop-up-2-item').attr('id');
   	var newText2 = $('#'+foundit2).text();
   	var upper2 = $('#'+foundit2).parents('.li-parent').attr('id');
   	$('#'+upper2+' a').first().text(newText2);
   	$('#navigation2-parent-li a').first().text(newText2);
   // console.log('foundit 2 is: '+ foundit2+ ' upper is: '+upper2 + ' the text should be set to '+ newText2);
    $.cookie('select2Name', newText2 , {
    		path : '/'
    	});
    
    } 
    
    $(this).click(function(){
    	var select2Name = $(this).text();
    	
    	$.cookie('select2Name',select2Name , {
    		path : '/'
    	});
   	//console.log ('setting select2Name to '+ $.cookie('select2Name'));
    });
    
    });
	
	$('li.drop-up-3-item a').each(function() {
    if ( $(this).attr('href')  ===  pathRaw || $(this).attr('href').indexOf(pathLength[4]) !== -1) {
    $(this).addClass('current');
    var foundit3 = $(this).parent('li.drop-up-3-item').attr('id');
   	var newText3 = $('#'+foundit3).text();
   	var upper3 = $('#'+foundit3).parents('.li-parent').attr('id');
   	$('#'+upper3+' a').first().text(newText3);
   	//console.log('foundit 3 is: '+ foundit3+ ' upper is: '+upper3 + ' the text should be set to '+ newText3);
    }
        
  	});
  	
  	
  	$('li.drop-up-4-item a').each(function() {
    if ( $(this).attr('href')  ===  pathRaw || $(this).attr('href').indexOf(pathLength[4]) !== -1) {
    $(this).addClass('current');
    var foundit4 = $(this).parent('li.drop-up-4-item').attr('id');
   	var newText4 = $('#'+foundit4).text();
   	var upper4 = $('#'+foundit4).parents('.li-parent').attr('id');
   	$('#'+upper4+' a').first().text(newText4);
   	//console.log('foundit 4 is: '+ foundit4+ ' upper is: '+upper4 + ' the text should be set to '+ newText4);
    
    }
        
  	});
  	
  	 /* $('.drop-up-4-item-link').click(function(){
    		$('#navigation1-parent-li a').first().text('featured sets');
   	    	console.log ('setting select1Name to featured sets');
    	}); */
  	
  	
  	if ($.cookie('select2Name')){
 	var select2SET = $.cookie('select2Name');
  	$('#navigation2-parent-li a').first().text(select2SET);
  	//console.log ('found select2Name cookie setting #navigation2-parent-li a TO: '+ $.cookie('select2Name'));
  	} 	

	
}		

View.setImageScale = function (){
	 $('img.view-gallery-web-image').imgscale({ 
    parent : '.item-view-image-container', 
    fade : 500 ,
    scale: 'fit',
    center: true
  	}); 
}

//THIS JAVASCRIPT FUNCTION DOES THE WORK AND RETURNS THE 
//STRING WITH HTML ANCHOR LINKS	
View.replaceURLWithHTMLLinks = function (text) {
 
   	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1' target=\"_blank\" class=\"external-link\"'>$1</a>"); 
    //console.log('in View.replaceURLWithHTMLLinks');
  }
     
View.changeToLink = function(){
  //THIS IS A JQUERY STATEMENT THAT GRABS A CHUNK OF
  //TEXT AND REPLACES IT WITH THE UPDATED STRING
  $('.item-meta-data-value').each(function(i){
    var text = $(this).html();
    $(this).html(View.replaceURLWithHTMLLinks(text));
  });
}

View.confirmDeleatePost = function(){
	if($('.confirm_delete').length) {  
        // add click handler  
    $('.confirm_delete').click(function(){  
        // ask for confirmation  
        var result = confirm('Are you sure you want to delete this post?');  
          
        // show loading image  
        $('.ajax_loader').show();  
        $('#flashMessage').fadeOut();  
          
        // get parent row  
        var row = $(this).parents('tr');  
          
        // do ajax request  
        if(result) {  
            $.ajax({  
                type:"POST",  
                url:$(this).attr('href'),  
                data:"ajax=1",  
                dataType: "json",  
                success:function(response){  
                    // hide loading image  
                    $('.ajax_loader').hide();  
                      
                    // hide table row on success  
                    if(response.success == true) {  
                        row.fadeOut();  
                    }  
                      
                    // show respsonse message  
                    if( response.msg ) {  
                        $('#ajax_msg').html( response.msg ).show();  
                    } else {  
                        $('#ajax_msg').html( "<p id='flashMessage' class='flash_bad'>An unexpected error has occured, please refresh and try again</p>" ).show();  
                    }  
                }  
            });  
        }  
    return false;  
    });  
}
}

}//end// constructor 
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

};function Mainview(cfg)
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
var Lightbox = function() {}
// Need a PEvent

Lightbox.init = function()
{
	
	this.lbEl_dropdown = $('#nav5');
	this.lbEl_dropdownClicks = $('.user-sets-link');
	this.lbEl_content = $('#lbarea-content');
	this.lbEl_removelb = $('#lbarea-removelb');
	this.lbEl_createbut = $('#lbarea-createbut');
	//this.lbEl_accordion = $('#sets-accordion');
	this.lbEl_addButtons = $('#new-nav-addbuttons');
	this.lbEl_removeLightbox = $('#new-nav-sets-delete a');
	this.lbEl_editLightbox = $('#new-nav-sets-info a');
	
	this.lbEl_dropdown.change(this, this.onLBChange);
	this.lbEl_createbut.click(this, this.onCreateLBClick);
	this.lbEl_removeLightbox.click(this, this.showDeleteLB);
	this.lbEl_editLightbox.click(this, this.showEditLB);
		
	
	if( Session.isLoggedIn() )
	{
		// Logged in 
		//console.log('lightbox session is logged in');
		Lightbox.onLogin();		
	}
	else
	{ // Not logged in
		
		try{
			Profile.eventObj.addEventHandler("onlogin", function() 
			{
				//console.log('lightbox session TRY is logged in');
				Lightbox.onLogin();
				
			});
			
		}
		catch(e){
			
		};
		// Retrieve tmp lightbox
		//Lightbox.getLBContent(0);
		//View.LoggedOut();	
	$('#logout-submit, #show-set-container').hide();
	$('.new-nave-sets-buttons , #new-nav-user-sets-buttons, #new-nav-downnload-radio').hide();
	$('#registration-link, #password-remind-link, #login-submit ').show();
	$('#lbarea-content').empty();
	//Lightbox.lbEl_dropdown.empty().append('<option value="0" class="none">no sets</option>');
	$('#new-nav-user-sets-selected-upper-text').empty().append('<p>please register/login to use sets</p>');
	$('#new-nav-main-body-login-text-left').empty().append('<p>login</p>');
	//$('#new-nav-sets-lower').css('opacity','.20');
	$('#new-nav-login').removeClass('new-nav-login-blank').addClass('new-nav-login');
	//View.applyStyleSelect5();
		$('.user-sets-link').click(function() {
      	var id = $(this).attr('id');
    	var name = $(this).text();
    	//console.log ('we have a user sets click for '+name +' and the ID is '+ id);
   	
	});
	}		
}

Lightbox.refresh = function(){
	
	if (Session.isLoggedIn())
	{
		Lightbox.onLogin();
		
	} else {
		
		Lightbox.getLBContent(0);
		//this.lbEl_dropdown.append('<option value="0" class="none">no sets</option>');
		$('#navigation5-parent-li a').text('no sets').attr('id','no-sets' );
	}
	
}

/**
 * Post-login method. 
 */
Lightbox.onLogin = function()
{
	var pars = { n:'Lightbox_onLogin'};

	$.ajax({
	  type: 'GET',
	  cache:false,
	  url: Session.ajaxurl,
	  data: pars,
	  context: this,
	  success: this.onLoginSuccess,
	  dataType: 'json'
	});
	
	
}

Lightbox.onLoginSuccess = function(json)
{
	 //juggle for now
	$('.new-nave-sets-buttons , #new-nav-user-sets-buttons, #new-nav-downnload-radio').show();
	$('#new-nav-user-sets-selected-upper-text').empty().append('<p>SELECTED SET CONTENTS</p>');
	$('#new-nav-sets-lower, #new-nav-user-sets-buttons').css('opacity','');
	$('.new-nave-sets-buttons a, #new-nav-user-sets-buttons a').removeClass('cursore-none');
	$('#new-nav-sets-lower').css('opacity','1');
	
	
		//send cottie value to UI to selctect
	if ( $.cookie('browse_selects_sets') ){
		
	var setLightbox = $.cookie('browse_selects_sets');
	var lbid = setLightbox;
	//console.log('session is logged in and select is set to' +lbid);
	Lightbox.getLBContent(lbid);
	this.insertListUI(json.lblist.ct);
	
	} else	{	
			
			if( json.lblist && json.lblist.ct !='null' ){
			this.insertListUI(json.lblist.ct);
			//console.log('Lightbox.onLoginSuccess: we have lists');
			}
	
			if( json.lbcontent){
			this.insertLBContent(json.lbcontent);
			//console.log('Lightbox.onLoginSuccess :we have content');
			}
		}
}

Lightbox.tmpCreate = function()
{
	
}

/*
 * Will add to current lightbox.
 * If not logged in then temp lightbox is used.
 * @arguments is a list of umo objects to add
 */
Lightbox.add = function(toAdd)
{
	var umoids = [];
	umoids.push(toAdd);
	
	//for( var i=0; i<arguments.length; i++ )
	//{
	//	umoids.push(arguments[i].pk);
	//}
	var pars = { n:'Lightbox_add', lbid:this.getCurrentLB(), umoids:umoids};

	success = function(json)
	{
		try
		{
			if( json.lbadd.s.s.t == 'F') throw Error();
			else Lightbox.onGetLBContent(json.lbcontent);
		}
		catch(e){
			Msgs.showError('An error occured while trying to add objects to the set. Please try again.');
		}
		
		Msgs.removeLoading(Lightbox.lbEl_content);
		
	}

	$.ajax({
	  type: 'GET',
	  cache: false,
	  url: Session.ajaxurl,
	  data: pars,
	  success: success,
	  dataType: 'json'
	});
	
	Msgs.showLoading(this.lbEl_content);
}

/***
 * Click handler for the lightbox remove button
 */
Lightbox.removeLightbox = function(e)
{
	e.data.removeLB();
}


/***
 * Click handler for the lightbox create button
 */
Lightbox.onCreateLBClick = function(e)
{
	e.data.showCreateLB();
}

/***
 * Click handler for the lightbox create button
 */
Lightbox.showEditLBClick = function(e)
{
	e.data.showEditLB();
}


/***
 * Create a new lightbox 
 * @lbname
 * @lbdialog: jquery dialog UI. Reference so that it can be closed on create
 */
Lightbox.createLB = function(lbname, visibility, lbdialog)
{
	if( lbname == "" ) return false;
	
	Msgs.showLoading(lbdialog);
	
	var pars = { n: 'Lightbox_createLB', lbname:lbname, visibility:visibility };
	success = function(json)
	{	
		Session.login = json;
		Lightbox.createLBSuccess(json, lbname, lbdialog);
	}	
	$.ajax({
	  type: 'GET',
	  cache: false,
	  url: Session.ajaxurl,
	  data: pars,
	  success: success,
	  dataType: 'json'
	});	
};

/***
 * Success handler for creation of lightbox 
 * @json response
 * @lbdialog: jquery dialog UI. Reference so that it can be closed on create
 */
Lightbox.createLBSuccess = function(json, lbname, lbdialog)
{
	Msgs.removeLoading(lbdialog);
	if( json.s.s == 'T') {
		//this.lbEl_dropdown.append('<option value="'+json.pk+'" class="none">'+lbname+'</option>');
		$.removeCookie('browse_selects_sets', { path: '/' });
		//this.lbEl_dropdown.val(json.pk);
		//this.getLBContent(json.pk);
		lbdialog.dialog('close');
		$.cookie('browse_selects_sets', json.pk, {
				path : '/'
			});
		
		//console.log('we are in createLBSuccess and pk:json.pk is:' +json.pk +' the lbname is '+lbname+' the cookie is set to'+ $.cookie('browse_selects_sets'));
		//View.applyStyleSelect5();
		//this.insertListUI(json.lblist);
		//Lightbox.refresh();
		var html ='';
			html +=' <li id="drop-up-5-item-'+json.pk+'" class="none drop-up-5-item"><span class="footer-ui-icon-off"></span><a href="#" id="';	
			html += json.pk +'" class="user-sets-link">';	
			html += lbname ;
		    html +='</a></li>';
		    this.lbEl_dropdown.append(html);
		    $('#navigation5-parent-li a').first().text(lbname);
		    this.getLBContent(json.pk);
	}
	else
	{
		if( json.s.m != "" ) Msgs.showError(json.s.m);
	}
	
}

/***
 * UI to create new lightbox 
 * @lbname
 */
Lightbox.showCreateLB = function()
{
	$('<div id="lbcreate-box" class="commons-dialog"><form id="lbcreate-form" onsubmit="return false"><p>Please type a name for your set.</p><input id="lbarea-createlb-input" name="lbarea-createlb-input" type="text" value="enter name..." class="new-nav-inputs" /><p>Make this set\'s visibility:</p><div class="lbcreate-box-radio"><input type="radio" name="visibility" class="new-nav-inputs" value="PUBLIC" checked="yes">Public</div><div class="lbcreate-box-radio"><input type="radio" name="visibility" class="new-nav-inputs" value="PRIVATE">Private</div><div style="clear:both;"><input type="submit" style="display:none"/></form></div>').dialog(View.createDialogConfig({
		title: 'Create Set',
		width: 246,
		height: 200,
		zIndex: 1,
		modal: true,
		
		
		buttons: {
			'Save': function(){
				$('#lbcreate-form').trigger('submit');
			},
			'Cancel': function(){
				$(this).dialog('close');
			}
		},
		open: Lightbox.onOpenCreateLB,
		close: function(ev, ui) { $(this).remove(); },
		beforeClose: Lightbox.onCloseCreateLB
	}));
	
	$('#lbarea-createlb-input').css('margin-bottom','10px');
	$('#lbarea-createlb-input').css('margin-top','10px');
	$('.lbcreate-box-radio').css('float', 'left');
	$('.lbcreate-box-radio').css('width', '50%');
	$('.lbcreate-box-radio').css('padding-top', '10px');
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_save-button");
	$(".ui-dialog-buttonset button:nth-child(2)").addClass("dialog_cancel-button");
	$('#lbarea-createlb-input').click(function()
	{
		$(this).val('');
	});

}


Lightbox.onSubmitCreateLB = function()
{
	Lightbox.createLB($('#lbarea-createlb-input').val(), $('input:radio[name=visibility]:checked').val(), $('#lbcreate-box') );
}

Lightbox.onOpenCreateLB = function()
{
	// Register event handlers
	$('#lbcreate-form').submit(Lightbox.onSubmitCreateLB);
}

Lightbox.onCloseCreateLB = function()
{
	// Deregister event handlers
	$('#lbcreate-form').unbind('submit');
}

/***
 * Remove items from lightbox
 * @arguments array of jquery objects. Umo ID is read from pic-umoid attribute
 */
Lightbox.remove = function()
{	
	//console.log('in the remove function');
	var umoids = []; 
	for( var i=0; i<arguments.length; i++ )
	{
		umoids.push(arguments[i].attr('pic-umoid'));
		//umoids.push(arguments[i]);
		//umoids.push(arguments[i].pk);
		//Msgs.showLoading(arguments[i]);
		Msgs.showLoading(this.lbEl_content);
	}
	
	var pars = { n: 'Lightbox_remove', lbid:this.getCurrentLB(), umoids: umoids };
	success = function(json)
	{	
		var tmplbitem;
		
		if( $.isArray(json.r) )
		{
			for( var i=0; i<json.r.length; i++ )
			{
				tmplbitem = $('#lbitem_'+json.r[i].pk);
				Msgs.removeLoading(Lightbox.lbEl_content);
				
				if( json.r[i].s == 'T' ) tmplbitem.remove();
				//messy append
				//console.log('attempting to append');
				var html='';
    			html = '<div id="lbADDitem_TMP" class="add-too-set-buttons"><img src ="/img/add-to-set-BLANK-PLUS-button.png"></div>';
   				Lightbox.lbEl_content.append(html);
			}
		}
	}	
	$.ajax({
	  type: 'GET',
	  cache:false,
	  url: Session.ajaxurl,
	  data: pars,
	  success: success,
	  dataType: 'json'
	});	
	
	
};

/*
 * Creates the ui component for the list of lightboxes
 */
Lightbox.insertListUI = function(lbList)
{
	// if json.ct.length < 1
	var html = "";
	
	if( lbList.length == 0 ){
	html +=' <li id="drop-up-5-item-'+i+'" class="none drop-up-5-item"><span class="footer-ui-icon-off"></span><a href="#" id="';	
			html += 'no-sets" class="user-sets-link user-sets-link-empty">no sets';	
		    html +='</a></li>';	
		    $('#navigation5-parent-li a').first().text('no sets');
	}
	
	if( lbList.length > 0 )
	
	{
	//console.log ('we are inserting lists to select');	
		
		for( var i=0; i<lbList.length; i++ )
		{
			//html += '<option value="'+lbList[i].i+'" class="none">'+lbList[i].n+'</option>';	
			
			html +=' <li id="drop-up-5-item-'+i+'" class="none drop-up-5-item"><span class="footer-ui-icon-off"></span><a href="#" id="';	
			html += lbList[i].i +'" class="user-sets-link">';	
			html += lbList[i].n ;
		    html +='</a></li>';
		
			
		}
		$('#navigation5-parent-li a').first().text(lbList[0].n);
	}
	else
	{
	}
	
	this.lbEl_dropdown.empty();
	this.lbEl_dropdown.append(html);
	
	/*var pScrollbar = $("#scrollbar2"); 
	pScrollbar.tinyscrollbar();
	pScrollbar.tinyscrollbar_update(); */
	
	
	if ( $.cookie('browse_selects_sets') ){
	var setLightbox = $.cookie('browse_selects_sets');
	//console.log('line 417 cookie found and in insertListUI IF function. cookie is +' +setLightbox);
	var name = $('#'+setLightbox).text();
	$('#navigation5-parent-li a').first().text(name);	
	} else{
		
	}
	
	
	$('.user-sets-link').click(function() {
    var id = $(this).attr('id');
    var name = $(this).text();
    //console.log ('we have a user sets click for '+name +' and the ID is '+ id);
    
    var foundit5 = $(this).parent('li.drop-up-5-item').attr('id');
   	var newText5 = $('#'+foundit5).text();
   	var upper5 = $('#'+foundit5).parents('.li-parent').attr('id');
   	$('#'+upper5+' a').first().text(newText5);
   	
   	$.cookie('browse_selects_sets', id, {
				path : '/'
			});
	
	//console.log ('cookie browse_selects_sets set to' +	$.cookie('browse_selects_sets'));
	Lightbox.clickLoad(id);		
	});
	
}

Lightbox.clickLoad = function(lbid){
	
Lightbox.getLBContent(lbid);

}

Lightbox.onLBChange = function(e)
{
	$.cookie('browse_selects_sets', e.target.value, {
				path : '/'
			});	
	//console.log ('lightbox.onLBChange PK is' + $.cookie('browse_selects_sets'));
	e.data.getLBContent(e.target.value);		
}

Lightbox.getLBContent = function(lbid)
{
	
	//console.log ('in getLBContent 1st step');
	
	if ( $.cookie('browse_selects_sets')){
	var setLightbox = $.cookie('browse_selects_sets');
	var lbid = setLightbox;
	//console.log ('in getLBContent IF and cookie is not undfined and lbid is '+ lbid );
	}
	
	//console.log (' !!!! we in getLBContent lbid is' +lbid);
	var pars = { n:'Lightbox_getContent', lbid: lbid};

	$.ajax({
	  type: 'GET',
	  cache:false,
	  url: Session.ajaxurl,
	  data: pars,
	  context: this,
	  success: this.onGetLBContent,
	  dataType: 'json'
	});
	
	Msgs.showLoading(this.lbEl_content);
}

Lightbox.onGetLBContent = function(json)
{
	this.insertLBContent(json);
}

Lightbox.setupStreamer = function(data)
{
	// Set up streamer
	var cfg =
	{
		holder:'streamer-holder',		
		trigger:this.lbEl_content.attr('id'),
		hideTrigger:false,
		hideElementsOnOpen:['view-container'],
		umos:data,	
			
		onNextBeforeRender:null,
		onClick:null,
		onClose:null,
		onBeforeClose:null							
	}	
	View.lightboxStreamer = new Streamer(cfg);
	//console.log(View.lightboxStreamer);
	//View.setStreamer(streamer);
}

Lightbox.insertLBContent = function(lbresponse)
{
	//console.log ('1 - in insertLBContent and getting: '+lbresponse.n);
	Msgs.removeLoading(this.lbEl_content);
	this.lbEl_content.empty();
	this.lbEl_content.attr('pic-lbid', lbresponse.pk);
	this.lbEl_content.attr('title', lbresponse.n);
	// #li new-nav-sets-share a
	$('.lightbox-share-link').attr('id', lbresponse.pk);
	$('.lightbox-share-link').attr('title', 'share your set titled: '+lbresponse.n);
	var name = lbresponse.n;
	var LinkName = name.replace(' ','-');
	$('#new-nav-image-show-set-2 a').attr('href', '/lightbox/listview/'+lbresponse.pk+'/'+LinkName);
	$('#new-nav-sets-info a').attr('title', 'rename the set titled: '+lbresponse.n);
			
	if( lbresponse.pk == '0' )
	{
		//this.lbEl_content.append('<div class="text"><p>Please create or select a set.</p></div>');
		//this.lbEl_content.append(html);
		var html = '';
		for( var i=0; i<12; i++ )
			{
				html += '<div id="lbADDitem_'+i+'" class="add-too-set-buttons"><img src ="/img/add-to-set-BLANK-PLUS-button.png" class="ligtbox-available-space" title="this space is avaiable to add a picture to your set"></div>';
			}
			
		this.lbEl_content.append(html);		
		return false;
	}
	
	if( lbresponse.ct )
	{
		var html = '';
		var html2 = '';
		if( lbresponse.ct.length > 0 )
		{
			for( var i=0; i<lbresponse.ct.length; i++ )
			{
				html += '<div id="lbitem_'+lbresponse.ct[i].pk+'" pic-umoid="'+lbresponse.ct[i].pk+'" class="lightbox-item-draggable lightbox-buttons" title="'+lbresponse.ct[i].n +'"><img src="' + Glb.p_host + lbresponse.ct[i].u + '" class="lightbox-image" title="'+lbresponse.ct[i].n +'"/></div>';
			}
			
			var notAdozen = 12-lbresponse.ct.length ;
			for( var i=0; i<notAdozen; i++ )
			{
				
				html += '<div id="lbADDitem_'+i+'" class="add-too-set-buttons"><img src ="/img/add-to-set-BLANK-PLUS-button.png" class="ligtbox-available-space" title="this space is avaiable to add a picture to your set"></div>';
			}
			
			//console.log('notAdozen is :'+notAdozen);
			//this.lbEl_addButtons.append(html);
			this.lbEl_content.append(html);
			//this.setupStreamer(lbresponse.ct);
			//View.setLightboxItemsDraggables(this.lbEl_content);
		}
		else 
		{
			for( var i=0; i<12; i++ )
			{
				html += '<div id="lbADDitem_'+i+'" class="add-too-set-buttons"><img src ="/img/add-to-set-BLANK-PLUS-button.png" class="ligtbox-available-space" title="this space is avaiable to add a picture to your set"></div>';
			}
			//html += '<div class="text"><p>You have no items in this set.</p><p>Drag items here to add to this set.</p></div>';
			//this.lbEl_addButtons.append(html2);
			this.lbEl_content.append(html);		
		}
	}
	
	$('#lbADDitem_0').click(function(){
		var toAdd = $('img.show-info-selected-state').attr('id');
		//console.log ('trying to add a image with attr thumb-index='+toAdd);
		//Lightbox.add(View.data.ct[$object.data().index]);
		Lightbox.add(toAdd);
	
	});
	View.setLightboxClickables();
	this.setupDownloads(lbresponse);
	this.setLightboxCookie(lbresponse);
	this.setShareApi(lbresponse);
	
}


Lightbox.setLightboxCookie = function(lbresponse) {

	//console.log ('we are in the setLightboxCookie function set count is:'+lbresponse.ct.length );
	var userName = Session.username + '-';

	if ($.cookie(userName + lbresponse.pk) == 'true' && lbresponse.ct.length == 12) {
		//console.log ('setLightboxCookie: return false');
		return false;

	}

	if (lbresponse.ct.length == 12) {
		Msgs.showMsgDialog('The set titled: <strong>' + lbresponse.n + '</strong> has twelve items and is full. If you wish to add another image please remove one from the set.', 'This set is full!');

		$.cookie(userName + lbresponse.pk, 'true', {
			expires : 1,
			path : '/'
		});
		//console.log ('setLightboxCookie: message sent and cookie set to TRUE for '+ $.cookie(userName+lbresponse.pk) );
	} else {

		if (lbresponse.ct.length != 12) {
			$.cookie(userName + lbresponse.pk, 'false', {
				expires : 7,
				path : '/'
			});
			//console.log ('setLightboxCookie: message sent and cookie set to FALSE for '+ $.cookie(userName+lbresponse.pk) );
		}
	}

}

Lightbox.getCurrentLBname = function()
{
	
	return this.lbEl_content.attr('title');
}

Lightbox.getCurrentLB = function()
{
	return this.lbEl_content.attr('pic-lbid');
}

/*Revove a Lightbox functions 
* Different from Remove
*/
Lightbox.showDeleteLB = function()
{
	//console.log('entering showDeleteLB'); 
	//var lbname = $('#navigation5-parent-li a').text();
	var lbname = Lightbox.getCurrentLBname();
	$('<div id="lbdelete-box" class="commons-dialog"><p>Please confirm that you wish to delete the set named:</p><div class="ui-dialog-lbtitle">'+lbname+'</div><form id="lbdelete-form" onsubmit="return false"><input type="submit" style="display:none"/></form></div>').dialog(View.createDialogConfig({
		title: 'Delete Set ?',
		width: 246,
		height: 136,
		modal: true,
		
		buttons: {
			'Yes': function(){
				$('#lbdelete-form').trigger('submit');
				//Lightbox.removeLB(currentLB);
			},
			'No': function(){
				$(this).dialog('close');
			}
		},
		open: Lightbox.onOpenRemoveLB,
		close: function(ev, ui) { $(this).remove(); },
		beforeClose: Lightbox.onCloseRemoveLB
	}));
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_yes-button");
	$(".ui-dialog-buttonset button:nth-child(2)").addClass("dialog_no-button");
}

Lightbox.onOpenRemoveLB = function()
{
	// Register event handlers
	$('#lbdelete-form').submit(Lightbox.onSubmitRemoveLB);
}

Lightbox.onSubmitRemoveLB = function()
{
	
	var currentLB = Lightbox.getCurrentLB();
	Lightbox.removeLB(currentLB, $('#lbdelete-box'));
}

Lightbox.onCloseRemoveLB = function()
{
	// Deregister event handlers
	//UNBIND PROBLEM
	$('#lbdelete-form .ui-dialog-buttonset').unbind('submit');
}

/***
 * Remove a ligthbox and send to ajax controller and messaging function 
 */
Lightbox.removeLB = function(lbid, lbdialog)
{
	
	if( lbid == "" ) {
	//console.log('no lbid found');
	return false;
	}
	
	Msgs.showLoading(lbdialog);
	
	//console.log('attempting to remove light box: '+lbid);
	var pars = { n:'Lightbox_removeLB', lbid:lbid };
	
	//try this junk above the orignal is below.
	//var pars = { n:'Lightbox_removeLB', lbid:this.getCurrentLB() };
	
	success = function(json)
	{	
		Session.login = json;
		Lightbox.removeLBSucces(json, lbid, lbdialog);
	}	
	$.ajax({
	  type: 'GET',
	  url: Session.ajaxurl,
	  data: pars,
	  success: success,
	  dataType: 'json'
	});	
}


Lightbox.removeLBSucces = function(json, lbid, lbdialog) {

	//console.log('were in removeLBSucces json.pk is: ' +json.pk);
	
	Msgs.removeLoading(lbdialog);
     if( json.s.s == 'T') {
		
		//probably overkill
		//$('#lbarea-dropdown option[value='+lbid+']').remove();
		//this.lbEl_dropdown.empty();
		//this.lbEl_content.empty();
		lbdialog.dialog('close');
		//$.cookie('browse_selects_sets', null);
		//$.removeCookie('browse_selects_sets', { path: '/' });
		$.cookie('browse_selects_sets', null, {
				path : '/'
			});
		//reload the lightbox
		Lightbox.refresh();
	
	}
	else
	{
		if( json.s.m != "" ) Msgs.showError(json.s.m);
	}
	
}

//lightbox editing section
Lightbox.showEditLB = function()
{
	
	var lbname = $('#lbarea-dropdown option:selected').text();
	
	$('<div id="lbedit-box" class="commons-dialog"><form id="lbedit-form" onsubmit="return false"><p>Please rename your set.</p><input id="lbarea-editlb-input" name="lbarea-editlb-input"type="text" value="'+lbname+'" class="new-nav-inputs" /><p>Make this set\'s visibility:</p><div class="lbcreate-box-radio"><input type="radio" name="visibility" class="new-nav-inputs" value="PUBLIC" checked="yes">Public</div><div class="lbcreate-box-radio"><input type="radio" name="visibility" class="new-nav-inputs" value="PRIVATE">Private</div><div style="clear:both;"><input type="submit" style="display:none"/></form></div>').dialog(View.createDialogConfig({
		title: 'Rename your set',
		width: 246,
		height: 200,
		zIndex: 1,
		modal: true,
		
		buttons: {
			'Save': function(){
				$('#lbedit-form').trigger('submit');
			},
			'Cancel': function(){
				$(this).dialog('close');
			}
		},
		open: Lightbox.onOpenEditLB,
		close: function(ev, ui) { $(this).remove(); },
		beforeClose: Lightbox.onCloseEditLB
	}));
	
	$('#lbarea-editlb-input').css('margin-bottom','10px');
	$('#lbarea-editlb-input').css('margin-top','10px');
	$('.lbcreate-box-radio').css('float', 'left');
	$('.lbcreate-box-radio').css('width', '50%');
	$('.lbcreate-box-radio').css('padding-top', '10px');
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_save-button");
	$(".ui-dialog-buttonset button:nth-child(2)").addClass("dialog_cancel-button");
	$('#lbarea-editlb-input').click(function()
	{
		$(this).val('');
	});
}

Lightbox.onOpenEditLB = function()
{
	// Register event handlers
	$('#lbedit-form').submit(Lightbox.onSubmitEditLB);
}

Lightbox.onSubmitEditLB = function()
{	
	var currentLB = Lightbox.getCurrentLB();
	Lightbox.editLB(currentLB, $('#lbarea-editlb-input').val(), $('input:radio[name=visibility]:checked').val(), $('#lbedit-box'));
}

Lightbox.onCloseEditLB = function()
{
	// Deregister event handlers
	$('#lbedit-form').unbind('submit');
}

/***
 * Edit a ligthbox and send to ajax controller and messaging functions 
 */
Lightbox.editLB = function(lbid, newTitle, visibility, lbdialog)
{
	
	if( lbid == "" ) {
	//console.log('no lbid found');
	return false;
	}
	
	Msgs.showLoading(lbdialog);
	//console.log('attempting to edit light box ID: '+lbid+' with a new title called: '+newTitle);
	var pars = { n:'Lightbox_editLB', lbid:lbid , newTitle:newTitle, visibility:visibility  };
	//try this junk above the orignal is below.
	//var pars = { n:'Lightbox_removeLB', lbid:this.getCurrentLB() };
	success = function(json)
	{	
		Session.login = json;
		Lightbox.editLBSucces(json,lbdialog);
	}	
	$.ajax({
	  type: 'GET',
	  cache: false,
	  url: Session.ajaxurl,
	  data: pars,
	  success: success,
	  dataType: 'json'
	});	
}


Lightbox.editLBSucces = function(json, lbdialog) {

	//console.log('were in editLBSuccess json.pk is: ' +json.pk);	
	Msgs.removeLoading(lbdialog);
     if( json.s.s == 'T') {
	
		lbdialog.dialog('close');
		//reload the lightbox
		Lightbox.refresh();
	
	}
	else
	{
		if( json.s.m != "" ) Msgs.showError(json.s.m);
	}
	
}

Lightbox.setupDownloads = function(lbresponse){
	
//console.log('setupDownloads lentgh is: '+lbresponse.ct.length);
 if(lbresponse.ct.length == 0) {
 	$('#Download-radioPpt').val('');
	$('#Download-radioZip').val('');
	$('#Download-radioPdf').val('');
	$('#new-nav-sets-save a').data('downloadable', 'false');	
 return false;
 }

var pptUrl ='';
var zipUrl ='';
var name = lbresponse.n;
var LinkName = name.replace(' ','-');
var pathArray = window.location.pathname.split( '/' );
if (typeof(pathArray[2])==='undefined'){var view ='listview'}else{var view =pathArray[2] }
var pdfURL = 'http://' + window.location.host +'/pdf/lightbox/'+view+'/'+lbresponse.pk+'/'+LinkName;
var downloadLink ='http://piction.bpoc.org/piction/!soap.ajaxget?';
var zipService = 'n=zip_download&SURL='+Session.surl;
var pptService = 'n=ppt_image&SURL='+Session.surl;
	
for(var i=0; i<lbresponse.ct.length; i++ )
	{
	//zipUrl +=  Glb.p_host + Session.surl+ lbresponse.ct[i].u ;
	//as per Marcella  "DERIVATIVE=ORIGINAL&DNUM=5"		
	zipUrl += '&UMO_ID='+lbresponse.ct[i].pk +'&DERIVATIVE=ORIGINAL'+'&DNUM=O5';	
	pptUrl += '&UMO_ID='+lbresponse.ct[i].pk;
	}
	
	//$('#footer-section').empty().append(downloadLink+zipService+zipUrl);
	//$('#footer-section').append('<br />'+downloadLink+pptService+pptUrl);
	$('#Download-radioPpt').val(downloadLink+pptService+pptUrl);
	$('#Download-radioZip').val(downloadLink+zipService+zipUrl);
	$('#Download-radioPdf').val(pdfURL);
	$('#new-nav-sets-save a').data('downloadable', 'true');
	
}

/* function to set addthis share api buttons for lightboxes
 * @accepts host, lbid, lbname, decription
 */

Lightbox.setShareApi = function (lbresponse){
		
		var title = lbresponse.n;
		var id = lbresponse.pk;
		var LinkName = title.replace(' ','-');
		var pathArray = window.location.pathname.split( '/' );
		//if (typeof(pathArray[2])==='undefined'){var view ='listview'}else{var view = pathArray[2] }
		var url = 'http://' + window.location.host +'/lightbox/listview/'+lbresponse.pk+'/'+LinkName;
		var url = encodeURIComponent(url)
		var description = Session.username;
		
		var viewType = 'BP Commons User Set Image Collection: ' ;
		
		//if (view == 'item' || action =='search'){
		//var viewType ='Image Title: ';
		//}
		
		var html ='';
		html ='<div id="share-this-container-'+id+'" class="share-this-container"> <p>Choose a platform for sharing.</p><ul>';
		
		html +='<li id="twitter-share">';
		html +='<a href="http://api.addthis.com/oexchange/0.8/forward/twitter/offer?';
		html += 'url='+url; 
		html +='&pubid=ra-4dfa3837763d088d';
		html +='&text='+encodeURIComponent(viewType+' '+title+' \. By: '+description+ ' #balboaparkcommons');
		html +='" rel="nofollow" id="add-this-end-twitter" class="add-this-end" target="_BLANK">twitter</a>';
		html +='</li>';
		
		html +='<li id="facebook-share">';
		html +='<a href="http://api.addthis.com/oexchange/0.8/forward/facebook/offer?';
		html +='url='+url; 
		html +='&pubid=ra-4dfa3837763d088d';
		html +='" rel="nofollow" id="add-this-end-fb" class="add-this-end" target="_BLANK">facebook</a>';
		html +='</li>';
		
		html +='<li id="google-share">';
		html +='<a href="http://api.addthis.com/oexchange/0.8/forward/google_plusone_share/offer?';
		html +='url='+url; 
		//html +='&pubid=ra-4dfa3837763d088d"';
		html +='" rel="nofollow" id="add-this-end-google" class="add-this-end" target="_BLANK">google+</a>';
		html +='</li>';
		
		html +='</ul></div>';

		$('#lightbox-share-container').append(html);
		
		$('#new-nav-sets-share a[href][title]').qtip({
      	content: {
         text: false // Use each elements title attribute
      	},
     
     	show: 'mouseover',
     	hide: 'mouseout',
     	style: {
		classes: 'ui-tooltip-dark ui-tooltip-shadow'
		},
      	position: {
            my:'left center',
            at:'right center'
      	}
   		});
}		/* ajax json class that uses jquery */

function ajaxJson(wsname, params)
{
	this.wsname = wsname; 
	this.params = params;
}

ajaxJson.prototype.formatParams = function()
{
	var str = "";
	$.each(this.params, function(key, value) 
	{		
		key+"="+(escape(value))+"&";	  
	});		
}

ajaxJson.prototype.sendRequest = function() 
{	
	//WS = SKY
	//ACTION=LIST_ALL_CC	
	//SEARCH=*
	//

	var view = new View();
	
	$.ajax({
	  url: "test.html",
	  context: view,
	  success: function()
	  {
	    this.render();
	  }
	});		
	
}