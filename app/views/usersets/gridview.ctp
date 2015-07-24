<?php if(!isset($data['ct'])) { ?>
	
	<div id="no-images-found">Your search returned no results.</div>

<?php	}
$action = $this->params['action']; 
for($i=0; $i<count($data['ct']); $i++) { 
	$item_link = '/lightbox/'.$action.'/'.urlencode($data['ct'][$i]['pk']).'/'.urlencode(str_replace(' ','-', $data['ct'][$i]['n']));
	?>

<div class="grid-view-inner-container">
	<div id="grid-view-image-tip" class="grid-view-main-picture">
		<a  href="<?php e($item_link); ?>" class="single-image-link">	
			<img id="<?php echo $i;?>" class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_med.gif" itemprop="image" data-original="<?php 
			if (isset($coverImage[$i]['ct'][0]['u'])){
			echo P_HOST.$coverImage[$i]['ct'][0]['u'] ;
			}else {
			echo "/img/missing-thumbnail.png";
			}?> ">
			</a>	
	<!-- hidden and made tool tip --if title atribute used then next() DOM elemend becomes the tip-- grid-view-details tooltip-->
	<div id="grid-view-image-tip-target" class="grid-view-details tooltip">	
		<div class="grid-view-title">
		<span itemprop="name"><?php echo $data['ct'][$i]['n'];?></span>
		</div>
			<div class="grid-view-institution-title">					
    		<span itemprop="author">By user&nbsp;<?php e($data['ct'][$i]['cc']); ?></span>
			</div>	 	
    	</div><!-- close grid-view-details tooltip-->	 
	
	</div><!--end grid-view-image-tip -->
	
</div><!-- close loop & grid-view-inner-container-->

<?php } ?>	
<div style="clear:both;"></div>
