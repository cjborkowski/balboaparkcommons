<?php

$durl = $this->params['url'];


if ($view_type=='generic'){
	echo bpoc::makeGenericTags();
	
}


if ($view_type =='single_item') {

echo bpoc::generateHeadTags($data, $durl, $view_type);

}
	
if ($view_type =='collections') {


echo bpoc::generateHeadTags($data, $durl, $view_type);

}


	

?>

