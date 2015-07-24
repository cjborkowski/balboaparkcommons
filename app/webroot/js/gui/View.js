/*SVN NOT UPDATING*/
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
        return '<li class="slideshow-LI"><a href="#"></a></li>'; 
    } 
	
	});
	
	//$('#slideshow-slides').cycle('pause'); 
	
	$('#video-slide-1').hover(function() { 
 		
 		$('#slideshow-slides').cycle('pause'); 
 	
 	});
 	
 	$('.slideshow-LI').hover(function() { 
 		
 		$('#slideshow-slides').cycle('pause'); 
 	
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
	console.log ('View.setLoggedIn called');
	if(Session.surl)
	{
	   console.log ('View.setLoggedIn has SURL');
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
	{	console.log ('View.setLoggedIn has no SURL');
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


View.OpenContact = function(){
	
		//console.log('in register open');
	var contactForm ='';
	contactForm += '<div id="contact-box" title="" class="commons-dialog">';
	contactForm += '<form name="contact-form" id="contact-form" onSubmit="return false">';
	
	contactForm += '<div class="contact-lable-box">';
	contactForm += '<label id="name" for="name">Full Name</label>';
	contactForm += '<span class="valid-state"></span>';
	contactForm += '<input type="text" name="name" id="name" value="" class="new-nav-inputs new-reg-inputs" /> ';
	contactForm += '<div style="clear:both;"></div>'; 
	contactForm += '</div>';
      
	contactForm += '<div class="contact-lable-box">';
	contactForm += '<label id="email" for"email">Email</label>';
	contactForm += '<span class="valid-state"></span>';
	contactForm += '<input type="text" name="email" id="email" value="" class="new-nav-inputs new-reg-inputs "/>';
    contactForm += '<div style="clear:both;"></div>'; 
	contactForm += '</div>';
	 
    contactForm += '<div class="contact-lable-box">';
  	contactForm += '<label id="message" for"message">Message</label>';
  	contactForm += '<span class="valid-state"></span>';
	contactForm += '<textarea rows="10" cols="30" name="message" id="message" value="" class="new-nav-inputs new-reg-inputs "/></textarea>';
    contactForm += '<div style="clear:both;"></div>'; 
	contactForm += '</div>';
	
	contactForm += '<input type=submit style=display:none />';
	contactForm += '<div style="clear:both;"></div>'; 
	contactForm += '</form>';
	
	contactForm += '</div>';
	
	$(contactForm).dialog(View.createDialogConfig({ // register
		title: 'Contact Us',	
		dialogClass: 'contact-box',
		width: 500,
		height: 520,
		zIndex: 500,
		modal:true,
		
		buttons: {
			"Send": function()
			{
			
			$('#contact-form').submit();
		
			}, //end register funtion,

			"Cancel": function()
			{
				$(this).dialog("close");
			}
		},
		//close: View.onCloseContact,
		close: function(ev, ui) { $(this).remove(); },
		open: function(){
	
		},
		beforeClose: View.onCloseContact
	}));
	
	$(".ui-dialog-buttonset").append('<div style="clear:both;"></div>').css('width','100%');
	$(".ui-dialog-buttonset button:nth-child(1)").addClass("dialog_submit-button");
	$(".ui-dialog-buttonset button:nth-child(2)").addClass("dialog_cancel-button");
	
	
	var form = $("#contact-form").validate({
		rules: {
			name: "required",
			email: {
				required: true,
				email: true
			},
			message: {
    			required: true
			}	
		},
		messages: {
			name: "Please enter your full name",
			email: "Please enter a valid email address",
			message: "Please compose a message."
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
			View.onSubmitContact();
			form.trigger('submit');
			form.submit();
		}	
	}); 
		
}

View.onSubmitContact = function(e){
	
	var form = $("#contact-form");
	var data = {};
	form.find(':input').each(function()
	{
		data[$(this).attr('name')] = $(this).val();
	});		
	
	View.SendContact(data);
}

View.SendContact = function(data){	
	//console.log ('onSubmitContact called');
	//console.log ('data is :'+ data.name +data.email + data.message);
	var pars = 
	{
		n: 'CONTACT',
		NAME:data.name,
		EMAIL:data.email,
		MESSAGE:data.message			
	}
	success = function(json)
	{	
		Msgs.removeLoading($('#contact-box'));
		
		if( json.message != '' )
		{
			$('#contact-box').dialog('close');	
			Msgs.showMsgDialog('Thank You. Your message has been received. We will reply shortly.', 'Thank You');
		
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
	
	Msgs.showLoading($('#contact-box'));
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
	
	$('#credits-link').click(function()
	{
		$('#credits-info-box').dialog('open');	
		return false;
	});
	
	$('#contact-link').click(function()
	{
		View.OpenContact();	
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
	
	$('#credits-info-box').dialog(View.createDialogConfig({
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
		draggable: false
	
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
	
		$('#credits-info-box-inner').jScrollPane({
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
   	//$('#navigation2-parent-li a').first().text(newText2);
    //console.log('foundit 2 is: '+ foundit2+ ' upper is: '+upper2 + ' the text should be set to '+ newText2);
    $.cookie('select2Name', newText2 , {
    		path : '/'
    	});
    } 
        
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

}//end
