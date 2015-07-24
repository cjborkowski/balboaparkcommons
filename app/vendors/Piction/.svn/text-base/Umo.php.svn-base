<?php
App::import('Vendor', 'Piction', array('file'=>'PBase.php'));
define("USER_IMAGES_VIEWED", "User.images_viewed");


/***
 * Umo class is responsible for all calls dealing with an Image, 
 * or set of Images.
 */
class Umo extends PBase
{		
	function __construct() 
	{
		parent::__construct();
  }
	
	public function getUmosByCategoryId($category_id, $page_start, $page_size)
	{
		$action = 'LIST_IMAGES_IN_CATEGORY';
		
		
		$args = array(
			array('n', 'SKY'),
			array('ACTION', $action),
			//hardwired pagination usage : PAGE_START=1&PAGE_SIZE=20
			array('PAGE_START', $page_start),
			array('PAGE_SIZE', $page_size),
			array('CATEGORY_PK', $category_id),
			array('ORDERING', 'IMAGE'),
			array('SHOW_METADATA', 'COLLECTION')
		);
		
		$data = $this->api->callJson($args);
		return $data;				
	}
	
	
	
	public function getUmosByLightboxId($lightbox_id)
	{
		//return PFactory::getUmoInstance()->getUmosByCategoryId($lightbox_id, 'LIST_IMAGES_IN_LIGHTBOX');
	
		$args = array(
			array('n', 'SKY'),
			array('ACTION', 'LIST_IMAGES_IN_LIGHTBOX'),
		
			array('CATEGORY_PK', $lightbox_id),
			array('ORDERING', 'IMAGE'),
			array('SHOW_METADATA', 'COLLECTION')
		);
	
		$data = $this->api->callJson($args);
		return $data;
	
	}
		
	
	
	public function getUmoById($umo_id)
	{
		$args = array(
			array('n', 'SKY'),
			array('action', 'LIST_IMAGES_SEARCH'),
			array('primary_cc', 'Public+Commons'),
			array('search', 'UMO:'.$umo_id),
			array('SHOW_METADATA', 'COLLECTION')
		);
		
		$data = $this->api->callJson($args);	
		//$this->debug->log($data);	
		return $data;		
	}
	
	/* old seach 
	public function search($search_term)
	{		
		$args = array(
			array('n', 'SKY'),
			array('action', 'LIST_IMAGES_SEARCH'),
			array('primary_cc', 'Public+Commons'),
			array('search', $search_term),
			array('SHOW_METADATA', 'COLLECTION')
		);
		
		$data = $this->api->callJson($args);	
		$this->debug->log($data);	
		return $data;		
	}
	*/
	
	public function search($search_term, $page_start, $page_size)
	{		
		$args = array(
			array('n', 'SKY'),
			array('action', 'LIST_IMAGES_SEARCH'),
			array('PAGE_START', $page_start),
			array('PAGE_SIZE', $page_size),
			array('primary_cc', 'Public+Commons'),
			array('search', 'word:"'.$search_term.'"+AND+meta:"PUBLIC+COMMONS.FILTER,PUBLIC"'),
			array('SHOW_METADATA', 'COLLECTION')
		);
		
		$data = $this->api->callJson($args);	
		$this->debug->log($data);	
		return $data;		
	}
	
	
	
  /**
	 * Saves umo details to sessions, once its thumbnail
	 * has been clicked
	 * Takes in an associative array $umo
	 */
	public function saveSessionUmo($umo)
	{
		$umoarr = array();		
		array_push($umoarr, $umo);
		
				
		if(!isset($_SESSION[USER_IMAGES_VIEWED]))
		{
			$_SESSION[USER_IMAGES_VIEWED] = json_encode($umoarr);
		}
		else
		{
			$umoarr1 = json_decode($_SESSION[USER_IMAGES_VIEWED]);
			array_push($umoarr1, $umo);
			unset($_SESSION[USER_IMAGES_VIEWED]);
			$_SESSION[USER_IMAGES_VIEWED] = json_encode($umoarr1);							
		}
								
		$this->debug->log($_SESSION[USER_IMAGES_VIEWED]);
				
		return $umoarr1;
	}
	
	/**
	 * Returns the session USER_IMAGES_VIEWED
	 * Which holds all umos that a user has clicked on
	 */
	public function getSessionUmos()
	{
		return json_decode($_SESSION[USER_IMAGES_VIEWED]);
	}	
	
	
}

?>