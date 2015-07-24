<!-- themes/listview-->
<h1>Themes</h1>

<?php for($i=0; $i<count($data['ct']); $i++) { ?>
	
<div class="featured-list-view-inner-container">
	
	<!--<img src="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>" class="view-list-thumbnail">-->
	<!--<a href="#" class="view-list-title"><?php echo $data['ct'][$i]['d'];?></a>-->
	
  <div id="featured-list-view-image-tip" class="list-view-main-picture">
			<a href="">	
				<img src="http://piction.bpoc.org/piction/<?php echo $data['ct'][$i]['u'];?>" class="view-gallery-thumbnail">
				</a>
	  </div>
		
	    <div id="featured-list-view-image-tip-target" class="list-view-details">
	
		<div class="featured-list-view-title"><h2><?php echo $data['ct'][$i]['d'];?></h2></div>
		
		<div class="featured-list-view-institution-title">
    	        <a href="/featured/gridview/<?php echo $data['ct'][$i]['pkl1'].'/'.urlencode($data['ct'][$i]['d']);?>" class="view-list-title">		
		<?php echo $data['ct'][$i]['d'];?></a>			
		</div>
		
		<div class="featured-list-view-part-of-copyright">
		<div class="featured-list-view-part-of"><p class="part-of">part of 
		<a href="#"><?php echo 'Foo Collection';?></a>,
		<a href="#"><?php echo 'FooBar  Collection';?></a>,
		<a href="#"><?php echo 'FooBag Collection';?></a> and
		<a href="#"><?php echo 'FooFoo  Collection';?></a>
		</p></div>
		
		<div class="featured-list-view-copyright">
		
		<div class="featured-list-view-copyright-info">
		<p><?php echo 'No known copyright restrictions';?></p>
		</div>

 		<div class="featured-list-view-copyrigh-tooltip">
                <p><a class="copyright-tooltip" href="#">[?]</a></p>
		</div>
		
		<div style="clear:both;"></div>		
                </div>
		
		<!--allows floating left to right within part-of-copyright  -->
		<div style="clear:both;"></div>
		</div>
		
		<div class="featured-list-view-connections" id="featured-list-view-connections"><p class="connetions">Connections</p>
		<ul class="connections-list-links">
		<li><a href="#"><?php echo 'connections-link-1';?></a></li>
		<li><a href="#"><?php echo 'connections-link-2';?></a></li>
		</ul>
		</div>
	 
	
    
    </div><!-- close featured-list-view-details -->
	 		
 	<!--allows floating left to right within featured-list-view-inner-container  -->
	<div style="clear:both;"></div>
</div>
<?php } ?>
