<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>

    <title>
        <?php //__('BPOC Commons Dev Site:'); ?>
        <?php echo 'BPOC Commons BETA Site: '. $title_for_layout .' -- Print View'; ?>
    </title>

<?php  

		//never store in cache
		header("Pragma: no-cache");
		header("Cache-Control: no-store, no-cache, max-age=0, must-revalidate");

  		echo $this->Html->meta('icon');
  		echo $this->Html->css('print');		

		// echo $this->element('extended-meta_data_holder'); 
?>
</head>

<body>

<?php  echo $content_for_layout; //really simple  ?>
</body>
</html>