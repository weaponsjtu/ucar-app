function showcomment(shop)
	{
$(document).ready(function(){
	var html='<table>';	
	$.getJSON('http://ihavecar.sinaapp.com/usercomment.php?shop_id='+shop+'&jasoncallback=?&randomID='+Math.random(), function(json){
		//random函数用来取消缓存影响,jsonp形式进行跨域传数据
		$.each(json,function(entryIndex,entry){
				html+='<tr><td><img style="padding: 10px;" src="'+entry['photo']+'" width="60" height="60"></td>';
	            html+='<td><b>'+entry['nickname'] + '</b>&nbsp;&nbsp;&nbsp;&nbsp;'; 
				html+='<span id="star'+entry['comment_id']+'"></span><script type="text/javascript">$(function(){$("#star'+entry['comment_id']+'").raty({readOnly:	true,start:		'+entry['score']+'	});});</script>'; 
	            html+='<br><p>'+entry['content']+'</p>'; 
				//html+=''+entry['time']+'  </td>';    
	            html+='</tr>';  
				
	    });
		html+='</table>'   
	    $('#comment').html(html); 
	}); 
});  


		}
		// JavaScript Document