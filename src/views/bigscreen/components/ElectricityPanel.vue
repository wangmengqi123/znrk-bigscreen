<template>
  <div class="panel electricity-panel">
    <dv-border-box-13>
      <div class="panel-content">
        <div class="panel-title">
          {{ $t("bigScreen.electricityPanel.title") }}
        </div>

        <div class="elec-content">
          <div class="elec-chart-wrapper">
            <div ref="chart" class="chart-container"></div>
          </div>
          <div class="elec-stats">
            <div class="elec-stat-item">
              <div class="stat-value">11.829</div>
              <div class="stat-label">
                {{ $t("bigScreen.electricityPanel.totalDischarge") }}
              </div>
            </div>
            <div class="elec-stat-item">
              <div class="stat-value">13.812</div>
              <div class="stat-label">
                {{ $t("bigScreen.electricityPanel.totalCharge") }}
              </div>
            </div>
            <div class="elec-stat-item">
              <div class="stat-value">85.649 %</div>
              <div class="stat-label">
                {{ $t("bigScreen.electricityPanel.efficiency") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "ElectricityPanel",
  data() {
    return {
      chart: null,
      months: [],
      chargeData: [300, 450, 600, 500, 700, 650, 550, 600, 750, 800, 850, 900],
      dischargeData: [
        280, 420, 580, 480, 680, 620, 530, 580, 720, 780, 830, 880,
      ],
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
    getLast12Months() {
      const last12Months = [];
      const date = new Date();
      date.setMonth(date.getMonth() + 1); // 从下个月开始倒推，包含当前月
      for (let i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() - 1);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        last12Months.unshift(`${year}-${month}`);
      }
      return last12Months;
    },
    initChart() {
      this.months = this.getLast12Months();
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.getChartOptions(), true);
    },
    getLegendLabels() {
      return [
        this.$t("bigScreen.electricityPanel.chargeSeries"),
        this.$t("bigScreen.electricityPanel.dischargeSeries"),
      ];
    },
    getChartOptions() {
      const legendLabels = this.getLegendLabels();
      return {
        tooltip: { trigger: "axis" },
        legend: {
          textStyle: { color: "#fff" },
          data: legendLabels,
          selectedMode: false, // 禁用点击交互
        },
        grid: { top: 35, bottom: 25, left: 40, right: 10 },
        xAxis: {
          type: "category",
          data: this.months,
          axisLine: { lineStyle: { color: "#57617B" } },
          axisLabel: { interval: 0, fontSize: 10 }, // 确保显示所有标签
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "#57617B",
              type: "dashed",
            },
          },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "#57617B" },
        },
        series: [
          // 充电量 - 柱体
          {
            name: legendLabels[0],
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(0, 240, 255, 0.8)" }, // 青色渐变
                  { offset: 1, color: "rgba(0, 240, 255, 0.1)" },
                ]),
                opacity: 1,
              },
            },
            data: this.chargeData,
          },
          // 充电量 - 顶部菱形
          {
            z: 12,
            type: "pictorialBar",
            symbolPosition: "end",
            data: this.chargeData,
            symbol: "diamond",
            symbolOffset: ["-55%", "-50%"], // 稍微向左偏移以对齐左侧柱子
            symbolSize: [20, 12], // 增加高度增强立体感
            itemStyle: {
              normal: {
                color: "#00f0ff", // 亮青色顶盖
                borderColor: "#fff", // 增加白色高光边框
                borderWidth: 0.5,
              },
            },
            tooltip: { show: false },
          },
          // 充电量 - 底部菱形
          {
            z: 10,
            type: "pictorialBar",
            symbolPosition: "start",
            data: this.chargeData,
            symbol: "diamond",
            symbolOffset: ["-55%", "50%"],
            symbolSize: [20, 12],
            itemStyle: {
              normal: {
                color: "rgba(0, 240, 255, 0.6)",
              },
            },
            tooltip: { show: false },
          },

          // 放电量 - 柱体
          {
            name: legendLabels[1],
            type: "bar",
            barWidth: 20,
            barGap: "10%", // 调整柱间距
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(100, 255, 100, 0.8)" }, // 绿色渐变
                  { offset: 1, color: "rgba(100, 255, 100, 0.1)" },
                ]),
                opacity: 1,
              },
            },
            data: this.dischargeData,
          },
          // 放电量 - 顶部菱形
          {
            z: 12,
            type: "pictorialBar",
            symbolPosition: "end",
            data: this.dischargeData,
            symbol: "diamond",
            symbolOffset: ["55%", "-50%"], // 向右偏移对齐右侧柱子
            symbolSize: [20, 12],
            itemStyle: {
              normal: {
                color: "#64ff64",
                borderColor: "#fff",
                borderWidth: 0.5,
              },
            },
            tooltip: { show: false },
          },
          // 放电量 - 底部菱形
          {
            z: 10,
            type: "pictorialBar",
            symbolPosition: "start",
            data: this.dischargeData,
            symbol: "diamond",
            symbolOffset: ["55%", "50%"],
            symbolSize: [20, 12],
            itemStyle: {
              normal: {
                color: "rgba(100, 255, 100, 0.6)",
              },
            },
            tooltip: { show: false },
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
.electricity-panel {
  flex: 1;
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

  .elec-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 0 20px 20px;

    .elec-chart-wrapper {
      flex: 4;
      .chart-container {
        width: 100%;
        height: 100%;
      }
    }

    .elec-stats {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 10px;

      .elec-stat-item {
        padding-left: 24px;
        .stat-value {
          font-size: 32px;
          color: #fff;
          font-weight: bold;
          padding: 8px 5px;
        }
        .stat-label {
          font-size: 12px;
          color: #fff;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
