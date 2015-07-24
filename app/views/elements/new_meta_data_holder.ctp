<div class ="new-meta-title">
  <?php 
			
		if($data[0]['mt']=='PUBLIC COMMONS.TITLE' && $data[0]['mv'] !='' ){
		echo '<p>'.$data[0]['mv'].'</p>';
		 }else{
		echo '<p>TITLE MISSING</p>';
		 }
	
		?>
</div>
		

<div id="new-meta-control-close">
<ul>
	<li style="list-style: none;"><a href="#" class="new-meta-data-container-close">close</a></li>
</ul>
</div>	



<div id="meta-tabs" class="list-grid-view-meta-tabs">
	<ul>
		<li><a href="#about-tabs-1" class="tab-text">About</a></li>
		<li><a href="#museum-info-tabs-2" class="tab-text">Museum Info</a></li>
		<!-- TODO: make-element  -->
		
		<div class="list-view-share-download-meta">
			<a href="http://www.addthis.com/bookmark.php?v=250&amp;pubid=ra-4dfa3837763d088d"  class="list-view-share-download-link list-view-share-link addthis_button">share</a>
			<a href="#"  class="list-view-share-download-link list-view-download-link">download</a>
		</div>

	</ul>
	
	<div id="about-tabs-1" class="tab-content tab-scroll-pane">
		<div id="tab-inner">	
	<div id="item-meta-data-wrapper">
		<div id="item-meta-data" style=  itemprop="about" itemscope itemtype="http://schema.org/Photograph">
		<?php 
		$metaHtml ='';
		$instDesc  = '';
		$instTitle ='';
        for($d=0; $d < count($data); $d++){
			
	//never show this
    if ($data[$d]['mt'] =='PUBLIC COMMONS.COLLECTION COVER IMAGE'){
   	$metaHtml .="";
    }
    
    //never show this
    elseif ($data[$d]['mt'] =='PUBLIC COMMONS.INSTITUTION DESC'){
    $metaHtml .="";
    $instDesc .= '<div class="item-meta-data-row" >';
				$instDesc .= '<div id="item-meta-data-lable-INSTITUTION-DESC" class="item-meta-data-lable">';
				$instDesc .= $data[$d]['d'];
				$instDesc .= ': </div> <div class="item-meta-data-value">';
				$instDesc .= '<span itemprop="institution description">';
					if(!$data[$d]['mv']){
					$instDesc .= '&nbsp;';
		 			} else {
					$instDesc .= $data[$d]['mv'];
					}
				$instDesc .='</span></div><div style="clear:both;"></div></div>';
   			 }
    //never show this
    elseif  ($data[$d]['mt'] =='PUBLIC COMMONS.SOURCE INSTITUTION'){
	$metaHtml .= "";
	$instTitle  = '<!--begin PUBLIC COMMONS.SOURCE INSTITUTION --> ';
				$instTitle .= '<div class="item-meta-data-row" >';
				$instTitle .= '<div id="item-meta-data-lable-SOURCE-INSTITUTION" class="item-meta-data-lable">';
				$instTitle .= $data[$d]['d'];
				$instTitle .= ': </div> <div class="item-meta-data-value">';
				$instTitle .= '<span itemprop="institution name">';
					if(!$data[$d]['mv']){
					$instTitle .= '&nbsp;';
		 			} else {
					$instTitle .= $data[$d]['mv'];
					}
				$instTitle .='</span></div><div style="clear:both;"></div></div>';
	
	
	} else {
	
	$metaHtml .= '<div class="item-meta-data-row" >';
	$metaHtml .= '<div id="item-meta-data-lable-'.$d.'" class="item-meta-data-lable">';
	$metaHtml .= $data[$d]['d'];
	$metaHtml .= ': </div> <div class="item-meta-data-value">';
	$metaHtml .= '<span '.bpoc::generateItemMicroData($data[$d]['mt']).'>';
		if(!$data[$d]['mv']){
			$metaHtml .= '&nbsp;';
		 } else {
	$metaHtml .= $data[$d]['mv'];
		}
	$metaHtml .= '</span></div><div style="clear:both;"></div></div>';
		}//end else	
		
	}// end loop 
	
	echo $instTitle;
	echo $metaHtml;
		
		
		?>
		
		<div style="clear:both;"></div>
		</div>
		</div>
	</div><!-- end inner -->
	</div>
	
	<div id="museum-info-tabs-2" class="tab-content">
		<?php if ($instDesc){
			echo $instDesc;
			} else{
			echo 'missing data';
			}
 ?>
		
	</div>

	

</div><!-- end mata-tabs -->

		
