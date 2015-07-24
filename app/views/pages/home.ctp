<!-- pulls from slides table from controller function -->
<?php $slides = PagesController::getSlides();?>
<div id='slideshow-background'>
	
	<div id="slideshow-slides" class="slideshow-slides">
			
		<div class="slideshow-slide-int" id="slideshow-intro-slide">
		<?php echo $this->Html->image('splash-5.3-slide1-logo.png');?>
		<?php //echo $this->Html->image('splash-unavailable.png'); ?>
                <div class="slideshow-slide-text"><p></p></div>
		</div>
			
<?php		
		$imageHash = 1;
		
		//print_r ($slides)	
		for ($i = 0; $i < count($slides); $i++) {
				
			$slideImage ='slideshow-slide-image-number-'.$imageHash.'.png';
			
			if($imageHash == 1){
			$ImageSlide = '<div class="slideshow-slide-picture" id="slideshow-slide-picture-'.$imageHash.'"><div id ="video-slide-1" class="video-slide"><iframe width="560" height="315" src="http://www.youtube.com/embed/UEjVz44GdBQ" frameborder="0" allowfullscreen></iframe></div></div>';		
			} else {
			$ImageSlide = '<div class="slideshow-slide-picture" id="slideshow-slide-picture-'.$imageHash.'">'.$this->Html->image($slideImage).'</div>';
			}
			
			echo '<div class="slideshow-slide" id="slideshow-slide-number-'.$imageHash.'">';
			echo '<div class="slideshow-slide-inner" id="slideshow-slide-inner-number-'.$imageHash.'">';
			echo '<div class="slideshow-slide-title"><div class="slideshow-slide-title-inner">'.$slides[$i]['Slide']['title'].'</div></div>';		
			echo $ImageSlide;
			echo '<div id ="slideshow-slide-content-'.$imageHash.'" class="slideshow-slide-content">'.$slides[$i]['Slide']['body'].'</div>';
			echo '</div><div style="clear:both"></div>';
			echo '<div class="slideshow-slide-subtitle"><p>'.$slides[$i]['Slide']['subtitle'].'</p></div>';
			echo '</div><!-- end slideshow-slide -->';
			$imageHash ++;	
		}
?>
	</div><!--end slideshow-slides -->
			
	<div style="clear:both"></div>
</div> <!-- end slideshow-background -->

  

