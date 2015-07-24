<?php
/***
 * Author: Chris Borkowski
 * Derivatives Helper checks the exitance of a Piction Derivative and resturns the results
 * checks cache for derivative and and returns it if it exits. 
 * the @GETIMAGESIZE DG member function is expensive
 */

class DerivativesHelper extends AppHelper {
		
		
		function __construct($api) 
		{
		// import Piction Request class											
		App::import('Vendor', 'PRequest', array('file'=>'Piction/PRequest.php'));
		$this->API = new PRequest();
		//$this->API->setDebug($this->DEBUG);		
				
		// import Piction Factory class
		App::import('Vendor', 'PFactory', array('file'=>'Piction/PFactory.php'));
		PFactory::setAjax($this->API);
		}
		
		
		function getDerivative($derivative, $minWidth, $image) {
		
		$url = Cache::read('derivative-url-'.$derivative.'-'.$image);
		if ($url !== false) 
		{
		return $url;
		
		} else {
	 
	 	$url = str_replace('THUMBNAIL', $derivative, $image);	 
 		Cache::write('derivative-url-'.$derivative.'-'.$image, $url);	
	 	return $url;
		
		}
		
		} //end function


	 	function getLightboxCover($lightbox_id){
			
		$mydata = PFactory::getUmoInstance()->getUmosByLightboxId($lightbox_id);
		$this->set('mydata', $mydata);
		$coverImage = $lightbox_id;
		$coverImage .= ' /img/missing-thumbnail.png' ;
		
		if (! $mydata['ct']){
		$coverImage .= '/img/missing-thumbnail.png' ;	
		
		} else {
		$coverImage .= '<img src="';
		$coverImage .= P_HOST;
		$coverImage .= $mydata['ct'][0]['u'];
		$coverImage .= '">';
		//$coverImage = '/img/missing-thumbnail.png' ;
			
		} 
		return $coverImage;
		}
		
		/*
 * @accpets strings or arrays to make download url
 */
	function makeDownoadLink($umodownload){
		
		//as per marcella
		//DERIVATIVE=ORIGINAL&DNUM=5
		$downloadLink ='';
		
		if(!isset($_SESSION['surl'])){
		$downloadLink.='http://piction.bpoc.org/piction/!soap.ajaxget?n=zip_download&SURL=';
		$downloadLink.= 'NOSURL!';
		$downloadLink.= '&UMO_ID=';
		$downloadLink.= $umodownload;
		$downloadLink.='&DERIVATIVE=ORIGINAL';
		$downloadLink.='&DNUM=O5';	
		
		}else{
		$downloadLink.='http://piction.bpoc.org/piction/!soap.ajaxget?n=zip_download&SURL=';
		$downloadLink.= $_SESSION['surl'];
		$downloadLink.= '&UMO_ID=';
		$downloadLink.= $umodownload;
		$downloadLink.='&DERIVATIVE=ORIGINAL';
		$downloadLink.='&DNUM=O5';
		
		}
		return $downloadLink;
	}
	

}//end class
?>