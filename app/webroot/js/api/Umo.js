var Umo = function() {};

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
