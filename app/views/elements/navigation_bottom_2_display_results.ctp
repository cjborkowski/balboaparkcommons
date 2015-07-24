<?php 
	$disController = $this->params['controller'];
	if($disController =="pages"){
	$results = 'display-results-inactive';
	$style ='';
	
	}else{
	$results = 'display-results-active'; 
	$style =' style="color:#FFF;"';
	} 
	
	if (isset($this->params['action'])){
		$lbAction = $this->params['action'];
	} else {
		$lbAction = 'listview'; 
	}
	
?>
<div id="new-nav-results-display-<?php e($num); ?>" class="new-nav-container <?php echo ''. $results .'" '. $style; ?>>
    			<div id="results-display-<?php e($num); ?>"><p>results display</p></div>
    
   				<?php if ($num =='2') :?>
    			<div class="show-set-container">
    				<div class="show-set-text"><p>show set</p></div>
    					<div class="show-set-buttons">
    					<ul>
    					<li id="new-nav-image-show-set-<?php e($num); ?>" class="new-nav-show-info-LI"><a href="/lightbox/<?php echo $lbAction;?>/" id="new-nav-show-set-<?php e($num); ?>">set</a></li>
    					</ul>
    					</div>
    				<div style="clear:both;"></div>
    			</div>
    			<?php endif ?>
  	 			<!-- dropping for now
    			<div class="show-info-container">
    				<div class="show-info-text"><p>show info</p></div>
    					<div class="show-info-buttons">
    					<ul>
    					
    					<li id="new-nav-image-show-info" class="new-nav-show-info-LI"><a href="#" id="new-nav-show-info">info</a></li>
    					</ul>
    					</div>
    				<div style="clear:both;"></div>
    			</div> -->
    			
    			<div class="image-size">
    				<div class="image-size-text"><p>image size</p></div>
    				<div id="image-size-buttons-<?php e($num); ?>" class="image-size-buttons">
    					
<?php if ($this->params['action'] =='item') : ?> 
<ul>
<li id="new-nav-image-size-large-<?php e($num); ?>" class=" new-nav-image-size-large new-nav-image-size-LI"><a href="#">large</a></li>
<li id="new-nav-image-size-medium-<?php e($num); ?>" class=" new-nav-image-size-medium new-nav-image-size-LI"><a href="#">medium</a></li>
<li id="new-nav-image-size-small-<?php e($num); ?>" class=" new-nav-image-size-medium new-nav-image-size-LI"><a href="#">small</a></li>
</ul>
<?php else: ?>
							<ul>
    						<li id="new-nav-image-size-large-<?php e($num); ?>" class="new-nav-image-size-large new-nav-image-size-LI <?php echo $this -> Navigation -> selectedAction('fullview') ?>">
    						<a href=" <?php 
    						//TODO: make function in navigation php 
    						//TODO and set other links to blank out
    						$no_no = array ('collections', 'featured', 'pages', 'posts', 'slides'); 
    								
    						if ( in_array($this->params['controller'], $no_no)) {
    						echo '#" class="null-grey-out" id="single-image-view-link-'.$num.'" title="image size not available">large</a></li>'; 
    						
							} else {	
							echo '/'. $this -> Navigation -> makeLink('fullview'); 
							echo '" id="single-image-view-link-'.$num.'" title="View Large Images">large</a></li>';
							} ?> 
    						
    						<li id="new-nav-image-size-medium-<?php e($num); ?>" class="new-nav-image-size-medium new-nav-image-size-LI <?php echo $this -> Navigation -> selectedAction('listview') ?>">
    						<a href="/<?php echo $this -> Navigation -> makeLink('listview');?>" title="View Medium Images">medium</a></li>
    						<li id="new-nav-image-size-small-<?php e($num); ?>" class="new-nav-image-size-small new-nav-image-size-LI <?php echo $this -> Navigation -> selectedAction('gridview') ?>">
    						<a href="/<?php echo $this -> Navigation -> makeLink('gridview');?>" title="View Small Images">small</a></li>
    						</ul>
    					<?php endif; ?>	 
    				</div>
    				<div style="clear:both;"></div>
    			</div>
 </div><!-- end new-nav-results-display -->
