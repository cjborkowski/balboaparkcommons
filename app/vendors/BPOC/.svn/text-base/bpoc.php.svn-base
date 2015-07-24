<?php
class bpoc {
	
		function __construct($api) 
	{
		// import Piction Request class											
		App::import('Vendor', 'PRequest', array('file'=>'Piction/PRequest.php'));
		$this->API = new PRequest();
		//$this->API->setDebug($this->DEBUG);		
				
		// import Piction Factory class
		App::import('Vendor', 'PFactory', array('file'=>'Piction/PFactory.php'));
		PFactory::setAjax($this->API);
		App::import('Lib', 'CakeLog');	

	}


	public function generateItemMicroData ($item){
	
	switch ($item) {
    case 'PUBLIC COMMONS.TITLE':
        $itemprop = 'itemprop="name"';
        return $itemprop;
        break;
    case 'PUBLIC COMMONS.CREATOR/ARTIST':
      	$itemprop = 'itemprop="creator"';
        return $itemprop;
        break;
    case "PUBLIC COMMONS.CREATION DATE":
        $itemprop = 'itemprop="dateCreated"';
        return $itemprop;
        break;
	case "PUBLIC COMMONS.CREDIT LINE":
		$itemprop = 'itemprop="creditLine"';
        return $itemprop;
		break;
	case "PUBLIC COMMONS.TYPE":
		$itemprop = 'itemprop="genre"';
        return $itemprop;
		break;	
	case "PUBLIC COMMONS.DESCRIPTION":
		$itemprop = 'itemprop="description"';
		return $itemprop;
		break;		
	case "PUBLIC COMMONS.DIMENSIONS":
	    $itemprop ='"itemprop="dimensions"';
		return $itemprop;
        break;
	case"PUBLIC COMMONS.ITEM ID":
		$itemprop ='"itemprop="assetNumber"';
		return $itemprop;
		break;
	case"PUBLIC COMMONS.MEDIUM":
		$itemprop ='"itemprop="materials"';
		return $itemprop;
		break;	
	case"PUBLIC COMMONS.COPYRIGHT":
		$itemprop ='"itemprop="copyright"';
		return $itemprop;	
		break;
	case"":
		$itemprop = 'itemprop="missingData"';
		return $itemprop;
		break;	
		}

	} //end function


	public function generateCollectionMicroData($item){
	
	switch ($item) {
    case 'PUBLIC COMMONS.TITLE':
        $itemprop = 'itemprop="name"';
        return $itemprop;
        break;
	case"":
		$itemprop = 'itemprop="missingData"';
		return $itemprop;
		break;	
					}

	} //end function

	
	private function processItemHeadMetaData($data){
	
	$meta= array();
	
	//set first ask questions later.
	$meta ['title'] = $data['ct'][0]['n'];
	$meta['description'] = 'Balboa Park Commons Image';
	$meta ['image'] = P_HOST.$data['ct'][0]['u'];
	
	
	if ($data['ct'][0]['md']){
		
		for($i=0; $i < count($data['ct'][0]['md']); $i++){
    		if ($data['ct'][0]['md'][$i]['mt'] == 'PUBLIC COMMONS.TITLE' && $data['ct'][0]['md'][$i]['mv']) {
        	$meta['title'] = $data['ct'][0]['md'][$i]['mv'];
			}
	  
 			if ($data['ct'][0]['md'][$i]['mt'] == 'PUBLIC COMMONS.DESCRIPTION' && $data['ct'][0]['md'][$i]['mv'] ) {
        	$meta['description'] = $data['ct'][0]['md'][$i]['mv'];
			}
		}
	
	
	}
	return $meta;
		
	} //end function
	

	private function processCollectionsHeadMetaData($data){
	
	$meta= array();
	
	//set first ask questions later.
	$meta ['title'] =
		((!empty($data['d']) 
				? $data['d']
				: (!empty($data['n'])
					? $data['n']
					:  'Balboa Park Commons: '. ucfirst($this->params['controller']). ' Sets' )));
	
	$meta['description'] =
		((!empty($data['d']) 
				? $data['d']
				: (!empty($data['n'])
					? $data['n']
					:  'Balboa Park Commons: '. ucfirst($this->params['controller']). ' Sets' )));
		
	
	//we only want 10 images ! not 4500 !
	if (count($data['ct']) >=10){
	
		for($i=0; $i<9 ; $i++) {
		$meta ['image'][$i] = P_HOST.$data['ct'][$i]['u'];
		}	
	
	} else {
		
		for($i=0; $i<count($data['ct']); $i++) {
		$meta ['image'][$i] = P_HOST.$data['ct'][$i]['u'];
		}		
	}
	//do it ! do it now !
	return $meta;
	
	} //end function
		
