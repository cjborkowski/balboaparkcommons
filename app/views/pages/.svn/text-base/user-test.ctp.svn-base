<?php
// DO NOT USE in final app
// test page for retriving JSON data from remote servers other than piction
// proof of concempt to get menu items from balboapark.org as json data


$ch = curl_init('http://www.chrisborkowski.org/rest/users-json.php');                                     
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                          
curl_setopt($ch, CURLOPT_POSTFIELDS);                                                      
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                           
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                              
    'Content-Type: application/json',                                                                     
    'Content-Length: ' )                                                            

);                                                                                                        


$result = curl_exec($ch);

echo "SIMPLE ECHO <br />";
echo $result;
echo "<br />";
echo "<br />";
echo "VAR DUMP <br />";
var_dump($result);
echo "<br />";
//echo $data_string;

echo "<br />";
echo "JSON AS OBJECT <br />";
echo "<br />";
echo "FOREACH LOOP ECHO <br />";

$jsonurl = "http://www.chrisborkowski.org/rest/users-json.php";
//$jsonurl = "http://search.twitter.com/trends.json";
$json = file_get_contents($jsonurl,0,null,null);

$json_output = json_decode($json);

foreach ( $json_output as $names )
{
    echo "{$names}<br />";
}

echo "<br />";     
echo "PRINT_R <br />";
print_r($json_output);

?>