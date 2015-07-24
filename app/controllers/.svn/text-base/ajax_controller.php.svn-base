<?php
class AjaxController extends AppController {

	var $name = 'Ajax';	
	var $helpers = null;
	var $uses = null; // no model
		
	public function index()
	{
		$this->autoRender = false;
		$name = $this->params['url']['n'];
		$data = $this->params['url'];
		$response = '';
		
		switch($name)
		{
			case 'Session_Umo_Save':
				$response = PFactory::getUmoInstance()->saveSessionUmo($data);												
				break;
				
			case 'Session_Umo_Get':
				$response = PFactory::getUmoInstance()->getSessionUmos();
				break;
						
			case 'Piction_Login':
				$response = PFactory::getProfileInstance()->login($data);
				CakeLog::write('login','AJAX Controller Case: Piction_Login');										
				break;
				
				case 'Logout':
				$response = PFactory::getProfileInstance()->logout($data);	
			   CakeLog::write('login','AJAX Controller Case: Logout');									
				break;
				
			case 'Lightbox_add':	
				$response = PFactory::getLightboxInstance()->add($data);
				break;
					
			case 'Lightbox_delete':	
				$response = PFactory::getLightboxInstance()->add($data);
				break;

			case 'Lightbox_onLogin':	
				$response = PFactory::getLightboxInstance()->onLogin($data);
				break;

			case 'Lightbox_getContent':	
				$response = PFactory::getLightboxInstance()->getContent($data['lbid']);
				break;

			case 'Lightbox_remove':	
				$response = PFactory::getLightboxInstance()->remove($data);
				break;
				
			case 'Lightbox_removeLB':
				$response = PFactory::getLightboxInstance()->removeLB($data);
				break;
				
			case'Lightbox_editLB';
				$response = PFactory::getLightboxInstance()->editLB($data);
				break;
			
			case 'Lightbox_createLB':	
				$response = PFactory::getLightboxInstance()->createLB($data);
				break;
																	
			case 'SKY':
				$response = PFactory::getCategoryInstance()->getFeatured($data);
				
			case 'REGISTER_PROFILE':
				$response = PFactory::getProfileInstance()->register($data);
				CakeLog::write('registration','AJAX Controller Case: REGISTER_PROFILE');	
				break;
			
			case 'EDIT_PROFILE':
				$response = PFactory::getProfileInstance()->update($data);
				CakeLog::write('registration','AJAX Controller Case: EDIT_PROFILE');	
				break;
				
			case 'CONTACT':
				$response = BPOC::sendContact($data);
				CakeLog::write('mail','AJAX Controller Case: CONTACT');	
				break;
		}

		return json_encode($response);
	}
	
}
?>