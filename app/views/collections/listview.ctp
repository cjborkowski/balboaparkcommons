<?php if (@$this -> params['json'] == '1') {
	echo json_encode($data);
	}
		
	elseif (@$this -> params['pdf'] == '1') {
	echo $this->element('pdf_museum_collection', array('pageLink' => $this->here));
	} else {
		
	for($i=0; $i<count($data['ct']); $i++) 
	{
	$instTitle = max($data['ct'][$i]['n'],$data['ct'][$i]['c3'][0]['d'] ); 
	$link_institution = '/objectview/'.$sAction.'/'.$data['ct'][$i]['pk'].'/'.urlencode(str_replace(' ','-', $instTitle));
	$count =  BPOC::getCollectionsCount($data['ct'][$i]['pk']);
	?>
<div class="list-view-inner-container" itemscope itemtype="http://schema.org/ImageGallery">
	<div id="list-view-image-tip-target-<?php e($i);?>" class="list-view-details">
		<div class="list-view-title">
			<a href="<?php echo $link_institution ;?>" itemprop="url">	
				<span itemprop="author"><?php echo $instTitle ;?></span>
				</a>
		</div>
		<div class="list-view-inner-details">
				<div class="list-view-museum-desc">
				<?php $museum = CollectionsController::museum(urldecode($data['ct'][$i]['n'])); 
					$museum2 = $museum;
				echo $this->Text->truncate( $museum,  300,    
				array( 'ending' => '<a href="#" class="description-overflow-link" id="'.$i.'"><i>...read more</i></a>', 'exact' => false));
				?>
					<div class="description-overflow" id="description-overflow-<?php echo $i;?>" itemprop="description">
						<?php echo $museum2 ;?>
					</div>
				</div>
				<div class="list-view-inner-detail-count"><?php echo $count; ?></div>
		</div>
   
    </div><!-- close list-view-details -->	 		
 	<!--list view image -->
 	<div id="list-view-image-tip-<?php e($i);?>" class="list-view-main-picture">
		<a href="<?php echo $link_institution ;?>" itemprop="url">	
		<?php if($data['ct'][$i]['u']): ?>
		<img src="<?php $url = P_HOST.$data['ct'][$i]['u']; $der = 'O4'; $minWidth = 230; echo $this->Derivatives->getDerivative($der, $minWidth , $url);?>" class="view-gallery-thumbnail" itemprop="image" alt="<?php e( $instTitle);?>" />
		<?php else: ?><img src="/img/missing-thumbnail.png" class="view-gallery-thumbnail" />
		<?php endif; ?>
		</a>
	</div>
 		
 	<!--allows floating left to right within list-view-inner-container  -->
	<div style="clear:both;"></div>		
</div>
<?php } e($this->element('print_pdf_json')); } ?>


 




