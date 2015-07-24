<?php 
$class=''; 
$backLink =''; 
if ($this->params['action'] == 'item' || $this->params['action'] =='search') {
$backLink ='<a href="javascript:history.back();" class="list-view-share-download-link single-view-back-link">back</a>';
$class ='single-share';
} ?>

<div class="<?php echo $class ;?> list-view-share-download featured-list-view-share">
<?php echo $backLink ;?>
<a href="#" id="<?php echo $id;?>"class="list-view-share-download-link list-view-share-link">share</a>
</div>
<!-- allows floating -->	
<div style="clear: both"></div>
<!--featured listview hidden -->
<!--featured list view helper -->
<?php echo $this->ShareButtons->makeShareButtons($id ,$link, $title, $desc); ?>
<!--end helper -->