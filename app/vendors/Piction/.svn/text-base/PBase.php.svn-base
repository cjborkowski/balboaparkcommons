<?php 
class PBase
{
	 var $debug;
	 
	 function __construct() 
	 {
			// import debug
	  	App::import('Vendor', 'FirePHP', array('file'=>'FirePHP/FirePHP.class.php'));
			$this->debug = FirePHP::getInstance(true);
			ob_start();	
			
			// import Piction Request class											
			App::import('Vendor', 'PRequest', array('file'=>'Piction/PRequest.php'));
			$this->api = new PRequest();
			$this->api->setDebug($this->debug);		
			
			$this->debug->log('base constructor called');			
	 }
 
}
?>
