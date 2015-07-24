<!-- File: /app/views/slides/view.ctp -->
<h1><?php echo $museum['Slide']['title']?></h1>
<p>
	<small>Created: <?php echo $museum['Slide']['created']?></small>
	
</p>
<br />

<div class="slide-body">
	<?php echo $museum['Slide']['body']?>
</div>
