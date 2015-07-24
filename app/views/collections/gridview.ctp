<?php if (@$this -> params['json'] == '1') {
	echo json_encode($data);
	}
	elseif (@$this -> params['pdf'] == '1') {
	echo $this->element('pdf_museum_collection', array('pageLink' => $this->here));
	} else { 	
for($i=0; $i<count($data['ct']); $i++) { 
	$instTitle = max($data['ct'][$i]['n'],$data['ct'][$i]['c3'][0]['d']);  
	$link_institution = '/objectview/'.$sAction.'/'.$data['ct'][$i]['pk'].'/'.urlencode(str_replace(' ','-', $instTitle));
	?>
<div class="grid-view-inner-container" itemscope itemtype="http://schema.org/ImageGallery">
	<div id="grid-view-image-tip-<?php echo $i;?>" class="grid-view-main-picture">
		<a href="<?php echo $link_institution;?>" itemprop="url">	
		<?php if($data['ct'][$i]['u']): ?><img src="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>" class="view-gallery-thumbnail" itemprop="image" 
		alt="<?php e($instTitle);?>" />
		<?php else:  ?><img src="/img/missing-thumbnail.png" class="view-gallery-thumbnail" alt="missing thumbnail" />
		<?php endif; ?>		
		</a>
	
	<!-- hidden and made tool tip --if title atribute used then next() DOM elemend becomes the tip
	-- grid-view-details tooltip-->
	<div id="grid-view-image-tip-target-<?php echo $i;?>" class="grid-view-details tooltip">
		<div class="grid-view-title">
			
			<span itemprop="author"><?php e($instTitle);?></span>
			
		</div>
			<div class="grid-view-institution-title">		
    			<a href="<?php echo$link_institution;?>" class="view-list-title">		
				    <span itemprop="name">
					<?php if($data['ct'][$i]['d']){
							echo $data['ct'][$i]['d'];
							} 
						
							if ($data['ct'][$i]['c3'] ){
							echo $data['ct'][$i]['c3'][0]['n'];
							}
								 		
					;?>
					</span>
    			</a>			
			</div>	 	
    </div><!-- close grid-view-details tooltip-->	 
	
	</div><!-- end grid-view-inner-container -->
	
</div><!-- close loop & grid-view-inner-container-->
<?php } ?>	
<div style="clear:both;"></div>
<?php e($this->element('print_pdf_json')); } ?>

