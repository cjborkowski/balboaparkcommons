<!-- objectview/streamview -->
<?php 
$data = $this->getVar('data');
//print_r($data);
?>


OBJECTVIEW/STREAMVIEW (NEEDS TO BE IMPLEMENTED
<div class="scrollbar simple" id="view-container">
	<?php for($i=0; $i<count($data['ct']); $i++) { ?>
<div class="featured-grid-view-inner-container">
	
	<div class="featured-grid-view-main-picture" id="featured-grid-view-image-tip">			
			<img class="view-gallery-thumbnail" src="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>" class="view-gallery-thumbnail">
	</div>
		
	<div class="featured-grid-view-details tooltip" id="featured-grid-view-image-tip-target">
		<div class="featured-grid-view-title"><h2>1920s</h2></div>
		<div class="featured-grid-view-institution-title">
  			<a class="view-list-title" href="/featured/gridview/7791721/Museum+of+Photographic+Arts">		
			Museum of Photographic Arts    			</a>			
		</div>
  </div><!-- close featured-grid-view-details tooltip-->
	

</div><!-- close loop & featured-grid-view-inner-container-->
	<?php } ?>	
<div style="clear:both;"></div>
</div>
