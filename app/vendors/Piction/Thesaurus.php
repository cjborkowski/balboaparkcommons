<?php
class Thesaurus
{
		
	private static $_thesid = '11397415';
		
	function __construct($api) 
	{
		$this->API = $api;		   
		// debug
		App::import('Vendor', 'FirePHP', array('file'=>'FirePHP/FirePHP.class.php'));
		$this->debug = FirePHP::getInstance(true);
  }	
	
	public function getThesaurus()
	{
		$args = array(
			array('n', 'Thesaurus_Search'),
			array('THES_ID', self::$_thesid),
			array('OPTION', 'QUERY_CHILDREN'),
			array('PARENT', '')
		);
		$data = $this->API->callJson($args);
		return $data;
		
		
	}
	
	public function getUmos($termid)
	{
		$args = array(
			array('n', 'SKY'),
			array('ACTION', 'LIST_IMAGES_SEARCH'),
			array('primary_cc', 'Public+Commons'),
			array('ORDERING', 'IMAGE'),
			array('SHOW_METADATA', 'COLLECTION'),
			array('SEARCH', 'thes_hierarchy:"'.self::$_thesid.','.$termid.'"')
		);
		$data = $this->API->callJson($args);
		return $data;
	}

}

?>