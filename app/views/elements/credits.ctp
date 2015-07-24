<div id="credits-info-box">
	<div id="credits-info-box-inner">
	<?php
	$credits = $this -> requestAction('/posts/credits');
	echo $credits['Post']['body'];
	?>
	</div>
</div>