function showPark(map,minlng,maxlng,minlat,maxlat)
{
	$.getJSON("http://ihavecar.sinaapp.com/getParkPlace.php?jasoncallback=?&randomID="+Math.random()+"&minlng="+minlng+"&maxlng="+maxlng+"&minlat="+minlat+"&maxlat="+maxlat,function (json) {
		var myIcon_Y = new BMap.Icon("img/pinY.png", new BMap.Size(31, 48), {anchor: new BMap.Size(15,48)});
		
		var myIcon_R = new BMap.Icon("img/pinR.png", new BMap.Size(31, 48), {anchor: new BMap.Size(15,48)});
		if (json.length > 0) {
			$("#refreshBox").popup("close");
		}
		$.each(json,function(entryIndex,entry) {
			var ParkPoint = new BMap.Point(entry['����'],entry['γ��']);
			var ParkMarker =new BMap.Marker(ParkPoint, {icon: myIcon_Y});
			map.addOverlay(ParkMarker);

			var infohtml = "<div id='shopbox' style='opacity: 0.95;'><table><tr><td id='wrap'>" +
			"<div class='label'>" + entry['��ҵ����'] + "</div>" +
			//"<div class='label' style='font-size: 12px;'>" + entry['��ҵ��ַ'] + "</div>" +
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
		
			
			ParkMarker.addEventListener("click", function(){
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
        	 ParkMarker.setIcon(myIcon_R);
        	 ParkMarker.setTitle("open");
        	 infobox.open(ParkPoint);
        	 $(function(){
					        $('#star').raty({readOnly: true,start: entry['����']});
				  
				          if (DEBUG) {
						         $("td#wrap").click(function(){
						             window.location = "shopinfo.html?type=3&shopid="+entry['���'];
					           });
					        } else {
					            $("td#wrap").live('tap',function(){
						             window.location = "shopinfo.html?type=3&shopid="+entry['���'];
					            }).live('click',function(){
						             window.location = "shopinfo.html?type=3&shopid="+entry['���'];
					            });
				          }
				    });
        } else {
        	 if (ParkMarker.getTitle() == 'open') {
        	 	  ParkMarker.setTitle('');
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
				      
				      ParkMarker.setIcon(myIcon_R);
				      ParkMarker.setTitle("open");
				      infobox.open(ParkPoint);
				      
				      $(function(){
					        $('#star').raty({readOnly: true,start: entry['����']});
				  
				          if (DEBUG) {
						         $("td#wrap").click(function(){
						             window.location = "shopinfo.html?type=3&shopid="+entry['���'];
					           });
					        } else {
					            $("td#wrap").live('tap',function(){
						             window.location = "shopinfo.html?type=3&shopid="+entry['���'];
					            }).live('click',function(){
						             window.location = "shopinfo.html?type=3&shopid="+entry['���'];
					            });
				          }
				  
				      });
				    }
				 }
			});
		});
	});
}

function showParkPlace(map)
{
	$("#refreshBox").popup("open");
	var bounds = map.getBounds();
	var sw = bounds.getSouthWest();
	var ne = bounds.getNorthEast();
	var minlng=sw.lng;
	var maxlng=ne.lng;
	var minlat=sw.lat;
	var maxlat=ne.lat;
	showPark(map,minlng,maxlng,minlat,maxlat);
}

function enterSearch(map)
{
	if (event.keyCode == 13)
	{
		var enterContent = document.getElementById("search").value;
		SearchParkPlace(map,enterContent);
	}
}

function SearchParkPlace(map, searchContent)
{
    function searchComplete()
    {
        var searchResult = local.getResults().getPoi(0);
        if (searchResult != null && searchResult != undefined)
        {
            var searchPoint = searchResult.point;
            map.clearOverlays();
            map.centerAndZoom(searchPoint,15);
            var searchMarker = new BMap.Marker(searchPoint, {title: 'search'});
            map.addOverlay(searchMarker);
            var searchLabel = new BMap.Label(searchContent);
            searchLabel.setOffset(new BMap.Size(10,-10));
            searchMarker.setLabel(searchLabel);
            showParkPlace(map);
        }
        else
            alert("�Ҳ�����λ��");
        
    }
    var local = new BMap.LocalSearch("�Ϻ�",{onSearchComplete: searchComplete});
    local.search(searchContent);
}