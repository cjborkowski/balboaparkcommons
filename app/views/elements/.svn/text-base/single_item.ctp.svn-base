<?php 

/*	Prefered order
*   Title
*	Full Title
*	Creator/Artist
*	Creation Date
*	Creation Place
*	Medium
*	Description
*	Dimensions
*	Type
*	Credit Line
*	Copyright
*	Item ID#
*	Source Institution
 */ 


if ($data['ct']) :?> 	
<?php 
		$metaHtml ='';
		$instDesc  = '';
		$instTitle ='';
		$metaTitle ="";
    	$bunk = '';
		$institution ='';
		$creatorArtist ='';
		$infoStatus = '';
		$itemTitle ='';
		$fullTitle ='';
		$creditLine = '';
		$pccoll ='';
   		$copyRight = '';
		$itemDesc ='';
		$itemDime ='';
		$itemID='';
		$itemMed='';		
		$itemType='';
		
    for($d=0; $d < count($data['ct'][0]['md']); $d++){
				
	//controlling order
    if ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.TITLE'){
   	$metaHtml .="";
		
				$itemTitle  = '<!--begin PUBLIC COMMONS.TITLE --> ';
				$itemTitle .= '<div class="item-meta-data-row" >';
				$itemTitle .= '<div id="item-meta-data-lable-TITLE" class="item-meta-data-lable">';
				$itemTitle .= $data['ct'][0]['md'][$d]['d'];
				$itemTitle .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$metaTitle .= '&nbsp';
		 			} else {
					$metaTitle.= $data['ct'][0]['md'][$d]['mv'];
					//$this->set('title', $data['ct'][0]['md'][$d]['mv']);
					$itemTitle .= '<span itemprop="title">'.$metaTitle;
					$itemTitle .= '</span>';
					}
					$itemTitle .='</div><div style="clear:both;"></div></div>';
   
    }
	//controlling order
	//PUBLIC COMMONS.FULL TITLE
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.FULL TITLE'){
   	$metaHtml .="";
		
				$fullTitle  = '<!--begin PUBLIC COMMONS.FULL TITLE --> ';
				$fullTitle .= '<div class="item-meta-data-row" >';
				$fullTitle .= '<div id="item-meta-data-lable-FULL-TITLE" class="item-meta-data-lable">';
				$fullTitle .= $data['ct'][0]['md'][$d]['d'];
				$fullTitle .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$fullTitleText = '&nbsp';
		 			} else {
					$fullTitleText = $data['ct'][0]['md'][$d]['mv'];
					$fullTitle .= '<span itemprop="full title">'.$fullTitleText;
					$fullTitle .= '</span>';
					}
					$fullTitle .='</div><div style="clear:both;"></div></div>';
   
    } 
    
    //controlling order
	//PUBLIC COMMONS.CREDIT LINE
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.CREDIT LINE'){
   	$metaHtml .="";
		
				$creditLine .= '<!--begin PUBLIC COMMONS.CREDIT LINE --> ';
				$creditLine .= '<div class="item-meta-data-row" >';
				$creditLine .= '<div id="item-meta-data-lable-CREDIT-LINE" class="item-meta-data-lable">';
				$creditLine .= $data['ct'][0]['md'][$d]['d'];
				$creditLine .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$credit = '&nbsp';
		 			} else {
					$credit = $data['ct'][0]['md'][$d]['mv'];
					$creditLine .= '<span itemprop="credit line">'.$credit;
					$creditLine .= '</span>';
					}
					$creditLine .='</div><div style="clear:both;"></div></div>';
   
    }
	//controlling order
	// PUBLIC COMMONS.COLLECTION
		elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.COLLECTION'){
   				$metaHtml .="";
		
				$pccoll .= '<!--begin PUBLIC COMMONS.COLLECTION --> ';
				$pccoll .= '<div class="item-meta-data-row" >';
				$pccoll .= '<div id="item-meta-data-lable-CREDIT-LINE" class="item-meta-data-lable">';
				$pccoll .= $data['ct'][0]['md'][$d]['d'];
				$pccoll .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$coll = '&nbsp';
		 			} else {
					$coll = $data['ct'][0]['md'][$d]['mv'];
					$pccoll .= '<span itemprop="credit line">'.$coll;
					$pccoll .= '</span>';
					}
					$pccoll .='</div><div style="clear:both;"></div></div>';
   
    }
	
	//controlling order
	//PUBLIC COMMONS.COPYRIGHT
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.COPYRIGHT'){
   	$metaHtml .="";
		
				$copyRight .= '<!--begin PUBLIC COMMONS.COPYRIGHT --> ';
				$copyRight .= '<div class="item-meta-data-row" >';
				$copyRight .= '<div id="item-meta-data-lable-COPYRIGHT" class="item-meta-data-lable">';
				$copyRight .= $data['ct'][0]['md'][$d]['d'];
				$copyRight .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$copy = '&nbsp';
		 			} else {
					$copy = $data['ct'][0]['md'][$d]['mv'];
					$copyRight .= '<span itemprop="copyright">'.$copy;
					$copyRight .= '</span>';
					}
					$copyRight .='</div><div style="clear:both;"></div></div>';
   
    }
	
	//controlling order
	//PUBLIC COMMONS.DESCRIPTION
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.DESCRIPTION'){
   	$metaHtml .="";
		
				$itemDesc .= '<!--begin PUBLIC COMMONS.DESCRIPTION --> ';
				$itemDesc .= '<div class="item-meta-data-row" >';
				$itemDesc .= '<div id="item-meta-data-lable-DESCRIPTION" class="item-meta-data-lable">';
				$itemDesc .= $data['ct'][0]['md'][$d]['d'];
				$itemDesc .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$desc = '&nbsp';
		 			} else {
					$desc = $data['ct'][0]['md'][$d]['mv'];
					$itemDesc  .= '<span itemprop="description">'.$desc;
					$itemDesc  .= '</span>';
					}
					$itemDesc  .='</div><div style="clear:both;"></div></div>';
   
    }
	
	//controlling order
	//PUBLIC COMMONS.DIMENSIONS
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.DIMENSIONS'){
   	$metaHtml .="";
		
				$itemDime .= '<!--begin PUBLIC COMMONS.DIMENSIONS --> ';
				$itemDime .= '<div class="item-meta-data-row" >';
				$itemDime .= '<div id="item-meta-data-lable-DIMENSIONS" class="item-meta-data-lable">';
				$itemDime .= $data['ct'][0]['md'][$d]['d'];
				$itemDime  .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$dime = '&nbsp';
		 			} else {
					$dime = $data['ct'][0]['md'][$d]['mv'];
					$itemDime  .= '<span itemprop="dimentions">'.$dime;
					$itemDime   .= '</span>';
					}
					$itemDime  .='</div><div style="clear:both;"></div></div>';
   
    }
	
	//controlling order
	//PUBLIC COMMONS.ITEM ID
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.ITEM ID'){
   	$metaHtml .="";
		
				$itemID .= '<!--begin PUBLIC COMMONS.ITEM ID --> ';
				$itemID .= '<div class="item-meta-data-row" >';
				$itemID .= '<div id="item-meta-data-lable-ITEM-ID" class="item-meta-data-lable">';
				$itemID .= $data['ct'][0]['md'][$d]['d'];
				$itemID .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$id = '&nbsp';
		 			} else {
					$id = $data['ct'][0]['md'][$d]['mv'];
					$itemID .= '<span itemprop="item id">'.$id;
					$itemID .= '</span>';
					}
					$itemID .='</div><div style="clear:both;"></div></div>';
   
    }
	
	//controlling order
	//PUBLIC COMMONS.MEDIUM
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.MEDIUM'){
   	$metaHtml .="";
		
				$itemMed .= '<!--begin PUBLIC COMMONS.MEDIUM --> ';
				$itemMed .= '<div class="item-meta-data-row" >';
				$itemMed .= '<div id="item-meta-data-lable-MEDIUM" class="item-meta-data-lable">';
				$itemMed .= $data['ct'][0]['md'][$d]['d'];
				$itemMed .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$med = '&nbsp';
		 			} else {
					$med = $data['ct'][0]['md'][$d]['mv'];
					$itemMed .= '<span itemprop="medium">'.$med;
					$itemMed .= '</span>';
					}
					$itemMed .='</div><div style="clear:both;"></div></div>';
   
    }
	
	//controlling order
	//PUBLIC COMMONS.TYPE
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.TYPE'){
   	$metaHtml .="";
		
				$itemType .= '<!--begin PUBLIC COMMONS.TYPE --> ';
				$itemType .= '<div class="item-meta-data-row" >';
				$itemType .= '<div id="item-meta-data-lable-TYPE" class="item-meta-data-lable">';
				$itemType .= $data['ct'][0]['md'][$d]['d'];
				$itemType .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$type = '&nbsp';
		 			} else {
					$type = $data['ct'][0]['md'][$d]['mv'];
					$itemType .= '<span itemprop="type">'.$type;
					$itemType .= '</span>';
					}
					$itemType .='</div><div style="clear:both;"></div></div>';
   
    }
	
    //controlling order
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.INSTITUTION DESC'){
    $metaHtml .="";
    $instDesc .= '<div class="item-meta-data-row" >';
				$instDesc .= '<div id="item-meta-data-lable-INSTITUTION-DESC" class="item-meta-data-lable">';
				$instDesc .= $data['ct'][0]['md'][$d]['d'];
				$instDesc .= ': </div> <div class="item-meta-data-value">';
				$instDesc .= '<span itemprop="description">';
					if(!$data['ct'][0]['md'][$d]['mv']){
					$instDesc .= '&nbsp;';
		 			} else {
					$instDesc .= $data['ct'][0]['md'][$d]['mv'];
					}
				$instDesc .='</span></div><div style="clear:both;"></div></div>';
   	}
    //never show this
    elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.COLLECTION COVER IMAGE' || $data['ct'][0]['md'][$d]['mt'] == 'PUBLIC COMMONS.FILTER'){
	$metaHtml .='';
	}
	//conroll order
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.SOURCE INSTITUTION'){
		$metaHtml .= "";
		$instTitle  = '<!--begin PUBLIC COMMONS.SOURCE INSTITUTION --> ';
				$instTitle .= '<div class="item-meta-data-row">';
				$instTitle .= '<div id="item-meta-data-lable-SOURCE-INSTITUTION" class="item-meta-data-lable">';
				$instTitle .= $data['ct'][0]['md'][$d]['d'];
				$instTitle .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$instTitle .= '&nbsp;';
					$institution .='&nbsp;';
		 			} else {
					$institution = $data['ct'][0]['md'][$d]['mv'];
					//$instTitleLink ='/objectview/'.$PastAction.'/'.BPOC::generateInstLink($institution, $collections).'/'.urldecode(str_replace(' ','-', $institution));
					//$instTitleLink ='/objectview/'.$PastAction.'/'.$this -> Navigation -> makeUlLink4($PastAction, $view_type, $institution).'/'.urldecode(str_replace(' ','-', $institution));
					//$instTitle .= '<a href="'.$instTitleLink.'" class="institution-link">';
					$instTitle .= '<span id="institution-icon-'.str_replace(' ','-', $institution).'"></span>';
					$instTitle .= '<span itemprop="institution name">'.$institution.'</span>';
					//$instTitle .= '</a>';
					}
				$instTitle .='</div><div style="clear:both;"></div></div>';
		} 
		
	elseif ($data['ct'][0]['md'][$d]['mt'] =='PUBLIC COMMONS.INFO STATUS'){
		$metaHtml .= "";
		$infoStatus  = '<!--begin PUBLIC COMMONS.INFO STATUS --> ';
				$infoStatus .= '<div class="item-meta-data-row">';
				$infoStatus .= '<div id="item-meta-data-lable-INFO-STATUS" class="item-meta-data-lable">';
				$infoStatus .= $data['ct'][0]['md'][$d]['d'];
				$infoStatus .= ': </div><div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$infoStatus .='&nbsp;';
		 			} else {
					$info = $data['ct'][0]['md'][$d]['mv'];
					$infoStatus .= '<span itemprop="note">'.$info;
					$infoStatus .='</span>';
					}
				$infoStatus .='</div><div style="clear:both;"></div></div>';
		
		} 
		
	elseif ( strpos($data['ct'][0]['md'][$d]['mt'] , 'PUBLIC COMMONS.CREATOR') !== false){
		$metaHtml .= "";
		$creatorArtist  = '<!--begin PUBLIC COMMONS.CREATOR\/ARTIST --> ';
				$creatorArtist .= '<div class="item-meta-data-row" >';
				$creatorArtist .= '<div id="item-meta-data-lable-CREATOR-ARTIST" class="item-meta-data-lable">';
				$creatorArtist .= $data['ct'][0]['md'][$d]['d'];
				$creatorArtist .= ': </div> <div class="item-meta-data-value">';
				
					if(!$data['ct'][0]['md'][$d]['mv']){
					$creatorArtist .='&nbsp;';
		 			} else {
					$artist = $data['ct'][0]['md'][$d]['mv'];
					$creatorArtist .= '<span itemprop="artist">'.$artist;
					$creatorArtist .='</span>';
					}
				$creatorArtist .='</div><div style="clear:both;"></div></div>';
				//$this->set('artist', $artist);
		
		} 
		
		else {
		
		$metaHtml .= '<div class="item-meta-data-row" >';
		$metaHtml .= '<div id="item-meta-data-lable-'.$d.'" class="item-meta-data-lable">';
		$metaHtml .= $data['ct'][0]['md'][$d]['d'];
		$metaHtml .= ': </div> <div class="item-meta-data-value">';
		$metaHtml .= '<span '.bpoc::generateItemMicroData($data['ct'][0]['md'][$d]['mt']).'>';
		
		if(!$data['ct'][0]['md'][$d]['mv']){
			$metaHtml .= '&nbsp;';
		 } else {
		$metaHtml .= $data['ct'][0]['md'][$d]['mv'];
		}
		$metaHtml .= '</span></div><div style="clear:both;"></div></div>';
		}//end else	
	
	
		
}// end loop 
?>
<div id="single-intem-meta-tabs" class="single-item-view-meta-tabs">	
	<div id="meta-data-container-title"><?php e($metaTitle);?></div>
	<ul>
		<li><a href="#about-tabs-1" class="tab-text">About</a></li>
		<li><a href="#museum-info-tabs-2" class="tab-text">Museum Info</a>
			<div class="single-view-share-download-meta single-item-share-download">
			<?php $item_link = $this->here; 
			echo $this->element('listview_download_share',array('id'=>'1' , 'link'=> $item_link ,'title'=>$metaTitle, 'desc'=>$institution , 'asset'=>$data['ct'][0]['pk'])); ?>	
 			</div>
		</li>
		<!-- TODO: make-element  -->
		
	</ul>
	
	<div id="about-tabs-1" class="">
		<div id="tab-inner-1" class="tab-inner">
			<div id="item-meta-data-wrapper">
				<div id="item-meta-data" itemscope itemtype="http://schema.org/CreativeWork">	
