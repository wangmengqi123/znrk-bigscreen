<template>
  <div class="panel analysis-panel">
    <dv-border-box-13>
      <div class="panel-content">
        <div class="panel-title">{{ $t("bigScreen.analysisPanel.title") }}</div>
        <dv-decoration-10 style="width: 98%; height: 5px" />

        <div class="analysis-header">
          <div class="analysis-value">873.75</div>
          <div class="analysis-label">
            {{ $t("bigScreen.analysisPanel.totalRevenue") }}
          </div>
        </div>
        <div ref="chart" class="chart-container"></div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "AnalysisPanel",
  data() {
    return {
      chart: null,
      months: [],
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
    getChartOptions() {
      return {
        tooltip: {
          trigger: "axis",
        },
        grid: { top: 30, bottom: 20, left: 40, right: 10 },
        xAxis: {
          type: "category",
          data: this.months,
          axisLine: { lineStyle: { color: "#57617B" } },
        },
        yAxis: {
          type: "value",
          name: this.$t("bigScreen.analysisPanel.unit"),
          nameTextStyle: {
            color: "#fff",
            padding: [0, 0, 0, -10],
          },
          splitLine: {
            lineStyle: {
              color: "#57617B",
              type: "dashed",
            },
          },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: "#fff",
          },
        },
        series: [
          {
            data: [
              820, 932, 901, 934, 1290, 1330, 1400, 1350, 1450, 1500, 1550,
              1600,
            ],
            type: "line",
            smooth: true,
            itemStyle: { color: "#FFD700" },
            areaStyle: { color: "rgba(255, 215, 0, 0.2)" },
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
.analysis-panel {
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
    font-size: 1.25rem; // 20px / 16px
    font-weight: 800;
    color: #fff;
    padding-left: 10px;
    margin: 15px 0;
  }

  .analysis-header {
    padding-top: 30px;
    text-align: center;
    margin-bottom: 10px;
    .analysis-value {
      font-size: 2.25rem; // 36px / 16px
      color: #ffd700;
      font-weight: bold;
    }
    .analysis-label {
      font-size: 1rem; // 16px / 16px
      color: #fff;
      margin-top: 10px;
    }
  }
  .chart-container {
    flex: 1;
    width: 100%;
    min-height: 150px;
  }
}
</style>
