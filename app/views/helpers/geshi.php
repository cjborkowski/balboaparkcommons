<?php
// make $geshi->core avaiable to CakePHP
App::import('Vendor', 'GESHI', array('file' => 'geshi/geshi.php'));
class GeshiHelper  extends AppHelper {
	var $core;

	function GeshiHelper() {
		$this -> core = new GeSHi();
	}

}
?>