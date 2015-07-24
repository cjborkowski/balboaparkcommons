<?php if ( @$this->params['json'] == '1' ){ ?>
	<?php echo  $this->getVar('jsondata'); ?>

<?php } else { ?>

<?php if (!isset($_SESSION['surl'])){ ?>	
	
<div id="no-surl-found">Please login or register to view user sets.</div>

<?php }?>

<?php if(!isset($data['lblist']['ct'])) { ?>
	
	<div id="no-images-found">Your search returned no results.</div>
	
<?php } else { ?>
<!-- usersets/gridview -->

<?php
for($i=0; $i<count($data['ct']); $i++) { 
	$link_set = '/userset/'.$sAction.'/'.$data['lblist']['ct'][$i]['i'].'/'.urlencode($data['ct'][$i]['n']);
	?>

<div class="grid-view-inner-container">
	<div id="grid-view-image-tip" class="grid-view-main-picture">
		<a href="<?php echo $link_set;?>">	
				<?php if($data['lblist']['ct'][$i]['u']): ?><img src="http://piction.bpoc.org/piction/<?php echo $data['lblist']['ct'][$i]['u'];?>" class="view-gallery-thumbnail" itemprop="image">
		<?php else:  ?><img src="/img/missing-thumbnail.png" class="view-gallery-thumbnail" />
		<?php endif; ?></a>
	
	<!-- hidden and made tool tip --if title atribute used then next() DOM elemend becomes the tip-- grid-view-details tooltip-->
		<div id="grid-view-image-tip-target" class="grid-view-details tooltip">
	
		<div class="grid-view-title">
		<span itemprop="name"><?php echo $data['lblist']['ct'][$i]['n'];?></span>
		</div>
			
			<div class="grid-view-institution-title">					
    		<!-- tool tip - get title info -->
			</div>	 	
    </div><!-- close grid-view-details tooltip-->	 
	
	</div><!--end grid-view-image-tip -->
	
		
</div><!-- close loop & grid-view-inner-container-->

<?php } ?>	
<div style="clear:both;"></div>

<?php } } ?>