<template>
  <div class="panel electricity-panel">
    <CommonHeader
      :title="$t('bigScreen.electricityPanel.title')"
      rightIcon="dianliang"
    />
    <div class="panel-content">
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
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";
import echarts from "echarts";

export default {
  name: "ElectricityPanel",
  components: {
    CommonHeader,
  },
  data() {
    return {
      chart: null,
      months: [],
      chargeData: [300, 450, 600, 500, 700, 650, 550, 600, 750, 800, 850, 900],
      dischargeData: [
        280, 420, 580, 480, 680, 620, 530, 580, 720, 780, 830, 880,
      ],
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
          top: 20,
        },
        grid: { top: 55, bottom: 25, left: 40, right: 10 },
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
                  { offset: 0, color: "rgba(155, 93, 229, 1)" }, // 深紫色渐变
                  { offset: 1, color: "rgba(155, 93, 229, 0.5)" },
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
                color: "#9b5de5", // 深紫色顶盖
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
                color: "rgba(155, 93, 229, 0.8)",
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
                  { offset: 0, color: "rgba(0, 200, 180, 1)" }, // 深青色渐变
                  { offset: 1, color: "rgba(0, 200, 180, 0.5)" },
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
                color: "#00c8b4",
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
                color: "rgba(0, 200, 180, 0.8)",
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
      gap: 8px;
      padding: 0 20px 0 10px;

      .elec-stat-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px 10px;
        background: linear-gradient(
          135deg,
          rgba(6, 24, 70, 0.8) 0%,
          rgba(10, 35, 90, 0.6) 100%
        );
        border: 1px solid rgba(0, 245, 212, 0.3);
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;

        &:hover {
          border-color: rgba(0, 245, 212, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 212, 0.2);
          transform: translateY(-2px);
        }

        .stat-value {
          font-size: 1.6rem;
          font-weight: bold;
          color: #00f5d4;
          text-shadow: 0 0 15px rgba(0, 245, 212, 0.6);
          font-family: "Orbitron", "Arial", sans-serif;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #a0c4e8;
          letter-spacing: 0.5px;
          text-align: center;
          line-height: 1.3;
        }

        // 卡片内部发光效果
        &::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(0, 245, 212, 0.05) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        &:hover::after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
