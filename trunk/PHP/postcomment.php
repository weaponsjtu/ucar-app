<?php

$GetFiltReq='select|insert|update|delete|union|into|load_file|outfile' ;
$Err = 'Input Blocked.';
//注释项暂时无法通过SAE检查

$con = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS) or die('Could not connect: ' . mysql_error());
mysql_query("SET NAMES 'utf8'");
mysql_query("SET CHARACTER_SET_CLIENT=utf8");
mysql_query("SET CHARACTER_SET_RESULTS=utf8");


foreach ($_GET as $GET_key=>$GET_var){
 
 	if (is_numeric($GET_var)) {
 	  $_GET["$GET_key"]=intval($GET_var);   //禁用浮点
	 } else {
          $GET_var = "'" . mysql_real_escape_string($GET_var). "'";		// 特殊字符转义
  		 if(preg_match("/".$GetFiltReq."/i", $GET_var)==1){   //禁用一些SQL操作敏感字
    			$GET_var = $Err;
   		}
   	$_GET["$GET_key"]=$GET_var;
        
 	} 
}



$shopid=$_GET["shopid"];
$type=$_GET["type"];
$userid=$_GET["userid"];
$score=$_GET["score"];
$content=$_GET["content"];

$con = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS) or die('Could not connect: ' . mysql_error());

$table = "autorepair";

if ($type == '2') {
	$table = "gasoline";
}

if ($type == '3') {
	$table = "park";
}

mysql_query("SET NAMES 'UTF8'");

mysql_select_db(SAE_MYSQL_DB, $con) or die ("Could not find Designated Database");

mysql_query("INSERT INTO comment(shoptype,shopid,userid,score,content,time) VALUES ($type,$shopid, '$userid',$score,$content,now())");

mysql_query("UPDATE " . $table . " SET 评分=(评分*评分人数+$score)/(评分人数+1) where 序号=$shopid");
 
mysql_query("UPDATE " . $table . " SET 评分人数=评分人数+1 where 序号=$shopid");

mysql_close($con);
?>
