<?php if (@$this -> params['json'] == '1') {
	echo json_encode($data['ct'][0]);
	}
		
	if (@$this -> params['pdf'] == '1') {
	echo $this->element('pdf_lightbox', array('pageLink' => $this->here));
	
	}
	
	if (@$this -> params['printable'] == '1') {
	echo $this->element('print_collection');
	} 
	
 	if(!isset($data['ct'])) { ?>
	<div id="no-images-found">Your search returned no results. Please try again</div>	

<?php } else { 
	
	if(isset($data['n'])){
	$this->set('title', $data['n']);		
	}else{
	$this->set('title', 'Lightbox User Sets');		
	}
	
	$action = $this->params['action'];
	
	for($i=0; $i<count($data['ct']); $i++){ 
	$link_institution = '/objectview/'.$action.'/'.urlencode($data['pk']).'/'.$data['n'];	
	$item_link = '/objectview/item/'.$data['ct'][$i]['pk'].'/'.urlencode(str_replace(' ','-', $data['n']));
	
	$item_title = 
	
			(empty($data['ct'][$i]['md']) 
				? $data['ct'][$i]['n']
				: (!empty($data['ct'][$i]['md']) && $data['ct'][$i]['md'][0]['mt'] == 'PUBLIC COMMONS.TITLE' && (!empty($data['ct'][$i]['md'][0]['mv']))
					? $data['ct'][$i]['md'][0]['mv'] 
					: $data['ct'][$i]['n']
					
								));
	?>
<div class="grid-view-inner-container lightbox-draggable">
	
	<div class="grid-view-main-picture" id="grid-view-image-tip-<?php echo $i;?>">			
		<?php if ( @$this->params['printable'] == '1' ): ?>
		<img id="thumb-index-<?php echo $i;?>" class="view-gallery-thumbnail" src="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>">
		<?php else :?>
		<a href ="<?php e($item_link); ?>" class="single-image-link meta-data-container-open-single-image-link">
		<img id="thumb-index-<?php echo $i;?>" class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_sml.gif" data-original="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>">
		</a>
		<?php endif;?>
	
		<div class="grid-view-details tooltip" id="grid-view-image-tip-target-<?php echo $i;?>">
		<div class="grid-view-title"><span itemprop="name"><?php echo $item_title; ?></span></div>
			<div class="grid-view-institution-title">
  			<a href ="<?php echo $link_institution ; ?>"></a>
			</div>
  		</div><!-- close grid-view-details tooltip-->
	
	</div><!-- end grid-view-main-picture -->

</div><!-- close loop & grid-view-inner-container-->
   
	<?php } ?>	

<div style="clear:both;"></div>
<?php if( isset($pagination)): ?>
<div id="bpoc-pagination"><?php echo $pagination; ?></div>
<?php endif ;?>

<?php } ?>


