<?php if ( @$this->params['json'] == '1' ): ?>
	<?php echo  $this->getVar('jsondata'); ?>
	<?php else :?>

<?php		$page_title = bpoc::setCollectionsTitle($data);
					$this->set('title_for_layout', $page_title); ?>




<?php if(!isset($data['ct'])) { ?>
	
<style>
	#no-images-found
	{
		
	}
</style>	
	
	<div id="no-images-found">Your search returned no results. Please try again</div>
	
	
<?php } else { ?>
	<div id="streamer-triggers">
	<?php for($i=0; $i<count($data['ct']); $i++) { 
	$item_link = '/objectview/item/'.$data['pk'].'/'.urldecode($data['n']).'/'.$data['ct'][$i]['pk'];	
	$link_feature = '/objectview/gridview/'.$data['ct'][$i]['pk'].'/'.urldecode($data['ct'][$i]['n']);
	$link_institution = '/institution/view/'.urlencode($data['ct'][$i]['pk'].'/'.$data['ct'][$i]['n']);	
	
	$item_title = 
	
			(empty($data['ct'][0]['md']) 
				? $data['ct'][0]['n']
				: (!empty($data['ct'][0]['md']) && $data['ct'][0]['md'][0]['mt'] == 'PUBLIC COMMONS.TITLE' && (!empty($data['ct'][0]['md'][0]['mv']))
					? $data['ct'][0]['md'][0]['mv'] 
					: $data['ct'][0]['n']
					
								));
	
	?>
<div class="grid-view-inner-container lightbox-draggable">
	
	<div class="grid-view-main-picture" id="grid-view-image-tip">			
		<?php if ( @$this->params['printable'] == '1' ): ?>
			<img thumb-index="<?php echo $i;?>" class="view-gallery-thumbnail" src="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>">
		<?php else :?>
		<a href ="#" class="single-image-link meta-data-container-open-single-image-link" data-index="<?php echo $i;?>">
		<img thumb-index="<?php echo $i;?>" class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_sml.gif" data-original="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>">
		</a>
		<?php endif;?>
	</div>
		
	<div class="grid-view-details tooltip" id="grid-view-image-tip-target">
		<div class="grid-view-title"> <?php echo $item_title; ?> </div>
		<div class="grid-view-institution-title">
  			<a href ="<?php echo $link_institution ; ?>">
  			<?php echo $page_title; ?>	
  			</a>
		</div>
  </div><!-- close grid-view-details tooltip-->
	

			<div id="new-meta-pop-up-container-<?php echo $i;?>" class="new-meta-pop-up-container" >
			<?php echo $this->element('new_meta_data_holder', array("data" => $data['ct'][$i]['md'])); ?>	
		
			</div>

</div><!-- close loop & grid-view-inner-container-->
	<?php } ?>	

<div style="clear:both;"></div>
</div>



<?php } ?>

	<?php endif;?>
