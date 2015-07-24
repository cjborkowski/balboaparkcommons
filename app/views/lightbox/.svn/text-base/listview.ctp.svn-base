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
?>
	
<div id="listview-conatianer-<?php echo $i;?>" class="list-view-inner-container" itemscope itemtype="schema.org/ImageGallery">
	
	  <div id="list-view-image-tip-target" class="list-view-details">	
			<div class="list-view-title">
			<a href="<?php e($item_link); ?>" class="single-image-link meta-data-container-open-single-image-link">	
			<span itemprop="name">
	<?php 
	$mTitle = $data['ct'][$i]['n'];
	$mInst ='';
			
	if( $data['ct'][$i]['md']){
			
		for($d=0; $d<count($data['ct'][$i]['md']); $d++){
						
			if ($data['ct'][$i]['md'][$d]['mt'] == "PUBLIC COMMONS.TITLE"){
			$mTitle = $data['ct'][$i]['md'][$d]['mv'];
			}
					
			if ($data['ct'][$i]['md'][$d]['mt'] == "PUBLIC COMMONS.SOURCE INSTITUTION"){
			$mInst =  $data['ct'][$i]['md'][$d]['mv'];
			}else{
			$mInst .='';
			}
		}//end for */
					
	//print_r($data['ct'][$i]['md']);
	}//end if
					
	echo $mTitle; ?>
			</span></a></div>		
		
			<?php if( $data['ct'][$i]['md']): ?>
			<div class="list-view-institution-title">    	        	
    	    	<a href="<?php echo $link_institution ;?>" class="view-list-title single-image-link meta-data-container-open-single-image-link" url itemprop="url">
    	    	<span itemprop="author"><?php echo $mInst;?></span>
    	    	</a>			
			
			</div>
			<?php endif; ?>
		
		
    </div><!-- close list-view-details -->
    <!-- close list-view-image -->
    <!-- php curl the derivative first if it's good use it else use =THUMBNAIL -->
      <div id="list-view-image-tip-<?php echo $i;?>" class="list-view-main-picture lightbox-draggable" >
			<a  href="<?php e($item_link); ?>" class="single-image-link meta-data-container-open-single-image-link">	
				<img id="<?php echo $i;?>"
				class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_med.gif" itemprop="image" 
				data-original="<?php $url = P_HOST.$data['ct'][$i]['u']; $der = 'O4';  $minWidth = 230; 
				echo $this->Derivatives->getDerivative($der, $minWidth, $url);?>">
			</a>
	  </div>
    
 	<!--allows floating left to right within list-view-inner-container  -->
	<div style="clear:both;"></div>
	<?php echo $this->element('listview_download_share',array('id'=>$i , 'link'=> $item_link ,'title'=>$mTitle, 'desc'=>$mInst , 'asset'=>$data['ct'][$i]['pk'])); ?>	
 		
		
</div><!-- close loop & list-view-inner-container-->

<?php }} ?>
	


