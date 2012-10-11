var shFinish = -1;//-1初始化值，1在上海，0不在上海，－2无法获悉行政区域

var DEBUG = true; //控制是否为测试模式

var ClickTime = 0;


function showYourPosition(map,point)
{
	//解决在用户移动状态下，定位出现多点问题，既我们的app会显示之前的定位点
	overlays = map.getOverlays();
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

function translateCallback (point) {	
	isInShanghai(point);
	
	if(map) {
   map.centerAndZoom(point, 15);
	
	//给地图添加监听器，移除刷新框
 	//map.addEventListener("click", function(){});
	
	 map.enablePinchToZoom();
	
	 showYourPosition(map,point);
	
	 //打开首页悬浮框
	 map.addEventListener("tilesloaded", function(){
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
	 });
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
	if (true || DEBUG) {
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


//读取文件
function readfile() {
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
            //console.log("Read as text");
            //console.log(evt.target.result);
			var arg=evt.target.result.split(";");
			//for(i=0;i<2;i++){
				var arg1=arg[0].split("=");
				var arg2=arg[1].split("=");
				access_token=arg2[1];
			//}
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        console.log(evt.target.error.code);
    }
}