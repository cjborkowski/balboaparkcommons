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
