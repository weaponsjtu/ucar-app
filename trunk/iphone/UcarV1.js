var shFinish = -1;//-1初始化值，1在上海，0不在上海，－2无法获悉行政区域

var DEBUG = false; //控制是否为测试模式

var ClickTime = 0;


function showYourPosition(map,point)
{
	//解决在用户移动状态下，定位出现多点问题，既我们的app会显示之前的定位点
	var overlays = map.getOverlays();
	for (var i = 0; i < overlays.length; i++) {
    if (overlays[i] instanceof BMap.Marker) {
		  if (overlays[i].getTitle() == 'current') {
		  	map.removeOverlay(overlays[i]);
		  }
	  }
	}
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
                	$("#current").html("当前位置:&nbsp;&nbsp;" + geoResult.address);
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
                alert("找不到您的位置");
                shFinish = -2;
            }
        });
        
}

function translateCallback (point) {	
	isInShanghai(point);
	
	if(map) {
		
	   map.centerAndZoom(point, 18);
	
	 	 map.enablePinchToZoom();
	 	 $("#container").css("height", document.body.clientHeight - $("#container").offset().top - $("#footer").height());
	   showYourPosition(map,point);
	
	 //打开首页悬浮框
	 /*map.addEventListener("tilesloaded", function(){	 	
	  if($("#title  .ui-btn-text").html() == "首页"){
		 $("#suspendBox").popup("open");
	  } 
	  
	  var flag = false;
        overlays = map.getOverlays();
        for (var i = 0; i < overlays.length; i++) {
        	 if (overlays[i] instanceof BMap.Marker) {
        	 	  flag = true; 
        	 	  break;
        	 }
        }	
        if (flag) {
           $("#refreshBox").popup("close");		
     }
	 });*/
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
	if (DEBUG) {   //true开启固定坐标，false使用GPS
		showgps_debug();
	} else {
		var gps = navigator.geolocation;
		if (gps)
		{
			gps.getCurrentPosition(showgps_product,
			function (error)
			{
	        alert ("UCAR需要GPS定位来获取您的位置信息。请在系统设置中打开GPS");
			},
			{timeout:20000,enableHighAccuracy: true});
		}
		else
		{
			showgps_product();
		}
	}
}

function ucar(map, type, lng, lat) {
	//显示搜索框
	$("#searchBox").css("display", "block");
	
	$("#container").css("height", document.body.clientHeight - $("#container").offset().top - $("#footer").height());
	
	map.clearOverlays();
	
    /*
	//显示当前位置
	getGPS();
	
	if (lng != "" && lat != "") {
		var newpoint = new BMap.Point(lng.valueOf(),lat.valueOf());
		map.panTo(newpoint);
	}
     */
     

	map.addControl(new BMap.ScaleControl());
	
	//添加刷新控件
	function ZoomControl_TR(){
		this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
		this.defaultOffset = new BMap.Size(5,5);
	}
	ZoomControl_TR.prototype = new BMap.Control();
	ZoomControl_TR.prototype.initialize = function(map) {
		var div = document.createElement("div");
		div.innerHTML = "<a href='#refreshBox'  data-rel='popup' data-role='button' data-position-to='window' data-transition='slidedown'><img style='width: 90px; height: 88px;' src='img/loading.png'></a>";
		div.style.cursor = "pointer";
		div.onclick = function (e) {
			showShopPlace(map,type);
		}
		map.getContainer().appendChild(div);
		return div;
	}
	var myZoomCtrl_TR = new ZoomControl_TR();
	map.addControl(myZoomCtrl_TR);
	
	//添加定位控件
	function ZoomControl_BR(){
		this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
		this.defaultOffset = new BMap.Size(5,5);
	}
	ZoomControl_BR.prototype = new BMap.Control();
	ZoomControl_BR.prototype.initialize = function(map) {
		var div = document.createElement("div");
		
		div.innerHTML = "<img style='width: 90px; height: 88px;' src='img/pin.png'>";
		div.style.cursor = "pointer";
		div.onclick = function (e) {
			getGPS();
		}
		map.getContainer().appendChild(div);
		return div;
	}
	var myZoomCtrl_BR = new ZoomControl_BR();
	map.addControl(myZoomCtrl_BR);
	
	//添加缩放控件
	function ZoomControl_TL(){
		this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
		this.defaultOffset = new BMap.Size(5,5);
	}
	ZoomControl_TL.prototype = new BMap.Control();
	ZoomControl_TL.prototype.initialize = function(map) {		
		div = document.createElement("div");
		div.innerHTML = "<img src='img/zoomOut.png' style='cursor: pointer; width: 64px; height: 61px; margin-top: 4px;' onclick='map.zoomIn()'><br>" +
		"<img src='img/zoomIn.png' style='cursor: pointer; width: 64px; height: 60px; margin-top: 8px;' onclick='map.zoomOut()'>";
		map.getContainer().appendChild(div);
		return div;
	}
	var myZoomCtrl_TL = new ZoomControl_TL();
	map.addControl(myZoomCtrl_TL);

	showShopPlace(map, type);
    //alert("dd");
	if (type == 1) {
		$("#title  .ui-btn-text").html("保养与维修");
	}  else if (type == 2) {
		$("#title  .ui-btn-text").html("加油站");
	} else if (type == 3) {
		$("#title  .ui-btn-text").html("停车场");
	} else {
		alert('wrong type');
	}
    //alert("x");

}

//打印对象的所有值
function  allPrpos(obj) {
    var   props = "" ;
    for ( var   p in obj ){
        if ( typeof ( obj [ p ]) == " function " ){
            obj [ p ]() ;
        } else {
            props += "Obj."+p + " = " + obj [ p ] + " \t<br /> " ;
        }
    }
		alert(props);
}


//读取文件
function readfile(msg) {
	document.addEventListener("deviceready", onDeviceReady, false);
    // PhoneGap is ready
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("ucar/DataFile.txt", {create: true}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        readAsText(file);
    }

    function readAsText(file) {
				//alert("hello");
        var reader = new FileReader();
        reader.onloadend = function(evt) {
					if (arg==""){
                alert(msg);
								window.location.href ='login.html';
            }else{
                //Read Loginfile
                
                var arg1=arg[0].split("=");
								var arg2=arg[1].split("=");
								var arg3=arg[2].split("=");
								var arg4=arg[3].split("=");
            
								var uid=arg1[1];
                                alert("uid" + uid);
				
           			window.location.href = "collect.html?uid="+uid;
					}
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        alert(msg);
        window.location.href ='login.html';
    }
}

function request(strName) { 
    var strHref = window.location.href; 
    var intPos = strHref.indexOf("?"); 
    var strRight = strHref.substr(intPos + 1); 

    var arrTmp = strRight.split("&"); 
    for(var i = 0; i < arrTmp.length; i++) { 
        var arrTemp = arrTmp[i].split("="); 

        if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1]; 
    } 
    return ""; 
} 
