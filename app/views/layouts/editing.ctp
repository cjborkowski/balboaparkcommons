<html xmlns="http://www.w3.org/1999/xhtml">
<head>

    <title>
        <?php //__('BPOC Commons Dev Site:'); ?>
        <?php echo 'BPOC Commons BETA Site: '. $title_for_layout; ?>
    </title>

   

<?php
  	echo $this->Html->meta('icon');
  	echo $this->Html->css('cake.generic');		
	echo $this->Html->css('jquery-ui-1.8.16.custom.css');
	echo $this->Html->css('commons-main-style');
	echo $this->Html->css('views');	
	echo $this->Html->css('ui.selectmenu');
	//echo $this->Html->css('carousel-tools');
	echo $this->Html->css('piction_streamer');
	echo $this->Html->css('jquery.jscrollpane');
	
	echo $this->Html->script('lib/jquery-1.6.4');	
	echo $this->Html->script('lib/jquery-common');
	echo $this->Html->script('lib/jquery.tools.min');
	echo $this->Html->script('lib/jquery-ui-1.8.16.custom.min');
	echo $this->Html->script('lib/jquery.lazyload.min');
	echo $this->Html->script('lib/jquery.scrollstop');	
	echo $this->Html->script('lib/jquery.jscrollpane');
	echo $this->Html->script('lib/jquery.mousewheel');
	echo $this->Html->script('lib/jquery.scrollTo');
	echo $this->Html->script('lib/ui.selectmenu');
	echo $this->Html->script('lib/jquery.appear-1.1.1');
	echo $this->Html->script('lib/jquery.cookie');

	
	echo $scripts_for_layout; 
?>

<?php echo $this->element('services_header'); ?>				    	

</head>
<body>			
	<body>			
	<div id="wrap">
	<div id="commons-container" class="tk-proxima-nova">
		
		<div id="header"><?php echo $this->element('navigation_top', array('flag' => 'value')); ?></div>
				    	
	
	
	 	<div id="inner-wrap">
			<div id="content">	
				<div id="view-container-editing">	
				<?php echo $content_for_layout; ?>
				</div>
			</div>
		</div>	<!--inner wrap -->		
	
		<!-- holds custom set objects (lightbox) -->
		<div id="footer"></div>		
	</div>
</div> 		<!--wrap-->		
</body>
</html>
