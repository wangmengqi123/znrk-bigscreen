<template>
  <div class="panel alarm-panel">
    <dv-border-box-13>
      <div class="panel-content">
        <div class="panel-title">{{ $t("bigScreen.alarmPanel.title") }}</div>
        <dv-decoration-10 style="width: 98%; height: 5px" />
        <div ref="chart" class="chart-container"></div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "AlarmPanel",
  data() {
    return {
      chart: null,
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
      this.chart.setOption(this.getChartOptions(), true);
    },
    getAlarmData() {
      return [
        { value: 2, key: "info", color: "#00f0ff" },
        { value: 8, key: "level2", color: "#ffba00" },
        { value: 12, key: "level3", color: "#2481e3" },
      ].map((item) => ({
        value: item.value,
        name: this.$t(`bigScreen.alarmPanel.${item.key}`),
        itemStyle: { color: item.color },
      }));
    },
    getChartOptions() {
      const data = this.getAlarmData();
      return {
        title: {
          text: data[0].name,
          subtext: "2",
          left: "center",
          top: "42%",
          textStyle: {
            color: "#fff",
            fontSize: 30,
            fontWeight: "normal",
          },
          subtextStyle: {
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold",
          },
          itemGap: 5,
        },
        tooltip: { show: true },
        legend: { show: false },
        series: [
          // 外围刻度装饰
          {
            type: "gauge",
            radius: "90%",
            center: ["50%", "50%"],
            startAngle: 90,
            endAngle: -269.9,
            splitNumber: 30,
            axisLine: { show: false },
            splitLine: { show: false },
            axisTick: {
              show: true,
              length: 3,
              lineStyle: { color: "rgba(255,255,255,0.2)" },
            },
            axisLabel: { show: false },
            pointer: { show: false },
            detail: { show: false },
          },
          // 外围细圆环装饰
          {
            type: "pie",
            radius: ["82%", "82.5%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            label: { show: false },
            data: [{ value: 1, itemStyle: { color: "rgba(255,255,255,0.1)" } }],
            z: 0,
          },
          // 数据环
          {
            name: this.$t("bigScreen.alarmPanel.seriesName"),
            type: "pie",
            radius: ["60%", "75%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            label: {
              show: true,
              position: "outside",
              formatter: "{b}",
              color: "#fff",
              fontSize: 14,
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 25,
              lineStyle: {
                width: 1,
              },
            },
            itemStyle: {
              borderColor: "#050b1d",
              borderWidth: 5,
            },
            data: data.map((item) => {
              return {
                ...item,
                labelLine: {
                  lineStyle: {
                    color: item.itemStyle.color,
                  },
                },
              };
            }),
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
