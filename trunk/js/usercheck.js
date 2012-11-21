function usercheck(){
	$(document).ready(function(){
	var music="<table>";
	$.getJSON('https://graph.qq.com/user/get_user_info?access_token=40E4FBB667C41EBD4656236CB917EFC4&oauth_consumer_key=100284268&openid=D08D45C9F3E2F67A5B96EA312FFF61D8&jasoncallback=?&randomID='+Math.random(), function(json){
		//random函数用来取消缓存影响,jsonp形式进行跨域传数据
		$.each(data,function(i,n){
				music+="<a>"+n["nickname"]+"</a>";
			});
			music+="</table>";
			$('#user').append(music);
		});
	});
}
