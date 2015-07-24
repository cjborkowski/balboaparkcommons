<!-- ui-slide toggle and tabs TODO: Add FORMS -->
<div id="profile-edit-box" class="profile-preferences" title="">

	<div id="profile-tabs">
	
	<ul class="tabs-bg">
		<li><a href="#profile-tab" class="tab-text profile-tab">Profile</a></li>
		<li><a href="#password-tab" class="tab-text profile-tab">Password</a></li>
		<li><a href="#preference-tab" class="tab-text profile-tab">Preferences</a></li>
		<li><a href="#privacy-tab" class="tab-text profile-tab">Privacy Settings</a></li>
		<li><a href="#third-party-tab" class="tab-text profile-tab">Third-Party Settings</a></li>
	</ul>
	
		
<div id="profile-tab" class="profile-tab-content">
       <!-- ui-slideToggle() & tabs PROFILE -->
	<div class="profile-preferences-container">
	  		
	  		<div class="profile-preferences-title-header">
  			<div class="profile-preferences-title"><p>Profile</p></div>
 			<div class="profile-preferences-close-div" class="preferences-user-loggedin"><a id="profile-preferences-close-link" class="preferences-user-loggedin">close</a></div>
  			<div style="clear: both;"></div>
  			</div>
		  
	<div class="profile-preferences-container-upper">	  	
	<?php
	//DOM created by cakePHP Form Helper member functions
	//echo $this->Form->create(array('controller'=>'users', 'action'=>'edit'));
	echo $this->Form->input('full_name', array(
		'div' => array(
				'id' => 'full-name', 
				'title' => 'Input Full Name', 
				'class' => 'profile-preferences-input'
	)));
	
	
	echo $this->Form->input('location', array(
		'div' => array(
				'id' => 'location-div', 	
				'title' => 'Input Location : City, State', 
				'class' => 'profile-preferences-input'
	)));
	?>
					
					<div style="clear: both;"></div>
	</div><!-- end profile-PROFILE-container-upper-->
	
	<div class="profile-preferences-container-lower">
					
	<?php
	echo $this->Form->input('email', array(
		'div' => array(	
				'id' => 'email-div', 
				'title' => 'Input E-mail', 
				'class' => 'profile-preferences-input'
	)));
	?>
	<div id="profile-preferences-profile-save-changes" class="profile-preferences-input save-changes">
	<?php echo $this->Form->end('Save Changes');?>
	</div>
			<div style="clear: both;"></div>
	</div><!-- end profile-PROFILE-container-lower-->

</div><!-- end profile-PROFILE-container-->			
				
</div><!--end profile tab-->
	
<div id="password-tab" class="profile-tab-content">
	
	<div class="profile-preferences-container">
	  		
	  		<div class="profile-preferences-title-header">
  			<div class="profile-preferences-title"><p>Password</p></div>
 			<div class="profile-preferences-close-div"><a id="profile-preferences-close-link" class="profile-close">close</a></div>
  			<div style="clear: both;"></div>
  			</div>
		  
	<div class="profile-preferences-container-upper">	  	
	<?php
	//DOM created by cakePHP Form Helper member functions
	echo $this->Form->create(array('controller'=>'users', 'action'=>'edit'));
	echo $this->Form->input('current_password', array(
		'div' => array(
				'id' => 'current-password', 
				'title' => 'Input Current Password', 
				'class' => 'profile-preferences-input'
	)));
	
	
	echo $this->Form->input('new_password', array(
		'div' => array(
				'id' => 'new-password', 	
				'title' => 'Input New Password', 
				'class' => 'profile-preferences-input'
	)));
	?>
					
					<div style="clear: both;"></div>
	</div><!-- end profile-password-container-upper-->
	
	<div class="profile-preferences-container-checkbox-lower">
		
				<div id="forgot-password-container" class="profile-preferences-input">
					<a href ="#" id="profile-preferences-forgot-password">Forgot your password ?</a>
				</div>
			<?php
				echo $this->Form->input('confirm_password', array(
				'div' => array(	
				'id' => 'confirm-password', 
				'title' => 'Input Comfirm Password', 
				'class' => 'profile-preferences-input'
				)));

					?>
	
		<div id="profile-preferences-password-save-changes" class="profile-preferences-input save-changes">
		<?php echo $this->Form->end('Save Changes'); ?>
		</div>
	
			
	</div><!-- end profile-password-container-lower-->

</div><!-- end profile-password-container-->
		
</div><!--end password-tab-->
	
