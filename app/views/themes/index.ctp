<!-- index page for themes -->
<h1>Themes</h1>
<div id="view"></div>

<?php
	echo $this->Html->script('gui/Skyview');
?>

<div id="sky-view-container">
<div id="skyview-mainmap">
	<?php
	
	$currentCol = 0;
	$cols = array( '', '', '', '', '', '', '', '' ); // Specifies the number of columns 
	
	for($i=0; $i<count($data['t']); $i++)
	{
		$link = '/objectview/gridview/theme/'.$data['t'][$i]['pk'].'/'.urldecode($data['t'][$i]['n']);
		
		if( array_key_exists('u', $data['t'][$i]) && $data['t'][$i]['u'] != '' )
			$coverurl = 'http://piction.bpoc.org/piction/'.$data['t'][$i]['u'];
		else 
			$coverurl = '';
		
		$cols[$currentCol] .= '<div class="row" >'.
								'<div class="info"><a href="'.$link.'"><div class="detail">'.$data['t'][$i]['n'].'</div></a></div>'.
								'<a href="'.$link.'"><img class="thumb" src="'.$coverurl.'"/></a>'.
							  '</div>';
		
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
