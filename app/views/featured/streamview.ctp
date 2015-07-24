<h1><?php echo $title; ?></h1>

<?php
	echo $this->Html->script('gui/Skyview');
?>

<div id="sky-view-container">
<div id="skyview-mainmap">
	<?php
	
	/** CREATES ADDITIONAL DUMMY DATA - TO BE REMOVED LATER */
	//$data['ct'] = array_merge($data['ct'], $data['ct'], $data['ct'], $data['ct'], $data['ct'], $data['ct'], $data['ct'], $data['ct'], $data['ct'], $data['ct'], $data['ct'], $data['ct']);
	/***/
	
	
	$currentCol = 0;
	$cols = array( '', '', '', '', '', '', '', '' ); // Specifies the number of columns 
	
	for($i=0; $i<count($data['ct']); $i++)
	{
		$image_rep = '';
		if(!$data['ct'][$i]['u']){ 
		$image_rep ='<img class="thumb" title="missing thumbnail" src="/img/stream-thumb-not-set.png" />';
		
		}else {
		$image_rep ='<img class="thumb" src="http://piction.bpoc.org/piction/'. $data['ct'][$i]['u']. '"/ >' ;
		}
		
		$link_feature = '/objectview/gridview/'.$data['ct'][$i]['pk'].'/'.urldecode($data['ct'][$i]['n']);
		$link_institution = '/featured/gridview/'.$data['ct'][$i]['pkl1'].'/'.urlencode($data['ct'][$i]['d']);
		
		
		$cols[$currentCol] .= '<div class="row" >'.
								'<div class="info"><div class="title">'.$data['ct'][$i]['n'].'</div><a href="'.$link_institution.'"><div class="detail">'.$data['ct'][$i]['d'].'</div></a></div>'.
								'<a href="'.$link_feature.'">'.$image_rep.'</a></div>';
		
		if( ($currentCol+1) >= count($cols) )
		{
			$currentCol = -1;
		}
		
		$currentCol++;
	}
	
	$className = 'x';
	
	for($i=0; $i<count($cols); $i++)
	{
		if( strlen($className) < 1 ) $className = 'oddcol';
		else $className = '';
		
		echo '<div class="col '.$className.'">' . $cols[$i] . '</div>';
	}
	
	
	?>

</div>
</div>

<script type="text/javascript">
	
	var sv = new Skyview('sky-view-container');

</script>
