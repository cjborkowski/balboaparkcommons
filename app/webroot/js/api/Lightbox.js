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
}		