<?php
/***
 * Author: Chris Borkowski
 * Derivatives Helper checks the exitance of a Piction Derivative and resturns the results
 * checks cache for derivative and and returns it if it exits. 
 * the @GETIMAGESIZE DG member function is expensive
 */

class ShareButtonsHelper extends AppHelper {



	function makeShareButtons($id, $url, $title, $description){
			
		//opens with jquery dialog() see view.js
		$viewType = 'Image Collection: ' ;
		if ($this->params['action'] == 'item' || $this->params['action'] =='search'){
		$viewType ='Image Title: ';
		}
		
		
		$html ='<div id="share-this-container-'.$id.'" class="share-this-container"><p>Choose a platform for sharing.</p><ul>';
		
		$html .='<li id="twitter-share">';
		$html .='<a href="http://api.addthis.com/oexchange/0.8/forward/twitter/offer?';
		$html .= 'url='.urlencode(BPOC_HOST.$url); 
		$html .='&amp;pubid=ra-4dfa3837763d088d';
		$html .='&amp;text='.urlencode($viewType.$title .'. From: '.$description. ' #balboaparkcommons');
		$html .='" rel="nofollow" id="add-this-end-twitter" class="add-this-end" target="_BLANK">twitter</a>';
		$html .='</li>';
		
		$html .='<li id="facebook-share">';
		$html .='<a href="http://api.addthis.com/oexchange/0.8/forward/facebook/offer?';
		$html .='url='.urlencode(BPOC_HOST.$url); 
		$html .='&amp;pubid=ra-4dfa3837763d088d';
		$html .='" rel="nofollow" id="add-this-end-fb" class="add-this-end" target="_BLANK">facebook</a>';
		$html .='</li>';
		
		$html .='<li id="google-share">';
		$html .='<a href="http://api.addthis.com/oexchange/0.8/forward/google_plusone_share/offer?';
		$html .='url='.urlencode(BPOC_HOST.$url); 
		//$html .='&pubid=ra-4dfa3837763d088d"';
		$html .='" rel="nofollow" id="add-this-end-google" class="add-this-end" target="_BLANK">google+</a>';
		$html .='</li>';
		
		$html .='</ul></div>';
						
		return $html;
	}

}//end class
?>