<?php
App::import('Vendor', 'Piction', array('file'=>'PBase.php'));

class Profile extends PBase	
{	
	public function login($data)
	{
								
		$args = array();		
		foreach($data as $key => $value)
		{			
			$tmp = array($key, $value);
			array_push($args, $tmp);						
		}		
		$response = $this->api->callJson($args);
		
		if($this->loginIsValid($response))
		{			
			if(!session_is_registered('surl'))
			{
				//session_start();						 
				$_SESSION['surl'] = $response['SURL'];
				$_SESSION['username'] = $data['username'];	
				CakeLog::write('login','PUBLIC FUNCTION LOGIN. Username:'.$_SESSION['username'].', SURL:'.$_SESSION['surl']);			
			}								
			return $response;
		}
		else 
		{
			return json_encode(array('s'=>'F'));
		}					
		return $data;
	}
	
	
	public function logout()
	{
		CakeLog::write('login','PUBLIC FUNCTION LOGOUT. Username:'.$_SESSION['username'].', SURL:'.$_SESSION['surl']);	
		
		if(isset($_SESSION['surl']))
		{
			unset($_SESSION['surl']);
			// todo: make piction call to logout		
		}
     		
	}	
	
	public function loginIsValid($arr)
	{		
		if(isset($arr['SURL']))
		{
			return true;	
		}				
		return false;		
	}	

	
	public function register($fields)
	{		
			//http://commons.bpoc.org/index.php/ajax/?n=REGISTER_PROFILE&ACTION=COPY&TEMPLATE_PROFILE=Joe+Public&LOGIN=TRUE&USERNAME=testlu&PASSWORD=testlu&FIRSTNAME=testlu&LASTNAME=testlu&EMAIL=						
			CakeLog::write('login','Vednor Priction Profile register() called');				
			$args = array(
		  	array('n', 'REGISTER_PROFILE'),
			array('ACTION', 'COPY'),
			array('TEMPLATE_PROFILE', 'Joe+Public'),
			array('LOGIN', 'TRUE'),
			array('USERNAME', $fields['USERNAME']),
			array('PASSWORD', $fields['PASSWORD']),
			array('FIRSTNAME', $fields['FIRSTNAME']),
			array('LASTNAME', $fields['LASTNAME']),
			array('EMAIL', $fields['EMAIL'])			
		);
		
		$data = $this->api->callJson($args);
	
		// registration succesful
		if($data['s']['s']=='T')
		{
			$_SESSION['surl'] = $data['surl'];
			$_SESSION['username'] = $fields['USERNAME'];				
		}
		$data['username'] = $fields['USERNAME'];
		return $data;
	}
	
	// Update user profile
	public function update($fields)
	{
		CakeLog::write('login','Vednor Piction Profile update() called');	
		if(isset($_SESSION['surl']))
		{
			$args = array(
		  	array('n', 'REGISTER_PROFILE'),
			array('ACTION', 'UPDATE'),
			array('surl', $_SESSION['surl']),
			array('USERNAME', $_SESSION['username']),
			array('PASSWORD',$fields['PASSWORD'])
			);
			
			/*
			foreach ($fields as $i => $value) 
			{					
				if(isset($fields[$i]) && !empty($fields[$i]))
				{
					array_push($args, array($i, $fields[$i]));
				}
			}
			 * 
			 */					
			
			$response = $this->api->callJson($args);
			$this->debug->log($response);		
			return $response;			
		}		
		return false;
	}
	
	public function delete($umo_id)
	{
		
	}
	
	
	public function isLoggedIn()
	{
		return isset($_SESSION['surl']);
	}
	
	public function getSURL()
	{
		if( $this->isLoggedIn() )
		{
			return $_SESSION['surl'];
		}
		else 
		{
			return false;
		}
	}
}

?>