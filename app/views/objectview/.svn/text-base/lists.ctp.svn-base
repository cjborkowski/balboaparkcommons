<?php if ( @$this->params['json'] == '1' ): ?>
	<?php echo  $this->getVar('jsondata'); ?>
	<?php else :?>

<?php		$page_title = bpoc::setCollectionsTitle($data);
					$this->set('title_for_layout', $page_title); ?>

<h1><?php echo $this->getVar('title'); ?></h1>


<?php if(!isset($data['ct'])) { ?>
	
<style>
	#no-images-found
	{
		
	}
</style>	
	
	<div id="no-images-found">Your search returned no results. Please try again</div>
	
	
<?php } else { ?>
	
	<div id="pagination">
<?php
      echo $paginator->prev(); 
      echo $paginator->numbers(array('separator'=>' - ')); 
      echo $paginator->next();
?>
</div> 
	
	<div id="streamer-triggers-2">
	<?php for($i=0; $i<count($data['ct']); $i++) { 
	$item_link = '/objectview/item/'.$data['pk'].'/'.urlencode($data['n']).'/'.$data['ct'][$i]['pk'];	
	?>
<div class="grid-view-inner-container lightbox-draggable">
	
	<div class="grid-view-main-picture" id="grid-view-image-tip">			
		<?php if ( @$this->params['printable'] == '1' ): ?>
			<img thumb-index="<?php echo $i;?>" class="view-gallery-thumbnail" src="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>">
		<?php else :?>
		<a href ="<?php echo $item_link ?>">
		<img thumb-index="<?php echo $i;?>" class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_sml.gif" data-original="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>">
		</a>
		<?php endif;?>
	</div>
		
	<div class="grid-view-details tooltip" id="grid-view-image-tip-target">
		<div class="grid-view-title"></div>
		<div class="grid-view-institution-title">
  			<!-- <a class="view-list-title" href="/featured/gridview/7791721/Museum+of+Photographic+Arts">		
			</a> out for now-->			
		</div>
  </div><!-- close grid-view-details tooltip-->
	

</div><!-- close loop & grid-view-inner-container-->
	<?php } ?>	

<div style="clear:both;"></div>
</div>



<?php } ?>

	<?php endif;?>
