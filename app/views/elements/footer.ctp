<div id="footer-info">
	<div id="leadership-logo">
	Funded by the
	<a href="http://www.imls.gov" target="_blank" class="footer-grant-info-link" id="footer-grant-info-link">
	U.S. Institute of Museum and Library Services</a> 
	and the <a href="http://www.benboughfoundation.org" target="_blank">Legler Benbough Foundation</a>
	<!--Funded by the U.S.<a href ="http://www.imls.gov">Institute of Museum and Library Services</a>    
		<br />
	<span>Produced by the <a href="http://www.bpoc.org">Balboa Park Online Collaborative</a></span> -->
		<?php  echo $this -> element('imls');?> 
	</div>
	<div id="produced-by">Produced by the 
	<a href="http://www.bpoc.org" target="_blank">Balboa Park Online Collaborative</a>&nbsp;for&nbsp;<a href="http://www.balboapark.org" target="_blank">Balboa Park</a>&nbsp;&bull;&nbsp;Copyright&nbsp;&copy;<?php  echo date("Y");?></div>
	<div id="terms-of-use-and-copy">
		
		<div id="api-footer">
			<a href="/pages/thisapi" id="commons-api-link">The Commons API</a>
		</div>
		
		<div class="footer-bullet"><p>&nbsp;&bull;&nbsp;</p></div>
		
		<div id="terms-of-use">
			<a href="#" id="terms-of-use-link">Terms of Use</a>
			<!--hidden by jquery UI-->
			<?php echo $this -> element('terms_of_use');?>
		</div>
	
		
		<div style="clear:both;"></div>
	</div>
	
	<div id="credit-contact">
		
		<div id="credits">
		<a href="#" id="credits-link">Credits</a>
		<?php echo $this -> element('credits');?>
		</div>
		
		<div class="footer-bullet"><p>&nbsp;&bull;&nbsp;</p></div>
			<div id="contact">
				<a href="#" id="contact-link">Contact Us</a>
			</div>
	<div style="clear:both;"></div>
	</div>	
	
	<div style="clear:both;"></div>
</div>


