<!DOCTYPE HTML>

<html itemscope itemtype="http://schema.org/ImageGallery">

<head>
	<?php e($this->element('extended-meta_data_holder') ); ?>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

		
    <title><?php  
    			if (isset($title)){
    				echo 'Balboa Park Commons: '.$title; 
				} else {
					echo 'Balboa Park Commons '.$title_for_layout; 
			} ?></title>
<?php  
	/* Minifed */
	echo $this->Html->meta('icon');
	echo $this->Html->css('cake.generic');		
	echo $this->Html->css('jquery-ui-1.8.16.custom.css');
	echo $this->Html->css('footer');
	echo $this->Html->css('commons-main-style');
	echo $this->Html->css('views');	
	//echo $this->Html->css('ui.selectmenu');
	echo $this->Html->css('jquery.qtip.min');
	echo $this->Html->css('jquery.jscrollpane');  

	//echo $this->AssetCompress->css('all');
	?>
	<!--[if IE]>
	<meta http-equiv="x-ua-compatible" content="IE=8">
  	<?php echo $this->Html->css('ie.css'); ?>
	<![endif]-->	

	<?php
	/* combined*/
	echo $this->Html->script('lib/jquery-1.7.1');
	echo $this->Html->script('lib/jquery-ui-1.8.24.custom.min.js');
	echo $this->Html->script('lib/jquery.fileDownload');

	//echo $this->AssetCompress->script('jquery-combined');
	/* non min libs */
	echo $this->Html->script('lib/jquery.scrollstop');	
	echo $this->Html->script('lib/jquery.jscrollpane');
	echo $this->Html->script('lib/jquery.mousewheel');
	echo $this->Html->script('lib/jquery.history');
	echo $this->Html->script('lib/jquery.cookie');
	echo $this->Html->script('lib/jquery.cycle.all');
	
	//echo $this->AssetCompress->script('libs-min');
	//these suck and can't compress or combine
	echo $this->Html->script('lib/jquery.lazyload.min');
	echo $this->Html->script('lib/jquery.validate.min');
	echo $this->Html->script('lib/imgscale.jquery.min');
	echo $this->Html->script('lib/jquery.qtip.min');
	echo $this->Html->script('lib/footer');
	echo $this->Html->script('lib/footer_plugins');
	 
	/*
	 * /commons js */
	echo $this->Html->script('api/PEvent');
	echo $this->Html->script('api/Msgs');		
	echo $this->Html->script('api/Session');
	echo $this->Html->script('api/Profile');
	//echo $this->Html->script('api/Umo');
	//echo $this->Html->script('api/CommandCentre');
	echo $this->Html->script('gui/View');
	//echo $this->Html->script('gui/Streamer');
	//echo $this->Html->script('gui/Mainview');
	echo $this->Html->script('api/Lightbox');
	//echo $this->Html->script('controller');	
	echo $this->Html->script('ajaxJson');
	//echo $this->AssetCompress->script('commons');
	//echo $this->AssetCompress->includeCss();
	//echo $this->AssetCompress->includeJs(); 
	echo $scripts_for_layout; 
?>

<?php echo $this->element('services_header',array('cache' => true)); ?>				    	
</head>
<!-- PHP variables that need to be set globally -->
<?php
$data = $this->getVar('data');
$title = $this->getVar('title');
?>
<body>			
<div id="container">	
	<div id="animator">
		<div id="header">		
			<?php echo $this->element('navigation_top', array('cache' => true)); ?>	
			<div id="nav-tab" class="open"><span class="nav-hide-text"></span></div>			    	
		</div><!--end header -->
			<!--make scrollbars dynamic to view TODO:drop this if statement because streamview is gone -->
			<?php if($this->params['controller'] =="pages" || $this->params['controller'] =="slides" || $this->params['controller'] =="posts" ||
			$this->params['controller'] =="users"):?>
			<div id="view-container">
	
			<?php echo $content_for_layout; ?>
			</div>
			<?php elseif ( isset($title) || $this->params['action'] =='item' ):?>
			<div id="floating-title">
				<div id="showing-title">Showing By:&nbsp;</div><div id="showing-title-value"><?php e($title);?></div>
				<div style="clear:both;"></div>
				</div>	
			<div id="view-container">	
			<?php echo $content_for_layout; ?>
			</div>
			<?php endif ;?>
	</div><!--end animator -->
		<!-- holds custom set objects (lightbox) -->			
		<div id="footer">				
			<div id="global-nav-section">
				<?php echo $this->element('navigation_bottom-2', array("data" => $data));  ?>	
						
				<div style="clear:both;"></div>	
				</div>						
					
				<div id="footer-section">
				<?php echo $this->element('footer'); ?>	
				</div>
		</div><!--end footer -->
</div><!--end container -->		

<script type="text/javascript">
<?php if (isset($_SESSION['surl']))
{
	echo "Session.surl = '".$_SESSION['surl']."';";
	echo "Session.username = '".$_SESSION['username']."';";
}
?>
var Glb =
{
	action:"<?php echo $this->params['action']; ?>",
	controller:"<?php echo $this->params['controller']; ?>",
	p_host:"<?php echo P_HOST; ?>"
};

$(document).ready(function () 
{
	var data = <?php echo json_encode($data); ?>;		
	View.initPage(); // initialises all controls
	Lightbox.init(); // initialises lightbox data
	//Glb.mainview = new Mainview(cfgMain);
	//streamer.setMainView(Glb.mainview);
	View.setData(data); //send JSON DATA aka your model to js
	View.setController(Glb.controller); //send JSON DATA to js controllers
	View.setAction(Glb.action); //informs js functions about cake views
});
</script>

<?php echo $this->element('services_footer',array('cache' => true)); ?>

</body>
</html>
<?php $xhprof_data = xhprof_disable(); ?>
<!-- xhprof end -->
