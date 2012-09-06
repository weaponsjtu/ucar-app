﻿var shFinish = -1;//-1初始化值，1在上海，0不在上海，－2无法获悉行政区域

var DEBUG = false; //控制是否为测试模式


function showYourPosition(map,point)
{
	var myIcon = new BMap.Icon("img/position.png", new BMap.Size(32, 32));
	var marker =new BMap.Marker(point, {icon: myIcon, title: 'current'});
	map.addOverlay(marker);
}

//判断是否在上海
function isInShanghai(point)
{
    var myGeo = new BMap.Geocoder();
    myGeo.getLocation(point,
        function (geoResult)
        {
            if (geoResult)
            {
                if (geoResult.addressComponents.province == "上海市" || geoResult.addressComponents.city == "上海市")
                {
                	$("#current").html(geoResult.address);
                	shFinish = 1;
                    /* alert ("在上海"); */
                }
                else
                {
                    shFinish = 0;
                    alert("不在上海");
                }
            }
            else
            {
                alert("找不到你的位置");
                shFinish = -2;
            }
        });
        
}

function mapClick(event){
	 allPrpos(event);
 	 clickTime += 1;
 	 if (clickTime%2 == 1) {
 	 	//alert("map start");
		//alert("hello");
 		num = 0;
 		overlays = map.getOverlays();
 		for (var i = 0; i < overlays.length; i++) {
 			if (overlays[i] instanceof BMapLib.InfoBox) {
 				num += 1;
 			}
 		}
 		
 		//alert(clickTime + "fds" +num);
 		
 		if ( num > 0) {
			overlays = map.getOverlays();
			var myIcon_Y = new BMap.Icon("img/pinY.png", new BMap.Size(61, 94));
			for (var i = 0; i < overlays.length; i++) {
				if (overlays[i] instanceof BMapLib.InfoBox) {
					overlays[i].close();
				}
				if (overlays[i] instanceof BMap.Marker) {
					if (overlays[i].getTitle() != 'current') {
						overlays[i].setIcon(myIcon_Y);
					}
				}
			}
		}
		//alert("map end");
	 }
	}

var clickTime = 0;
function translateCallback (point) {	
	isInShanghai(point);
	
	if(map) {
  map.centerAndZoom(point, 15);
	
	//给地图添加监听器，移除信息框
 	//map.addEventListener("click", mapClick);
	
	map.enablePinchToZoom();
	
	showYourPosition(map,point);
	
	//打开首页悬浮框
	if($("#title  .ui-btn-text").html() == "首页"){
		$("#infobox").popup("open");
	} 
  }
}

//移动版
function showgps_product(position)
{
	if (position)
	{
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var gpspoint = new BMap.Point(longitude,latitude);
		BMap.Convertor.translate(gpspoint,0,translateCallback);

	}
	else
		alert("无法获取位置");
	
}


//模拟器测试版
function showgps_debug(position)
{
		var gpspoint = new BMap.Point(121.42559,31.01726);
		BMap.Convertor.translate(gpspoint,0,translateCallback);
}
    
function getGPS()
{
	if (DEBUG) {
		showgps_debug();
	} else {
		var gps = navigator.geolocation;
		if (gps)
		{
			gps.getCurrentPosition(showgps_product,
			function (error)
			{
				//alert('got an error: ' + error.code + 'message: ' + error.message);
	            alert ("未打开GPS");
			},
			{timeout:20000,enableHighAccuracy: true});
		}
		else
		{
			showgps_product();
		}
	}
}

//打印对象的所有值
function  allPrpos(obj) {
    // 用来保存所有的属性名称和值
    var   props = "" ;
    // 开始遍历
    for ( var   p in obj ){
        // 方法
        if ( typeof ( obj [ p ]) == " function " ){
            obj [ p ]() ;
        } else {
            // p 为属性名称，obj[p]为对应属性的值
            props += "Obj."+p + " = " + obj [ p ] + " \t<br /> " ;
        }
    }
    // 最后显示所有的属性
		alert(props);
}