<?php
//onlty on item
if (isset($PastAction)){
	$sAction = $PastAction;
} else{
	$sAction = $this->params['action'];
}
$sPass = $this->params['pass'];
$sController = $this->params['controller'];
?>
<!-- TODO: move in to defaul doc ready -->

 <div id="new-nav-main-body" class="new-nav-containers">
    		
    		<div id="new-nav-main-body-upper" class="new-nav-containers-upper">
    		 	<div id="new-nav-main-body-upper-text" class="new-nav-containers-upper"><p>Browsing/Filters/Search</p></div>
    		    		
    			<div id="new-nav-main-body-upper-reset" class="new-nav-containers-upper"><a href="/" id="reset-nav" title="rest and go to home page">reset</a></div>
    			<div style="clear:both;"></div>
    		</div><!-- end new-nav-main-body-upper -->
    		
    		<div id="new-nav-main-body-lower" class="new-nav-containers-lower">
    		
    			<div id="new-nav-main-body-lower-left-selects" class="new-nav-selects">
    			 <!--select 1 accpets global $sAction and $sPass from app_controller the others are made by the navigation helper -->
    			<!-- BEGIN FOOTER NAV -->
    			
    			<div id="new-nav-select-1"><?php echo $this -> Navigation -> makeUlLink($sPass,$sAction);?></div>
    			<div id="new-nav-select-2"><?php echo $this -> Navigation -> makeUlLink2($sAction);?></div>
				<div id="new-nav-select-3"><?php echo $this -> Navigation -> makeUlLink3($sController,$sAction);?></div>		
    			</div><!-- end new-nav-main-body-lower-left-selects -->
    			<div id="new-nav-plus-sign"></div><div id="new-nav-select-4" class="new-nav-selects">
    				<?php 
					$countPass = count($sPass);
			
					//if($view_type == 'collections' && $countPass >=2){
			 			$eval1 = NULL;
						$eval2 = NULL;
						
						e('');
						
						if (isset($data['d'])){
						  $eval2 = $data['d'];
						} 
						
							for( $i=0; $i <count($data['ct']); $i++){
 							 
 							  if (isset($data['ct'][$i]['md'])){
							//meta loop
							     for ($d=0; $d<count ($data['ct'][$i]['md']); $d++){
		 					       if ($data['ct'][$i]['md'][$d]['mt'] =='PUBLIC COMMONS.SOURCE INSTITUTION'){
    						         $eval2 = $data['ct'][$i]['md'][$d]['mv'];
								   }
								 }
							   }
							}//end for
						
					$pk = max($eval2, $eval1);	
					echo '<!--searching for '.$pk .' featured-sets could have used: '.$eval1 .' and ' .$eval2.' viewtype' .$view_type.' -->';
					echo $this -> Navigation -> makeUlLink4($sAction, $view_type, $pk);
					//}//end if
					e('<!--viewtype: '. $view_type.'-->');
					;?>
					</div><!--end new-nav-select-4 -->
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
<?php echo $this->element('navigation_bottom_2_display_results', array('num'=>'1', array('cache' => false))); ?>
 <div style="clear:both;"></div>
    		