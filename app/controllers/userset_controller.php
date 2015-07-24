<?php
class UsersetController extends AppController {

	var $name = 'Userset';	
	var $helpers = array('Form', 'Html', 'Navigation', 'Time', 'Text', 'Derivatives', 'ShareButtons', 'Pdf');
	var $uses = null; // no model
	var $components = array('RequestHandler');
	//var $cacheAction = true;
	
	function setData()
	{
		
	$args = array(
			array('TYPE', 'L')
		);
		
		$data = PFactory::getCategoryInstance()->getCategories($args);
		
		//$data = PFactory::getCategoryInstance()->getLightBoxes();
		$this->set('data', $data);	
		
		$coverImage = array();
		for($i=0; $i<count($data['ct']); $i++)
		{
			$coverImage[] = $this->getLightboxData2($data['ct'][$i]['i']);
		}
		
		$this->set('coverImage',$coverImage);	
	}			
	public function index()
	{		
		$this->redirect(array('controller' => 'collections', 'action' => 'listview'));					
	}	
    
	public function gridview()
	{
							
	$data = $this->setData();
	$this->set('view_type', 'usersets');	
	$this->set('title', 'User Sets');		
	
	}
	
	public function listview()
	{
	
	//$data = $this->setTestData();	
	$data = $this->setData();
	$this->set('view_type', 'usersets');	
	$this->set('title', 'User Sets');		
	}
	
	//we never show these althought the request might be made
	public function fullview()
	{		
	$data = $this->setData();
	$this->set('view_type', 'usersets');	
	$this->set('title', 'User Sets');						
	}
 	
 	public function display(){
	$this->redirect(array('controller' => 'usersets', 'action' => 'listview'));		
	}	
	

	
	public function setTestData(){
		/*
		$myData = '{ "ct":[ {"n":"My custom rename","t":"L","i":"7927078","x":"10","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"painting","t":"L","i":"7930822","x":"3","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"animals","t":"L","i":"20972373","x":"6","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"christinas test","t":"L","i":"20974689","x":"1","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"hello renamed","t":"L","i":"20974692","x":"0","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"my new set","t":"L","i":"20974698","x":"0","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"cdplovesthecommons","t":"L","i":"20975116","x":"0","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"natural-history","t":"L","i":"22170099","x":"5","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"new1","t":"L","i":"22431936","x":"0","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"new2","t":"L","i":"22431992","x":"0","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"news","t":"L","i":"22431995","x":"0","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"refresh","t":"L","i":"22432004","x":"0","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"Flowers","t":"L","i":"22432062","x":"7","opk":"7926592","u":"" ,"ct":[ ] }, {"n":"URLTEST","t":"L","i":"22432423","x":"0","opk":"7926592","u":"" ,"ct":[ ] } ] }';
		$data = json_encode($myData);
		$data = json_decode($myData, true); */
		$data = $this->setData();
		$this->set('data', $data);	
		
	}

	public function getLightboxData2($lightbox_id){
		
		$image = PFactory::getUmoInstance()->getUmosByLightboxId($lightbox_id);
		return $image;
	}
	
	public function getLightboxData(){
		//LIST_IMAGES_IN_LIGHTBOX
	
		$lightbox_id = $this->params['pass'][1];
		$data = PFactory::getUmoInstance()->getUmosByLightboxId($lightbox_id);
		$this->set('data', $data);
		
		
		
	}

	public function lightbox(){
		$data = $this->getLightBoxData();
		$this->set('view_type', 'usersets');	
		$this->set('title', 'User Sets');
			
	}
	
	
}

?>