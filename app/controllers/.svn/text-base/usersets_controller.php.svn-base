<?php
class UsersetsController extends AppController {

	var $name = 'Usersets';	
	var $helpers = array('Form', 'Html', 'Navigation', 'Time', 'Text', 'Derivatives', 'ShareButtons', 'Pdf');
	var $uses = null; // no model
	var $components = array('RequestHandler');
	var $cacheAction = true;
	
	function setData()
	{
		
		$data = PFactory::getCategoryInstance()->getAllLightBoxes();
		$this->set('data', $data);	
		
		$coverImage = array();
		for($i=0; $i<count($data['ct']); $i++)
		{
			$coverImage[] = $this->getLightboxData2($data['ct'][$i]['pk']);
		}
		
		$this->set('coverImage',$coverImage);	
	}		
	
	public function getLightboxData2($lightbox_id){
		
		$image = PFactory::getUmoInstance()->getUmosByLightboxId($lightbox_id);
		return $image;
	}	
	public function gridview()
	{
							
	$data = $this->setData();
	$this->set('view_type', 'collections');	
	$this->set('title', 'User Sets');		
	
	}
	
	public function listview()
	{
	
	//$data = $this->setTestData();	
	$data = $this->setData();
	$this->set('view_type', 'collections');	
	$this->set('title', 'User Sets');		
	}
	
	public function fullview()
	{
	
	//$data = $this->setTestData();	
	$data = $this->setData();
	$this->set('view_type', 'collections');	
	$this->set('title', 'User Sets');		
	}
	
 	
 	public function display(){
	$this->redirect(array('controller' => 'usersets', 'action' => 'listview'));		
	}	
}

?>