/**
 * 根据输入坐标，初始化地图中心点，加载地图，如果就去请求city.json
 */
function fetchCity(coordinate) {
    let sz = null;
    let szAddr = [];
    if (coordinate) {
        var mp = new BMap.Map('map');
        mp.centerAndZoom(new BMap.Point(coordinate), 11);
    } else {
        $.get('/static/renderJson/city.json', function (res) {
            let result = res.city;
            let szArea = res.szArea.list;
            // allUtils.unicodeToCn();
            console.log(szArea);
            for (var i in result) {
                if (i == '深圳') {
                    sz = result[i];
                }
            }
            szAddr[0] = parseFloat(sz.split(',')[0]);
            szAddr[1] = parseFloat(sz.split(',')[1]);
            var mp = new BMap.Map('map');
            mp.centerAndZoom(new BMap.Point(szAddr[0], szAddr[1]), 11);

            // 复杂的自定义覆盖物
            function ComplexCustomOverlay(point, text, mouseoverText) {
                this._point = point;
                this._text = text;
                this._overText = mouseoverText;
            }

            ComplexCustomOverlay.prototype = new BMap.Overlay();
            ComplexCustomOverlay.prototype.initialize = function (map) {// initialize方法：返回渲染的dom
                this._map = map;
                var div = this._div = document.createElement("div");
                div.style.position = "absolute";
                div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
                div.style.backgroundColor = "#EE5D5B";
                div.style.border = "1px solid #BC3B3A";
                div.style.color = "white";
                div.style.height = "18px";
                div.style.padding = "2px";
                div.style.lineHeight = "18px";
                div.style.whiteSpace = "nowrap";
                div.style.MozUserSelect = "none";
                div.style.fontSize = "12px"
                var span = this._span = document.createElement("span");
                div.appendChild(span);
                span.appendChild(document.createTextNode(this._text));
                var that = this;

                var arrow = this._arrow = document.createElement("div");
                arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
                arrow.style.position = "absolute";
                arrow.style.width = "11px";
                arrow.style.height = "10px";
                arrow.style.top = "22px";
                arrow.style.left = "10px";
                arrow.style.overflow = "hidden";
                div.appendChild(arrow);

                div.onmouseover = function () {
                    this.style.backgroundColor = "#6BADCA";
                    this.style.borderColor = "#0000ff";
                    this.getElementsByTagName("span")[0].innerHTML = that._overText;
                    arrow.style.backgroundPosition = "0px -20px";
                }

                div.onmouseout = function () {
                    this.style.backgroundColor = "#EE5D5B";
                    this.style.borderColor = "#BC3B3A";
                    this.getElementsByTagName("span")[0].innerHTML = that._text;
                    arrow.style.backgroundPosition = "0px 0px";
                }
                mp.getPanes().labelPane.appendChild(div);

                return div;
            }
            ComplexCustomOverlay.prototype.draw = function () {
                var map = this._map;
                var pixel = map.pointToOverlayPixel(this._point); // pointToOverlayPixel: 根据地理坐标获取对应的覆盖物容器的坐标，此方法用于自定义覆盖物
                this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
                this._div.style.top = pixel.y - 30 + "px";
            }
            var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000, 10) + "套";

            var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(szAddr[0], szAddr[1]), "银湖海岸城", mouseoverTxt);
            // var polyline = new BMap.Polyline([
            //     // new BMap.Point(114.20370397387,22.559180083699),
            //     // new BMap.Point(114.1001192293,22.60691837918),
            //     // new BMap.Point(114.19193371408,22.556701081155)
            // ], {fillColor: "#00a75b", strokeColor:"#00a75b", strokeWeight:5, strokeOpacity:1, fillOpacity: .3});
            // mp.addOverlay(polyline);          //覆盖区域
            mp.addOverlay(myCompOverlay);// addOverlay: 将覆盖物添加到地图中，一个覆盖物实例只能向地图中添加一次
        });
    }

}
function loadScript() {
    var script = document.createElement("script");
    script.src = "//api.map.baidu.com/api?v=3.0&ak=B7QqSK9kBsBTGjChKpSj43tX4vSvilqV&callback=fetchCity";
    document.body.appendChild(script);
}
window.onload = loadScript;



