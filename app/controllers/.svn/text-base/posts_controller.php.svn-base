<?php
/**
 *
 */
class PostsController extends AppController {
	var $helpers = array('Html', 'Form', 'Javascript', 'Time','Cache', 'ShareButtons' ,'Session');
	var $name = 'Posts';
    // include the RequestHandler component at the top of your Controller
  	//var $components = array('RequestHandler','Auth', 'Session');
	//var $beforeFilter = array('museum');
	//var $cacheAction = true;
	
	function beforeRender() { 
    parent::beforeRender(); 
    $data = $this->setData();
	$this->set('view_type', 'generic');
	$this->set('authUser', $this->Auth->user());
	} 
	
		
	function setData()
	{		
		$data = PFactory::getCategoryInstance()->getCollections();
		$this->set('data', $data);	
		
	}
	
	function index() {
		$this -> set('posts', $this -> Post -> find('all'));
			
		$this->cacheAction = true;
		$this->setData();
	}

	function view($id = null) {
		$this -> Post -> id = $id;
		$this -> set('post', $this -> Post -> read());
		
		$this->layout = 'editing';
		$this->setData();
	}

	function add() {
		$this->layout = 'editing';
		$this->set('view_type', 'generic');	
		if (!empty($this -> data)) {
			if ($this -> Post -> save($this -> data)) {
				$this -> Session -> setFlash('Your post has been saved.');
				$this -> redirect(array('action' => 'index'));
				
			}
		}
	}

/*
	function delete($id) {
		if ($this -> Post -> delete($id)) {
			$this -> Session -> setFlash('The post with id: ' . $id . ' has been deleted.');
			$this -> redirect(array('action' => 'index'));
		}
	}
*/
	function edit($id = null) {
		$this -> Post -> id = $id;
		$this->layout = 'editing';
		$this->set('view_type', 'generic');	
		if (empty($this -> data)) {
			$this -> data = $this -> Post -> read();
		} else {
			if ($this -> Post -> save($this -> data)) {
				$this -> Session -> setFlash('Your post has been updated.');
				$this -> redirect(array('action' => 'index'));
			}
		}
	}

	//based on cookbook example http://book.cakephp.org/view/991/requestAction
	// gets pushed into /aap/views/elements/terms_of_use.ctp
	function terms() {
		$terms = $this -> Post -> find('all', array('conditions' => array('Post.id' => 1)));
		if (!empty($this -> params['requested'])) {
			return $terms;
		} else {
			$this -> set(compact('terms'));
		}
	
		$this->cacheAction = true;	
	}

	function grants() {
		$grants = $this -> Post -> find('all', array('conditions' => array('Post.id' => 2)));
		if (!empty($this -> params['requested'])) {
			return $grants;
		} else {
			$this -> set(compact('grants'));
		}
	
		$this->cacheAction = true;	
	}
	
	function credits() {
		$credits = $this -> Post -> find('first', array('conditions' => array('Post.title' => 'credits')));
		if (!empty($this -> params['requested'])) {
			return $credits;
		} else {
			$this -> set(compact('credits'));
		}
	
		$this->cacheAction = true;	
	}

	function museum($title =NULL) {		
		$museum = $this->Post->find('first', array('conditions' => array('Post.title' => $title)));		
		return $museum['Post']['body'];
		$this->cacheAction = true;		
	}



/**
  * Delete a Post
  * @param int $id
 */
	function delete($id) {
		// set default class & message for setFlash
		$class = 'flash_bad';
		$msg = 'Invalid List Id';

		// check id is valid
		if ($id != null && is_numeric($id)) {
			// get the Post
			$post = $this -> Post -> read(null, $id);

			// check Post is valid
			if (!empty($post)) {
				// try deleting the post
				if ($this -> Post -> delete($id)) {
					$class = 'flash_good';
					$msg = 'Your Post was successfully deleted';
				} else {
					$msg = 'There was a problem deleting your Post, please try again';
				}
			}
		}

		// output JSON on AJAX request
		if ($this -> RequestHandler -> isAjax()) {
			$this -> autoRender = $this -> layout = false;
			echo json_encode(array('success' => ($class == 'flash_bad') ? FALSE : TRUE, 'msg' => " <p id='flashMessage' class='{$class}'>{$msg}</p>"));
			exit ;
		}

		// set flash message & redirect
		$this -> Session -> setFlash($msg, 'default', array('class' => $class));
		$this -> redirect(array('action' => 'index'));
	}

	}
?>
