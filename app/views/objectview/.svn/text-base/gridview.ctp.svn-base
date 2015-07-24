<?php if (@$this -> params['json'] == '1') {
	echo json_encode($data['ct']);
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
	$artist =''; 
	$link_institution = '/objectview/'.$action.'/'.urlencode($data['pk']).'/'.urlencode(str_replace(' ','-', $data['n']));	
	if($sPass[0] !='search'){
	$item_link = '/objectview/item/'.urlencode($data['ct'][$i]['pk']).'/'.urlencode(str_replace(' ','-', $data['n']));
	$instTitle = '';
	$item_title = 
	
	
			(empty($data['ct'][$i]['md']) 
				? $data['ct'][$i]['n']
				: (!empty($data['ct'][$i]['md']) && $data['ct'][$i]['md'][0]['mt'] == 'PUBLIC COMMONS.TITLE' && (!empty($data['ct'][$i]['md'][0]['mv']))
					? $data['ct'][$i]['md'][0]['mv'] 
					: $data['ct'][$i]['n']
					
								));
		
	} else {
	$item_link = '/objectview/item/search/'.urlencode(str_replace(' ','-',$data['ct'][$i]['pk']));
	$item_title = 
			($data['ct'][$i]['md'] && $data['ct'][$i]['md'][0]['mt'] == 'PUBLIC COMMONS.TITLE' && $data['ct'][$i]['md'][0]['mv'] !=' '
				? $data['ct'][$i]['md'][0]['mv'] 
				: $data['ct'][$i]['n']
								);
	} 
	
	if ($data['ct'][$i]['md']){
	//meta loop
		for ($d=0; $d<count ($data['ct'][$i]['md']); $d++){
		 	if ($data['ct'][$i]['md'][$d]['mt'] =='PUBLIC COMMONS.SOURCE INSTITUTION'){
    		
			$instTitle = '<span itemprop="collection">';
					if(!$data['ct'][$i]['md'][$d]['mv']){
					$instTitle .= '&nbsp;';
		 			} else {
					$instTitle .= $data['ct'][$i]['md'][$d]['mv'];
					}
					$instTitle .='</span>';
   			 }//endif inner	
			
			elseif (strpos($data['ct'][$i]['md'][$d]['mt'] , 'PUBLIC COMMONS.CREATOR') !== false){
					if(!$data['ct'][$i]['md'][$d]['mv']){
					$artist .='&nbsp;';
		 			} else {
					$artist = $data['ct'][$i]['md'][$d]['mv'];
					}
			}// end elseif
		
		} //end loop
	} //endif
	
	  
	?>
<div class="grid-view-inner-container lightbox-draggable">
	
	<div class="grid-view-main-picture" id="grid-view-image-tip-<?php echo $i;?>">			
		<?php if ( @$this->params['printable'] == '1' ): ?>
		<img id="thumb-index-<?php e($i);?>" class="view-gallery-thumbnail" src="http://piction.bpoc.org/piction/<?php e($data['ct'][$i]['u']);?>">
		<?php else :?>
		<a href ="<?php e($item_link); ?>" class="single-image-link meta-data-container-open-single-image-link">
		<img id="thumb-index-<?php e($i);?>" class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_sml.gif" data-original="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>">
		</a>
		<?php endif;?>
	
		<div class="grid-view-details tooltip" id="grid-view-image-tip-target-<?php e($i);?>">
		<div class="grid-view-title"><span itemprop="name"><?php e($item_title); ?></span></div>
			<div class="grid-view-creator-artist grid-view-institution-title">
			<span itemprop="artist"><?php e($artist); ?></span>
			</div>
			<div class="grid-view-institution-title">
  			<a href ="<?php e($link_institution) ; ?>"><span itemprop="institution"><?php e($instTitle);?></span></a>
			</div>
			
  		</div><!-- close grid-view-details tooltip-->
	
	</div><!-- end grid-view-main-picture -->

</div><!-- close loop & grid-view-inner-container-->
   
	<?php } ?>	

<div style="clear:both;"></div>
<?php if( isset($pagination)): ?>
			<div id="bpoc-pagination"><?php e($pagination); ?></div>
<?php endif ;
			if (!isset($data['ct']) || $count != 0){
			e($this->element('print_pdf_json'));
		}
 }?>


