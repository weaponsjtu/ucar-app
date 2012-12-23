function showshop(shop, type)
	{
$(document).ready(function(){
	var html ='';
	var star = '';
	$.getJSON('http://ihavecar.sinaapp.com/shopinfo.php?shop_id='+shop+'&type='+type+'&jasoncallback=?&randomID='+Math.random(), function(json){
		//random函数用来取消缓存影响,jsonp形式进行跨域传数据
		$.each(json,function(entryIndex,entry){
			
				shopname=entry['企业名称'];
	      html+='<div style="font-size: 24px; "><b>'+entry['企业名称']+'</b></div><br>'; 
				//html+='<div id="shopdetails"><div><br><a href="tel:' + entry['联系电话'] + '" style="font-size: 18px; padding: 10px 0 0 10px;">电话：'+entry['联系电话']+'</a></div>';
				html+='<div id="shopdetails"><div style="font-size: 18px;font-family:黑体; padding: 10px 4px 15px 10px;">电话：'+entry['联系电话']+'<a href="tel:' + entry['联系电话'] + '"><img src="img/phone.png" align="right" style="padding: 0 0 0 3px;margin-right:10px;"></a></div>';
				html+='<hr size="1" color="#AAA"   align="center" />';
	      html+='<div style="font-size: 18px;font-family:黑体; padding: 0 10px 20px 10px;">地址：'+entry['企业地址']+'<img src="img/location.png" align="right" style="padding: 0 3px 3px 3px;margin-right:4px;"></div></div>';   
				star += '<span id="star"></span><script type="text/javascript">$(function(){$("#star").raty({readOnly:	true,size:      24,'
				+ 'starHalf:  "star-half-big.png",'
				+ 'starOff:   "star-off-big.png",'
				+ 'starOn:    "star-on-big.png", start: '+entry['评分']+'	});});</script>'; 
			lng=entry['经度'];
			lat=entry['纬度'];
			$('#back').attr("href", "index.html?type=" + type + "&lng=" + lng + "&lat=" + lat);
	  });  
	  $('#shopinfo').html(html); 
		$('#shopstar').html(star);
	}); 
});  


}// JavaScript Document