function showRepair(map,minlng,maxlng,minlat,maxlat)
{
	$.getJSON("http://ihavecar.sinaapp.com/getRepairPlace.php?jasoncallback=?&randomID="+Math.random()+"&minlng="+minlng+"&maxlng="+maxlng+"&minlat="+minlat+"&maxlat="+maxlat,function (json) {
		var myIcon_Y = new BMap.Icon("img/pinY.png", new BMap.Size(74, 101), {
     		  anchor: new BMap.Size(12, 34),
		});
		
		var myIcon_R = new BMap.Icon("img/pinR.png", new BMap.Size(25, 34), {
     		  anchor: new BMap.Size(12, 34),
		});
		$.each(json,function(entryIndex,entry) {
			var RepairPoint = new BMap.Point(entry['经度'],entry['纬度']);
			var RepairMarker =new BMap.Marker(RepairPoint, {icon: myIcon_Y});
			map.addOverlay(RepairMarker);
			
			var infohtml = "<div id='shopbox' class='box'>" +
			"<table style='padding: 5px;'>" +
			"<tr>" +
			  "<td><img class='icon' src='img/car.jpg'></td>" + 
			  "<td>" + 
			     "<div class='label' style='font-size: 14px'>" + entry['业户名称'] + "</div>" +
				 "<div class='label' style='color: #ddd;'>" + entry['经营地址'] + "</div>" +
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
			
			RepairMarker.addEventListener("click", function(){
				overlays = map.getOverlays();
				for (var i = 0; i < overlays.length; i++) {
					if (overlays[i] instanceof BMapLib.InfoBox) {
						overlays[i].close();
					}
					if (overlays[i] instanceof BMap.Marker) {
						overlays[i].setIcon(myIcon_Y);
					}
				}
				RepairMarker.setIcon(myIcon_R);
				infobox.open(RepairPoint);
				$(function(){
					$('#star').raty({readOnly: true,start: entry['评价']});
					$('#shopinfo').css("background", 'url("img/infobox.png") no-repeat -389px -10px');
					$('#shopinfo').click(function(e) {
                        window.location.href = "shopinfo.html?type=1&shopid="+entry['序号'];
                    });
				});
				
			});
		});
	});
}

function showRepairPlace(map)
{
	var bounds = map.getBounds();
	var sw = bounds.getSouthWest();
	var ne = bounds.getNorthEast();
	var minlng=sw.lng;
	var maxlng=ne.lng;
	var minlat=sw.lat;
	var maxlat=ne.lat;
	showRepair(map,minlng,maxlng,minlat,maxlat);
}

function enterSearch(map)
{
	if (event.keyCode == 13)
	{
		var enterContent = document.getElementById("search").value;
		SearchRepairPlace(map,enterContent);
	}
}

function SearchRepairPlace(map, searchContent)
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
            showRepairPlace(map);
        }
        else
            alert("找不到该位置");
        
    }
    var local = new BMap.LocalSearch("上海",{onSearchComplete: searchComplete});
    local.search(searchContent);
}


// JavaScript Document