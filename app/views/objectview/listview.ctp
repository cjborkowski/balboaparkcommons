<?php if (@$this -> params['json'] == '1') {
	echo json_encode($data);
	}
		
	elseif (@$this -> params['pdf'] == '1') {
	echo $this->element('pdf_collection', array('pageLink' => $this->here));
	}
	
	elseif (@$this -> params['printable'] == '1') {
	echo $this->element('print_collection');
	
	} else { 
 	 	
	if(!isset($data['ct']) || $count== 0) { ?>
	<div id="no-images-found">Your search returned no results. Please try again.</div>	
<?php }
$action = $this->params['action'];

for($i=0; $i<count($data['ct']); $i++)
{ 
	if($sPass[0] !='search'){
	//$item_link = '/objectview/item/'.urlencode($data['ct'][$i]['pk']).'/'.urlencode(str_replace(' ','-', $data['d']));
	$item_link = '/objectview/item/'.urlencode($data['ct'][$i]['pk']).'/'.urlencode(str_replace(' ','-', $data['n']));
	
	} else {
	$item_link = '/objectview/item/search/'.urlencode(str_replace(' ','-',$data['ct'][$i]['pk']));
	}
	
?>
<div id="listview-conatianer-<?php e($i);?>" class="list-view-inner-container" itemscope itemtype="schema.org/ImageGallery">
	
	  <div id="list-view-image-tip-target" class="list-view-details">	
			<div class="list-view-title">
			<a href="<?php e($item_link); ?>" class="single-image-link meta-data-container-open-single-image-link">	
	<?php 
	$itemTitle ='';
	$instTitle ='';
	$link_institution ='';
	
	if ($data['ct'][$i]['md']){
	//meta loop
		for ($d=0; $d<count ($data['ct'][$i]['md']); $d++){
		 			
		 		if ($data['ct'][$i]['md'][$d]['mt'] == "PUBLIC COMMONS.TITLE" && $data['ct'][$i]['md'][$d]['mv']){	
				$itemTitle = $data['ct'][$i]['md'][$d]['mv'];
				} 
		 		
		 		if ($data['ct'][$i]['md'][$d]['mt'] =='PUBLIC COMMONS.SOURCE INSTITUTION') { 
				$instTitle = $data['ct'][$i]['md'][$d]['mv'];
				}
				
			} //end loop
	 }//endif	
	 
	if($sPass[0] !='search'){
	$instituion_link = '/objectview/'.$action.'/'.BPOC::generateInstLink($instTitle).'/'. urlencode(str_replace(' ','-', $instTitle));
	//$instituion_link = '/objectview/'.$action.'/'.urlencode($data['pk']).'/'.urlencode(str_replace(' ','-', $data['d']));
	
	} else {
	$instituion_link = '/objectview/'.$action.'/'.BPOC::generateInstLink($instTitle).'/'. urlencode(str_replace(' ','-', $instTitle));
	
	}
	
	?>
	<span itemprop="name"><?php e($itemTitle);?></span></a></div>		
		
	<div class="list-view-institution-title">    	        	
    <a href="<?php e($instituion_link);?>" class="view-list-title single-image-link meta-data-container-open-single-image-link" itemprop="url">
   	<span itemprop="author"><?php echo $instTitle; ?></span>
    </a>			
	</div>
					
    </div><!-- close list-view-details -->
    <!-- close list-view-image -->
    <!-- php curl the derivative first if it's good use it else use =THUMBNAIL -->
      <div id="list-view-image-tip-<?php echo $i;?>" class="list-view-main-picture lightbox-draggable" >
			<a  href="<?php e($item_link); ?>" class="single-image-link meta-data-container-open-single-image-link">	
				<img id="<?php e($i);?>"
				class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_med.gif" itemprop="image" 
				data-original="<?php $url = P_HOST.$data['ct'][$i]['u']; $der = 'O4';  $minWidth = 230; 
				echo $this->Derivatives->getDerivative($der, $minWidth, $url);?>">
			</a>
	  </div>
    
 	<!--allows floating left to right within list-view-inner-container  -->
	<div style="clear:both;"></div>
	<?php echo $this->element('listview_download_share',array('id'=>$i , 'link'=> $item_link ,'title'=>$itemTitle, 'desc'=>$instTitle , 'asset'=>$data['ct'][$i]['pk'])); ?>	
 				
</div><!-- close loop & list-view-inner-container-->
<?php } ?>	

<?php if( isset($pagination)): ?>
			<div id="bpoc-pagination"><?php e($pagination); ?></div>
<?php endif ; 
		if (!isset($data['ct']) || $count != 0){
			e($this->element('print_pdf_json'));
		}
 } 
 ?>