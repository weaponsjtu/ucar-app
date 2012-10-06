function showGasoline(map,minlng,maxlng,minlat,maxlat)
{
	$.getJSON("http://ihavecar.sinaapp.com/getGasolinePlace.php?jasoncallback=?&randomID="+Math.random()+"&minlng="+minlng+"&maxlng="+maxlng+"&minlat="+minlat+"&maxlat="+maxlat,function (json) {
		var myIcon_Y = new BMap.Icon("img/pinY.png", new BMap.Size(31, 48), {anchor: new BMap.Size(15,48)});
		
		var myIcon_R = new BMap.Icon("img/pinR.png", new BMap.Size(31, 48), {anchor: new BMap.Size(15,48)});
	    
		$.each(json,function(entryIndex,entry) {
			var GasolinePoint = new BMap.Point(entry['经度'],entry['纬度']);
			var GasolineMarker =new BMap.Marker(GasolinePoint, {icon: myIcon_Y});
			map.addOverlay(GasolineMarker);
			
			 var infohtml = "<div id='shopbox' style='opacity: 0.95;'><table><tr><td id='wrap'>" +
			"<div class='label'>" + entry['企业名称'] + "</div>" +
			//"<div class='label' style='font-size: 12px;'>" + entry['企业地址'] + "</div>" +
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
			
			
			GasolineMarker.addEventListener("click", function(){
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
        	 GasolineMarker.setIcon(myIcon_R);
        	 GasolineMarker.setTitle("open");
        	 infobox.open(GasolinePoint);
        	 $(function(){
					        $('#star').raty({readOnly: true,start: entry['评分']});
				  
				          if (DEBUG) {
						         $("td#wrap").click(function(){
						             window.location = "shopinfo.html?type=2&shopid="+entry['序号'];
					           });
					        } else {
					            $("td#wrap").live('tap',function(){
						             window.location = "shopinfo.html?type=2&shopid="+entry['序号'];
					            }).live('click',function(){
						             window.location = "shopinfo.html?type=2&shopid="+entry['序号'];
					            });
				          }
				    });
        } else {
        	 if (GasolineMarker.getTitle() == 'open') {
        	 	  GasolineMarker.setTitle('');
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
				      
				      GasolineMarker.setIcon(myIcon_R);
				      GasolineMarker.setTitle("open");
				      infobox.open(GasolinePoint);
				      
				      $(function(){
					        $('#star').raty({readOnly: true,start: entry['评分']});
				  
				          if (DEBUG) {
						         $("td#wrap").click(function(){
						             window.location = "shopinfo.html?type=2&shopid="+entry['序号'];
					           });
					        } else {
					            $("td#wrap").live('tap',function(){
						             window.location = "shopinfo.html?type=2&shopid="+entry['序号'];
					            }).live('click',function(){
						             window.location = "shopinfo.html?type=2&shopid="+entry['序号'];
					            });
				          }
				  
				      });
				    }
				 }
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