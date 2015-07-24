<div class="scrollbar simple" id="view-container">

<?php  
echo 'data slice is :'. $data_slice .'<br />' ;

if(is_numeric($data_slice)){
	$getvalue = $data_slice;
	echo ' and is numberic <br />';
}
 
//for($i=0; $i<count($data['ct']); $i++) { 
 
 //$key = array_search($data_slice, $data['ct'][$i]);
 	
 	//echo 'key is: '.$key .'<br />'; 
 	print_r($data['ct'][$data_slice]) ;
 
//}
 
 
 


		

?>

</div>
