<?php if (@$this -> params['json'] == '1') {
	echo json_encode($data['ct'][0]);
	}
		
	elseif (@$this -> params['pdf'] == '1') {
	echo $this->element('pdf_collection', array('pageLink' => $this->here));
	}
	
	elseif (@$this -> params['printable'] == '1') {
	echo $this->element('print_collection');
	} 
	
 	if(!isset($data['ct']) || $count== 0) { ?>
	<div id="no-images-found">Your search returned no results. Please try again.</div>	

<?php } else { ?>
<div id="streamer-triggers">
<?php 
 $action = $this->params['action'];
 $artist = '';
 $instTitle = '';
for($i=0; $i<count($data['ct']); $i++)
{ 
	$link_institution = '/objectview/'.$action.'/'.urlencode($data['ct'][$i]['pk'].'/'.$data['ct'][$i]['n']);	
	if($sPass[0] !='search'){
	$item_link = '/objectview/item/'.urlencode($data['ct'][$i]['pk']).'/'.urlencode(str_replace(' ','-', $data['n']));
	} else {
	$item_link = '/objectview/item/search/'.$data['ct'][$i]['pk'];	
	}

$item_title =  (empty($data['ct'][$i]['md']) 
				? $data['ct'][$i]['n']
				: (!empty($data['ct'][$i]['md']) && $data['ct'][$i]['md'][0]['mt'] == 'PUBLIC COMMONS.TITLE' && (!empty($data['ct'][$i]['md'][0]['mv']))
					? $data['ct'][$i]['md'][0]['mv'] 
					: $data['ct'][$i]['n']
								));
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
	} 
?>

	<div class="full-view-inner-container" itemscope itemtype="schema.org/ImageGallery">	   
	   <div id="full-view-image-tip" class="full-view-main-picture lightbox-draggable">
			<a href="<?php echo $item_link; ?>" class="single-image-link">	
				<img id="<?php echo $i; ?>" class="view-gallery-thumbnail thumb-lazyload" src="/img/loading_sml.gif" itemprop="image" data-original="<?php echo P_HOST . $data['ct'][$i]['w']; ?>">
			</a>
	  <!--hover tool tips -->
		<div class="full-view-details tooltip" id="full-view-image-tip-target-<?php e($i);?>">
		<div class="full-view-title"><span itemprop="name"><?php e($item_title); ?></span></div>
			<div class="full-view-creator-artist grid-view-institution-title">
			<span itemprop="artist"><?php e($artist); ?></span>
			</div>
			<div class="full-view-institution-title">
  			<span itemprop="institution"><?php e($instTitle);?> </span>
			</div>
  		</div><!-- close full-view-details tooltip-->
	  </div>
	
		
	
</div><!-- close loop & full-view-inner-container-->
<?php } ?>	
</div>
<?php if( isset($pagination)): ?>
			<div id="bpoc-pagination"><?php e($pagination); ?></div>
<?php endif ;
			if (!isset($data['ct']) || $count != 0){
			e($this->element('print_pdf_json'));
		}
}?>