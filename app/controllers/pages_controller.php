<?php
/**
 * Static content controller.
 *
 * This file will render views from views/pages/
 *
 * PHP versions 4 and 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright 2005-2011, Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright 2005-2011, Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       cake
 * @subpackage    cake.cake.libs.controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       cake
 * @subpackage    cake.cake.libs.controller
 * @link http://book.cakephp.org/view/958/The-Pages-Controller
 */
class PagesController extends AppController {

/**
 * Controller name
 *
 * @var string
 * @access public
 */
	var $name = 'Pages';

/**
 * Default helper
 *
 * @var array
 * @access public
 */
	var $helpers = array('Html', 'Session', 'Form', 'Navigation', 'Cache', 'Geshi', 'Derivatives', 'Pdf');

/**
 * This controller does not use a model
 *
 * @var array
 * @access public
 */
	//var $uses = array();
	var $uses = null; // no model

/*
 * gets category data 
 */

function setData()
	{		
		$data = PFactory::getCategoryInstance()->getCollections();
		$this->set('data', $data);	
		
	}

function setFeaturedData()
	{		
		//$featuredData = PFactory::getCategoryInstance()->getFeatured();
		$featuredData = BPOC::collectionToFeaturMap();
		//$collections = $this->setData();
		//$this->set('collections', $collections);
		$this->set('featuredData', $featuredData);	
		
	}

/*
 * pages controller fires differently and we need to set data using beforeRender
 */

 function beforeRender() { 
    parent::beforeRender(); 
    $data = $this->setData();
	$this->set('view_type', 'generic');
} 
 

 
/**
 * Displays a view
 *
 * @param mixed What page to display
 * @access public
 */
	function display() {
		$path = func_get_args();

		$count = count($path);
		if (!$count) {
			$this->redirect('/');
		}
		$page = $subpage = $title_for_layout = null;

		if (!empty($path[0])) {
			$page = $path[0];
		}
		if (!empty($path[1])) {
			$subpage = $path[1];
		}
		if (!empty($path[$count - 1])) {
			$title_for_layout = Inflector::humanize($path[$count - 1]);
		}
		$this->set(compact('page', 'subpage', 'title_for_layout'));
		$this->render(implode('/', $path));
		$this->cacheAction = '1 day';	
		//Addng this to pass the data variable. to the default pages controller
		
		
	}
	
	function getimage() {
		$this->set('view_type', 'generic');
	}
	
	function getfeatured() {
		$this->setFeaturedData();
		//$this->setData();
		$this->set('view_type', 'generic');
	}
	
	
	function thisapi() {
		$this->set('view_type', 'generic');
		$this->set('title', 'Using The Balboa Park Commons API');
	}
	
	 function paginate() {
		$this->set('view_type', 'generic');
	}
 	
	function sets() {
		$this->set('view_type', 'generic');
		$this->layout = 'ajax';
	}
	function login() {
		$this->set('view_type', 'generic');
		$this->layout = 'ajax';
	}
	
	function getSlides() {
	
	$Slide = ClassRegistry::init('Slide');
	$slides = $Slide->find('all');		
	return $slides;
	$this->cacheAction = '1 day';
	}

}//end class
