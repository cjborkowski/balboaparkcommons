<?php
class LightboxController extends AppController {

	var $name = 'Lightbox';	
	var $helpers = array('Form', 'Html', 'Navigation', 'Time', 'Text', 'Derivatives', 'ShareButtons', 'Pdf');
	var $uses = null; // no model
	var $components = array('RequestHandler');
	//var $cacheAction = true;
	
	
	public function index()
	{		
		$this->redirect(array('controller' => 'collections', 'action' => 'listview'));					
	}	
    
	public function gridview()
	{
							
	$data = $this->setData();
	$this->set('view_type', 'collections');	
	if(isset($data['n'])){
	$this->set('title', $data['n']);		
	}else{
	$this->set('title', 'Lightbox User Sets');		
	}
	if ( @$this->params['pdf'] == '1' ){
				$this->layout = 'pdf'; //this will use the pdf.ctp layout
				$this->render();
				}
	}
	
	public function listview()
	{
	
	$data = $this->setData();
	$this->set('view_type', 'collections');	
	if(isset($data['n'])){
	$this->set('title', $data['n']);		
	}else{
	$this->set('title', 'Lightbox User Sets');		
	}						
	if ( @$this->params['pdf'] == '1' ){
				$this->layout = 'pdf'; //this will use the pdf.ctp layout
				$this->render();
				}
	}
	
	//we never show these althought the request might be made
	public function fullview()
	{		
	$data = $this->setData();
	$this->set('view_type', 'collections');	
	if(isset($data['n'])){
	$this->set('title', $data['n']);		
	}else{
	$this->set('title', 'Lightbox User Sets');		
	}						
	if ( @$this->params['pdf'] == '1' ){
				$this->layout = 'pdf'; //this will use the pdf.ctp layout
				$this->render();
				}
	}
 	
 	public function display()
 	{
		
	$this->redirect(array('controller' => 'usersets', 'action' => 'listview'));		
	}	

	public function setData(){
		
		if(is_numeric($this->params['pass'][0]) ){
		$lightbox_id =  $this->params['pass'][0];
		}
		
		if(isset($this->params['pass'][1]) && is_numeric($this->params['pass'][1]) ){
		$lightbox_id =  $this->params['pass'][1];
		}
				
		$data = PFactory::getUmoInstance()->getUmosByLightboxId($lightbox_id);
		$this->set('data', $data);
	}
	
	
		
	
	
	
}

?>