var Profile = function() {}
Profile.eventObj = new PEvent("onlogin", "onlogout");

/***
 * Registers a new user profile 
 * @inputs { }
 * @success function triggered at success
 * @fail function triggered at fail
 */
Profile.register = function(inputs, success, fail)
{
	//console.log ('Profile.register called');
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
	//console.log ('Profile.edit called');
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
			console.log ('Profile is logged in');			
			View.setLoggedIn();
		}
		else
		{
			Msgs.showError('The username/password is incorrect.<br />If you have forgotten your username or password please email:<br />CommonsHelp@bpoc.org');
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
}