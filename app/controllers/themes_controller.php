<?php
class ThemesController extends AppController {

	var $name = 'Themes';
	
	var $helpers = array('Form', 'Html', 'Navigation');
	var $uses = null; // no model
		
	public function index()
	{	
		$data = PFactory::getThesaurusInstance()->getThesaurus();
		$this->set('data', $data);
	}	
			
	public function main()
	{
		$data = "main";
	}
	
	public function gallery()
	{
		$data = "gallery";
	}
	public function listview()
	{
		$data = "listview";
	}	
	
}
?>