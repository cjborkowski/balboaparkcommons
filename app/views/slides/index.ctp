<h1>Slides</h1>
<?php
	if ($authUser) {
		echo $this -> Html -> link('Add Slide', array('controller' => 'slides', 'action' => 'add', ), array('class' => 'add-post'));
	}
?>
<style>
	a.add-post { color:#FFF;}

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
</style>
<div id ="ajax_msg" style="display:none;"></div>
<table>
	<tr>
		<th>Select</th>
		<th>Order</th>
		<th>Id</th>
		<th>Slide Num</th>
		<th>Published</th>
		<th>Title</th>
		<?php if ($authUser):?>
		<th>Actions</th>
		<?php endif; ?>
		<th>Created</th>
	</tr>
	<!-- Here's where we loop through our $posts array, printing out post info -->
	<?php foreach ($slides as $slide):
	?>
	<tr>
	
		<td><?php  echo $this ->Form -> checkbox('opp', array('hiddenField' => false));?></td>
		<td><?php  echo $slide['Slide']['order'];?></td>
		<td><?php  echo $slide['Slide']['id'];?></td>
		<td><?php  echo $slide['Slide']['slide-num'];?></td>
		<td><?php
		if ($slide['Slide']['published'] == '1') {
			echo 'Yes';
		} else {
			echo 'No';
		}
		?></td>
		<td><?php echo $this->Html-> link($slide['Slide']['title'], array('action' => 'view', $slide['Slide']['id']));?></td>
		<?php if ($authUser):?>
		<td><?php echo $this->Html->link('Edit', array('action' => 'edit', $slide['Slide']['id']), null)?>
		/
		<?php echo $this->Html-> link('Delete', array('action' => 'delete', $slide['Slide']['id']), array('class' => 'confirm_delete'));?>
		</td>
		<?php endif; ?>
		
		<td><?php  echo $slide['Slide']['created'];?></td>
	</tr>
	<?php endforeach;?>
</table>
<?php echo $this->Html->link('Logout',
      array('controller' => 'users', 'action' => 'logout')); ?><br>