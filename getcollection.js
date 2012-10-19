function getcollection(uid) {
	$(document).ready(function(){
		var html='<table id="table">';	
		$.getJSON('http://ihavecar.sinaapp.com/collection.php?jasoncallback=?&uid='+uid+'&randomID='+Math.random(), function(json){
		//random函数用来取消缓存影响,jsonp形式进行跨域传数据
			$.each(json,function(entryIndex,entry){
				html+='<tr>';
				html+='<td><div id="shopIdType" style="display:none">'+entry['userid']+'#'+entry['shopid']+'#'+entry['shoptype']+'</div></td>';
				html+='<td><img src="img/car.jpg" style="width: 100px; height: 100px"></td>';
	            html+='<td><b style="font-size: 18px; margin: 10px 0;">'+entry['企业名称']+'</b><br>'; 
				html+='<font>'+entry['企业地址']+' </font>'; 
				html+='<div style="padding: 10px 0;" id="star'+entry['序号']+'"></div><script type="text/javascript">$(function(){$("div#star'+entry['序号']+'").raty({readOnly:	true,start:		'+entry['评分']+'	});});</script></td>'; 
				html+='<td id="wrap_delete"> <a href="#" class="delete" onclick="shopDelete(event)">Delete</a> </td>';
	            html+='</tr>';  
	      });
			html+='</table>';   
	    	$('#collection').html(html); 
		}); 
	});  
}