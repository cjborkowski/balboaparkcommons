<!-- /instiution/listview -->
<div id="streamer-triggers">
<?php 
for($i=0; $i<count($data['ct']); $i++)
{ 
	$link_feature = '/objectview/gridview/'.$data['ct'][$i]['pk'].'/'.urldecode($data['ct'][$i]['n']);
	$link_institution = '/institution/view/'.urlencode($data['ct'][$i]['pk'].'/'.$data['ct'][$i]['n']);	
	$item_link = '/objectview/item/'.$data['pk'].'/'.urldecode($data['n']).'/'.$data['ct'][$i]['pk'];
?>

	<div id="listview-conatianer-<?php echo $i;?>" class="list-view-inner-container" itemscope itemtype="schema.org/ImageGallery">
	
	  <div id="list-view-image-tip-target" class="list-view-details">	
			<div class="list-view-title"><span itemprop="name">
			<a class="single-image-link meta-data-container-open-single-image-link" data-index="<?php echo $i;?>"  href="#">
			<!-- TODO: drop this suff -->	
			<?php //echo $data['ct'][$i]['n'];?>
			
			<?php if( $data['ct'][$i]['md']){
								 	
					echo $data['ct'][$i]['md'][0]['mv'];
						} else{
							echo $data['ct'][$i]['n'];
						}
			 	?>
			</a></span></div>		
		
			<?php  if ($data['d']): ?>
			<div class="list-view-institution-title">    	        	
    	        <a href="<?php echo $link_institution ;?>" class="view-list-title single-image-link meta-data-container-open-single-image-link" url itemprop="url"><span  itemprop="author"><?php echo $data['d'];?></span></a>			
			</div>
			<?php endif; ?>
		
		
    </div><!-- close list-view-details -->
    
    <!-- close list-view-image -->
      <div id="list-view-image-tip" class="list-view-main-picture lightbox-draggable">
			<a  href="#" class="single-image-link meta-data-container-open-single-image-link"  data-index="<?php echo $i;?>">	
				<img id="thumb-index-<?php echo $i;?>" class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_sml.gif" itemprop="image" data-original="<?php echo P_HOST.$data['ct'][$i]['u'];?>">
			</a>
	  </div>
    
    
 	<!--allows floating left to right within list-view-inner-container  -->
	<div style="clear:both;"></div>
		<!-- TODO: make-element  -->
		<div class="list-view-share-download">
			<a href="http://www.addthis.com/bookmark.php?v=250&amp;pubid=ra-4dfa3837763d088d"  class="list-view-share-download-link list-view-share-link  addthis_button">share</a>
			<a href="#"  class="list-view-share-download-link list-view-download-link">download</a>
		</div>
		
		
		<div id="new-meta-pop-up-container-<?php echo $i;?>" class="new-meta-pop-up-container" >
			<?php echo $this->element('new_meta_data_holder', array("data" => $data['ct'][$i]['md'])); ?>	
		
		</div>
		<div style="clear: both"></div>
		
		
</div><!-- close loop & list-view-inner-container-->

<?php } ?>	
</div>
  <!-- AddThis Button BEGIN -->
<script type="text/javascript">var addthis_config = {"data_track_addressbar":true};</script>
<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4dfa3837763d088d"></script>
<!-- AddThis Button END -->