	 function generateHeadTags($data, $durl, $view_type){
			
		$headtags ='';
		
		if ($view_type =='single_item'){
		$items = self::processItemHeadMetaData($data);
		}
		
		
		if ($view_type =='collections'){
		$items = self::processCollectionsHeadMetaData($data);
		
		}
		
		$headtags  .='<!--'. $view_type.'-->';
		
		$headtags  .='<!-- Facbook Open Graph -->';
		$headtags  .='<meta property="og:title" content="'.$items['title'].'" /> ';
		$headtags  .='<meta property="og:description" content="'.$items['description'].'" /> ';
		if ($view_type =='collections' && isset($items['image'])){
			for($i=0; $i<count($items['image']); $i++) {
			$headtags  .='<meta property="og:image" content="'.$items['image'][$i].'" />';
			}
		}elseif(isset($items['image'])) {
		$headtags  .='<meta property="og:image" content="'.$items['image'].'" />';
		}
		$headtags  .='<meta property="og:site_name" content="'.BPOC_SITE.'" />';
		$headtags  .='<meta property="og:url" content="'.BPOC_HOST.'/'.$durl['url'].'" />';
		$headtags  .='<meta property="og:type" content="website" />';
        //$headtags  .='<html xmlns:fb="http://www.facebook.com/2008/fbml"> ';
        
        $headtags  .='<!-- goggle+ -->';
		$headtags  .='<meta itemprop="name" content="'.$items['title'].'">';
        $headtags  .='<meta itemprop="description" content="'.$items['description'].'" />';
        if ($view_type =='collections' && isset($items['image'])){
        	for($i=0; $i<count($items['image']); $i++) {
        $headtags  .='<meta itemprop="image" content="'.$items['image'][0].'" />';
			}
        
		} elseif (isset($items['image'])) {
        $headtags  .='<meta itemprop="image" content="'.$items['image'].'" />';
        } 
		
		
		/*$headtags  .='<!-- standard meta data -->';
		$headtags  .='<meta property="title" content="'.$items['title'].'" /> ';
		$headtags  .='<meta property="description" content="'.$items['description'].'" /> ';	
		if(isset($items['image'])){
		$headtags  .='<link rel="image_src" href="'.$items['image'].'" />';
		}//print_r($durl);
		//print_r($items); */
		return $headtags;	
	}
		
		
	public function setCollectionsTitle($data){
		
		$page_title =
			((!empty($data['d']) 
				? $data['d']
				: (!empty($data['n'])
					? $data['n']
					:  'Balboa Park Commons: '. ucfirst($this->params['controller']). ' Sets' )));
		
	 	return $page_title;
	}