<?php /*output ordering */
				
				echo $itemTitle;
				echo $fullTitle;
				echo $creatorArtist; 
				echo $metaHtml;
				echo $itemMed; 
				echo $itemDesc;
				echo $itemDime;
				echo $itemType;
				echo $creditLine;
				echo $pccoll;
				echo $copyRight;
				echo $itemID;
				echo $instTitle; 
				echo $infoStatus; 
				
?>	
					<div style="clear:both;"></div>
				</div>
			</div><!-- end wrapper -->
		</div><!-- end inner -->
	</div><!--end about-tabs-1 -->
	
	<div id="museum-info-tabs-2" class="tab-content">
		<div id="tab-inner-2" class="tab-inner">
		<?php if ($instDesc){
			echo $instDesc;
			}else{
			echo 'missing descripion';
			}?>
		</div>
	</div><!--emuseum-info-tabs-2 -->
</div><!-- end mata-tabs -->
	
	<div class="item-view-image-container lightbox-draggable single-item-modal">
	<?php if($data['ct'][0]['u']): ?> 
		<a href ="#" class="single-image-dialog-link" title="click to view larger image"> 
		<img id="<?php echo $data['ct'][0]['pk'];?>" src="<?php $url = P_HOST.$data['ct'][0]['u']; $der = 'O2'; $minWidth = 500; echo $this->Derivatives->getDerivative($der, $minWidth, $url);?>" 
		class="view-gallery-web-image show-info-selected-state" alt="<?php echo $data['ct'][0]['n']; ?>" itemprop="image" /></a>
		<div class="single-image-dialog-box">
	
		<img id="single-image-zoom" alt="high resolution image" src="<?php echo $this->Derivatives->getDerivative('O5', '1024', $url); ?> "/>
	
		</div>
		<?php else: ?><img src="/img/missing-thumbnail.png" class="view-gallery-thumbnail" alt="missing image" />
		<?php endif; ?>
	</div>
	<div style="clear:both;"></div>
	<?php  e($this->element('print_pdf_json')); ?>
<?php endif; ?>
