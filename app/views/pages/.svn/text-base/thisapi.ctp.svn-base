<div class="commons-code-block-text">
<h1>How to use the BPOC Commons API Using PHP's json_decode() function</h1>
<p>CONTEXT:</p>
<p> The Balboa Park Commons site uses a simple rest style API that allows the retrival of our data in a lightwieght JSON data format. 
There is no authentication required and the data cannot be changed or manipulated on the host side. Developers and enthusiasts may retrive the JSON data and manipulate however they see fit on the client side. In this example the JSON data for the page of a Featured Set from url <a 
href="http://commons.bpoc.org/objectview/listview/14149813/Animals">
<?php echo BPOC_HOST ;?>/objectview/listview/14149813/Animals</a> is retrieved, itenerated through and echoed out on to the page using two simple PHP function called "file_get_contents" and "json_decode".
</p>
<br />
<p>Key Concept: pre-pend the (or any) URL after the domain name with "/json/" to retrieve 
the raw JSON data of the Featured set with an ID (pk) of "14149813" and the title "Animals". 
In order to display the physical assets (i.e the images) a seconday host is defined as the BPOC's DAMS server located at http://piction.bpoc.org/piction/ which is where all of our publicly available assests are stored.
</p>
<br />
<p>CODE EXAMPLE:<p/>
</div>
<?php
$language = 'php';
$source ="<?php
define ('P_HOST', 'http://piction.bpoc.org/piction/');

\$data = file_get_contents('".BPOC_HOST."/json/objectview/listview/14149813/Animals/');
\$json_data = json_decode(\$data, true);
                  
/** 
* view the data object with nested arrays
* print_r(\$json_data);
*/

echo '<h1>Featured Set: '.\$json_data['n'].'</h1>';
echo '<p>PK:'.\$json_data['pk'].'</p>';
echo '<p>Set Item Count: '.\$json_data['num'].'</p>';
echo '<br />';

        for(\$i=0; \$i<count(\$json_data['ct']); \$i++) {
        echo '<img src=\"'.P_HOST.\$json_data['ct'][\$i]['w'}.'\" /><br /><br /> ';
        }

?>";

// Create a GeSHi object//
$geshi->core = new GeSHi($source, $language);


//$geshi->core->set_header_type(GESHI_HEADER_DIV);
// And echo the result!//
?>
<div class="commons-code-block" style="width:100%;">
<?php 
$geshi->core->enable_line_numbers(GESHI_NORMAL_LINE_NUMBERS);
echo $geshi->core->parse_code() ; 
?>
</div>
<div class="commons-code-block-text">
<p>CODE EXAMPLE OUTPUT:<p>
</div>
<div class="commons-code-block-output">
<?php
//define ('P_HOST', 'http://piction.bpoc.org/piction/');

$data = file_get_contents('http://staging.commons.bpoc.org/json/objectview/listview/14149813/Animals/',0,null,null);
$json_data = json_decode($data, true);
		
//print_r($json_data);
		
echo "<h1>Featured Set: ".$json_data['n'] ."</h1>";
echo "<p>PK:".$json_data['pk']."</p>";
echo "<p>Set Item Count: ".$json_data['num']."</p>";
echo '<br />';
		
	for($i=0; $i<count($json_data['ct']); $i++) {
	echo '<img src="'.P_HOST. $json_data['ct'][$i]['w'].'" /><br /><br /> ';		
	}
		
