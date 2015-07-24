<?php
if ($data) {
	$title = $data['d'];
	CakeLog::write('debug', 'in pdf_collection for' . $title);

	// create new PDF document
	$pdf -> core = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
	// set document information
	$pdf -> core -> SetCreator(PDF_CREATOR);
	$pdf -> core -> SetAuthor('Balboa Park Commons');
	$pdf -> core -> SetTitle($title);
	// set default header data
	$backLink = BPOC_HOST . '/' . str_replace('/pdf/', '', $pageLink);
	$pdf -> core -> SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, $title, "Balboa Park Online Commons \n" . $backLink);
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
		$item_link = BPOC_HOST . '/objectview/item/' . urlencode($data['ct'][$i]['pk']) . '/' . urlencode(str_replace(' ', '-', $data['n']));
		//start adding pages
		$pdf -> core -> AddPage('L', 'A4');
		// Image method signature:
		// Image($file, $x='', $y='', $w=0, $h=0, $type='', $link='', $align='', $resize=false, $dpi=300, $palign='', $ismask=false, $imgmask=false, $border=0, $fitbox=false, $hidden=false, $fitonpage=false)
		//bpco_logo_2
		$pdf->core->Image(BPOC_HOST . '/img/bpoc_logo_2.jpg', 0, 6.6, 44.7, 27, 'JPG', BPOC_HOST, '', false, 72, '', false, false, 0, false, false, false);
	
		$pdf->core->Image(P_HOST.$data['ct'][$i]['w'], 44.7, 6.6, 0, 115, 'JPG', $item_link, '', true, 72, '', false, false, 0, false, false, false);
		$style = array('width' => .10, 'cap' => 'round', 'join' => 'round', 'dash' => '.25,1.25', 'color' => array(99, 100, 102));
		$pdf->core->Line(0, 129, 254, 129, $style);
		//set new variables
		$metaHtml = '';
		$left_column = '';
		$right_column = '';
		$wLenght =0;
		
		for ($d = 0; $d < count($data['ct'][$i]['md']); $d++) {
		
			//never show these
			if ($data['ct'][$i]['md'][$d]['mt'] == 'PUBLIC COMMONS.INSTITUTION DESC' || $data['ct'][$i]['md'][$d]['mt'] == 'PUBLIC COMMONS.COLLECTION COVER IMAGE' || $data['ct'][$i]['md'][$d]['mt'] == 'PUBLIC COMMONS.FILTER') {
				$metaHtml .= '';
				$left_column .='';
				$right_column .='';
			}  	
			
			elseif ($data['ct'][$i]['md'][$d]['d'] && $data['ct'][$i]['md'][$d]['mv'] ==''){
				$left_column .='';
				$right_column .='';	
			}
			
				else{
						$wLenght = strlen($data['ct'][$i]['md'][$d]['mv']);
						$cutOff  = 140;
						$loopIt = ceil($wLenght / $cutOff);
					 
						if ($wLenght > $cutOff ){
						$left_column .= $data['ct'][$i]['md'][$d]['d'];	
						$clean = strip_tags($data['ct'][$i]['md'][$d]['mv']);
						$clean = str_replace('\f\f', '', $clean);
						$right_column .= wordwrap($clean, $cutOff, "\n");
						//$right_column .= "loop it is".$loopIt ."\n";						
					   	$right_column .= "\n";	
							
							for($w = 0; $w < $loopIt ; $w++){
							$divisor = $w * $cutOff + $w;
							//$right_column .= substr($data['ct'][$i]['md'][$d]['mv'],$divisor, $cutOff).'<br />';
							//add speace to left
							//$left_column .="break# ".$w. "\n";	
							$left_column .= " \n";
							} 
						
						
						}else {
							
						$left_column .= $data['ct'][$i]['md'][$d]['d']."\n";
								
								if($data['ct'][$i]['md'][$d]['mv'] ==""){
								$right_column .= "\n";	
								}else{
								$right_column .= strip_tags($data['ct'][$i]['md'][$d]['mv']). "\n";
								}
						
					} //end if for missing value
						
				} //end else
				
			} //end meta data loop
			
			$pdf->core->SetFillColor(255, 255, 255);
			// set color for text
			$pdf->core->SetTextColor(99, 100, 102);
			$pdf -> core -> SetFont('helvetica', 'BI', 10);
			// MultiCell($w, $h, $txt, $border=0, $align='J', $fill=0, $ln=1, $x='', $y='', $reseth=true, $stretch=0, $ishtml=false, $autopadding=true, $maxh=0)
			$pdf->core->MultiCell(44.7, 0, $left_column, 0, 'R', 1, 0, .1, 132.8, true, 0, false, true, 0);
			$pdf -> core -> SetFont('helvetica', '', 10);
			$pdf->core->MultiCell(242, 0, $right_column, 0, 'L', 1, 0, 47.4, 132.8, true, 0, false, true, 0);
			
	}// end main loop
	
	//reset pointer to the last page & OUTPUT FINAL
	$pdf -> core -> lastPage();
	$pdf -> core -> Output('balboa-park-commons-collection-' . $data['ct'][0]['pk'] . '.pdf', 'I');	
	}//end if
	
?>