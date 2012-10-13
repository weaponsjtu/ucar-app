<?php
session_start();

include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );

if (isset($_REQUEST['code'])) {
	$keys = array();
	$keys['code'] = $_REQUEST['code'];
	$keys['redirect_uri'] = WB_CALLBACK_URL;
	try {
		$token = $o->getAccessToken( 'code', $keys ) ;
	} catch (OAuthException $e) {
	}
}

if ($token) {

$c = new SaeTClientV2( WB_AKEY , WB_SKEY , $token['access_token'] );
$ms  = $c->home_timeline(); // done
$uid_get = $c->get_uid();
$uid = $uid_get['uid'];
$user_message = $c->show_user_by_id( $uid);//根据ID获取用户等基本信息

  $json_arr['access_token'] = $token['access_token'];
  $json_arr['expires_in'] = $token['expires_in'];
  $json_arr['uid'] = $uid;
  $json_arr['image'] = $user_message['profile_image_url'];
  $json_arr['name'] = $user_message['screen_name'];
  $json_arr['current_time'] = time();
  $json_str = json_encode($json_arr);
  echo '<script>window.parent.postMessage('.$json_str.',"*");</script>';
  
	$_SESSION['token'] = $token;
	setcookie( 'weibojs_'.$o->client_id, http_build_query($token) );
?>
授权完成,请等待程序完成页面跳转<br />
<?php
} else {
?>
授权失败。
<?php
}