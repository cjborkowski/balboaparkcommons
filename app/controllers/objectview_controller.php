<?php
/* ObjectviewController is responsible for 
 * controlling views when a list of objects(UMOs)
 * that belong to a particular category are displayed
 */
class ObjectviewController extends AppController 
{		
	var $name = 'Objectview';	
	var $helpers = array('Form', 'Html', 'Navigation', 'Derivatives', 'Cache', 'ShareButtons', 'Pdf');
	var $uses = null; // no model
	var $components = array('RequestHandler', 'Session'); 
	var $cacheAction = true;
				
	private function setData()
	{
			
			
		if(!empty($this->params['pass'][1]) && isset($this->params['pass'][0])){
		$search_key = $this->params['pass'][0];
		}else{
		$search_key  = NULL;
		}
		
		if(!empty($this->params['pass'][1]) &&isset($this->params['pass'][1])){
		$search_term = urldecode($this->params['pass'][1]);	
		}else{
		$search_term  = NULL;
		}
		
		if(!empty ($this->params['pass'][2]) && isset($this->params['pass'][2])){
		$page_start = $this->params['pass'][2];
		}else{
		$page_start = 0;
		}
		
		//echo $this->params['pass'][2];
		//echo 'page_start:'.$page_start;
		
		if(!empty($this->params['pass'][3]) && isset($this->params['pass'][3])){
		$page_size = $this->params['pass'][3];
		}else{$page_size = 24;}
		//echo $this->params['pass'][3];
		//echo 'page_size'.$page_size;
		
		$this->Session->write('ActionName.name', $this->params['action']);
		//print_r($this -> Session -> read());
		
		switch($search_key){
			case 'search':
				$data = PFactory::getUmoInstance()->search($search_term, $page_start, $page_size);	
				$this->set('data', $data);
				$this->set('jsondata', json_encode($data));								
				$this->set('title', urldecode($search_term));
				$this->set('count', $data['num']);
				if ($data['num'] >=24){
				$pagination = BPOC::makePagination($this->params['controller'], $this->params['action'], $search_key, $search_term, $data['num'], $page_start, $page_size);
				$this->set('pagination', $pagination);
				}
				
				break;
			
			default: 
				
				if(is_numeric($search_key) && $search_term == NULL ){					
				$data = PFactory::getUmoInstance()->getUmoById($search_key);
				$this->set('data', $data);
				$this->set('jsondata', json_encode($data));	
				$this->set('title', max($data['d'], $data['n']));
				} 
				
				if(is_numeric($search_key) && isset($search_term) ){	
				$data = PFactory::getUmoInstance()->getUmosByCategoryId($search_key, $page_start, $page_size );
				$this->set('data', $data);
				$this->set('jsondata', json_encode($data));	
				$this->set('count', $data['num']);
				$this->set('title', max($data['d'], $data['n']));
				
				if ($data['num'] >=24){
				$pagination = BPOC::makePagination($this->params['controller'], $this->params['action'], $search_key, $search_term, $data['num'], $page_start, $page_size);
				$this->set('pagination', $pagination);
				}
				
				}
				
				//Cache::write('data', $data);						
				//$this->set('title', str_replace('-', ' ',$search_term));					
				//render function needed	

		}
		
	}
	
	private function setCollections(){
		
		$collections = PFactory::getCategoryInstance()->getCollections();
		$this->set('collections', $collections);
		
	}	
	
	
	private function setItemData(){
		
		if (is_numeric($this->params['pass'][0])){
		$data_slice = $this->params['pass'][0];
		}
		
		
		if (isset($this->params['pass'][1]) && is_numeric($this->params['pass'][1])){
		$data_slice = $this->params['pass'][1];
		}
		
		//in case there's more to the url = UMO and pk is always last 	
		//$data_slice = NULL;	
		$data = PFactory::getUmoInstance()->getUmoById($data_slice);
		$this->setCollections();
		$this->set('data', $data);
		
	}
	
				
	public function index()
	{
		//$this->redirect(array('controller' => 'institution', 'action' => 'listview'));	
		$this->setData();
		$this->setCollections();
	}				

	public function gridview()
	{		
	    $this->setData();
		$this->setCollections();
		$this->set('view_type', 'collections');	
		if ( @$this->params['pdf'] == '1' ){
				$this->layout = 'pdf'; //this will use the pdf.ctp layout
				$this->render();
				}
	}
	
	public function listview()
	{		
		$this->setData();
		$this->setCollections();	
		$this->set('view_type', 'collections');	
		if ( @$this->params['pdf'] == '1' ){
				$this->layout = 'pdf'; //this will use the pdf.ctp layout
				$this->render();
				}
	}
	
	public function streamview()
	{			
		$this->setData();
		$this->set('view_type', 'collections');	
	}	
	
	public function item()
	{
		$this->setItemData();
		$this->setCollections();
		$this->set('view_type', 'single_item');
		$shortName = urldecode($this->params['pass'][1]);
		$longName = BPOC::generateLongName($shortName);
		$this->set('title', $longName);
		
		if ( @$this->params['pdf'] == '1' ){
				$this->layout = 'pdf'; //this will use the pdf.ctp layout
				$this->render();
				}
	 //print_r($this -> Session -> read()); 
	 $PastAction = $this->Session->read('ActionName.name');
	 $this->set('PastAction', $PastAction);
	
}
	
	public function lists()
    {
    	$this->setData();
		$this->set('view_type', 'collections');	
    } 

	public function fullview()
    {
    	$this->setData();
		$this->setCollections();
		$this->set('view_type', 'collections');   
		if ( @$this->params['pdf'] == '1' ){
				$this->layout = 'pdf'; //this will use the pdf.ctp layout
				$this->render();
				}          
    } 
	
	
	
}//end class
?>