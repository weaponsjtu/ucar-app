function showGasoline(map,minlng,maxlng,minlat,maxlat)
{
	$.getJSON("http://ihavecar.sinaapp.com/getGasolinePlace.php?jasoncallback=?&randomID="+Math.random()+"&minlng="+minlng+"&maxlng="+maxlng+"&minlat="+minlat+"&maxlat="+maxlat,function (json) {
		var myIcon_Y = new BMap.Icon("img/pinY.png", new BMap.Size(31, 48), {anchor: new BMap.Size(15,48)});
		
		var myIcon_R = new BMap.Icon("img/pinR.png", new BMap.Size(31, 48), {anchor: new BMap.Size(15,48)});
	    
		$.each(json,function(entryIndex,entry) {
			var GasolinePoint = new BMap.Point(entry['经度'],entry['纬度']);
			var GasolineMarker =new BMap.Marker(GasolinePoint, {icon: myIcon_Y});
			map.addOverlay(GasolineMarker);
			
			/*var infohtml = "<div id='shopbox'>" +
			"<table style='padding: 5px;'>" +
			"<tr>" +
			  "<td>" + 
			     "<div class='label' style='font-size: 14px'>" + entry['企业名称'] + "</div>" +
				 "<div class='label' style='color: #ddd;'>" + entry['企业地址'] + "</div>" +
				 "<div id='star'></div>" +
			  "</td>" +
			  "<td   id='shopinfo'>" + 
			     "<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" +
			  "</td>" + 
			 "</tr>" +
			 "</table></div>";*/
			 var infohtml = "<div id='shopbox'>" +
			"<div class='label'>" + entry['企业名称'] + "</div>" +
			"<div class='label' style='font-size: 12px;'>" + entry['企业地址'] + "</div>" +
			"<div id='star'></div>" +
			"</div>";
			
			var infobox = new BMapLib.InfoBox(map, infohtml, {
				boxStyle:{
					 //width: screen.availWidth / 2 + "px",
				}
			,closeIconMargin: "1px 7px 0 0"
			,closeIconUrl: "img/close1.png"
			,enableAutoPan: true
			,align: INFOBOX_AT_BOTTOM
			});
			
			infobox.addEventListener("close", function(e) {
				for (var i = 0; i < overlays.length; i++) {
    		  if (overlays[i] instanceof BMap.Marker) {
						if (overlays[i].getTitle() != 'current' && overlays[i].getTitle() != 'search') {
							overlays[i].setIcon(myIcon_Y);
						}
				  }
			  }
			});
			
			GasolineMarker.addEventListener("click", function(){
				overlays = map.getOverlays();
				for (var i = 0; i < overlays.length; i++) {
					if (overlays[i] instanceof BMapLib.InfoBox) {
						overlays[i].close();
					}
					if (overlays[i] instanceof BMap.Marker) {
						if (overlays[i].getTitle() != 'current' && overlays[i].getTitle() != 'search') {
							overlays[i].setIcon(myIcon_Y);
						}
					}
				}
				GasolineMarker.setIcon(myIcon_R);
				infobox.open(GasolinePoint);
				$(function(){
					$('#star').raty({readOnly: true,start: entry['评分']});
					$('#shopinfo').css("background", 'url("img/infobox.png") no-repeat -389px -10px');
					if (DEBUG) {
						$('#shopinfo').click(function(){
						   window.location = "shopinfo.html?type=2&shopid="+entry['序号'];
					  });
					} else {
					  $('#shopinfo').live('tap',function(){
						  window.location = "shopinfo.html?type=2&shopid="+entry['序号'];
					  }).live('click',function(){
						  window.location = "shopinfo.html?type=2&shopid="+entry['序号'];
					  });
				  }
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

function enterSearch(map)
{
	if (event.keyCode == 13)
	{
		var enterContent = document.getElementById("search").value;
		SearchGasolinePlace(map,enterContent);
	}
}

function SearchGasolinePlace(map, searchContent)
{
    function searchComplete()
    {
        var searchResult = local.getResults().getPoi(0);
        if (searchResult != null && searchResult != undefined)
        {
            var searchPoint = searchResult.point;
            map.clearOverlays();
            map.centerAndZoom(searchPoint,15);
            var searchMarker = new BMap.Marker(searchPoint);
            map.addOverlay(searchMarker);
            var searchLabel = new BMap.Label(searchContent);
            searchLabel.setOffset(new BMap.Size(10,-10));
            searchMarker.setLabel(searchLabel);
            showGasolinePlace(map);
        }
        else
            alert("找不到该位置");
        
    }
    var local = new BMap.LocalSearch("上海",{onSearchComplete: searchComplete});
    local.search(searchContent);
}

// JavaScript Document