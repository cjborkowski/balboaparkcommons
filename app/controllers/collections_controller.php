<?php
class CollectionsController extends AppController {

	var $name = 'Collections';	
	var $helpers = array('Form', 'Html', 'Navigation', 'Time', 'Text', 'Derivatives', 'Cache', 'ShareButtons','Pdf');
	var $uses = null; // no model
	var $components = array('RequestHandler');
	var $cacheAction = true;
	         
	
	function setData(){
		
		$data = PFactory::getCategoryInstance()->getCollections();
		$this->set('data', $data);
		CakeLog::write('debug','collections_controller setData() created a new call');
		$this->set('jsondata', json_encode($data));	
		
	}			
	public function index()
	{		
		$this->redirect(array('controller' => 'collections', 'action' => 'listview'));					
	}	
    
	public function gridview()
	{				
		$data = $this->setData();
		$this->set('view_type', 'collections');	
		$this->set('title', 'Museum');		
		//$this->cacheAction = '1 day';	
		//Configure::write( 'Company',array('name'=>'Pizza, Inc.','slogan'=>'Pizza for your body and soul'));
	}
	
	public function listview()
	{
		$data = $this->setData();
		$this->set('view_type', 'collections');	
		$this->set('title', 'Museum');	
		//$this->cacheAction = '1 day';	
	}
	
	public function streamview()
	{
		$data = $this->setData();
		$this->set('view_type', 'collections');	
	}
	
	//we never show these althought the request might be made
	public function fullview()
	{		
	$this->redirect(array('controller' => 'collections', 'action' => 'listview'));					
	}
 	public function display(){
	$this->redirect(array('controller' => 'collections', 'action' => 'listview'));	
		
	}	
	
	
	function museum($title =NULL) {
	
	$Post = ClassRegistry::init('Post');
	$museum = $Post->find('first', array('conditions' => array('Post.title' => $title)));		
	return $museum['Post']['body'];
	$this->cacheAction = '1 day';	
	}
}
?>