<?php if (@$this -> params['json'] == '1') {
	echo json_encode($data);
	}
	elseif (@$this -> params['pdf'] == '1') {
	echo $this->element('pdf_featured_collection', array('pageLink' => $this->here));
	} else {
		
$data = $this->getVar('data');
for($i=0; $i<count($data['ct']); $i++) 
	{ 
	$link_feature = '/objectview/'.$sAction.'/'.$data['ct'][$i]['pk'].'/'.urlencode(str_replace(' ', '-', $data['ct'][$i]['n']));
	$link_institution = '/objectview/'.$sAction.'/'. BPOC::generateInstLink($data['ct'][$i]['d'], $collections).'/'.urlencode(str_replace(' ','-', $data['ct'][$i]['d']));
	?>	
<div class="list-view-inner-container" itemscope itemtype="http://schema.org/ImageGallery">
		
	<div id="list-view-image-tip-target" class="list-view-details">
	
			<div class="list-view-title">
				<a href="<?php echo $link_feature ;?>">
				<span itemprop="name"><?php echo $data['ct'][$i]['n'];?></span>
				</a>
			</div>
		
			<div class="list-view-institution-title">
    	        <a href="<?php echo $link_institution;?>" class="view-list-title">		
				<span itemprop="author"><?php echo $data['ct'][$i]['d'];?></span>
				</a>			
			</div>
		
    </div><!-- close list-view-details -->	 	
    
 	<!--list view image -->
 	<div id="list-view-image-tip-<?php echo $i;?>" class="list-view-main-picture">
		<a href="<?php echo $link_feature ;?>" itemprop="url">	
		<?php if($data['ct'][$i]['u']): ?><img src="
		<?php $url = P_HOST.$data['ct'][$i]['u']; $der = 'O4'; $minWidth = 230; 
		  echo $this->Derivatives->getDerivative($der,$minWidth,$url); 
		//echo $url?>" class="view-gallery-thumbnail" itemprop="image">
		<?php else:  ?><img src="/img/missing-thumbnail.png" class="view-gallery-thumbnail" />
		<?php endif; ?>
		</a>
	</div>
 	<!--allows floating left to right within list-view-inner-container  -->
 	
 	<div style="clear:both;"></div>		
	<?php echo $this->element('listview_share',array('id'=>$i, 'asset' =>$data['ct'][$i]['pk'], 'link'=> $link_feature ,'title'=>$data['ct'][$i]['n'], 'desc'=>$data['ct'][$i]['d'] )); ?>	
 		
</div>
<?php } e($this->element('print_pdf_json')); }?>	
