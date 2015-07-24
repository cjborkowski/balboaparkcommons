<?php
/**
 */
class SlidesController extends AppController {
	var $helpers = array('Html', 'Form', 'Javascript', 'Time','Cache', 'ShareButtons', 'Navigation', 'Pdf', 'Derivatives', 'Session');

	var $name = 'Slides';
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
		$this -> set('slides', $this -> Slide -> find('all'));
		$this->set('view_type', 'generic');	
		$this->cacheAction = true;
	}

	function view($id = null) {
		$this -> Slide -> id = $id;
		$this -> set('slide', $this -> Slide -> read());
		$this->set('view_type', 'generic');	
		$this->layout = 'editing';
	}

	function add() {
		$this->layout = 'editing';
		$this->set('view_type', 'generic');	
		if (!empty($this -> data)) {
			if ($this -> Slide -> save($this -> data)) {
				$this -> Session -> setFlash('Your slide has been saved.');
				$this -> redirect(array('action' => 'index'));
				
			}
		}
	}

/*
	function delete($id) {
		if ($this -> Slide -> delete($id)) {
			$this -> Session -> setFlash('The slide with id: ' . $id . ' has been deleted.');
			$this -> redirect(array('action' => 'index'));
		}
	}
*/
	function edit($id = null) {
		$this -> Slide -> id = $id;
		$this->layout = 'editing';
		$this->set('view_type', 'generic');	
		if (empty($this -> data)) {
			$this -> data = $this -> Slide -> read();
		} else {
			if ($this -> Slide -> save($this -> data)) {
				$this -> Session -> setFlash('Your slide has been updated.');
				$this -> redirect(array('action' => 'index'));
			}
		}
	}

	//based on cookbook example http://book.cakephp.org/view/991/requestAction
	// gets pushed into /aap/views/elements/terms_of_use.ctp
	function slideshow() {
		$slide = $this -> Slide -> find('all', array('conditions' => array('Slide.id' => 1)));
		if (!empty($this -> params['requested'])) {
			return $slide;
		} else {
			$this -> set(compact('slide'));
		}
	
		$this->cacheAction = true;	
	}
	
	//from Collections controller
	
	function getSlides() {
	
	$Slide = ClassRegistry::init('Slide');
	$slide = $Slide->find('first', array('conditions' => array('Slide.id' => 1)));		
	return $slide['Slide']['body'];
	$this->cacheAction = '1 day';
	}

/**
  * Delete a Slide
  * @param int $id
 */
	function delete($id) {
		// set default class & message for setFlash
		$class = 'flash_bad';
		$msg = 'Invalid List Id';

		// check id is valid
		if ($id != null && is_numeric($id)) {
			// get the Slide
			$slide = $this -> Slide -> read(null, $id);

			// check Slide is valid
			if (!empty($slide)) {
				// try deleting the slide
				if ($this -> Slide -> delete($id)) {
					$class = 'flash_good';
					$msg = 'Your Slide was successfully deleted';
				} else {
					$msg = 'There was a problem deleting your Slide, please try again';
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
