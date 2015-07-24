<?php if(!isset($data['ct'])) { ?>
	
	<div id="no-images-found">Your search returned no results.</div>

<?php	}
$action = $this->params['action'];
for($i=0; $i<count($data['ct']); $i++)
{
	$mTitle = $data['ct'][$i]['n']; 
	//$link_institution = '/objectview/'.$action.'/'.urlencode($data['opk'].'/'.$data['n']);	
	$link_userset ='';
	$mInst ='';
	$item_link = '/lightbox/'.$action.'/'.urlencode($data['ct'][$i]['pk']).'/'.urlencode(str_replace(' ','-', $data['ct'][$i]['n']));
	
?>
<div id="listview-conatianer-<?php echo $i;?>" class="list-view-inner-container" itemscope itemtype="schema.org/ImageGallery">
	
	  <div id="list-view-image-tip-target" class="list-view-details">	
			<div class="list-view-title">
			<a href="<?php e($item_link); ?>" class="single-image-link meta-data-container-open-single-image-link">	
			<span itemprop="name"><?php echo $mTitle ;?></span></a></div>		
		
			<?php if( isset($data['ct'][$i]['cc'])): ?>
			<div class="list-view-institution-title">    	        	
    	    	<a href="<?php echo $link_userset ;?>" class="view-list-title single-image-link meta-data-container-open-single-image-link" url itemprop="url">
    	    	<span itemprop="author">By user&nbsp;<?php e($data['ct'][$i]['cc']); ?></span>
    	    	</a>			
			
			</div>
			<?php endif; ?>
		
		
    </div><!-- close list-view-details -->
    <!-- close list-view-image -->
    <!-- php curl the derivative first if it's good use it else use =THUMBNAIL -->
      <div id="list-view-image-tip-<?php echo $i;?>" class="list-view-main-picture lightbox-draggable" >
			<a  href="<?php e($item_link); ?>" class="single-image-link">	
			<img id="<?php echo $i;?>" class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_med.gif" itemprop="image" data-original="<?php 
			if (isset($coverImage[$i]['ct'][0]['u'])){
			echo P_HOST.$coverImage[$i]['ct'][0]['u'] ;
			}else {
			echo "/img/missing-thumbnail.png";
			}?> ">
			</a>
		
	  </div>
    
 	<!--allows floating left to right within list-view-inner-container  -->
	<div style="clear:both;"></div>
	<?php if (isset($coverImage[$i]['ct'][0]['pk'])){ $asset = $coverImage[$i]['ct'][0]['pk'];}else{$asset ='';} ?>
	<?php echo $this->element('listview_download_share',array('id'=>$i , 'link'=> $item_link ,'title'=>$mTitle, 'desc'=>'Lightbox Set' , 'asset'=>$asset)); ?>	
 		
		
</div><!-- close loop & list-view-inner-container-->

<?php } ?>	
