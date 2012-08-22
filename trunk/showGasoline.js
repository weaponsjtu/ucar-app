function showGasoline(map,minlng,maxlng,minlat,maxlat)
{
	$.getJSON("http://ihavecar.sinaapp.com/getGasolinePlace.php?jasoncallback=?&randomID="+Math.random()+"&minlng="+minlng+"&maxlng="+maxlng+"&minlat="+minlat+"&maxlat="+maxlat,function (json) {
		var myIcon_Y = new BMap.Icon("img/定位PIN-黄.png", new BMap.Size(74, 101), {
     		  anchor: new BMap.Size(12, 34),
		});
		
		var myIcon_R = new BMap.Icon("img/定位PIN-红.png", new BMap.Size(25, 34), {
     		  anchor: new BMap.Size(12, 34),
		});
	    
		$.each(json,function(entryIndex,entry) {
			var GasolinePoint = new BMap.Point(entry['经度'],entry['纬度']);
			var GasolineMarker =new BMap.Marker(GasolinePoint, {icon: myIcon_Y});
			map.addOverlay(GasolineMarker);
			
			var infohtml = "<div id='shopbox' class='box'>" +
			"<table style='padding: 5px;'>" +
			"<tr>" +
			  "<td><img class='icon' src='" + entry['图片'] + "'></td>" + 
			  "<td>" + 
			     "<div class='label' style='font-size: 14px'>" + entry['加油站名称'] + "</div>" +
				 "<div class='label' style='color: #ddd;'>" + entry['加油站地址'] + "</div>" +
				 "<div id='star'></div>" +
			  "</td>" +
			  "<td   id='shopinfo'>" + 
			     "<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" +
			  "</td>" + 
			 "</tr>" +
			 "</table></div>";
			
			var infobox = new BMapLib.InfoBox(map, infohtml, {
				boxStyle:{
					 //width: screen.availWidth / 2 + "px",
				}
			,closeIconMargin: "1px 1px 0 0"
			,closeIconUrl: "img/close.png"
			,enableAutoPan: true
			,align: INFOBOX_AT_BOTTOM
			});
			
			GasolineMarker.addEventListener("click", function(){
				overlays = map.getOverlays();
				for (var i = 0; i < overlays.length; i++) {
					if (overlays[i] instanceof BMapLib.InfoBox) {
						overlays[i].close();
					}
					if (overlays[i] instanceof BMap.Marker) {
						overlays[i].setIcon(myIcon_Y);
					}
				}
				GasolineMarker.setIcon(myIcon_R);
				infobox.open(GasolinePoint);
				$(function(){
					$('#star').raty({readOnly: true,start: entry['评分总和']});
					$('#shopinfo').css("background", 'url("img/悬浮框.png") no-repeat -389px -10px');
					$('#shopinfo').click(function(e) {
                        window.location.href = "shopinfo.html?type=2&shopid="+entry['序号'];
                    });
				});
				
			});
		});
	});
}

function showGasolinePlace(map)
{
	var bounds = map.getBounds();
	var sw = bounds.getSouthWest();
	var ne = bounds.getNorthEast();
	var minlng=sw.lng;
	var maxlng=ne.lng;
	var minlat=sw.lat;
	var maxlat=ne.lat;
	showGasoline(map,minlng,maxlng,minlat,maxlat);

	
}	

function SearchGasolinePlace(map)
{
	var searchContent = document.getElementById("search").value;
	var myGeo = new BMap.Geocoder();
	myGeo.getPoint(searchContent,function(searchPoint) {
		if (searchPoint) {
			map.centerAndZoom(searchPoint, 15);
			var searchMarker =new BMap.Marker(searchPoint);
			map.addOverlay(searchMarker);
			var searchLabel = new BMap.Label(searchContent);
			searchLabel.setOffset(new BMap.Size(10,-10));
			searchMarker.setLabel(searchLabel);
			showRepairPlace(map);		
		}
		else
		{
			alert ("CAN NOT find the place");
		}
	},"上海市");
}

// JavaScript Document