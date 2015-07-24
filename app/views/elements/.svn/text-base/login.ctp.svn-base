<p>	
<?php 
if(!isset($_SESSION['surl']))
{	
	echo '<a id="login-link">Login / </a>';	
	echo '<a id="register-link">Register</a>';	
}
else
{
		echo '<a id="user-loggedin-link" class="user-loggedin">Logged in as <span>' . $_SESSION['username'] . '</span></a>';
}
?>
</p>

	<!-- ui-dialog login -->
	<div id="login-box" title="">
		<form name="login-form" id="login-form" onSubmit="return false">		
			<label>Username</label><input type="text" id="login-username">
			<label>Password</label><input type="password" id="login-password">
			<input type=submit style=display:none>
		</form>				
	</div>
	
			
	<!-- ui-dialog register -->	
	<div id="register-box" title="">
		<form name="register-form" id="register-form" onSubmit="return false">						
			<label>Username</label><input type="text" name="username">
			<label>Password</label><input type="password" name="password">						
			<label>Confirm Password</label><input type="password" name="confirm-password">
			
			<label>First Name</label><input type="text" name="firstname">
			<label>Last Name</label><input type="text" name="lastname">
			<label>Email</label><input type="text" name="email">
			<input type=submit style=display:none>
		</form>					
	</div>	
	
	
	
