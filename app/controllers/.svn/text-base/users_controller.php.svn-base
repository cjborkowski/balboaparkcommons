<?php
class UsersController extends AppController {

	var $name = 'Users';
	//var $scaffold;
	var $helpers = array('Form', 'Html', 'Navigation', 'Time', 'Text', 'Pdf', 'Session');

	function login() {
		$this->set('view_type', 'generic');
		
	}
	function logout() {
        $this->redirect($this->Auth->logout());
		$this->set('view_type', 'generic');
	}
	
	function add(){
		$this->set('view_type', 'generic');
		if (!empty($this -> data)) {
			$this -> User -> create();
			if ($this -> User -> save($this -> data)) {
				$this -> Session -> setFlash(__('The user has been saved', true));
				$this -> redirect(array('action' => 'index'));
			} else {
				$this -> Session -> setFlash(__('The user could not be saved. Please, try again.', true));
			}
		}
	}
	
	function index() {
        $this -> set('users', $this -> User -> find('all'));
		$this->set('view_type', 'generic');
	}
}
