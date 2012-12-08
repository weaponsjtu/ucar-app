function showShop(map,minlng,maxlng,minlat,maxlat,type)
{
	$.getJSON("http://ihavecar.sinaapp.com/getShopPlace.php?jasoncallback=?&randomID="+Math.random()+"&minlng="+minlng+"&maxlng="+maxlng+"&minlat="+minlat+"&maxlat="+maxlat+"&type=" +type,function (json) {
		var myIcon_Y = new BMap.Icon("img/pinY.png", new BMap.Size(45, 69), {anchor: new BMap.Size(22,69)});
		
		var myIcon_R = new BMap.Icon("img/pinR.png", new BMap.Size(45, 69), {anchor: new BMap.Size(22,69)});
		if (json.length > 0) {
			$("#refreshBox").popup("close");
		}
		$.each(json,function(entryIndex,entry) {
			var ShopPoint = new BMap.Point(entry['经度'],entry['纬度']);
			var ShopMarker =new BMap.Marker(ShopPoint, {icon: myIcon_Y});
			map.addOverlay(ShopMarker);

			var infohtml = "<div id='shopbox' style='opacity: 0.95;'><table><tr><td id='wrap'>" +
			"<div class='label'>" + entry['企业名称'] + "</div>" +
			"<div id='star'></div></td>" +
			"<td id='shopinfo'>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>" +
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
		
			
			ShopMarker.addEventListener("click", function(){
				var flag = false;
        overlays = map.getOverlays();
        for (var i = 0; i < overlays.length; i++) {
        	 if (overlays[i] instanceof BMap.Marker) {
        	 	  if (overlays[i].getTitle() == 'open') {
        	 	  	 flag = true;
        	 	  	 break;
        	 	  }
        	 }
        }
        
        if (!flag) {
        	 ShopMarker.setIcon(myIcon_R);
        	 ShopMarker.setTitle("open");
        	 infobox.open(ShopPoint);
					        $('#star').raty({readOnly: true,start: entry['评分']});
				  
				          if (DEBUG) {
						         $("td#wrap").click(function(){
						             window.location = "shopinfo.html?type="+type+"&shopid="+entry['序号'];
					           });
					        } else {
					            $("td#wrap").live('tap',function(){
						             window.location = "shopinfo.html?type="+type+"&shopid="+entry['序号'];
					            });
				          }
        } else {
        	 if (ShopMarker.getTitle() == 'open') {
        	 	  ShopMarker.setTitle('');
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
        	 } else {
        	 	  overlays = map.getOverlays();
				      for (var i = 0; i < overlays.length; i++) {
					      if (overlays[i] instanceof BMapLib.InfoBox) {
						       overlays[i].close();
					      }
					      if (overlays[i] instanceof BMap.Marker) {
						       if (overlays[i].getTitle() != 'current' && overlays[i].getTitle() != 'search') {
							        overlays[i].setIcon(myIcon_Y);
						       }
						       if (overlays[i].getTitle() == 'open') {
						       	  overlays[i].setTitle('');
						       }
					      }
				      }
				      
				      ShopMarker.setIcon(myIcon_R);
				      ShopMarker.setTitle("open");
				      infobox.open(ShopPoint);
				      
					        $('#star').raty({readOnly: true,start: entry['评分']});
				  
				          if (DEBUG) {
						         $("td#wrap").click(function(){
						             window.location = "shopinfo.html?type="+type+"&shopid="+entry['序号'];
					           });
					        } else {
					            $("td#wrap").live('tap',function(){
						             window.location = "shopinfo.html?type="+type+"&shopid="+entry['序号'];
					            });
				          }
				    }
				 }
			});
		});
	});
}

function showShopPlace(map, type)
{
	$("#refreshBox").popup("open");
	var bounds = map.getBounds();
	var sw = bounds.getSouthWest();
	var ne = bounds.getNorthEast();
	var minlng=sw.lng;
	var maxlng=ne.lng;
	var minlat=sw.lat;
	var maxlat=ne.lat;
	showShop(map,minlng,maxlng,minlat,maxlat, type);
}

function enterSearch(map, type)
{
	if (event.keyCode == 13)
	{
		var enterContent = document.getElementById("search").value;
		SearchShopPlace(map,enterContent, type);
	}
}

function SearchShopPlace(map, searchContent, type)
{
    function searchComplete()
    {
        var searchResult = local.getResults().getPoi(0);
        if (searchResult != null && searchResult != undefined)
        {
            var searchPoint = searchResult.point;
            map.clearOverlays();
            map.panTo(searchPoint);
            var searchMarker = new BMap.Marker(searchPoint, {title: 'search'});
            map.addOverlay(searchMarker);
            showShopPlace(map, type);
        }
        else
            alert("找不到该位置");
        
    }
    var local = new BMap.LocalSearch("上海市",{onSearchComplete: searchComplete});
    local.search(searchContent);
}


// JavaScript Document