	public function makeGenericTags(){
			
		$headtags ='';
		$headtags .='<!-- Facbook Open Graph -->';
		$headtags .='<meta property="og:title" content="Balboa Park Commons" />';
		$headtags .='<meta property="og:site_name" content="'.BPOC_SITE.'" />';
		$headtags .='<meta property="og:url" content="'.BPOC_HOST.'" />';
		$headtags .='<meta property="og:type" content="website" />';
		$headtags .='<meta property="og:description" content= "Balboa Park Commons Image Archive" />';
		$headtags .='<meta property="og:image" content="'.BPOC_HOST.'/img/splash-page-mini.png" />';
		$headtags .='<!-- goggle+ -->';
		$headtags .='<meta itemprop="name"  content="Balboa Park Commons" />';
        $headtags .='<meta itemprop="description" content="Balboa Park Commons Image Archive" />';
		$headtags .='<meta itemprop="image" content="'.BPOC_HOST.'/img/splash-page-mini.png" />';
       
		return $headtags;
	}
	
/*
 * @accepts controller, action, search_key, search term, total, page_start, page_size
 * returns a sting of HTML for pagination links with <select> for choosing desired image counts
 * URL segments will cause controller to trigger JSON query in PFactory::getUmoInstance()->getUmosByCategoryId();
 * see View.js & View.setPager = function() for interaction and display characteristics.
 * TODO: 12-02-31 -- finish for loop for HTML Select on pagination footer to properly round off to complete set @ divisions of 24
 */
 
public function makePagination($controller, $action, $search_key, $search_term ,$total_items, $page_start, $page_size){
		
		/*$set = $this->params['pass'][1];
			
		if ( $set =='Committee-of-100'){
			$total_items = $total_items - 10;
		}*/
				
			
		$path = '/'.$controller.'/'.$action.'/'.$search_key.'/'.urlencode($search_term);
		$counter = ceil($total_items/$page_size);
		$linksLimit = 20;
		$linksMultiplyer = 1;
		$pageNum = 1;
		$pageStart = 0;
		$html ='';
		$P_html ='';
		$P_html .= '<div id="bpoc-pager-links-container">';
		$P_html .= '<div id="bpoc-pager-links-container-page-0" class="bpoc-pager-links-container-pages">';
				
		for ($i=0; $i<$counter; $i++){
				
			$makeNewPage = ($linksLimit * $linksMultiplyer);
			if($i == $makeNewPage){
					$show_buttons = TRUE;
					$P_html .= '</div><div id="bpoc-pager-links-container-page-'.$linksMultiplyer.'" class="bpoc-pager-links-container-pages">';
				
				$linksMultiplyer ++;
			}
			
			if($i <= 0){
			$pageStart = $pageStart;
			} else {
			$pageStart = ($i * $page_size + 1 );
			}
			$P_html .= '<a href="'.$path.'/'.$pageStart.'/'.$page_size.'" class="bpoc-pageination-links" id="bpoc-pageination-link-num-'.$pageNum.'"> '.$pageNum.'</a>';					
			$pageNum ++;
			
		
		}	
		
		$P_html .='</div></div>';
	
		$html_prev = '<a href="#" class="bpoc-pager-prev-next-links bpoc-pager-prev" id="bpoc-pager-prev-link"> << Prev </a> ';	
		$html_next = '<a href="#" class="bpoc-pager-prev-next-links bpoc-pager-next" id="bpoc-pager-next-link"> Next >> </a>';	
		//have prev and next float to left and right
		$html .='<div id="bpoc-pager-inner-wrapper">';
		
		if ($show_buttons = TRUE){
		$html .='<div id="bpoc-pager-prev-container">';
		$html .= $html_prev ;
		$html .= '</div>';
		}
		//render pagination
		$html .= $P_html;
		
		if ($show_buttons = TRUE){
		$html .='<div id="bpoc-pager-next-container">';
		$html .= $html_next ;
		$html .= '</div>';
		
		}	
		$html .= '<div style="clear:both;"></div>';
		$html .='</div> <!-- end wrapper-->';
		$html_sel ='';
		$html_sel .='<!--dynamic select pagination list-->';
		$html_sel .= '<select name="bpoc-pager" id="bpoc-pager"> ';
		 
		 /* * do it the old fashion way*/
		$html_sel .= '<option class="none" value="'.$path.'/'.$page_start.'/24" selected="selected">24</option>';
		$html_sel .= '<option class="none" value="'.$path.'/'.$page_start.'/48">48</option>';
		
		if ($total_items >= 96){
		$html_sel .= '<option class="none" value="'.$path.'/'.$page_start.'/96">96</option>';
		}
		if ($total_items >= 384){
		$html_sel .= '<option class="none" value="'.$path.'/'.$page_start.'/384">384</option>';
		}
		
		if ($total_items >= 768){
		$html_sel .= '<option class="none" value="'.$path.'/'.$page_start.'/768">768</option>';
		 }
		
		if ($total_items >= 1536){
		$html_sel .= '<option class="none" value="'.$path.'/'.$page_start.'/1536">1536</option>';
		}
		 
		 /* Now do it the new fashoined way
		 */
		 
		/*for ($i=1; $i<$counter; $i++){
		if($i =1 ){
		$html_sel .= '<option class="none" value="'.$path.'/0/'.$page_size.'">'.$page_size.'</option>';	
		
		} else {
		
		$newSize = $i+ 1 *$page_size;
		$html_sel .= '<option class="none" value="'.$path.'/0/'.$newSize.'">All: '.$newSize.'</option>';
		}

		}*/
		
		$html_sel .= '<option class="none" value="'.$path.'/0/'.$total_items.'">All: '.$total_items.'</option>';
	    $html_sel .= '</select>';
		$html .= '<div id="bpoc-pager-select-container"> ';
		$html .= 'Showing ';
		$html .= $html_sel ;
	    $html .= ' images per page out of: '.$total_items.' images <br />' ;
		$html .= '</div>';

		return $html;
		
		
	}// end function
	
	
public function getCollectionsCount($pk){
			
	$CountData = PFactory::getUmoInstance()->getUmosByCategoryId( $pk,  1, 1);
	$count ='';	
	
	if ($CountData['num'] == ''	){
	$count .= '<i>no image count fount</i>';	
	}	
	else{
	$count .= '<i>Group of</i>&nbsp;'.$CountData['num'].'&nbsp;<i>Images</i>';	
	}
	return $count;

}	//end function

	
	public function getCollectionsDesc($pk){
	
		$description = '<p>No Museum info avaialable</p>';
		return $description;
	}//end function

	
	public function getLightboxCover($lightbox_id){
			
		$data = PFactory::getUmoInstance()->getUmosByLightboxId($lightbox_id);
		$this->set('data', $data);
		$coverImage ='';
		
		if (!isset($data['ct'])){
		$coverImage .= '/img/missing-thumbnail.png' ;	
		
		} else {
		$coverImage .= '<img src="';
		$coverImage .= P_HOST;
		$coverImage .= $data['ct'][0]['u'];
		$coverImage .= '">';
		//$coverImage = '/img/missing-thumbnail.png' ;
			
		} 
		return $coverImage;
		
	}
	
	
	public function generateLongName ($name){
	
	CakeLog::write('debug','searching for shorname '.$name. ' from BPOC::generateLongName()');	
		
	switch ($name) {
		
	case 'Mingei':
        $longName = 'Mingei International Museum';
        return $longName;
        break;
		
	case 'MOPA':
        $longName = 'Museum of Photographic Arts';
        return $longName;
        break;
	
	case 'SDASM':
        $longName = 'San Diego Air & Space Museum';
        return $longName;
        break;
	
	
	case 'SDMA':
        $longName = 'San Diego Museum of Art';
        return $longName;
        break;
	
	case 'SDMOM':
        $longName = 'San Diego Museum of Man';
        return $longName;
        break;
     
	case 'SDNHM':
        $longName = 'San Diego Natural History Museum';
        return $longName;
        break;

	case 'TIMKEN':
        $longName = 'Timken Museum of Art';
        return $longName;
        break;
		
	case 'C100':
        $longName = 'Panama-California Exposition Digital Archive';
        return $longName;
        break;

		}
	}
	
