<?php

class Category
{
		
	function __construct($api) 
	{
		$this->API = $api;
	    App::import('Vendor', 'FirePHP', array('file'=>'FirePHP/FirePHP.class.php'));
		$this->debug = FirePHP::getInstance(true);
		ob_start();			
		
		$this->debug->log('FirePHP Category test echo');
				   
  }	
	
	public function getFeatured()
	{
		$args = array(
			array('n', 'SKY'),
			array('ACTION', 'LIST_ALL_CATEGORIES'),
			array('CATEGORY_SEARCH', 'Featured+Set'),
			array('parent_category', 'Public'),
			array('METATAG', 'PUBLIC+COMMONS.COLLECTION+COVER+IMAGE'),
			array('FEATURE_COLLECTION', 'FEATURE')
		);
		
		$data = Cache::read('DATA-jason-get-all-featured-data');
		if ($data !== false) {
		$data ;
		} else { 
		$data = $this->API->callJson($args);	
		Cache::write('DATA-jason-get-all-featured-data', $data);
		CakeLog::write('debug','NEW CACHE WRITE - for getFeatured()');
		}
		
		
		$data = $this->API->callJson($args);
		$this->debug->log($data);	
		return $data;
		
	}
		
	public function getCollections()
	{
		$args = array(
			array('n', 'SKY'),
			array('ACTION', 'LIST_ALL_CATEGORIES'),
			array('CATEGORY_SEARCH', ''),
			array('parent_category', 'Public'),
			array('METATAG', 'PUBLIC+COMMONS.COLLECTION+COVER+IMAGE'),
			array('FEATURE_COLLECTION', 'CHILD')
		);

		$data = Cache::read('DATA-jason-get-collections-data');
		if ($data !== false) {
		$data ;
		} else { 
		$data = $this->API->callJson($args);	
		Cache::write('DATA-jason-get-collections-data', $data);
		CakeLog::write('debug','NEW CACHE WRITE - for getCollections()');
		} 
		$this->debug->log('getCollections called');	
		CakeLog::write('debug','getCollections () called');							
		return $data;		
	}
	
	/*
	 * Generic category listing return method for retrieving Piction LIGHTBOXES BY USER & SURL
	 */
	public function getCategories($options)
	{
		$requiredArgs = array (
			array("n", "CATEGORIES_XML"),
			array("SURL", PFactory::getProfileInstance()->getSURL())
		);
		
		$args = array_merge($requiredArgs, $options);
		CakeLog::write('debug','getCatigories () called');
		$data = $this->API->callJson($args);
		return $data;
	}
	

	public function getLightBoxes()
	{
	// Typical call
	//http://piction.bpoc.org/piction/!soap.ajaxget?n=Categories_XML&SURL=194759792ZZZFWNJKRCPMF&INDICATE_IF_CHILD_CATEGORIES=TRUE
	 $args = array (
	 		array('n', 'Categories_XML'),
			array("SURL", PFactory::getProfileInstance()->getSURL()),
			array('INDICATE_IF_CHILD_CATEGORIES', 'TRUE'),	
	 				);
					
		$data = $this->API->callJson($args);	
		$this->debug->log('getLightBoxes called');	
		CakeLog::write('debug','getLightBoxes () called');						
		return $data;	
	}
	
	
	// Function to get all user lightboxes

	public function getAllLightBoxes()
	{
		
	// Typical call
	//http://piction.bpoc.org/piction/!soap.jsonget?&n=SKY&action=LIST_ALL_CATEGORIES&feature_collection=LIGHTBOX&primary_cc=VANILLA
	$args = array(
			array('n', 'SKY'),
			array('action', 'LIST_ALL_CATEGORIES'),
			array('feature_collection', 'LIGHTBOX'),
			array('primary_cc', 'VANILLA')
					);
		
		$data = Cache::read('DATA-jason-get-all-lightboxes-data');
		if ($data !== false) {
		$data ;
		} else { 
		$data = $this->API->callJson($args);	
		Cache::write('DATA-jason-get-all-lightboxes-data', $data);
		CakeLog::write('debug','NEW CACHE WRITE - for getAllLightBoxes()');
		}
		
		$data = $this->API->callJson($args);	
		$this->debug->log('getAllLightBoxes called');	
		CakeLog::write('debug','getAllLightBoxes () called');						
		return $data;	
	
	}
	

}

?>