<template>
  <!-- <div id="cesiumContainer" @click="Click"></div> -->
  <div id="cesiumContainer"></div>
</template>

<script>


export default {
  name:'baselayer',
  data() {
    return {
      viewer:{},
      i:1,
      homebutton: true,
      pointstyle: {
        pixelSize : 5,
        color : Cesium.Color.RED,
        outlineColor : Cesium.Color.WHITE,
        outlineWidth : 2,
        show:true
      },
      location2:new Cesium.Cartesian3(-1320000.7152270623, 5325045.992712206, 3242028.6244444405),
      wcinfo:[
        {id:1,name:'cd',position:new Cesium.Cartesian3(-1320200.7152270623, 5325045.992712206, 3242028.6244444405),},
        {id:2,name:'sss',position:new Cesium.Cartesian3(-2012861.813043441, 4207416.0968499, 4323547.278822723),},
        {id:3,name:'fff',position:new Cesium.Cartesian3(5276007.319539491, 2816988.586264947, 2166420.7728793668),},
        {id:4,name:'ggg',position:new Cesium.Cartesian3(3620305.010348115, 1548075.813823458, 4988708.941261765),},
        {id:5,name:'jjj',position:new Cesium.Cartesian3(3540167.3572858647, -4817436.837232225, -2187529.4460539),},
      ],
    }
  },
  methods:{
    Init()  {
      this.viewer = new Cesium.Viewer('cesiumContainer',{
        geocoder:false,
        homeButton:this.homebutton,
        sceneModePicker:false,
        baseLayerPicker:true,
        navigationHelpButton:false,
        animation:false,
        // creditContainer:'',
        timeline:false,
        fullscreenButton:false,
        vrButton:false,
        
        //关闭月亮、星星等
        skyBox: new Cesium.SkyBox({  
            show: false
          }),
          //关闭地球光环
        skyAtmosphere: false,
      });
    // console.log(this.viewer)
    this.viewer._cesiumWidget._creditContainer.style.display="none";
    },
    Click() {
      let handler=new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
      // console.log(handler)
      handler.setInputAction((click) => {
        this.viewer.clock.onTick.removeEventListener(this.rotate);
        // let ray = this.viewer.camera.getPickRay(click.position);
        // const intersecion = this.viewer.scene.globe.pick(ray,this.viewer.scene);
        // console.log(intersecion);
        const pick = this.viewer.scene.pick(click.position);//对象
        // console.log(pick)
        // console.log(pick.primitive._position)

        if (Cesium.defined(pick)) {
          const ellipsoid = this.viewer.scene.globe.ellipsoid;
          const cartographic = ellipsoid.cartesianToCartographic(pick.primitive._position);
          const lat = Cesium.Math.toDegrees(cartographic.latitude);
          const lng = Cesium.Math.toDegrees(cartographic.longitude);
          console.log(lat);
          console.log(lng);
          this.viewer.scene.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lng,lat,1000),
            duration:5,  //定位的时间间隔
            // complete:() => {
            //   this.viewer.entities.add({
            //     id:10,
            //     name : 'device1',
            //     position : this.location2,
            //     //点样式
            //     point : {
            //         pixelSize : 5,
            //         color : Cesium.Color.RED,
            //         outlineColor : Cesium.Color.WHITE,
            //         outlineWidth : 2,
            //         show:true
            //     }
            //   });
            // //   // document.getElementById("cdwc").style.display="block";
            // }
          })
        }
    } , Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    Createwc()  {
      for (let place of this.wcinfo) {
        this.viewer.entities.add({
          id:place.id,
          name : place.name,
          position : place.position,
          point : this.pointstyle,
          label:{
            text:place.name,
            font : '14pt',
            color : Cesium.Color.RED,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth : 1,
            //垂直位置
            //verticalOrigin : Cesium.VerticalOrigin.BUTTON,
            //中心位置
            pixelOffset : new Cesium.Cartesian2(0, 20)
          }
        })
      }
    },
    rotate() {
      var a = .1;
      var t = Date.now();
      var n = (t - this.i) / 1e3;
      this.i = t;
      this.viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -a * n);
    },
    Earthspin() {
      this.i = Date.now();
      this.viewer.clock.onTick.addEventListener(this.rotate);
    }
  },
  mounted() {
    this.Init();

    this.Createwc();

    this.Earthspin();
    
    this.Click();
  },
}
</script>

<style>
  @import url(../../static/cesium/Build/Cesium/Widgets/widgets.css);
      html,body,#cesiumContainer {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
</style>