		public function generateInstLink ($name = NULL){
		
		//$data = PFactory::getCategoryInstance()->getCollections();	
		CakeLog::write('debug','searching for '.$name. ' from BPOC::generateInstLink()');	
		
		$data = PFactory::getCategoryInstance()->getCollections();
		$matchCounter = 0;
		$match_link = '';
		for($i=0; $i<count($data['ct']); $i++){
		
			if($name == $data['ct'][$i]['c3'][0]['d'] ){
		  	 $match_link = $data['ct'][$i]['pk'];
			 $matchCounter ++;
			 CakeLog::write('debug','generateInstLink found PK:'.$match_link. ' for '.$name. ' there are'. $matchCounter.'matches');
			 return $match_link;
			}
		
		} //end loop
		return $match_link;
					
		}//end function
	
	
	   public function collectionToFeaturMap (){
	   	
		$collections = PFactory::getCategoryInstance()->getCollections();
		$featured = PFactory::getCategoryInstance()->getFeatured();	
	   	CakeLog::write('debug',' in collectionToFeaturMap');
		return $featured;
		//return $collections;
		
	   }


	public function match($setname, $featuredName){
	
		$data =PFactory::getCategoryInstance()->getCollections();
		
		for ($i=0; $i < count($data['ct']) ; $i++){
	
		if ( $featuredName == $data['ct'][$i]['c3'][0]['d'] ){
		
		echo '<p>featured set name: '.$setname. ' from :'. $featuredName. 
		' matches collections PK: '.$data['ct'][$i]['pk']. ' from collections [c3][d] name: '. $data['ct'][$i]['c3'][0]['d'].'</p>';
			}
		
		}
	}
	
	public function sendContact($data){
		//declare our variables
		$name = $data['NAME'];
		$email = $data['EMAIL'];
		$message = nl2br($data['MESSAGE']);
		//get todays date
		$todayis = date("l, F j, Y, g:i a") ;
		//set a title for the message
		$subject = "BPOC PUBLIC COMMONS INQUERY ";
		$body = "From. $name, \n\n.$message";
		$headers = 'From: '.$email.'' . "\r\n" .
    	'Reply-To: '.$email.'' . "\r\n" .
		'Content-type: text/html; charset=utf-8' . "\r\n" .
    	'X-Mailer: PHP/' . phpversion();
		//aany email address here
		mail("cborkowski@bpoc.org, commons@bpoc.org", $subject, $message, $headers);
		CakeLog::write('mail', 'SUBJECT: '.$subject. '. BODY:' .$message. '. FROM: '.$headers);
		
		$OK = '{"message": "Thank You. Your message has been sent. We\'ll reply shortly."}';
		$responce = json_encode($OK);
		return $responce;
		
	}
}//end class
?>
