<!-- File: /app/views/slides/view.ctp -->
<h1><?php echo $slide['Slide']['title']?></h1>
<p>
	<small>Created: <?php echo $slide['Slide']['created']?></small>
	
</p>
<br />

<div class="slide-body">
	<?php echo $slide['Slide']['body']?>
</div>
