/* ajax json class that uses jquery */

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
