<?php
/***
 * Author: Lusana Ali & Chris Borkowski
 * Navigation Helper creates formatted horizontal buttons and dropup UL elements 
 */

class NavigationHelper extends AppHelper
{
	var $helpers = array('Form', 'Html', 'Time', 'Text', 'Cache');
	
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
	
	
	public function makeLink($action)
	{
		$link = '';
		$controller = $this->params['controller'];
		//$action = $this->params['action'];
		$params = '';
		
		if(isset($this->params['pass']))
		{
			for($i=0; $i<count($this->params['pass']); $i++)
			{
				$params.=$this->params['pass'][$i].'/';
			}
			
		}
		
		if($controller =='pages'){
		$link .='#';	
		}else{
		
		$link.= $controller.'/'.$action.'/'.$params;		
		}
		return $link;
	}
	
	
		
	public function makeSelectLink($sAction,$sPass){
		
		//if it's in cache return it
		$select_link = Cache::read('select-link-1');
		if ($select_link !== false) 
		{
		return $select_link;
	
		}  else {
		
		if($this->params['action']=="display"){
		$action ='listview';
		} else{
		//use the global from app_controller
		$action = $sAction;
		}
		
		$select_link ='';

		$select_link .=	'<!-- dynamic select1 -->';
		//check the globals
		if( $sPass !=NULL && $sPass[0] == 'search'){
		$select_link .= '<select name="navigation1" id="nav1"><option class="none" value="#"><i>Search Results</i></option>';
		}else{
		$select_link .= '<select name="navigation1" id="nav1"><option class="none" value="#"><i>none selected</i></option>';			
		}
				
		$select_link .='<option class="none" value="/collections/'.$action.'">By Museum</option>';
		$select_link .='<option class="none" value="/featured/'.$action.'">Featured Sets</option>';
		$select_link .='<option class="none" value="/usersets/'.$action.'">User Sets</option>
				</select>';
				 
		// write to cache and return all of this
		Cache::write('select-link-1', $select_link);
		
		return $select_link;
		}	
		
	} //end function
	
	
	public function makeUlLink($sPass){
		
	    $select_link ='';

		$select_link .=	'<!-- dynamic UL 1 -->';
		$select_link .= '<ul id="navigation1" class="footer-nav footer_fixedwidth"><!-- BEGIN FOOTER Drop-ups -->';
		
		//check the globals
		if( $sPass !=NULL && $sPass[0] == 'search'){
		$select_link .= '<li id="navigation1-parent-li" class="li-parent"><span class="select-on select-start"></span><a href="#" class="dropup">Search Results</a><!-- Begin First Menu Item -->';
		}else{
		$select_link .= '<li id="navigation1-parent-li" class="li-parent"><span class="select-on select-start"></span><a href="#" class="dropup">none selected</a><!-- Begin First Menu Item -->';			
		}
		$select_link .= '<div id="footer_dropup_1" class="footer_dropup drop1columns">';	
		$select_link .='<ul id="nav1">';
		$select_link .='<li id="drop-up-1-item-1" class="none drop-up-1-item"><span class="footer-ui-icon-off"></span><a href="/collections/listview" title="By Museum">By Museum</a></li>
						<li id="drop-up-1-item-2" class="none drop-up-1-item"><span class="footer-ui-icon-off"></span><a href="/featured/listview"  title="Featured Sets">Featured Sets</a></li>
						<li id="drop-up-1-item-3" class="none drop-up-1-item"><span class="footer-ui-icon-off"></span><a href="/usersets/listview" title="User Sets">User Sets</a></li>';
		$select_link .='</ul></div></li></ul>';
				 
		// write to cache and return all of this
		
		
		return $select_link;
			
		
	} //end function
		
		
	function makeUlLink2($action){
			
		//if it's in cache return it
		$data = Cache::read('DATA-jason-get-collections-data');
		if ($data !== false) 
		{
		$data ;
		} else {
		$data = PFactory::getCategoryInstance()->getCollections();
		Cache::write('DATA-jason-get-collections-data', $data);
		} 

		$select_link ='';	
		$select_link .= '<!--dynamic ul2 generic list-->';
		$select_link .= '<ul id="navigation2" class="footer-nav footer_fixedwidth"><!-- BEGIN FOOTER Drop-ups -->';
		$select_link .= '<li id="navigation2-parent-li" class="li-parent">';
		$select_link .= '<span class="select-on select-start"></span>';		
		$select_link .= '<a href="#" class="dropup">none selected</a> ';
		$select_link .= '<!-- Begin First Menu Item -->';
		$select_link .= '<div id="footer_dropup_2" class="footer_dropup drop1columns">';	
		$select_link .= '<ul id="nav2" style="">';
		$selected='';
		//$select_link .=' <li id="drop-up-2-item" class="none drop-up-2-item"><span class="footer-ui-icon-off"></span><a href="#">none selectecd</a></li>';	
					
		for($i=0; $i<count($data['ct']); $i++){
				
			$select_link .=' <li id="drop-up-2-item-'.$i.'" class="none drop-up-2-item"><span class="footer-ui-icon-off"></span><a href="';	
			$longName = max($data['ct'][$i]['n'], $data['ct'][$i]['c3'][0]['d'] ); 
			$select_link .= '/objectview/'.$action.'/'.$data['ct'][$i]['pk'].'/'.urlencode(str_replace(' ', '-', $longName)).'" title="'.$longName.'">';	
			
				if ($data['ct'][$i]['n']){
				 	$select_link .= $data['ct'][$i]['n'];
					} elseif ($data['ct'][$i]['nl1']) {
					$select_link .= $data['ct'][$i]['nl1'];	
					}
		    $select_link .='</a></li>';
				
			} //end loop
		
		$select_link .='</ul></div></ul>';
	
		return $select_link;	
	
		}	
	
/* @accepts $controller and $action to create unique cache entitiy
 * matches PK's with either Libghtboxes or Featured Sets
 * returns an escaped entity safe <a> tag with Features sets
 * uses cakePHP text helper to truncate to 18 characters
 *  Some of those sets have long names !
 *  TODO: pre-cache note
 * */
	function makeUlLink3($controller, $action){
			
		$select_link ='';	
		$select_link .='<!--dynamic ul3 generic list-->';
		$select_link .= '<ul id="navigation3" class="footer-nav footer_fixedwidth"><!-- BEGIN FOOTER Drop-ups -->';
		$select_link .= '<li id="navigation3-parent-li" class="li-parent"><span class="select-on select-start selected"></span><a href="#" class="dropup">none selected</a><!-- Begin First Menu Item -->';
		$select_link .= '<div id="footer_dropup_3" class="footer_dropup drop1columns">';	
		$select_link .= '<ul id="nav3">';
		$selected='';
		
		if ($controller == 'usersets' || $controller == 'lightbox'){
		$data = PFactory::getCategoryInstance()->getAllLightBoxes();	
		$switch = 'lightbox';
		}
		
		if ($controller =='featured' || $controller =='objectview'){
		$data = PFactory::getCategoryInstance()->getFeatured();
		$switch = 'objectview';
		}
		
		
		if (isset($data['ct'])){
			// 1/6/13 will throw undifined variable error for $data - why ?		
			for($i=0; $i<count($data['ct']); $i++){	
				
		    $select_link .=' <li id="drop-up-3-item-'.$i.'" class="none drop-up-3-item"><span class="footer-ui-icon-off"></span><a href="';	
			$select_link .= '/'.$switch.'/'.$action.'/'.$data['ct'][$i]['pk'].'/'.urlencode(str_replace(' ', '-', $data['ct'][$i]['n'])).'" title="'.$data['ct'][$i]['n'].'">';	
			
				if ($data['ct'][$i]['n']){
				 	$select_link .=   $this->Text->truncate( $data['ct'][$i]['n'],  18,  array( 'ending' => '&hellip;', 'exact' => true));
					} elseif ($data['ct'][$i]['nl1']) {
					$select_link .= $this->Text->truncate( $data['ct'][$i]['nl1'],  18,  array( 'ending' => '&hellip;', 'exact' => true));
					
					}
		    $select_link .='</a></li>';
				
			} //end loop
		
		
		}
		$select_link .='</ul></div></ul>';
		return $select_link;	
		
	}//end function
	
/* @accepts $caction and $view_type and $PK to create unique cache entitiy
 * matches PK's with either Featured Sets
 * returns an escaped entity safe <a> tag with Features sets matched to a Museum
 * uses cakePHP text helper to truncate to 18 characters
 *  Some of those sets have long names !
 *  TODO: pre-cache note
 * */
	function makeUlLink4( $action, $view_type, $pk = NULL){
		
	    $match_link ='';
		$select_link ='';
	    //$match = str_replace('-', ' ', $match);
		$data = PFactory::getCategoryInstance()->getFeatured();
		$matchCounter = 0;
		$name ='';
		for($i=0; $i<count($data['ct']); $i++){
		
			if($pk == $data['ct'][$i]['d'] ){
			
			$matchCounter ++;				
		  	
		  	$match_link .=' <li id="drop-up-4-item-'.$i.'" class="none drop-up-4-item"><span class="footer-ui-icon-off"></span><a href="';			  		
	        $match_link .='/objectview/'.$action.'/'. $data['ct'][$i]['pk'].'/'.urlencode(str_replace(' ', '-', $data['ct'][$i]['n'])).'" class="drop-up-4-item-link" title="' .$data['ct'][$i]['n'] .'">';	
			
			
					if ($data['ct'][$i]['n']){
				 	$name = $data['ct'][$i]['n'];
					$match_link .= $this->Text->truncate( $name,  18,  array( 'ending' => '&hellip;', 'exact' => true));
					} elseif ($data['ct'][$i]['nl1']) {
					$name = $data['ct'][$i]['nl1'];	
					$match_link .= $this->Text->truncate( $name,  18,  array( 'ending' => '&hellip;', 'exact' => true));
					}			
		  			$match_link .='</a></li>';	
					
					}//end if
		
		} //end loop
	    
	    
	    if($matchCounter ==0){
	    	$match_title = 'no featured sets';
		} else {
			$match_title = 'none selected';	
		}
	    
	    $select_link .='<!-- dynamic UL4 featured by museum filter for '.$pk.' and action '.$action. '-->';
		$select_link .= '<ul id="navigation4" class="footer-nav footer_fixedwidth"><!-- BEGIN FOOTER Drop-ups -->';
		$select_link .= '<li id="navigation4-parent-li" class="li-parent"><span class="select-on select-start selected"></span><a href="#" class="dropup">'.$match_title.'</a><!-- Begin First Menu Item -->';
		$select_link .= '<div id="footer_dropup_4" class="footer_dropup drop1columns">';
		$select_link .='<ul id="nav4">';
		$select_link .= $match_link;
		
		$select_link .=' </ul></div></ul>';
		//$select_link .= '<script type="text/javascript">$(document).ready(function(){var oScrollbar = $("#scrollbar1"); oScrollbar.tinyscrollbar();oScrollbar.tinyscrollbar_update();});</script>';
		
		return $select_link;
}//end function
	
// new 5th select_link 

function makeUlLink5(){
			
		$select_link ='';	
		$select_link .='<!--dynamic ul5 generic list-->';
		$select_link .= '<ul id="navigation5" class="footer-nav footer_fixedwidth"><!-- BEGIN FOOTER Drop-ups -->';
		$select_link .= '<li  id="navigation5-parent-li" class="li-parent"><span class="select-on select-start"></span><a href="#" class="dropup">sets</a><!-- Begin First Menu Item -->';
		$select_link .= '<div id="footer_dropup_5" class="footer_dropup drop1columns">';
		//$select_link .= '<div id="scrollbar2">';	
		//select_link .= '<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>';
		//$select_link .= '<div class="viewport"><div class="overview">';
		$select_link .= '<ul id="nav5" style=""><li></li>';
		$selected='';
		//will drop this in favor of AJAX call
		// typical JSON call to list http://piction.bpoc.org/piction/!soap.jsonget?n=CATEGORIES_XML&SURL=1632424079ZZDEIGGXSBUC&TYPE=L
		// see typical repsonce
		
		/*
		$args = array(
			array('TYPE', 'L')
			);
		
		$data = PFactory::getCategoryInstance()->getCategories($args);
		
		if(isset($data)){
				
		for($i=0; $i<count($data['ct']); $i++){	
			$select_link .=' <li id="drop-up-5-item-'.$i.'" class="none drop-up-5-item"><span class="footer-ui-icon-off"></span><a href="#" id="';	
			$select_link .= $data['ct'][$i]['i'].'">';	
			$select_link .= $data['ct'][$i]['n'];
		    $select_link .='</a></li>';
				
			} //end loop
		}//end if
		
		else{
		$select_link .=' <li id="drop-up-5-item-" class="none drop-up-5-item"><span class="footer-ui-icon-off"></span><a href="#tabs-3" id="null">please log in</a></li>';
		} */
		
		$select_link .=' </ul>';
		//$select_link .=' </div></div>';
		//$select_link .='</div>';
		$select_link .='</div></ul>';
		
	
		return $select_link;	
	
		}

	
	//matches to determine selected state for image size buttons.
	function selectedAction($sel){
		
		if ($this->params['action'] == $sel){
		$selected ='selected-image-size';
		}else{
		$selected='';
		}
		
		return $selected;
		
	}//end function
	

	
} //end class
