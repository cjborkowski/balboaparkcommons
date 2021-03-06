<?php
/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different urls to chosen controllers and their actions (functions).
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
 * @subpackage    cake.app.config
 * @since         CakePHP(tm) v 0.2.9
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/**
 * Here, we are connecting '/' (base path) to controller called 'Pages',
 * its action called 'display', and we pass a param to select the view file
 * to use (in this case, /app/views/pages/home.ctp)...
 */
   Router::connect('/', array('controller' => 'pages', 'action' => 'display', 'home'));
 
 // original
 //	Router::connect('/', array('controller' => 'featured', 'action' => 'gridview'));
 // 12-12-11 Requested by Christina
//	Router::connect('/', array('controller' => 'featured', 'action' => 'gridview'));

/**
 * ...and connect the rest of 'Pages' controller's urls.
 */
	//Router::connect('/pages/*', array('controller' => 'pages', 'action' => 'display'));
	
	/* dump json for API users */
	Router::connect('/json/:controller/:action/*', array('json' => '1'));
	Router::connect('/json/:controller/:action/*/*', array('json' => '1'));
	Router::connect('/json/:controller/:action/*/*/*/*', array('json' => '1'));
	
	/* make printer friendly page */
	Router::connect('/print/:controller/:action/*', array('printable' => '1'));
	Router::connect('/print/:controller/:action/*/*', array('printable' => '1'));
	
	/* make pdf pages */
	
	Router::connect('/pdf/:controller/:action/*', array('pdf' => '1'));
	Router::connect('/pdf/:controller/:action/*/*', array('pdf' => '1'));
	
	/* compress assets  	*/
	Router::connect('/cache_css/*', array('plugin' => 'asset_compress', 'controller' => 'css_files', 'action' => 'get'));
	Router::connect('/cache_js/*', array('plugin' => 'asset_compress', 'controller' => 'js_files', 'action' => 'get'));

