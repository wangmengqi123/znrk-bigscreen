<template>
  <div class="map-container">
    <CommonHeader :title="$t('bigScreen.mapPanel.title')" rightIcon="map" />
    <div ref="chart" class="chart-full"></div>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";
import echarts from "echarts";
import "echarts/map/js/china"; // 引入中国地图数据
import chinaData from "../china.json"; // 导入行政区划数据

export default {
  name: "MapPanel",
  components: {
    CommonHeader,
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart);

      // --- 模拟光柱数据与坐标 ---
      const geoCoordMap = {
        北京市: [116.407526, 39.90403],
        上海市: [121.473701, 31.230416],
        广东省: [113.264434, 23.129162],
        四川省: [104.066541, 30.572269],
        陕西省: [108.93984, 34.34127],
        浙江省: [120.153576, 30.287459],
      };
      const lightBarData = [
        { name: "北京市", value: 200 },
        { name: "上海市", value: 180 },
        { name: "广东省", value: 150 },
        { name: "四川省", value: 120 },
        { name: "陕西省", value: 90 },
        { name: "浙江省", value: 160 },
      ];
      const convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      // -------------------------

      // 为数据添加模拟值，以便在地图上显示颜色差异（可选）
      const mapData = chinaData.map((item) => {
        // 清洗名称以匹配 echarts map 标准 (去除 省/市/自治区 等后缀)
        let name = item.name;
        if (name) {
          name = name
            .replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, "")
            .replace(/城区/g, "");
        }
        return {
          name: name,
          value: Math.floor(Math.random() * 1000), // 模拟整数数据
        };
      });

      this.chart.setOption({
        tooltip: {
          show: false, // 禁用浮层
        },
        // 使用多个 geo 层堆叠模拟 3D 厚度
        geo: [
          // 最底层：阴影底座
          {
            map: "china",
            aspectScale: 0.75,
            layoutCenter: ["50%", "53%"], // 向下偏移最多
            layoutSize: "110%", // 放大到 125%
            roam: false,
            silent: true, // 禁用鼠标交互
            itemStyle: {
              normal: {
                areaColor: "#051935", // 最深色
                borderColor: "#051935",
                shadowColor: "rgba(0, 0, 0, 0.8)",
                shadowBlur: 20,
                shadowOffsetX: 0,
                shadowOffsetY: 10,
              },
            },
            z: 1,
          },
          // 中间层：模拟厚度
          {
            map: "china",
            aspectScale: 0.75,
            layoutCenter: ["50%", "52%"], // 向下偏移适中
            layoutSize: "110%", // 放大到 125%
            roam: false,
            silent: true, // 禁用鼠标交互
            itemStyle: {
              normal: {
                areaColor: "#123663", // 次深色
                borderColor: "#123663",
              },
            },
            z: 2,
          },
        ],
        series: [
          {
            name: "中国",
            type: "map",
            mapType: "china",
            aspectScale: 0.75,
            layoutCenter: ["50%", "50%"], // 居中
            layoutSize: "110%", // 放大到 125%
            roam: false,
            label: {
              show: false,
              color: "#fff",
            },
            itemStyle: {
              normal: {
                // 顶层地图蓝色渐变
                areaColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "#14569d" },
                    { offset: 1, color: "#0c3065" },
                  ],
                },
                borderColor: "#fff", // 亮蓝色边框
                borderWidth: 1,
              },
              emphasis: {
                areaColor: "rgba(255, 255, 255, 0.3)", // 浅白色高亮背景
                borderColor: "#fff", // 白色描边
                borderWidth: 2,
                label: {
                  show: true,
                  color: "#fff",
                },
              },
            },
            data: mapData,
            z: 3, // 最顶层
          },
          // --- 光柱底座 ---
          {
            name: "光柱底座",
            type: "effectScatter",
            coordinateSystem: "geo",
            z: 4,
            data: convertData(lightBarData),
            symbolSize: 10,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
              scale: 3,
            },
            itemStyle: {
              color: "#ffff00",
              shadowBlur: 10,
              shadowColor: "#ffff00",
            },
            label: {
              show: false,
            },
            silent: true, // 禁用鼠标交互
          },
          // --- 光柱主体 ---
          {
            name: "光柱",
            type: "scatter",
            coordinateSystem: "geo",
            z: 5,
            symbol: "rect",
            symbolOffset: [0, "-50%"],
            symbolSize: function (val) {
              return [6, val[2] / 2]; // 宽度6，高度为数值的一半
            },
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(255, 255, 0, 0.1)" }, // 顶部透明
                  { offset: 1, color: "rgba(255, 255, 0, 1)" }, // 底部高亮
                ],
              },
              opacity: 0.9,
            },
            data: convertData(lightBarData),
            label: {
              show: true,
              position: "top",
              formatter: "{@2}",
              color: "#fff",
              fontSize: 10,
              distance: 2,
              textBorderColor: "#000",
              textBorderWidth: 2,
            },
            silent: true, // 禁用鼠标交互
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.map-container {
  flex: 1.5;
  background: rgba(13, 31, 66, 0.3);
  border: 1px solid #1c4980;
  position: relative;
  background: rgba(8, 14, 44, 0.75);
  border: 1px solid rgba(0, 245, 212, 0.2);
  border-radius: 10px;
  .chart-full {
    width: 100%;
    height: 100%;
  }
}
</style>
