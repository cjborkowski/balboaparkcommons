<?php
if ($data) {
	$title = 'Balboa Park Museums Collection';
	CakeLog::write('debug', 'in pdf_museum_collection for' . $title);

	// create new PDF document
	$pdf -> core = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
	// set document information
	$pdf -> core -> SetCreator(PDF_CREATOR);
	$pdf -> core -> SetAuthor('Balboa Park Commons');
	$pdf -> core -> SetTitle($title);
	// set default header data
	$backLink = BPOC_HOST . '/' . str_replace('/pdf/', '', $pageLink);
	//$pdf -> core -> SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, $title, "Balboa Park Online Commons \n" . $backLink);
	// set header and footer fonts
	//$pdf -> core -> setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
	// remove default header/footer
	$pdf->core-> setPrintHeader(false);
	$pdf->core-> setPrintFooter(false);
	//$pdf -> core -> setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
	// set default monospaced font
	$pdf -> core -> SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
	//set margins
	$pdf -> core -> SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, 5);
	//$pdf -> core -> SetHeaderMargin(PDF_MARGIN_HEADER);
	//$pdf -> core -> SetFooterMargin(PDF_MARGIN_FOOTER);
	//set auto page breaks
	$pdf -> core -> SetAutoPageBreak(TRUE, 2);
	//set image scale factor
	$pdf -> core -> setImageScale(PDF_IMAGE_SCALE_RATIO);
	//set some language-dependent strings
	//$pdf -> core -> SetFont('helvetica', '', 10);

	for ($i = 0; $i < count($data['ct']); $i++) {
		//stuff we need to make on our own
		$instTitle = $data['ct'][$i]['c3'][0]['d']; 
		$link_institution = '/objectview/'.$sAction.'/'.$data['ct'][$i]['pk'].'/'.urlencode(str_replace(' ','-', $instTitle));
		$count =  BPOC::getCollectionsCount($data['ct'][$i]['pk']);
		$imagecount = strip_tags(str_replace('&nbsp;', ' ', $count)) ;
		
		if ($data['ct'][$i]['l_desc'] ==''){
		$museum = CollectionsController::museum(urldecode($data['ct'][$i]['n']));
		$museum = strip_tags(str_replace('\\r\\f\\r\\' , '\n' , $museum));
		//$museum = preg_replace("/&#?[a-z0-9]+;/i","",$museum);
		$museum = html_entity_decode($museum);
		$museum = $this->Text->truncate( $museum,  1000, array( 'ending' => ' ...read more online', 'exact' => false));
		
		} else {		
		$museum = $data['ct'][$i]['l_desc'] ;
		$museum = strip_tags(str_replace('\\r\\f\\r\\' , '\n' , $museum));
		}
		if($data['ct'][$i]['u']){
		$url = P_HOST.$data['ct'][$i]['u']; 
		$der = 'WEB'; 
		$minWidth = 500; 
		$image = $this->Derivatives->getDerivative($der, $minWidth , $url); 
		} else{
		$image = BPOC_HOST.'/img/missing-thumbnail.jpg';
		}
		//start adding pages
		$pdf -> core -> AddPage('L', 'A4');
		// Image method signature:
		// Image($file, $x='', $y='', $w=0, $h=0, $type='', $link='', $align='', $resize=false, $dpi=300, $palign='', $ismask=false, $imgmask=false, $border=0, $fitbox=false, $hidden=false, $fitonpage=false)
		//bpco_logo_2
		$pdf->core->Image(BPOC_HOST . '/img/bpoc_logo_2.jpg', 0, 6.6, 44.7, 27, 'JPG', BPOC_HOST, '', false, 72, '', false, false, 0, false, false, false);
		$pdf->core->Image($image, 44.7, 6.6, 0, 115, 'JPG', BPOC_HOST. $link_institution, '', true, 72, '', false, false, 0, false, false, false);
		$style = array('width' => .10, 'cap' => 'round', 'join' => 'round', 'dash' => '.25,1.25', 'color' => array(99, 100, 102));
		$pdf->core->Line(0, 129, 254, 129, $style);		
		$pdf->core->SetFillColor(255, 255, 255);
		// set color for text
		$pdf->core->SetTextColor(99, 100, 102);
		$pdf -> core -> SetFont('helvetica', 'B', 10);
		// MultiCell($w, $h, $txt, $border=0, $align='J', $fill=0, $ln=1, $x='', $y='', $reseth=true, $stretch=0, $ishtml=false, $autopadding=true, $maxh=0)
		$pdf->core->MultiCell(281.7, 0, $instTitle, 0, 'L', 1, 0, 5, 132.8, true, 0, false, true, 0);
		$pdf -> core -> SetFont('helvetica', 'BI', 10);
		$pdf->core->MultiCell(281.7, 0, $imagecount, 0, 'L', 1, 0, 5, 137.8, true, 0, false, true, 0);
		$pdf -> core -> SetFont('helvetica', '', 10);
		$pdf->core->MultiCell(281.7, 0, $museum, 0, 'L', 1, 0, 5, 142.8, true, 0, false, true, 0);
			
	}// end main loop
	
	//reset pointer to the last page & OUTPUT FINAL
	$pdf -> core -> lastPage();
	$pdf -> core -> Output('balboa-park-commons-museums-collections.pdf', 'I');	
	}//end if
	
?>