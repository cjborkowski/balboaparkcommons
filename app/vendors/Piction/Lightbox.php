<?php


class Lightbox 
{		

	function __construct($api) 
	{
		$this->API = $api;
		
		// debug
		$this->API = $api;
	  	App::import('Vendor', 'FirePHP', array('file'=>'FirePHP/FirePHP.class.php'));
		$this->debug = FirePHP::getInstance(true);		
		
  	}
	
	/***
	 * Adds to the lightbox or temp lightbox
	 */
	public function add($data)
	{
		//print_r($data);
		
		$umoids = $data['umoids'];
		
		if( $umoids == null ) return false;
		if( !is_array($umoids) ) $umoids = array($umoids);
		
		if( PFactory::getProfileInstance()->isLoggedIn() )
		{
			// Is logged in. Add to a piction lightbox
			$response['lbadd'] = $this->addToLB($data['lbid'], $umoids);

			// If add was successful return refreshed list of objects in lightbox
			if( $response['lbadd']['s']['s']['t'] == 'T')
			{
				$response['lbcontent'] = $this->getContent($data['lbid']);
			}
			else
			{
				$response['lbcontent'] = null;
			}
		}
		else
		{
			// User is guest. Add to temp lightbox
			$response['lbadd'] = $this->addToTmp($umoids);
		}

		return $response;
		
	}
	
	/*
	 * Adds to the Piction lightbox 
	 */
	private function addToLB($lbid, $umoids)
	{
		$args = array(
			array('n', 'Add_To_Lightbox'),
			array("SURL", PFactory::getProfileInstance()->getSURL()),
			array('CATEGORY_ID', $lbid)
		);
		
		foreach($umoids as $key => $value)
		{			
			array_push($args, array("UMO_ID", $value));
		}		
		
		return $this->API->callJson($args);

	}
	
	/***
	 * Adds to the temporary lightbox
	 */
	private function addToTmp($umoids = null)
	{
		
		if( !isset($_SESSION['LB_TMP']) ) 
		{
			$_SESSION['LB_TMP'] = array();
		}
		
		foreach($umoids as $key => $value)
		{			
			$_SESSION['LB_TMP'][$value] = 1;
		}		

		return true;
	}
	
	/*
	 * Remove from lightbox or temp lightbox 
	 */
	public function remove($data)
	{
		$umoids = $data['umoids'];
		
		if( $umoids == null ) return false;
		if( !is_array($umoids) ) $umoids = array($umoids);
		
		if( PFactory::getProfileInstance()->isLoggedIn() )
		{
			// Is logged in. Remove from piction lightbox
			$response = $this->removeFromLB($data['lbid'], $umoids);
			$this->debug->log('remove function lightbox call:'.$response);
			CakeLog::write('debug','remove function called: ');	
		}
		else
		{
			// User is guest. Remove from temp lightbox
		}

		return $response;
	}
	
	/*
	 * Remove from the Piction lightbox 
	 */
	private function removeFromLB($lbid, $umoids)
	{
		$args = array(
			array('n', 'Delete_From_Lightbox'),
			array("SURL", PFactory::getProfileInstance()->getSURL()),
			array('CATEGORY_ID', $lbid),
			array('RETURN_UMOIDS', 'T')
		);
		
		foreach($umoids as $key => $value)
		{			
			array_push($args, array("UMO_ID", $value));
		}		
		
		return $this->API->callJson($args);
	}
	
	/*
	 * Remove from temporary lightbox
	 */
	private function removeFromTmp()
	{
		
	}

	/*
	 * Create lightbox
	 */
	public function createLB($data)
	{
		//http://piction.bpoc.org/piction/!soap.jsonget?n=Lightbox_Create&SURL=340889572ZZZADKWTIZBFT&NAME=wstest&ACCESS=PRIVATE&PARENTID=0&CREATE_ROLE=TRUE&MAP_ROLE=TRUE
		$args = array(
			array('n', 'Lightbox_Create'),
			array("SURL", PFactory::getProfileInstance()->getSURL()),
			array('NAME', $data['lbname']),
			array('ACCESS', $data['visibility']),
			array('PARENTID', '0'),
			array('CREATE_ROLE', 'TRUE'),
			array('MAP_ROLE', 'TRUE')
		);
		
		return $this->API->callJson($args);
	}

	/*
	 * Remove lightbox
	 */
	public function removeLB($data)
	{
		$this->debug->log('Remove Lightbox call made');
		CakeLog::write('debug','Remove Lightbox call made');	
		
		//jimmy says:
		//n=Lightbox_Delete
		//SURL=1326732994ZZMOOPCLGJWW
        //ID=6367168
		
		$args = array(
			array('n', 'Lightbox_Delete'),
			array("SURL", PFactory::getProfileInstance()->getSURL()),
			array('ID', $data['lbid']),
			
		);
		
		return $this->API->callJson($args);
		
	}
	
	/*
	 * Edit a lightbox
	 *
	 */
	 
	 public function editLB($data)
	{
			
		$this->debug->log('Edit Lightbox call made');
		CakeLog::write('debug','Edit Lightbox call made');	
		
		//jimmy says:
		//n=Lightbox_Edit
		//SURL=1326732994ZZMOOPCLGJWW
		//ID=6367161
		//NAME=new title
		
		$args = array(
			array('n', 'Lightbox_Edit'),
			array("SURL", PFactory::getProfileInstance()->getSURL()),
			array('ID', $data['lbid']),
			array('NAME', $data['newTitle']),
			array('ACCESS', $data['visibility'])
		);
		
		return $this->API->callJson($args);
		
	}
	 
	

	/*
	 * Moves the contents of the temporary lightbox to the Piction lightbox
	 */
	public function tmpToPiction()
	{
		
	}
	
	/*
	 * Does a number of things relating to the lightbox once logged in
	 * 	- Create piction lightbox if a tmp lightbox exists
 	 *  - Retrieve list of lightboxes
 	 *  - Retrieve items from default lightbox (if tmp lightbox exists, return contents for that lb. Otherwise return contents of first lb) 
	 */
	public function onLogin($data)
	{
		// Assoc array of the responses
		$response = array();
		$this->debug->log("PFactory::getProfileInstance()->isLoggedIn()");
		// Retrieve list of lightboxes
		$args = array(
			array('TYPE', 'L')
		);
		
		$response['lblist'] = PFactory::getCategoryInstance()->getCategories($args);
		$defaultLBID = 0;
		
		if( isset($response['lblist']["ct"]) )
		{
			if( isset($response['lblist']["ct"][0]) )
			{
				$defaultLBID = $response['lblist']["ct"][0]["i"];
			}
		}
		else
		{
			
		}
				
		// Retrieve items from lightbox
		$response['lbcontent'] = PFactory::getUmoInstance()->getUmosByLightboxId($defaultLBID);
		
		return $response;
		//return json_encode(array('s'=>'F'));
	}
	
	/*
	 * Retrieves the content of a given lightbox
	 */
	public function getContent($lbid)
	{
		if( $lbid == '0' )
		{
			// Use the temp lightbox
			return json_encode(array('s'=>'hello'));
		}
		else
		{
			// Use lightbox id given
			return PFactory::getUmoInstance()->getUmosByLightboxId($lbid ); // $data['lbid'] needs to be given. Hardcoded ID there until SKY webservice is fixed
		}
	}
}