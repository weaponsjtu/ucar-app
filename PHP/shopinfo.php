<?php
$shopid = $_GET["shop_id"];
$type = $_GET["type"];

$con = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS) or die('Could not connect: ' . mysql_error());

mysql_query("SET NAMES 'UTF8'");

mysql_select_db(SAE_MYSQL_DB, $con) or die ("Could not find Designated Database");

$table = "autorepair";

if ($type == '2') {
	$table = "gasoline";
}

if ($type == '3') {
	$table = "park";
}

$result = mysql_query("SELECT * FROM " . $table . " WHERE 序号=" . $shopid);
$num_rows = @mysql_num_rows ( $result ); //看一下返回多少行记录

    if ($num_rows == 0) {  
        $backdata = array (); //这样长度为0 返回的是一个空数组               
    } else {  
       while ( $row = mysql_fetch_array ( $result) ) {  
           $backdata [] = $row;  
        }  
    }  
    $str = json_encode ( $backdata ); 
	
	echo $_GET["jasoncallback"]."(".$str.");"  ; 
	
mysql_close($con);
?>