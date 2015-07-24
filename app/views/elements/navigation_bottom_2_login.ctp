<div id="new-nav-main-body-login-left">	 
<div id="new-nav-main-body-login-text-left"></div>

<div id="new-nav-main-body-login-left-inputs">	
	
	<div id="login-box">
	<form name="login-form" id="login-form" onSubmit="return false">		

	<?php
	echo $this->Form->input('login-username', 
			array('default'=>'username', 'label'=>false, 'class'=> 'new-nav-inputs'),
				array(
					'div' => array(	
						'id' => 'new-nav-email-div', 
						'title' => 'Input E-mail', 
						'class' => 'new-nav-profile-preferences-input'
							)));

	echo $this->Form->input('login-password', 
			array('default'=>'Password', 'label'=>false, 'type'=>'password', 'onkeypress' =>'return View.submitEnterLogin(this,event)'),
				array(
					'div' => array(
						'id' => 'password', 
						'title' => 'Password', 
				 
						array('class' => 'new-nav-profile-preferences-input')
							))); 
	  
	 ?>
	 <a href="#" id="login-submit" >sign in</a>
	 <a href="#" id="logout-submit" style="display: none;">sign out</a>
	</form>


	<div style="clear:both;">
	</div>
	
	<div id="registration-link">
	<a href="#" id="register-link">create new account</a>	
	</div>

				
	<div id="password-remind-link">
	<a href="#" id="remind-link">edit email / password</a>					
	</div>
					
		</div><!--end login box -->
</div><!-- end  -->
	<div id="edit-box" style="display:none;">
	
    </div><!-- end edit-box --><div id="edit-profile-form-error"></div>	
</div><!--end new-nav-main-body-login-left-->
    	
<!-- coment out
<div id="new-nav-main-body-login-right-3rd-party">
    	<div class="new-nav-main-body-login-text"><p id="edit-login">edit profile</p><p id="alt-login">alternate logins</p></div>	
    <div id="third-party-tab-inner">
    	<div id="new-nav-third-party-tab-inner-buttons" class="new-nav-third-party-tab-radio-buttons">
  			<?php	/*
			 echo $this->Form->input('third-party', 
    				array( 'div' => array(
    					'class'=>'third-party-buttons'),
    					'between'=>'<ul><li class="third-party-radio-li">',
 						'after'=>'</li></ul> ',
 						'separator'=>'</li><li class="third-party-radio">',
    					'label'=>true,
    					'options' => array(
    						'T'=>'Twitter','F'=>'Facebook', 'G' =>'Google'), 
    						'type'=>'radio',
    						'class'=>'third-party-radio',		    
    			)); */ ?>
				
  		<div style="clear:both;"></div>
  		</div>
    </div>    
 </div>	-->	
 <!--end new-nav-main-body-login-right-3rd-party -->
<div style="clear:both;"></div>