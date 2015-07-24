<?php

class PictionApiFacade
{
	function __construct() 
	{
		App::import('Core', 'HttpSocket');
 		$this->HttpSocket = new HttpSocket();		   
		$this->url = "http://piction.bpoc.org/piction/!soap.jsonget?";    
    }
	
	private function makeCall($wsName, $params)
	{
		$call = $this->url.'n='.$wsName.'&'.$this->createParamsStr($params);		
		return  $this->HttpSocket->get($call);
	}	
	
	
	private function createCall($wsName, $params)
	{
		$call = $this->url.'n='.$wsName.'&'.$this->createParamsStr($params);
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
	
	public function callJson($wsName, $params)
	{
		$result =  $this->makeCall($wsName, $params);		
		return json_decode($result, true);		 		
	}
	

	
	public function callXml($wsName, $params)
	{
		
	}
	
	public function unitTest()
	{
		// lists all command centres
		$args = array(
					array('ACTION', 'LIST_ALL_CC'),
					array('SEARCH', '*')
					);

			
		return $this->callJson('SKY', $args);			
	}
}

?>