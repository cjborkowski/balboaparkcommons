<?php
// make $pdf->core avaiable to CakePHP
App::import('Vendor', 'TCPDF', array('file' => 'tcpdf/tcpdf.php'));
class PdfHelper  extends AppHelper {
	var $core;

	function PdfHelper() {
		$this -> core = new TCPDF();
	}

}
?>