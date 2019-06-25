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
            let result = res;
            for (var i in result) {
                if (i == '深圳') {
                    sz = result[i];
                }
            }
            szAddr[0] = parseFloat(sz.split(',')[0]);
            szAddr[1] = parseFloat(sz.split(',')[1]);
            var mp = new BMap.Map('map');
            mp.centerAndZoom(new BMap.Point(szAddr[0], szAddr[1]), 11);
        });
    }

}
function loadScript() {
    var script = document.createElement("script");
    script.src = "//api.map.baidu.com/api?v=3.0&ak=B7QqSK9kBsBTGjChKpSj43tX4vSvilqV&callback=fetchCity";
    document.body.appendChild(script);
}
window.onload = loadScript;