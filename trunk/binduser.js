function checkuser(openId)
	{
	function(){
		getJSON('http://ihavecar.sinaapp.com/checkuser.php?checkid=openId&jasoncallback=?&randomID='+Math.random(), function(json){
		//random函数用来取消缓存影响,jsonp形式进行跨域传数据
		}); 
	}
}