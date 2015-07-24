<!-- start global navigation -->
<div id="global-nav">
	<div id="global-nav-top">
		<div id="login-box-container">
			<div id="user-icon">
				<!-- set "Logged in as" if valid -->

				<!-- end -->
			</div>
			<div id="login-form-container">
				<?php  echo $this -> element('login');?>
			</div>
	
		</div>
		
		
		
		<div id="featured-filter">
			<a href="/featured/">featured</a>
			<div id="add-filter-outer">
				<div id="filter">
					<a id="add-filter" href="#">add filter<img src="/img/blue-plus-icon.png"></a>
					<!-- hidden by jquery ui -->
					
						<?php  echo $this -> element('filter');?>
					
				</div>
			</div>
		</div><!--end featured-filter -->
		<div id="secondary-nav">
			<ul>
				<li class="secondary-nav-link">
					<a href="/themes/">Themes</a>
				</li>
				<li class="secondary-nav-link">
					<a href="/sets/">Sets</a>
				</li>
				<li class="secondary-nav-link">
					<a href="/types/">Types</a>
				</li>
				<li class="secondary-nav-link">
					<a href="/collections">Collections</a>
				</li>
			</ul>
		</div>
		<div id="piction-search">
			<form id="piction-search-form" onsubmit="return false;"><input type="text" value="Search The Commons" id="piction-search-textfield">	<input type="submit" id="piction-search-button" value=""/></form>		
		</div>
		<div style="clear:both"></div>
	
	</div><!--end top -->

   <!-- begin profile -->

	<!-- end profile -->	
	
	<!--begin global-nav-bottom-->
	<div id="global-nav-bottom">
		<div id="main-nav-conatainer">
			<ul>
				<li class="main-nav-full-view main-nav-link" id="main-nav-slideshow">
					<a>Full</a>
				</li>
				<li class="main-nav-stream-view main-nav-link">
					<a href="/featured/streamview <?php // drop for 12/13/11 demo echo $this -> Navigation -> makeLink('streamview');?>">Stream</a>
				</li>
				<li class="main-nav-grid-view main-nav-link">
					<a href="/<?php echo $this -> Navigation -> makeLink('gridview');?>">Grid</a>
				</li>
				<li class="main-nav-list-view main-nav-link">
					<a href="/<?php echo $this -> Navigation -> makeLink('listview');?>">List</a>
				</li>
			</ul>
		</div><!--end main-nav-conatainer-->
		<div id="carousel-and-tools">
			<div id="carousel-and-tools-upper">
				<div id="add-to-set-container"></div>
				<!-- render thumbs and controlls -->
				<?php echo $this -> element('carousel', array('flag' => 'value'));?>
				<!-- render thumbs and controlls -->
				<div style="clear:both;"></div>
			</div><!-- end carousel-and-tools-upper -->
			<div id="carousel-and-tools-lowwer">
				<div id="image-tools-1">
					<ul class="links">
						<li class="add-to-set-link">
							<a id="add-to-set-link" href="#">add to set</a>
						</li>
						<li class="download-link">
							<a href="#">download</a>
						</li>
						<li class="tag-link">
							<a href="#">tag</a>
						</li>
						
					
						
						<li class="share-link">	
						<a id="share">share</a> 
						</li>
						
						<style>
							#at20mc, #at15s{
								background: #000 !important;
							}
							
							#at15ptc, #at15s_head, #at15pf{
								display: none !important;
							}
							
							#at16pcc{
								color: #FFF !important;
							}
							
							#at15s_inner{
								background: #000 !important;
							}
							
							#at_hover .at_item, #at_share .at_item, #at_hover .at_bold {
   							 	background: none repeat scroll 0 0 #000 !important;
    							color: #FFF !important;
    							float: left !important;
    							font-family: proxima-nova, Arial, Helvetica, sans-serif;
								font-size: 12px;
								font-style: normal;
								font-weight: 600;
							}
							
							#at_hover .at_item:hover, #at_hover .at_item:focus, #at_hover .at_item.athov, #at16ps .at_item:focus, #at_share .at_item:hover, #at_share .at_item.athov{
								background: none repeat scroll 0 0 #000 !important;
    							color: #FFF !important;	
    							border: 1px solid #000 !important;
							}
							
						</style>
							
					   <script type="text/javascript">
					
						var addthis_config = {
						"data_track_clickback":true,
						"data_ga_tracker": "UA-31001923-1",
						"data_ga_social" : true,
	 					"ui_508_compliant" : true,
						"services_compact": "bitly, delicious, facebook, google_plusone_share, pinterest, tumblr, twitter ",
						"ui_delay": 800,
						"ui_hover_direction": 1,
						"ui_cobrand": "Balboa Park Commons",
						"ui_header_color":"#000",
						"ui_header_color_background":"#FFF"	,	
						"ui_use_css" : true				
						};
						
						addthis.button('#share', addthis_config);
						//addthis.button(document.getElementById('share-toolbox'));
						</script>
						
						<li class="edit-sets-link">
							<a href="#" id="edit-set-link" class="last">edit sets</a>
						</li>
					</ul>
				</div>
			</div><!-- end carousel-and-tools-upper -->
		</div>
		<!--end carousel-and-tools-->
		<div id="image-tools-2">
			<ul class="links">
				<li class="full-screen-link">
					<a href="#" alt="view full screen"></a>
				</li>
			</ul>
		</div>
		<!--end image-tools-2 -->
		<div style="clear:both;"></div>
	</div><!-- end main-nav-container -->
</div><!-- end global nav -->
