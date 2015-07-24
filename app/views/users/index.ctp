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
.users-index{
	width:100%;
	float:none;
	
}
</style>

<div class="users-index">
	<h3><?php __('Users');?></h3>
	<table>
		<tbody>
	<?php
	$i = 0;
	foreach ($users as $user):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	
	<tr<?php echo $class;?>>
		<td><?php echo $user['User']['id']; ?>&nbsp;</td>
		<td><?php echo $user['User']['username']; ?>&nbsp;</td>
	</tr>
<?php endforeach; ?>
	</tbody>
	</table>
	<?php echo $this->Html->link('Logout',
      array('controller' => 'users', 'action' => 'logout')); ?><br>
</div>