<?php
$json_arr['current_time'] = time();
$str = json_encode ( $json_arr);
echo $_GET["jasoncallback"]."(".$str.");"  ; 

?>