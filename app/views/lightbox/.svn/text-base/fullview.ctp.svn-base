<?php if (@$this -> params['json'] == '1') {
	echo json_encode($data['ct'][0]);
	}
		
	if (@$this -> params['pdf'] == '1') {
	echo $this->element('pdf_lightbox',array('pageLink' => $this->here));
	
	}
	
	if (@$this -> params['printable'] == '1') {
	echo $this->element('print_collection');
	} 
	
 	if(!isset($data['ct'])) { ?>
	<div id="no-images-found">Your search returned no results. Please try again</div>	

<?php } else { ?>

<div id="streamer-triggers">
<?php 
 $action = $this->params['action'];
for($i=0; $i<count($data['ct']); $i++)
{ 
	$link_institution = '/objectview/'.$action.'/'.urlencode($data['ct'][$i]['pk'].'/'.$data['ct'][$i]['n']);	
	if($sPass[0] !='search'){
	
	$item_link = '/objectview/item/'.$data['ct'][$i]['pk'].'/'.urlencode(str_replace(' ','-', $data['n']));
	} else {
	$item_link = '/objectview/item/search/'.$data['ct'][$i]['pk'];	
	}
?>

	<div class="full-view-inner-container" itemscope itemtype="schema.org/ImageGallery">	   
	   <div id="full-view-image-tip" class="full-view-main-picture lightbox-draggable">
			<a href="<?php echo $item_link ;?>" class="single-image-link">	
				<img id="<?php echo $i;?>" class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_sml.gif" itemprop="image" data-original="<?php echo P_HOST.$data['ct'][$i]['w'];?>">
			</a>
	  </div>
	
</div><!-- close loop & full-view-inner-container-->

<?php } ?>	
</div>
<?php if( isset($pagination)): ?>
<div id="bpoc-pagination"><?php echo $pagination; ?></div>
<?php endif ;?>
<?php } ?>