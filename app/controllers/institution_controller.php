<?php
class InstitutionController extends AppController 
{		
	var $name = 'Institution';	
	var $helpers = array('Form', 'Html', 'Navigation');
	var $uses = null; // no model
	
	

		
	private function setData()
	{	
		//App::import('Vendor', 'PictionApiUmo', array('file'=>'Piction/PictionApiUmo.php'));
		//$this->UMO = new PictionApiUmo($this->API);		
		//$institution_id = $this->params['pass'][0];														
		//$data = $this->UMO->getUmosByCategoryId($institution_id);
				
		
		$institution_id = $this->params['pass'][0];
		$institution_name = $this->params['pass'][1];
		$data = PFactory::getUmoInstance()->getUmosByCategoryId($institution_id);
		$this->set('data', $data);		
		
		//$this->set('title', urldecode($institution_name));
		
		
	}	
	
	
	private function setPhoto()
	{		
		
        $institution_id = $this->params['pass'][0];
		$data = PFactory::getUmoInstance()->getUmosByCategoryId($institution_id);
		
		$umo_id = $this->params['pass'][1];
		
		$this->set('umo', $umo_id);
		$this->set('data', $data);
		
	    $photo = array_search($umo_id, $data);
		//$photo = array_filter($data, $umo_id);
		//$photos = array_filter($data, function ($photos) use ($umo_id) { return ($photos == $umo_id); } );
		
		$this->set('photo', $photo);		
	}	
	
	
				
	public function index()
	{
		$this->redirect(array('controller' => 'institution', 'action' => 'listview'));		
	}	
			
	public function main()
	{
		$this->setData();	
		$this->set('view_type', 'collections');		
	}
	
	public function gridview()
	{
		$this->setData();
		//$this->render('/objectview/');
		$this->set('view_type', 'collections');	
	}
	public function listview()
	{			
		$this->setData();	
		$this->set('view_type', 'collections');	
	}
	
	public function itemview()
	{			
		$this->setPhoto();	
		$this->set('view_type', 'single_item');	
	}		
	
}
?>