?>
</div>
<style type="text/css">
            .commons-code-block{
            	margin:10px;
            }
            
            .commons-code-block-text{
            margin:10px;
            display:block;
            padding: 10px;
            }
            .commons-code-block-text p{
            	font-size : 14px;
            	padding: 2px;
            }
            
              .commons-code-block-text a{
            	font-size : 14px;
            	color:#00AAEF;
            }
            
             .commons-code-block-text h1{
             	font-size:18px;
             	text-align: center;
             }
            
            .commons-code-block-output{
            text-align: left;
            }
            
            .commons-code-block-output p{
             font-size: 16px;
             padding: 2px;
             }
            
            .commons-code-block-output h1{
             	font-size:18px;
             	text-align: center;
             }
            
            acronym {
                border-bottom: 1px dotted #303030;
                cursor: help;
            }
            blockquote {
                font-weight: bold;
            }
            pre, .geshicode {
                border: 1px solid #c0e6ff;
                background-color: #e0e8ef;
                color: #002;
                margin:0;
                font-size: 12px;
                width:100%;
            }
            table {
                border-collapse:collapse;
            }
            .geshicode pre {
                border:none;
                background-color:inherit;
                font-weight:bold;
            }
            .geshicode .li2 td {
                background-color:#eee;
            }
            .geshicode .li1 td {
                background-color:#fff;
            }
            .geshicode td td {
                padding:0 2px;
            }
            .geshicode td, .geshicode table {
                width: 100%;
            }
            .geshicode td.ln {
                border-right:2px solid #e0e8ef;
            }
            .geshicode .head {
                text-align:center;
                font-weight:bold;
            }
            code, tt, kbd {
                font-size: 125%;
                font-weight:normal;
            }
            hr {
                height: 0;
                border: none;
                border-top: 1px dotted #404040;
                width: 75%;
            }
            var {
                color: blue; font-style: normal; font-family: monospace;
            }
            .note {
                border: 1px solid yellow;
                background-color: #ffc;
                color: #220;
                padding: 5px;
                margin: 1em 0 0 .75em;
            }
            .caution {
                border: 6px double red;
                background-color: #fcc;
                color: #200;
                padding: 5px;
                margin: 1em 0 0 .75em;
            }
            .caution p:first-child, .note p:first-child {
                margin-top: 0;
            }
            .caution-header {
                border: 1px solid red;
                border-width: 1px 2px 2px 1px;
                margin-top: -1.6em;
                background-color: #fcc;
                width: 10%;
                font-weight: bold;
                text-align: center;
                color: #600;
            }
            .note-header {
                border: 1px solid #ff0;
                border-width: 1px 2px 2px 1px;
                margin-top: -1.2em;
                background-color: #ffc;
                width: 10%;
                font-weight: bold;
                text-align: center;
                color: #660;
            }

           
            sup a {
                text-decoration: none;
            }
            abbr {
                cursor: help;


            /**
 * GeSHi Dynamically Generated Stylesheet
 * --------------------------------------
 * Dynamically generated stylesheet for bash
 * CSS class: , CSS id:
 * GeSHi (C) 2004 - 2007 Nigel McNie, 2007 - 2008 Benny Baumann
 * (http://qbnz.com/highlighter/ and http://geshi.org/)
 * --------------------------------------
 */
.bash .de1, .bash .de2 {font: normal normal 1em/1.2em monospace; margin:0; padding:0; 
background:none; vertical-align:top;}
.bash  {font-family:monospace;}
.bash .imp {font-weight: bold; color: red;}
.bash li, .bash .li1 {font-weight: normal; vertical-align:top;}
.bash .ln {width:1px;text-align:right;margin:0;padding:0 2px;vertical-align:top;}
.bash .li2 {font-weight: bold; vertical-align:top;}
.bash .kw1 {color: #000000; font-weight: bold;}
.bash .kw2 {color: #c20cb9; font-weight: bold;}
.bash .kw3 {color: #7a0874; font-weight: bold;}
.bash .co0 {color: #666666; font-style: italic;}
.bash .co1 {color: #800000;}
.bash .co2 {color: #cc0000; font-style: italic;}
.bash .co3 {color: #000000; font-weight: bold;}
.bash .es1 {color: #000099; font-weight: bold;}
.bash .es2 {color: #007800;}
.bash .es3 {color: #007800;}
.bash .es4 {color: #007800;}
.bash .es5 {color: #780078;}
.bash .es_h {color: #000099; font-weight: bold;}
.bash .br0 {color: #7a0874; font-weight: bold;}
.bash .sy0 {color: #000000; font-weight: bold;}
.bash .st0 {color: #ff0000;}
.bash .st_h {color: #ff0000;}
.bash .nu0 {color: #000000;}
.bash .re0 {color: #007800;}
.bash .re1 {color: #007800;}
.bash .re2 {color: #007800;}
.bash .re4 {color: #007800;}
.bash .re5 {color: #660033;}
.bash .ln-xtra, .bash li.ln-xtra, .bash div.ln-xtra {background-color: #ffc;}
.bash span.xtra { display:block; }

/**
 * GeSHi Dynamically Generated Stylesheet
 * --------------------------------------
 * Dynamically generated stylesheet for php
 * CSS class: , CSS id:
 * GeSHi (C) 2004 - 2007 Nigel McNie, 2007 - 2008 Benny Baumann
 * (http://qbnz.com/highlighter/ and http://geshi.org/)
 * --------------------------------------
 */
.php .de1, .php .de2 {font: normal normal 1em/1.2em monospace; margin:0 10px 0 10px; padding:10px; 
background:none; vertical-align:top;}
.php  {font-family:monospace;}
.php .imp {font-weight: bold; color: red;}
.php li, .php .li1 {font-weight: normal; vertical-align:top;}
.php .ln {width:2px;text-align:right;margin:0;padding:0 4px;vertical-align:top;}
.php .li2 {font-weight: bold; vertical-align:top;}
.php .kw1 {color: #b1b100;}
.php .kw2 {color: #000000; font-weight: bold;}
.php .kw3 {color: #990000;}
.php .kw4 {color: #009900; font-weight: bold;}
.php .co1 {color: #666666; font-style: italic;}
.php .co2 {color: #666666; font-style: italic;}
.php .co3 {color: #0000cc; font-style: italic;}
.php .co4 {color: #009933; font-style: italic;}
.php .coMULTI {color: #666666; font-style: italic;}
.php .es0 {color: #000099; font-weight: bold;}
.php .es1 {color: #000099; font-weight: bold;}
.php .es2 {color: #660099; font-weight: bold;}
.php .es3 {color: #660099; font-weight: bold;}
.php .es4 {color: #006699; font-weight: bold;}
.php .es5 {color: #006699; font-weight: bold; font-style: italic;}
.php .es6 {color: #009933; font-weight: bold;}
.php .es_h {color: #000099; font-weight: bold;}
.php .br0 {color: #009900;}
.php .sy0 {color: #339933;}
.php .sy1 {color: #000000; font-weight: bold;}
.php .st0 {color: #0000ff;}
.php .st_h {color: #0000ff;}
.php .nu0 {color: #cc66cc;}
.php .nu8 {color: #208080;}
.php .nu12 {color: #208080;}
.php .nu19 {color:#800080;}
.php .me1 {color: #004000;}
.php .me2 {color: #004000;}
.php .re0 {color: #000088;}
.php .ln-xtra, .php li.ln-xtra, .php div.ln-xtra {background-color: #ffc;}
.php span.xtra { display:block; }

/**
 * GeSHi Dynamically Generated Stylesheet
 * --------------------------------------
 * Dynamically generated stylesheet for html4strict
 * CSS class: , CSS id:
 * GeSHi (C) 2004 - 2007 Nigel McNie, 2007 - 2008 Benny Baumann
 * (http://qbnz.com/highlighter/ and http://geshi.org/)
 * --------------------------------------
 */
.html4strict .de1, .html4strict .de2 {font: normal normal 1em/1.2em monospace; margin:0; padding:0; 
background:none; vertical-align:top;}
.html4strict  {font-family:monospace;}
.html4strict .imp {font-weight: bold; color: red;}
.html4strict li, .html4strict .li1 {font-weight: normal; vertical-align:top;}
.html4strict .ln {width:1px;text-align:right;margin:0;padding:0 2px;vertical-align:top;}
.html4strict .li2 {font-weight: bold; vertical-align:top;}
.html4strict .kw2 {color: #000000; font-weight: bold;}
.html4strict .kw3 {color: #000066;}
.html4strict .es0 {color: #000099; font-weight: bold;}
.html4strict .br0 {color: #66cc66;}
.html4strict .sy0 {color: #66cc66;}
.html4strict .st0 {color: #ff0000;}
.html4strict .nu0 {color: #cc66cc;}
.html4strict .sc-1 {color: #808080; font-style: italic;}
.html4strict .sc0 {color: #00bbdd;}
.html4strict .sc1 {color: #ddbb00;}
.html4strict .sc2 {color: #009900;}
.html4strict .ln-xtra, .html4strict li.ln-xtra, .html4strict div.ln-xtra {background-color: #ffc;}
.html4strict span.xtra { display:block; }

/**
 * GeSHi Dynamically Generated Stylesheet
 * --------------------------------------
 * Dynamically generated stylesheet for css
 * CSS class: , CSS id:
 * GeSHi (C) 2004 - 2007 Nigel McNie, 2007 - 2008 Benny Baumann
 * (http://qbnz.com/highlighter/ and http://geshi.org/)
 * --------------------------------------
 */
.css .de1, .css .de2 {font: normal normal 1em/1.2em monospace; margin:0; padding:0; 
background:none; vertical-align:top;}
.css  {font-family:monospace;}
.css .imp {font-weight: bold; color: red;}
.css li, .css .li1 {font-weight: normal; vertical-align:top;}
.css .ln {width:1px;text-align:right;margin:0;padding:0 2px;vertical-align:top;}
.css .li2 {font-weight: bold; vertical-align:top;}
.css .kw1 {color: #000000; font-weight: bold;}
.css .kw2 {color: #993333;}
.css .co1 {color: #a1a100;}
.css .co2 {color: #ff0000; font-style: italic;}
.css .coMULTI {color: #808080; font-style: italic;}
.css .es0 {color: #000099; font-weight: bold;}
.css .br0 {color: #00AA00;}
.css .sy0 {color: #00AA00;}
.css .st0 {color: #ff0000;}
.css .nu0 {color: #cc66cc;}
.css .re0 {color: #cc00cc;}
.css .re1 {color: #6666ff;}
.css .re2 {color: #3333ff;}
.css .re3 {color: #933;}
.css .ln-xtra, .css li.ln-xtra, .css div.ln-xtra {background-color: #ffc;}
.css span.xtra { display:block; }

/**
 * GeSHi Dynamically Generated Stylesheet
 * --------------------------------------
 * Dynamically generated stylesheet for java
 * CSS class: , CSS id:
 * GeSHi (C) 2004 - 2007 Nigel McNie, 2007 - 2008 Benny Baumann
 * (http://qbnz.com/highlighter/ and http://geshi.org/)
 * --------------------------------------
 */
.java .de1, .java .de2 {font: normal normal 1em/1.2em monospace; margin:0; padding:0; 
background:none; vertical-align:top;}
.java  {font-family:monospace;}
.java .imp {font-weight: bold; color: red;}
.java li, .java .li1 {font-weight: normal; vertical-align:top;}
.java .ln {width:1px;text-align:right;margin:0;padding:0 2px;vertical-align:top;}
.java .li2 {font-weight: bold; vertical-align:top;}
.java .kw1 {color: #000000; font-weight: bold;}
.java .kw2 {color: #000066; font-weight: bold;}
.java .kw3 {color: #003399;}
.java .kw4 {color: #000066; font-weight: bold;}
.java .co1 {color: #666666; font-style: italic;}
.java .co2 {color: #006699;}
.java .co3 {color: #008000; font-style: italic; font-weight: bold;}
.java .coMULTI {color: #666666; font-style: italic;}
.java .es0 {color: #000099; font-weight: bold;}
.java .br0 {color: #009900;}
.java .sy0 {color: #339933;}
.java .st0 {color: #0000ff;}
.java .nu0 {color: #cc66cc;}
.java .me1 {color: #006633;}
.java .me2 {color: #006633;}
.java .ln-xtra, .java li.ln-xtra, .java div.ln-xtra {background-color: #ffc;}
.java span.xtra { display:block; }


        </style>