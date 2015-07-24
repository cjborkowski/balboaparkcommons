<?php
class AppController extends Controller 
{
	var $helpers = array('Form', 'Html', 'Navigation', 'Time', 'Text', 'Derivatives', 'Cache', 'AssetCompress.AssetCompress');
	//'AssetCompress.AssetCompress'
	//var $persistModel = true;
	var $components = array('Auth', 'Session');		
	function beforeFilter()	
	{
		$this->Auth->allow('*');
		$this->Auth->deny(array('edit', 'add', 'edit/*','view', 'delete', 'admin'));
		$this->Auth->loginAction = array('controller' => 'users', 'action' => 'login');
		$this->Auth->logoutRedirect = array('controller' => 'pages', 'action' => 'display', 'home');
		$this->Auth->loginRedirect = array('controller' => 'posts', 'action' => 'index');
		
		// for debugging
	  	App::import('Vendor', 'FirePHP', array('file'=>'FirePHP/FirePHP.class.php'));
		$this->DEBUG = FirePHP::getInstance(true);
		ob_start();		
		
		// import Piction Request class											
		App::import('Vendor', 'PRequest', array('file'=>'Piction/PRequest.php'));
		$this->API = new PRequest();
		$this->API->setDebug($this->DEBUG);		
				
		// import Piction Factory class
		App::import('Vendor', 'PFactory', array('file'=>'Piction/PFactory.php'));
		PFactory::setAjax($this->API);
		
		// import BPOC class
		App::import('Vendor', 'BPOC', array('file'=>'BPOC/bpoc.php'));
	
		$this->set('sAction', $this->params['action']);
		$this->set('sController' ,$this->params['controller']);
		$this->set('sPass' , $this->params['pass']);
		//route pringing actions.
		if ( @$this->params['printable'] == '1' ){

		// ... change to print layout
		$this->layout = 'print';
		}
		
		//route json actions.
		if ( @$this->params['json'] == '1' ){

		// ... change to json
		$this->layout = 'json';
		}	
		
		if ( @$this->params['pdf'] == '1' ){

		// ... change pfd layout
		$this->layout = 'pdf';
		}						
	}
		
}/*end class */
?>
