<?php

class PRequest
{
	function __construct() 
	{
		App::import('Core', 'HttpSocket');
 		$this->HttpSocket = new HttpSocket();		   
		$this->url = "http://piction.bpoc.org/piction/!soap.jsonget?";  
		
		App::import('Vendor', 'FirePHP', array('file'=>'FirePHP/FirePHP.class.php'));
		$this->debug = FirePHP::getInstance(true);
		ob_start();			
		
		$this->debug->log('FirePHP PRequest test echo');  
   }
	
	public function setDebug($api)
	{
		$this->DEBUG = $api;
	}
		
	private function makeCall($params)
	{
		$call = $this->url.$this->createParamsStr($params);	
		CakeLog::write('debug','the call:'.$call);	
		$this->debug->log($call);
						
		return  $this->HttpSocket->get($call);
	}	
	
	
	private function createCall($params)
	{
		$call = $this->url.$this->createParamsStr($params);		
		return $call;
	}	
	
	private function createParamsStr($params)
	{
		$str = "";
		for($i = 0; $i<count($params); $i++)
		{
			$str.= $params[$i][0]."=";						 		
			$str.= $params[$i][1];			
			if($i!=(count($params)-1))
				$str.="&";
		}
		return $str;		
	}
	
	public function callJson($params)
	{
		$result =  $this->makeCall($params);		
		return json_decode($result, true);		 		
	}
		
	public function callXml($params){}
	
	public function unitTest()
	{
		// lists all command centres
		$args = array(
			array('n', 'SKY'),
			array('ACTION', 'LIST_ALL_CC'),
			array('SEARCH', '*')
		);
			
		return $this->callJson($args);			
	}
}

?>