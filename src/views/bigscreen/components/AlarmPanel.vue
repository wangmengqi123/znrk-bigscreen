<template>
  <div class="panel alarm-panel">
    <CommonHeader
      :title="$t('bigScreen.alarmPanel.title')"
      rightIcon="warring"
    />
    <div class="panel-content">
      <div ref="chart" class="chart-container"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import CommonHeader from "./CommonHeader.vue";

export default {
  name: "AlarmPanel",
  components: {
    CommonHeader,
  },
  data() {
    return {
      chart: null,
      resizeTimer: null,
    };
  },
  watch: {
    "$i18n.locale"() {
      this.updateChartLocale();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeDestroy() {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
    window.removeEventListener("resize", this.handleResize);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    handleResize() {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        if (this.chart) {
          requestAnimationFrame(() => {
            if (this.chart && !this.chart.isDisposed()) {
              this.chart.resize();
            }
          });
        }
      }, 200);
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.getChartOptions(), true);
    },
    getAlarmData() {
      return [
        {
          value: 2,
          key: "info",
          // 使用线性渐变色
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#00f0ff" }, // 青色
              { offset: 1, color: "#0055ff" }, // 深蓝
            ],
          },
        },
        {
          value: 8,
          key: "level2",
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#ffba00" }, // 橙色
              { offset: 1, color: "#ff5500" }, // 红橙
            ],
          },
        },
        {
          value: 12,
          key: "level3",
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#2481e3" }, // 蓝色
              { offset: 1, color: "#8a2be2" }, // 紫色
            ],
          },
        },
      ].map((item) => ({
        value: item.value,
        name:
          item.key === "info"
            ? "Info"
            : this.$t(`bigScreen.alarmPanel.${item.key}`),
        itemStyle: {
          color: item.color,
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)", // 增加阴影增加立体感
        },
      }));
    },
    getChartOptions() {
      const data = this.getAlarmData();
      return {
        title: {
          text: data[0].name,
          subtext: "2",
          left: "center",
          top: "40%", // 稍微上移
          textStyle: {
            color: "#fff",
            fontSize: 28,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei",
          },
          subtextStyle: {
            color: "#00f0ff", // 使用高亮色
            fontSize: 32,
            fontWeight: "bold",
            textShadowBlur: 10,
            textShadowColor: "rgba(0, 240, 255, 0.5)", // 文字发光
          },
          itemGap: 10,
        },
        tooltip: { show: true, backgroundColor: "rgba(0,0,0,0.7)" },
        legend: { show: false },
        series: [
          // 最外层装饰虚线圈
          {
            type: "gauge",
            radius: "80%", // 缩小
            center: ["50%", "50%"],
            startAngle: 90,
            endAngle: -269.9,
            splitNumber: 60, // 增加刻度密度
            axisLine: { show: false },
            splitLine: { show: false },
            axisTick: {
              show: true,
              length: 2,
              lineStyle: { color: "rgba(0, 245, 212, 0.3)" }, // 青色微光
            },
            axisLabel: { show: false },
            pointer: { show: false },
            detail: { show: false },
          },
          // 内部装饰细环
          {
            type: "pie",
            radius: ["72%", "73%"], // 缩小
            center: ["50%", "50%"],
            hoverAnimation: false,
            label: { show: false },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 1,
                },
              },
            ],
            z: 0,
          },
          // 主数据环
          {
            name: this.$t("bigScreen.alarmPanel.seriesName"),
            type: "pie",
            radius: ["55%", "68%"], // 缩小
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            label: {
              show: true,
              position: "outside",
              formatter: "{b}\n{c}",
              color: "#a0c4e8",
              fontSize: 14,
              lineHeight: 20,
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 25,
              lineStyle: {
                width: 1,
                color: "rgba(255, 255, 255, 0.3)",
              },
            },
            itemStyle: {
              borderColor: "#080e2c", // 与背景色一致，产生切割感
              borderWidth: 4,
            },
            data: data.map((item) => {
              return {
                ...item,
                labelLine: {
                  lineStyle: {
                    color: "rgba(255, 255, 255, 0.3)", // 统一引导线颜色，更整洁
                  },
                },
              };
            }),
          },
          // 内部发光底座（增加层次感）
          {
            type: "pie",
            radius: ["0%", "45%"], // 缩小
            center: ["50%", "50%"],
            hoverAnimation: false,
            label: { show: false },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: "rgba(0, 240, 255, 0)" },
                      { offset: 0.8, color: "rgba(0, 240, 255, 0.02)" },
                      { offset: 1, color: "rgba(0, 240, 255, 0.05)" },
                    ],
                  },
                },
              },
            ],
            z: -1,
          },
        ],
      };
    },
    updateChartLocale() {
      if (this.chart) {
        this.chart.setOption(this.getChartOptions(), true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.alarm-panel {
  flex: 1;
  min-height: 0; // 修复 flex 子元素溢出问题
  display: flex;
  flex-direction: column;

  position: relative;
  padding: 0;
  background: rgba(8, 14, 44, 0.75);
  border: 1px solid rgba(0, 245, 212, 0.2);
  border-radius: 10px;
  ::v-deep .border-box-content {
    padding: 15px;
    display: flex;
    flex-direction: column;
  }

  .panel-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .panel-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #fff;
    padding-left: 10px;
    margin: 15px 0;
  }

  .chart-container {
    flex: 1;
    width: 100%;
  }
}
</style>
