<style>
input, textarea {
clear: both;
color: #000;
font-family: proxima-nova,sans-serif;
font-style: normal;
font-weight: 400;
font-size: 18px;
padding: 2%;
width: 170px;
height: 1px;
}	
form .submit input[type=submit]{
background: #62af56;
background-image: -moz-linear-gradient(top, #a8ea9c, #62af56);
border-color: #2d6324;
color: #000;
text-shadow: #8cee7c 0px 1px 0px;
height: 32px;
}
#nav-tab{
	display:none;
}

.users-form{
	width:100%;
	float:none;
	
}
</style>


<div class="users-form">
<?php echo $this->Form->create('User');?>
	<fieldset>
		<legend><?php __('Add User'); ?></legend>
	<?php
		echo $this->Form->input('username');
		echo $this->Form->input('password');
		//echo $this->Form->input('email');
		//echo $this->Form->input('group_id');
		//echo $this->Form->input('active', array('type' => 'checkbox'));
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
