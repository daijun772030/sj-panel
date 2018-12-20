<template>
  <div class="Map">
    <div id="container"></div>
    <div id="panel"></div>
    <div class="item">
      <input  type="button" class="btn1" @click="huaqishou" value="点击刷新">
    </div>
  </div>
</template>
<script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
<script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>
<script>
import AMap from 'AMap'
var map = new AMap.Map("container", {
        zoom: 13,
        center: [104.066143,30.573095],
        resizeEnable: true
      });
export default {
  data () {
    return {
        dadaRS:{
            supplierLat:0,//用户的经度
            supplierLog:null,//用户的维度
            transporterLat:null,//骑手的经度
            transporterLog:null,//骑手的维度
            merchantLat:null,//商户的经度
            merchantLog:null//商户的维度
        }
    }
  },
  props:{
    shopOrder:{
      type:String,
      required:true
    }
  },
  created () {
    //   this.dadaQuery();
    // console.log(this.shopOrder)
  },
  mounted () {
    this.dituCshi();
    this.queryQiXi();
    this.huaqishou();
  },
  methods:{
    dadaQuery() {//查询数据，，然后去渲染地图
        this.$api('dadaQuery',{params:{ordernum:this.shopOrder}}).then((res)=>{
            console.log(res);
            return res
            this.dadaRS.supplierLat = res.data.data.dadaResponse.result.supplierLat;
            this.dadaRS.supplierLog = res.data.data.dadaResponse.result.supplierLng;
            this.dadaRS.transporterLat = res.data.data.dadaResponse.result.transporterLat;
            this.dadaRS.transporterLog = res.data.data.dadaResponse.result.transporterLng;
            this.dadaRS.merchantLat = res.data.data.orderModel.merchantLat;
            this.dadaRS.merchantLog = res.data.data.orderModel.merchantLog;
        })
    },
    queryQiXi () {//骑行路线的开始和结束点
        console.log(this.shopOrder);
        this.$api('dadaQuery',{params:{ordernum:this.shopOrder}}).then((res)=>{
           var supplierLat = res.data.data.dadaResponse.result.supplierLat;
           var supplierLog = res.data.data.dadaResponse.result.supplierLng;
           var transporterLat = res.data.data.dadaResponse.result.transporterLat;
           var transporterLog = res.data.data.dadaResponse.result.transporterLng;
           var merchantLat = res.data.data.orderModel.merchantLat;
           var merchantLog = res.data.data.orderModel.merchantLog; 
            this.qixin(supplierLat,supplierLog,transporterLat,transporterLog,merchantLat,merchantLog) 
        })
    },

    huaqishou () {//给骑手标记点
    console.log(this.shopOrder)
      this.$api('dadaQuery',{params:{ordernum:this.shopOrder}}).then((res)=>{
        var supplierLat = res.data.data.dadaResponse.result.supplierLat;
        var supplierLog = res.data.data.dadaResponse.result.supplierLng;
        var transporterLat = res.data.data.dadaResponse.result.transporterLat;
        var transporterLog = res.data.data.dadaResponse.result.transporterLng;
        var merchantLat = res.data.data.orderModel.merchantLat;
        var merchantLog = res.data.data.orderModel.merchantLog; 
        this.biaodianDT(supplierLat,supplierLog,transporterLat,transporterLog,merchantLat,merchantLog) 
      })
    },
    biaodianDT (a,b,c,d,e,f) {//标注开始和结束点的函数
        console.log(a,b,c,d,e,f)
      var viaMarker = new AMap.Marker({
            position: new AMap.LngLat(d,c),
            // 将一张图片的地址设置为 icon
            icon: 'http://www.pigcome.com:81/img?path=/usr/img//type/0c95390c9e6d4ba790f48335ce05d82f.png',
            // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
            offset: new AMap.Pixel(-13, -30)
        });
        map.add(viaMarker)
    },
    //创建开始和结束得坐标点
     qixin (a,b,c,d,e,f) {//骑行路线的规划
     console.log(a,b,c,d,e,f)
       //这里开始画起始点
        var startIcon = new AMap.Icon({
          size:new AMap.Size(25,34),//图标的大小
          image:'//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',//图标的位置
          imageSize:new AMap.Size(135,40),//图标的大小
          imageOffset:new AMap.Pixel(-9,-3)//图标的偏移量
      });
      //将图标传入markers
      var startMarker = new AMap.Marker({
        position:new AMap.LngLat(f,e),//坐标位置
        icon:startIcon,
        offset:new AMap.Pixel(-13,-30)
      });
      //创建结束坐标的icon
       var endIcon = new AMap.Icon({
          size:new AMap.Size(25,34),//图标的大小
          image:'//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',//图标的位置
          imageSize:new AMap.Size(135,40),//图标的大小
          imageOffset:new AMap.Pixel(-95,-3)//图标的偏移量
      });
      //将图标传入markers
      var endMarker = new AMap.Marker({
        position:new AMap.LngLat(b,a),//坐标位置
        icon:endIcon,
        offset:new AMap.Pixel(-13,-30)
      });
      //将这两个传入到marker
      map.add([startMarker,endMarker])
    //将地图的位置调整到居中的最佳位置
      var routeLine = new AMap.Polyline({
                // path: path,
                isOutline: true,
                outlineColor: '#ffeeee',
                borderWeight: 2,
                strokeWeight: 5,
                strokeColor: '#0091ff',
                lineJoin: 'round'
            })

            routeLine.setMap(map)

            // 调整视野达到最佳显示区域
            map.setFitView([ startMarker, endMarker, routeLine ])
    },
    dituCshi () {//给骑手标记点
      this.$api('dadaQuery',{params:{ordernum:this.shopOrder}}).then((res)=>{
        var supplierLat = res.data.data.dadaResponse.result.supplierLat;
        var supplierLog = res.data.data.dadaResponse.result.supplierLng;
        var transporterLat = res.data.data.dadaResponse.result.transporterLat;
        var transporterLog = res.data.data.dadaResponse.result.transporterLng;
        var merchantLat = res.data.data.orderModel.merchantLat;
        var merchantLog = res.data.data.orderModel.merchantLog; 
        this.init(supplierLat,supplierLog) 
      })
    },
    init (a,b) {//地图的初始化
    console.log(a,b)
      map = new AMap.Map('container', {
        resizeEnable: true,
        rotateEnable:true,
        pitchEnable:true,
        zoom: 17,
        pitch:80,
        rotation:-15,
        // viewMode:'3D',//开启3D视图,默认为关闭
        // buildingAnimation:true,//楼块出现是否带动画
        expandZoomRange:true,
        zooms:[3,20],
        center:[b,a]
      }); 
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar({
            showZoomBar:false,
            showControlButton:true,
            position:{
              right:'10px',
              top:'10px'
            }
          }))
          map.addControl(new AMap.Scale())
        })
    }
  }
}
</script>
<style>
  .Map{
    width: 100%;
    height: 100%;
  }
  .Map #container {
    width: 100%;
    min-height: 600px;
    position: relative;
  }
  #panel {
      position: fixed;
      background-color: white;
      max-height: 90%;
      overflow-y: auto;
      top: 10px;
      right: 10px;
      width: 280px;
  }
  #panel .amap-lib-driving {
      border-radius: 4px;
      overflow: hidden;
  }

  /* 标注 */
  .amap-icon img,
        .amap-marker-content img{
            width: 25px;
            height: 34px;
        }

        .marker {
            position: absolute;
            top: -20px;
            right: -118px;
            color: #fff;
            padding: 4px 10px;
            box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
            white-space: nowrap;
            font-size: 12px;
            font-family: "";
            background-color: #25A5F7;
            border-radius: 3px;
        }

        .item{
          margin-top: 10px;
          width: 200px;
        }
        .btn1 {
          border-radius:20px; 
          font-size: 20px;
          margin: 0 auto;
          background-color:white; 
        }
        .btn1:hover .item {
          background-color: #25A5F7;
        }
</style>

