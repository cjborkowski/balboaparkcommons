
<?php
for($i=0; $i<count($data['ct']); $i++)
{ 
 
	$mTitle = $data['ct'][$i]['n'];
	$mInst ='';
	$metaHtml = '';		
	if( $data['ct'][$i]['md']){
			
		for($d=0; $d<count($data['ct'][$i]['md']); $d++){

		if ($data['ct'][$i]['md'][$d]['mt'] == 'PUBLIC COMMONS.INSTITUTION DESC' || $data['ct'][$i]['md'][$d]['mt'] == 'PUBLIC COMMONS.COLLECTION COVER IMAGE' || $data['ct'][$i]['md'][$d]['mt'] == 'PUBLIC COMMONS.FILTER') {
			$metaHtml .= '';
			} else{
			$metaHtml .='<tr id="meta-data-row-'.$i.'" class="meta-data-row"><td class="meta-data-lable">'.$data['ct'][$i]['md'][$d]['d'].':</td><td class="meta-data-value">'.strip_tags(urldecode($data['ct'][$i]['md'][$d]['mv'])) .'</td></tr>'; 
	
			}
		
		} //end meta loop
	}//end if
	?>
	<table id="collections-print-table-<? e($i);?>" class="collections-print-table commons-print-container">
 	<tbody>
 	<tr colspan="2" id="print-item-image"><td><img src="<?php echo P_HOST.$data['ct'][$i]['w']; ?>"></td></tr>	
	<?php echo $metaHtml; ?>
	</tbody>
	</table>
						
<?php } ?>	