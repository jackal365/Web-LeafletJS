/*
 * @Author: SHLLL
 * @Date:   2017-10-30 16:31:50
 * @Last Modified by:   SHLLL
 * @Last Modified time: 2017-12-04 00:08:04
 */

// 新建地图图层
// 谷歌地图支持的缩放范围为0~21
var googleNormalMap = L.tileLayer.olineTileLayer('Google.Normal.Map', {
    maxZoom: 16,
    minZoom: 3
});
var googleSatelliteMap = L.tileLayer.olineTileLayer('Google.Satellite.Map', {
    maxZoom: 18,
    minZoom: 3
});
var googleHybridMap = L.tileLayer.olineTileLayer('Google.Hybrid.Map', {
    maxZoom: 16,
    minZoom: 3
});
// 创建离线地图图层
var amapSatelliteOfflineMap = L.tileLayer('http://127.0.0.1:3001/47626774/{z}/{x}/{y}', {
    maxZoom: 16,
    minZoom: 3
});

var baseLayers = {
    "谷歌地图": googleNormalMap,
    "谷歌卫星": googleSatelliteMap,
    "谷歌混合": googleHybridMap,
    "谷歌离线": amapSatelliteOfflineMap
};

// 新建一个地图实例
var map = L.map("mapid", {
    crs: L.CRS.GCJ02,

    center: [40.00324, 116.37514],        // 起始点坐标
    zoom: 16,
    layers: [googleSatelliteMap],
    attributionControl: false,
    zoomControl: false,
    preferCanvas: true,
    zoomAnimation: false
    // renderer: L.canvas()
});

// 添加图层选择控件到地图
L.control.layers(baseLayers, null).addTo(map);
// 添加缩放控件到地图
L.control.zoom({
    zoomInTitle: '放大',
    zoomOutTitle: '缩小'
}).addTo(map);
// 添加GPS输入文件到地图
L.control.fileinput().addTo(map);

//================================================
//缩放等级显示器,右上角
var ZoomViewer = L.Control.extend({
    //onadd方法 要返回的控制容器的DOM元素和添加有关地图的事件侦听器。
    onAdd: function() {
        var container = L.DomUtil.create('div'); //容器div
        container.style.width = '200px';
        container.style.background = 'rgba(255,255,255,0.5)';
        container.style.textAlign = 'left';
        var gauge = L.DomUtil.create('div'); //计量器div
        map.on('zoomstart zoom zoomend', function(ev) {
            gauge.innerHTML = '缩放等级: ' + map.getZoom();
        })
        container.appendChild(gauge); //计量器放入容器中

        return container;
    }
});
(new ZoomViewer).addTo(map);

////////////////////////////////////////////////////////////////////////
//设置比例尺，左下角
L.control.scale({
    maxWidth: 100, //最大宽度
    imperial: false,
    position: "bottomleft",
}).addTo(map);


// 鼠标点击显示点击点的经纬度
var mypop = L.popup();
map.on('click', function(e) {
    // 在日志中输出，并使用浏览器窗口提示
    // console.log(e);
    // alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);

    var content = '你点击了这个位置：<br>';
    content += e.latlng.toString();
    mypop.setLatLng(e.latlng)
        .setContent(content)
        .openOn(map);
});



// function mapPan(){
//     map.panBy([20, 20], {animate: false});
//     // var startPos = L.DomUtil.getPosition(map._mapPane);
//     // var offset = L.point([20, 20]).round();
// }
// window.setInterval(mapPan, 1000);

// 开启自动定位
// map.locate({
//     setView: true,
//     maxZoom: 16,
// });
// 监听定位完成事件
// map.on('locationfound', function(pos){
//     L.marker(pos).addTo(map);
// });
