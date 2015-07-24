<?php

	if (@$this -> params['json'] == '1') {
		
	echo json_encode($data['ct'][0]);

	}
		
	elseif (@$this -> params['pdf'] == '1') {

	echo $this->element('pdf_item', array('pageLink' => $this->here));

	}
	
	elseif (@$this -> params['printable'] == '1') {

	echo $this->element('print_item');

	} else {

	echo $this->element('single_item');

	}

?>
