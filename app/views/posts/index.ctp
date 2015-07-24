<h1>Posts</h1>
<?php  
if ($authUser){
echo $this -> Html -> link('Add Post', array('controller' => 'posts', 'action' => 'add', ), array('class' => 'add-post')); 
}
?>
<style>
	a.add-post {
		color:#FFF;
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
		<th>Id</th>
		<th>Published</th>
		<th>Title</th>
		<?php if ($authUser):?>
		<th>Actions</th>
		<?php endif; ?>
		<th>Created</th>
	</tr>
	<!-- Here's where we loop through our $posts array, printing out post info -->
	<?php foreach ($posts as $post):?>
	<tr>
		<td><?php  echo $this -> Form -> checkbox('opp', array('hiddenField' => false));?></td>
		<td><?php   echo $post['Post']['id'];?></td>
		<td><?php
		if ($post['Post']['published'] == '1') {
			echo 'Yes';
		} else {
			echo 'No';
		}
		?></td>
		
		<td><?php echo $this -> Html -> link($post['Post']['title'], array('action' => 'view', $post['Post']['id']));?></td>
		<?php if ($authUser):?>
		<td><?php echo $this->Html->link('Edit', array('action' => 'edit', $post['Post']['id']), null)?>
		/
		<?php echo $this -> Html -> link('Delete', array('action' => 'delete', $post['Post']['id']), array('class' => 'confirm_delete'));?>
		</td>
		<?php endif; ?>
		<td><?php  echo $post['Post']['created'];?></td>
	</tr>
	<?php endforeach;?>
</table>
<?php echo $this->Html->link('Logout',
      array('controller' => 'users', 'action' => 'logout')); ?><br>