<div id="preference-tab" class="profile-tab-content">
			<div class="profile-preferences-title-header">
  			<div class="profile-preferences-title"><p>Preferences</p></div>
 			<div class="profile-preferences-close-div" class="preferences-user-loggedin"><a id="profile-preferences-close-link" class="preferences-user-loggedin">close</a></div>
  			<div style="clear: both;"></div>
  			</div>
<div id="preferences-tab-inner">
  			<?php
  			echo $this->Form->create(array('controller'=>'users', 'action'=>'edit'));
	
			echo $this->Form->input('preferences_1', 
				array( 
				'label' => __('Ipsum Loreum Magnum Preference',true), 	
				'div' => array(	
								'id' => 'preference-1-checkbox-div', 
								'title' => 'Preferences 1', 
								'class' => 'profile-preferences-input-checkbox' 
								), 
				'type'=>'checkbox',
				'options' => NULL,
                'selected' => NULL
				));

	
			echo $this->Form->input('preferences_2', 
				array( 
				'label' => __('Ipsum Loreum',true), 	
				'div' => array(	
								'id' => 'preference-2-checkbox-div', 
								'title' => 'Preferences 2', 
								'class' => 'profile-preferences-input-checkbox' 
								), 
				'type'=>'checkbox',
				'options' => NULL,
                'selected' => NULL
				));
	
	?>
	<div id="profile-preferences-preferences-save-changes" class="profile-preferences-input save-changes">
	<?php echo $this->Form->end('Save Changes');?>
	</div>
</div>
  				
</div><!--end preferences tab -->

<div id="privacy-tab" class="profile-tab-content">
	
			<div class="profile-preferences-title-header">
  			<div class="profile-preferences-title"><p>Privacy Settings</p></div>
 			<div class="profile-preferences-close-div" class="preferences-user-loggedin"><a id="profile-preferences-close-link" class="preferences-user-loggedin">close</a></div>
  			<div style="clear: both;"></div>
  			</div>
<div id="preferences-tab-inner">
  			<?php
  			echo $this->Form->create(array('controller'=>'users', 'action'=>'edit'));
	
			echo $this->Form->input('privacye_1', 
				array( 
				'label' => __('Privacy Preference',true), 	
				'div' => array(	
						'id' => 'preference-1-checkbox-div', 
						'title' => 'Privacy Setting 1', 
							'class' => 'profile-preferences-input-checkbox' 
								), 
						'type'=>'checkbox',
						'options' => NULL,
                		'selected' => NULL
				));

				echo $this->Form->input('privacy_2', 
					array( 
					'label' => __('Privacy Ipsum Loreum',true), 	
					'div' => array(	
						'id' => 'preference-2-checkbox-div', 
						'title' => 'Privacy Setting 2 ', 
						'class' => 'profile-preferences-input-checkbox' 
								), 
						'type'=>'checkbox',
						'options' => NULL,
                		'selected' => NULL
				)); ?>
				
		<div id="profile-preferences-preferences-save-changes" class="profile-preferences-input save-changes">
		<?php echo $this->Form->end('Save Changes');?>
		</div>
	</div>
</div><!--end privacy tab-->

<div id="third-party-tab" class="profile-tab-content">
			<div class="profile-preferences-title-header">
  			<div class="profile-preferences-title"><p>Third-Party Settings</p></div>
 			<div class="profile-preferences-close-div" class="preferences-user-loggedin"><a id="profile-preferences-close-link" class="preferences-user-loggedin">close</a></div>
  			<div style="clear: both;"></div>
  			</div>
  			<div class="profile-preferences-sub-title"><p>Connect With: </p></div>
<div id="third-party-tab-inner">
  		<?php echo $this->Form->create(array('controller'=>'users', 'action'=>'edit'));?>
  	
  		<div id="third-party-tab-inner-buttons" class="third-party-tab-radio-buttons">
  		
  		<?php	echo $this->Form->input('third-party', 
    			array( 'div' => array(
    				'class'=>'third-party-buttons'),
    				'between'=>'<ul><li class="third-party-radio-li">',
 					'after'=>'</li></ul>',
 					'separator'=>'</li><li class="third-party-radio">',
    				'label'=>true,
    				'options' => array(
    						'T'=>'Twitter','F'=>'Facebook', 'G' =>'Google'), 
    						'type'=>'radio',
    						'class'=>'third-party-radio',		    
    			)); ?>
				
  		<div style="clear:both;"></div>
  		
  		</div>
  		<div id="profile-preferences-third-party-save-changes" class="profile-preferences-input save-changes">
		<?php echo $this->Form->end('Save Changes');?>
		</div>
	</div><!-- end third-party-tab-inner -->
</div><!--end thirdparty tab -->

	</div><!--end profile-tabs -->
</div><!--end profile-edit-box- -->