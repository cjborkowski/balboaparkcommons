<?php if (@$this -> params['json'] == '1') {
	echo json_encode($data);
	}
	elseif (@$this -> params['pdf'] == '1') {
	echo $this->element('pdf_featured_collection', array('pageLink' => $this->here));
	} else {
		
	for($i=0; $i<count($data['ct']); $i++) { 
	$link_feature = '/objectview/'.$sAction.'/'.$data['ct'][$i]['pk'].'/'.urlencode($data['ct'][$i]['n']);
	$link_institution = 'institution/view/'.urlencode($data['ct'][$i]['pk'].'/'.$data['ct'][$i]['n']);	
?>

<div class="grid-view-inner-container" itemscope itemtype="http://   schema.org/ImageGallery">
	<div id="grid-view-image-tip" class="grid-view-main-picture">
		<a href="<?php echo $link_feature;?>">	
				<?php if($data['ct'][$i]['u']): ?><img src="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>" class="view-gallery-thumbnail" alt="<?php echo $data['ct'][$i]['n'];?>" itemprop="image">
		<?php else:  ?><img src="/img/missing-thumbnail.png" class="view-gallery-thumbnail" alt="missing thumbnail" />
		<?php endif; ?></a>
	<!-- hidden and made tool tip --if title atribute used then next() DOM elemend becomes the tip-- grid-view-details tooltip-->
		<div id="grid-view-image-tip-target" class="grid-view-details tooltip">
		<div class="grid-view-title">
		<span itemprop="name"><?php echo $data['ct'][$i]['n'];?></span>
		</div>
		<div class="grid-view-institution-title" itemprop="author">
    	<?php
			if ($data['ct'][$i]['d']){
				echo $data['ct'][$i]['d'];
			} 
			
			elseif ($data['ct'][$i]['nl1']) {
				echo $data['ct'][$i]['nl1'];	
			} ;?>
    							
			</div>	 	
    </div><!-- close grid-view-details tooltip-->	 
	
	</div><!--end grid-view-image-tip -->
			
</div><!-- close loop & grid-view-inner-container-->

<?php } ?>	
<div style="clear:both;"></div>
<?php e($this->element('print_pdf_json')); } ?>