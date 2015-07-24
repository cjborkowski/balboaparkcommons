<?php echo $this->Session->flash('auth'); ?>
<h3>Balboa Park Commons CMS login</h3>
<p>From this page you can edit the Posts and Slides that appear on this site.
These pages are nothing fancy and are styled by the "out of the box" CakePHP framework.</p>
<br />
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
</style>

<?php
//echo $this->Session-> flash('auth');
echo $this->Form-> create('User', array('action' => 'login'));
echo $this->Form-> inputs(array('legend' => __('Login', true), 'username', 'password'));
echo $this->Form-> end('Login');
