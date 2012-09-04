function showshop(shop, type)
	{
$(document).ready(function(){
	var html ='';
	var tag = '';
	var star = '';
	$.getJSON('http://ihavecar.sinaapp.com/shopinfo.php?shop_id='+shop+'&type='+type+'&jasoncallback=?&randomID='+Math.random(), function(json){
		//random函数用来取消缓存影响,jsonp形式进行跨域传数据
		$.each(json,function(entryIndex,entry){
			if (type == '1') {
	      html+='<div style="font-size: 18px;"><b>'+entry['企业名称']+'</b></div>'; 
				html+='<hr size="1" color="#AAA"   align="center" />';
				html+='<div><a href="tel:62935474">许可证号：'+entry['经营许可证']+'</a></div>'; 
				html+='<hr size="1" color="#AAA"   align="center" />';
	            html+='<div>地址：'+entry['企业地址']+'</div>';   
				tag += entry['经营范围'];
				star += '<span id="star"></span><font style="float:right">共有' + entry['评分人数'] + '个评分</font><script type="text/javascript">$(function(){$("#star").raty({readOnly:	true,start: '+entry['评价']+'	});});</script>'; 
			} 
			if (type == '2') {
				html+='<div style="font-size: 18px;"><b>'+entry['企业名称']+'</b></div>'; 
				html+='<hr size="1" color="#AAA"   align="center" />';
				html+='<div><a href="tel:' + entry['联系电话'] +'">电话：'+entry['联系电话']+'</a></div>'; 
				html+='<hr size="1" color="#AAA"   align="center" />';
	            html+='<div>地址：'+entry['企业地址']+'</div>';   
				tag += entry['加油站属性'];
				star += '<span id="star"></span><font style="float:right">共有' + entry['评分人数'] + '个评分</font><script type="text/javascript">$(function(){$("#star").raty({readOnly:	true,start: '+entry['评分']+'	});});</script>'; 
			}
			$('#lng').html(entry['经度']);
			$('#lat').html(entry['纬度']);
	  });  
	  $('#shopinfo').html(html); 
		$('#shoptag').html(tag);
		$('#shopstar').html(star);
	}); 
});  


}// JavaScript Document