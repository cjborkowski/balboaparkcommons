<?php
class FeaturedController extends AppController 
{
	var $name = 'Featured';	
	var $helpers = array('Form', 'Html', 'Navigation', 'Derivatives', 'Cache','ShareButtons','Pdf');
	var $uses = null; // no model
	var $components = array('RequestHandler');
	var $cacheAction = true;
		
	private function setData()
	{
		$data = Cache::read('featured-set-data');
		if ($data !== false) 
		{
		$this->set('data', $data);
		$this->set('jsondata', json_encode($data));	
		CakeLog::write('debug','featured_controller setData() read from cache');
		} else {
			
		$data = PFactory::getCategoryInstance()->getFeatured();
		Cache::write('featured-set-data', $data);
		$this->set('data', $data);
		$this->set('jsondata', json_encode($data));	
		CakeLog::write('debug','featured_controller setData() created a new call and wrote to cache');
		}
					
	}	
	
	private function setCollections(){	
		$collections = PFactory::getCategoryInstance()->getCollections();
		$this->set('collections', $collections);	
	}	
		
	private function getURL(){
		$str = createParamsStr();
	}
				
	public function index()
	{
		$this->redirect(array('controller' => 'featured', 'action' => 'gridview'));		
	}	

	public function gridview()
	{
		//$this->layout = 'debug';
		$this->setData();
		$this->setCollections();
		$this->set('view_type', 'collections');
		$this->set('title', 'Featured');	
		//$this->cacheAction = '1 day';	
	}
		
	public function listview()
	{
		$this->setData();
		$this->setCollections();	
		$this->set('view_type', 'collections');	
		$this->set('title', 'Featured');	
		//$this->cacheAction = '1 day';	
	}	
	
	//we never show these althought the request might be made
	public function fullview()
	{		
	$this->redirect(array('controller' => 'featured', 'action' => 'listview'));					
	}
 	
 	public function display(){
	$this->redirect(array('controller' => 'featured', 'action' => 'listview'));		
	}	
	
}
?>