<!-- layout for testing stuff in -->
<link rel="stylesheet" type="text/css" href="/bpoc/app/webroot/css/cake.generic.css" />
<link rel="stylesheet" type="text/css" href="/bpoc/app/webroot/css/commons-main-style.css" />
<script type="text/javascript" src="/bpoc/app/webroot/js/lib/jquery-1.6.4.js"></script>
<script type="text/javascript" src="/bpoc/app/webroot/js/lib/jquery.cycle.all.js"></script>
<script type="text/javascript" src="/bpoc/app/webroot/js/api/Session.js"></script>
<script type="text/javascript" src="/bpoc/app/webroot/js/api/Profile.js"></script>
<script type="text/javascript" src="/bpoc/app/webroot/js/gui/View.js"></script> 
<script type="text/javascript" src="/bpoc/app/webroot/js/controller.js"></script>
<script type="text/javascript" src="/bpoc/app/webroot/js/ajaxJson.js"></script>
<script type="text/javascript" src="/bpoc/app/webroot/js/api/CommandCentre.js"></script>


<h2>THIS IS LAYOUT FOR TEST (LUSANA) will change to default.ctp once done</h2>



<div class="slideshow">

<?php 
$data = $this->getVar('data');
print_r($data);
for($i=0; $i<count($data['ct']); $i++)
{ ?>
<div class="view-gallery-item">
	
	<div class="view-gallery-details">
		<a href="/institution/view/"><?php echo $data['ct'][$i]['n'];?></a>
	</div>
	<img src="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>" class="view-gallery-thumbnail" id="umo_<?php echo $data['ct'][$i]['pk'];?>">

</div>
<?php } ?>

</div>








<script type="text/javascript">

$(document).ready(function () 
{
	//var data = <?php echo $this->getVar('jsondata'); ?>;	
	// $("[id^=umo_]").click(function () 
	// {
		// console.log(this);
        // //console.log('found one');
	// });
	
	
	alert('starting slideshow');
   $('.slideshow').cycle({
		fx: 'scrollRight' // choose your transition type, ex: fade, scrollUp, shuffle, etc...
	});	
	
	
	$("#umodiv").click(function (e) 
	{
		
		if(e.target instanceof HTMLElement)
		{
			if($(e.target).hasClass('view-gallery-thumbnail'))
			{
				var thumb = e.target;				
				alert(thumb.id);
			}
			
		} 
				

		//console.log(e.target);
	});	
	
	
});
</script>