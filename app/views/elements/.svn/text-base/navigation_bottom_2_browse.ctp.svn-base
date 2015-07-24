<?php
	

$sAction =$this->params['action'];
$sPass = $this->params['pass'];
	?>
 
 <div id="new-nav-main-body" class="new-nav-containers">
    		
    		<div id="new-nav-main-body-upper" class="new-nav-containers-upper">
    		 	<div id="new-nav-main-body-upper-text" class="new-nav-containers-upper"><p>Browsing / Filters / Search</p></div>
    		    		
    			<div id="new-nav-main-body-upper-reset" class="new-nav-containers-upper"><a href="/" id="reset-nav">reset</a></div>
    			<div style="clear:both;"></div>
    		</div><!-- end new-nav-main-body-upper -->
    		
    		<div id="new-nav-main-body-lower" class="new-nav-containers-lower">
    		
    			<div id="new-nav-main-body-lower-left-selects" class="new-nav-selects">
    			 <!--select 1 accpets global $sAction and $sPass from app_controller the others are made by the navigation helper -->
    			<ul id="footer-nav" class="footer_fixedwidth"><!-- BEGIN FOOTER NAV -->
    			<div id="new-nav-select-1"><cake:nocache><?php //echo $this -> Navigation -> makeSelectLink($sAction,$sPass);?></cake:nocache></div>
				<div id="new-nav-select-2"><cake:nocache><?php echo $this -> Navigation -> makeSelectLink2();?></cake:nocache></div>
				<div id="new-nav-select-3"><cake:nocache><?php echo $this -> Navigation -> makeSelectLink3();?></cake:nocache></div>
				 		
    			</div><!-- end new-nav-main-body-lower-left-selects -->
    			
    			<div id="new-nav-plus-sign"></div>
    			<div id="new-nav-select-4" class="new-nav-selects">
					<cake:nocache><?php 
					$checkController = $this->params['controller'];
					$countPass = count($this->params['pass']);
					//echo $checkController;
					//echo $countPass;
					if($checkController == 'objectview' && $countPass >=2){
							
						
					//$match = 'MOPA'; 
					$match = $data['n'];
					echo '<!--searching for '.$match .' featured-sets -->';
					echo $this -> Navigation -> makeSelectLink4($match);
					}//end if
					;?></cake:nocache>
					
					
				</div><!--hello end4 !-->
    			</ul>	<!-- End FOOTER NAV -->
    			<div id="new-nav-main-body-lower-seach-container" class="new-nav-containers-lower">
    					
    					<div id="new-nav-or-plus"><p>or</p></div>
    					
    					<div id="new-nav-main-body-lower-right-selects-search" class="new-nav-containers-lower">
    					<form id="piction-search-form" onsubmit="return false;">
						<input type="text" value="search..." id="piction-search-textfield" class="new-nav-inputs">	
						<input type="submit" id="piction-search-button" value="">
						</form>
    					<div style="clear:both;"></div>
    					</div>
    				
    			</div>
    			
    			<div style="clear:both;"></div>
    		</div><!-- end new-nav-main-body-lower -->
    		
    		
 </div><!-- end new-nav-main-body-->
 			
			<!--float to the right -->
    		<cake:nocache><?php echo $this->element('navigation_bottom_2_display_results'); ?></cake:nocache>
    		
    			<div style="clear:both;"></div>