	<?php if ($data['ct'][0]):?>
 	
 	<table class="item-print-table commons-print-container">
 	<tbody>
 	<tr colspan="2" id="print-item-image"><td><img class="view-gallery-web-image" src="<?php echo P_HOST.$data['ct'][0]['w']; ?>"/></td></tr>
	
	<?php for($i=0; $i < count($data['ct'][0]['md']); $i++){
			$metaHtml = '';
		if ($data['ct'][0]['md'][$i]['mt'] == 'PUBLIC COMMONS.INSTITUTION DESC' || $data['ct'][0]['md'][$i]['mt'] == 'PUBLIC COMMONS.COLLECTION COVER IMAGE' || $data['ct'][0]['md'][$i]['mt'] == 'PUBLIC COMMONS.FILTER') {
			$metaHtml .= '';
			} else{
			echo '<tr id="meta-data-row-'.$i.'" class="meta-data-row"><td class="meta-data-lable">'.$data['ct'][0]['md'][$i]['d'].':</td><td class="meta-data-value">'.strip_tags(urldecode($data['ct'][0]['md'][$i]['mv'])) .'</td></tr>'; 
			}
		} ?>
	</tbody>
	</table>
	
	<?php endif;?>