<?php 
$class=''; 
$backLink =''; 

if ($this->params['action'] == 'item' || $this->params['action'] =='search') {
	 	
		
	if(isset($_SERVER['HTTP_REFERER'])) {
      $goUrl = $_SERVER['HTTP_REFERER'];
	}
	else{
	  $goUrl = BPOC_HOST;
	}
	 
  
$backLink ='<a href="'.$goUrl.'" class="item-back-link list-view-share-download-link single-view-back-link">back</a>';
$class ='single-share';

} ?>

<div class="<?php echo $class ;?> list-view-share-download">
<?php echo $backLink ;?>
<a href="#" id="<?php echo $id;?>" class="list-view-share-download-link list-view-share-link">share</a>

<?php if(!isset($_SESSION['surl'])):?>
<a href="#" id="<?php echo $this->Derivatives-> makeDownoadLink($asset);?>" class="list-view-share-download-link list-view-download-link no-down-load-link">download</a>
<?php else:?>
<a href="<?php echo $this->Derivatives-> makeDownoadLink($asset);?>" id="<?php echo $this->Derivatives-> makeDownoadLink($asset);?>" target="_BLANK" class="list-view-share-download-link list-view-download-link">download</a>
<?php endif;?>
</div>

<!-- allows floating -->	
<div style="clear: both"></div>
<!--objectview  hidden -->
<!--objectview list view helper -->
<?php echo $this->ShareButtons->makeShareButtons($id ,$link, $title, $desc); ?>
<!--end helper -->
	
	
