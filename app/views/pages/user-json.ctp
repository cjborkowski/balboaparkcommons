<?php

//create and publish JSON data
$data = array("name" => "Hagrid", "age" => "36");                                                         

$data_string = json_encode($data);                                                                        

echo $data_string;

?>

