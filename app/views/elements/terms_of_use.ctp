<div id="terms-of-use-info-box">
	<div id="terms-of-use-info-box-inner">
	<?php
	$terms = $this -> requestAction('/posts/terms');
	echo $terms['0']['Post']['body'];
	?>
	</div>
</div>

