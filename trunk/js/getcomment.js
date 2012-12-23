function showcomment(shopid, type)
	{
$(document).ready(function(){
	var count=0;
	var html='<table>';	
	$.getJSON('http://ihavecar.sinaapp.com/usercomment.php?shop_id='+shopid+'&type='+type+'&jasoncallback=?&randomID='+Math.random(), function(json){
		//random函数用来取消缓存影响,jsonp形式进行跨域传数据
		$.each(json,function(entryIndex,entry){
			if(count<1){
				html+='<tr><td><img style="font-size: 18px;font-family:黑体;padding: 0 0 0 5px;margin-top:-350px;" src="'+entry['image']+'" width="45" height="45"></td>';
	            html+='<td><br><b>'+entry['nickname'] + '</b>&nbsp;&nbsp;&nbsp;&nbsp;';
				html+='<span ><a href="allcomment.html?shopid='+shopid+'&type='+type+'" id="more" rel="external" align="right" style="margin-left:80px">更多</a>';
				html+='<br><span id="star'+entry['commentid']+'"></span><script type="text/javascript">$(function(){$("#star'+entry['commentid']+'").raty({readOnly:	true,start:		'+entry['score']+'	});});</script>'; 
				time=entry['time'].split(" ");
				html+='<br><b>'+time[0]+'</b>'; 
	            html+='<br><p sytle="style="font-size: 18px;font-family:黑体;">'+entry['content']+'</p>'; 
				//html+=''+entry['time']+'  </td>';    
	            html+='</tr>';}
				count++;
	    });
		html+='</table>';
	    $('#comment').html(html); 
	}); 
});  
}
		// JavaScript Document
		
function showall(shopid, type)
	{
$(document).ready(function(){
	var html='<table>';	
	$.getJSON('http://ihavecar.sinaapp.com/usercomment.php?shop_id='+shopid+'&type='+type+'&jasoncallback=?&randomID='+Math.random(), function(json){
		//random函数用来取消缓存影响,jsonp形式进行跨域传数据
		$.each(json,function(entryIndex,entry){
				html+='<tr><td><img style="font-size: 18px;font-family:黑体;padding: 0 0 0 5px;margin-top:-350px;" src="'+entry['image']+'" width="45" height="45"></td>';
	            html+='<td><br><b>'+entry['nickname'] + '</b>&nbsp;&nbsp;&nbsp;&nbsp;';
				html+='<br><span id="star'+entry['commentid']+'"></span><script type="text/javascript">$(function(){$("#star'+entry['commentid']+'").raty({readOnly:	true,start:		'+entry['score']+'	});});</script>'; 
				time=entry['time'].split(" ");
				html+='<br><b>'+time[0]+'</b>'; 
	            html+='<br><p sytle="style="font-size: 18px;font-family:黑体;">'+entry['content']+'</p>'; 
				//html+=''+entry['time']+'  </td>';    
	            html+='</tr>';
	    });
		html+='</table>';
	    $('#allcomment').html(html); 
	}); 
});  
}