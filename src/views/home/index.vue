<template>
  <div class="app-container home-container">
    <!-- 1. 顶部概况区域 -->
    <el-row :gutter="20" class="top-section">
      <!-- 左侧储能概况 -->
      <el-col :span="18">
        <el-card shadow="never" class="overview-card" style="height: 100%">
          <div slot="header" class="clearfix">
            <span class="section-title">{{ $t("home.overview.title") }}</span>
          </div>
          <div class="overview-items">
            <div class="overview-item">
              <div class="icon-wrapper icon-blue">
                <i class="el-icon-s-home"></i>
              </div>
              <div class="info">
                <div class="label">{{ $t("home.overview.totalStations") }}</div>
                <div class="value">1</div>
              </div>
            </div>
            <div class="overview-item">
              <div class="icon-wrapper icon-cyan">
                <i class="el-icon-menu"></i>
              </div>
              <div class="info">
                <div class="label">{{ $t("home.overview.totalCabinets") }}</div>
                <div class="value">9</div>
              </div>
            </div>
            <div class="overview-item">
              <div class="icon-wrapper icon-green">
                <i class="el-icon-s-data"></i>
              </div>
              <div class="info">
                <div class="label">{{ $t("home.overview.totalCapacity") }}</div>
                <div class="value">20.12</div>
              </div>
            </div>
            <div class="overview-item">
              <div class="icon-wrapper icon-purple">
                <i class="el-icon-s-opportunity"></i>
              </div>
              <div class="info">
                <div class="label">{{ $t("home.overview.totalPower") }}</div>
                <div class="value">9.90</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 右侧安全运行天数 -->
      <el-col :span="6">
        <el-card shadow="never" class="safe-run-card">
          <div slot="header" class="clearfix">
            <span class="section-title">{{
              $t("home.overview.runningDays")
            }}</span>
          </div>
          <div class="safe-days-wrapper">
            <div class="digital-card">4</div>
            <div class="digital-card">8</div>
            <div class="digital-card">6</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 2. 中间状态区域 -->
    <el-row :gutter="20" class="middle-section">
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in middleCards" :key="index">
            <el-card shadow="hover" class="status-card">
              <div class="status-header">
                <div class="icon-box">
                  <img :src="item.icon" class="status-icon" v-if="item.icon" />
                </div>
                <span class="status-title">{{ $t(item.title) }}</span>
              </div>
              <div class="chart-wrapper">
                <div class="chart-container" :ref="item.refName"></div>
                <div class="custom-legend">
                  <div
                    v-for="(legend, lIndex) in item.data"
                    :key="lIndex"
                    class="legend-item"
                  >
                    <span
                      class="legend-dot"
                      :style="{ background: legend.itemStyle.color }"
                    ></span>
                    <div class="legend-text">
                      <div class="legend-name">{{ $t(legend.name) }}</div>
                      <div class="legend-value">{{ legend.value }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover" class="info-list-card">
          <div slot="header" class="clearfix">
            <span class="section-title">储能站投运情况</span>
          </div>
          <div class="station-content">
            <div class="station-icon-wrapper">
              <i class="el-icon-s-platform"></i>
            </div>
            <div class="station-info">
              <div class="station-name">东风日产</div>
              <div class="info-list">
                <div class="info-row">
                  <svg-icon
                    icon-class="blue-dian"
                    style="width: 14px; height: 14px; margin-right: 8px"
                  />
                  装机容量: 20,124(kWh)
                </div>
                <div class="info-row">
                  <svg-icon
                    icon-class="blue-dian"
                    style="width: 14px; height: 14px; margin-right: 8px"
                  />
                  装机功率: 9,900(kW)
                </div>
                <div class="info-row">
                  <svg-icon
                    icon-class="blue-dian"
                    style="width: 14px; height: 14px; margin-right: 8px"
                  />
                  投运时间: 2024-07-13
                </div>
              </div>
            </div>
          </div>
          <!-- 分割线 -->
          <el-divider />
        </el-card>
      </el-col>
    </el-row>

    <!-- 3. 底部统计区域 -->
    <el-row :gutter="20" class="bottom-section">
      <el-col :span="12">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span class="section-title">总收益统计</span>
            <div class="header-stats">
              <span class="stat-item">
                <i class="el-icon-coin" style="color: #e6a23c"></i>
                总收益
                <span class="stat-value" style="color: #e6a23c">
                  873.75 万元
                </span>
              </span>
            </div>
          </div>
          <div ref="revenueChart" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span class="section-title">总电量统计</span>
            <div class="header-stats">
              <span class="stat-item">
                <svg-icon icon-class="greed-dian" class="stat-icon" />
                总充电量
                <span class="stat-value charge"> 13.812 GWh </span>
              </span>
              <span class="stat-item">
                <svg-icon icon-class="blue-dian" class="stat-icon" />
                总放电量
                <span class="stat-value discharge"> 11.829 GWh </span>
              </span>
            </div>
          </div>
          <div ref="energyChart" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "Home",
  data() {
    return {
      middleCards: [
        {
          title: "home.equipmentInfo.systemStatus",
          refName: "chart1",
          icon: require("@/assets/home/icon1.png"),
          data: [
            {
              value: 9,
              name: "home.chart.online",
              itemStyle: { color: "#409EFF" },
            },
            {
              value: 1,
              name: "home.chart.offline",
              itemStyle: { color: "#E6A23C" },
            },
          ],
        },
        {
          title: "home.equipmentInfo.alarmPrompt",
          refName: "chart2",
          icon: require("@/assets/home/icon2.png"),
          data: [
            {
              value: 10,
              name: "home.chart.ready",
              itemStyle: { color: "#67C23A" },
            },
            {
              value: 0,
              name: "home.chart.fault",
              itemStyle: { color: "#F56C6C" },
            },
          ],
        },
        {
          title: "home.equipmentInfo.chargeDischargeStatus",
          refName: "chart3",
          icon: require("@/assets/home/icon3.png"),
          data: [
            {
              value: 0,
              name: "home.chart.charging",
              itemStyle: { color: "#409EFF" },
            },
            {
              value: 0,
              name: "home.chart.discharging",
              itemStyle: { color: "#E6A23C" },
            },
          ],
        },
        {
          title: "home.equipmentInfo.yesterdayDischarge",
          refName: "chart4",
          icon: require("@/assets/home/icon4.png"),
          data: [
            {
              value: 0,
              name: "home.chart.chargeAmount",
              itemStyle: { color: "#409EFF" },
            },
            {
              value: 0,
              name: "home.chart.dischargeAmount",
              itemStyle: { color: "#67C23A" },
            },
          ],
        },
      ],
      charts: {},
    };
  },
  watch: {
    "$i18n.locale"() {
      this.updateChartLocale();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    Object.values(this.charts).forEach((chart) => chart.dispose());
  },
  methods: {
    handleResize() {
      Object.values(this.charts).forEach((chart) => chart && chart.resize());
    },
    initCharts() {
      this.initChart1();
      this.initChart2();
      this.initChart3();
      this.initChart4();
      this.initRevenueChart();
      this.initEnergyChart();
    },
    // 系统状态
    initChart1() {
      const chart = echarts.init(this.$refs.chart1[0]);
      this.charts.chart1 = chart;
      const data = this.middleCards[0].data.map((item) => ({
        ...item,
        name: this.$t(item.name),
      }));
      chart.setOption({
        tooltip: { trigger: "item" },
        legend: { show: false }, // 隐藏默认图例，使用自定义 HTML 图例
        series: [
          {
            type: "pie",
            radius: ["60%", "85%"], // 调整半径
            center: ["50%", "50%"], // 居中
            label: {
              show: true,
              position: "center",
              formatter: `{a|10}\n{b|${this.$t("home.chart.totalDevices")}}`,
              rich: {
                a: { fontSize: 18, fontWeight: "bold", color: "#333" },
                b: { fontSize: 12, color: "#999" },
              },
            },
            data: data,
          },
        ],
      });
    },
    // 就绪告警
    initChart2() {
      const chart = echarts.init(this.$refs.chart2[0]);
      this.charts.chart2 = chart;
      const data = this.middleCards[1].data.map((item) => ({
        ...item,
        name: this.$t(item.name),
      }));
      chart.setOption({
        tooltip: { trigger: "item" },
        legend: { show: false },
        series: [
          {
            type: "pie",
            radius: ["60%", "85%"],
            center: ["50%", "50%"],
            label: {
              show: true,
              position: "center",
              formatter: `{a|10}\n{b|${this.$t("home.chart.totalDevices")}}`,
              rich: {
                a: { fontSize: 18, fontWeight: "bold", color: "#333" },
                b: { fontSize: 12, color: "#999" },
              },
            },
            data: data,
          },
        ],
      });
    },
    // 充放电状态
    initChart3() {
      const chart = echarts.init(this.$refs.chart3[0]);
      this.charts.chart3 = chart;
      const data = this.middleCards[2].data.map((item) => ({
        ...item,
        name: this.$t(item.name),
      }));
      chart.setOption({
        tooltip: { trigger: "item" },
        legend: { show: false },
        series: [
          {
            type: "pie",
            radius: ["60%", "85%"],
            center: ["50%", "50%"],
            label: {
              show: true,
              position: "center",
              formatter: `{a|10}\n{b|${this.$t("home.chart.totalDevices")}}`,
              rich: {
                a: { fontSize: 18, fontWeight: "bold", color: "#333" },
                b: { fontSize: 12, color: "#999" },
              },
            },
            data: data,
          },
        ],
      });
    },
    // 昨日充放电量
    initChart4() {
      const chart = echarts.init(this.$refs.chart4[0]);
      this.charts.chart4 = chart;

      const data = this.middleCards[3].data.map((item) => ({
        ...item,
        name: this.$t(item.name),
      }));
      chart.setOption({
        tooltip: { trigger: "item" },
        legend: { show: false },
        series: [
          {
            type: "pie",
            radius: ["60%", "85%"],
            center: ["50%", "50%"],
            label: {
              show: true,
              position: "center",
              formatter: `{a|0%}\n{b|${this.$t("home.chart.conversionRate")}}`,
              rich: {
                a: { fontSize: 18, fontWeight: "bold", color: "#333" },
                b: { fontSize: 12, color: "#999" },
              },
            },
            data: data,
          },
        ],
      });
    },
    // 总收益统计
    initRevenueChart() {
      const chart = echarts.init(this.$refs.revenueChart);
      this.charts.revenueChart = chart;
      chart.setOption({
        tooltip: { trigger: "axis" },
        grid: { top: 40, bottom: 20, left: 40, right: 20, containLabel: true },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "11",
            "12",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "10",
          ],
          axisLine: { lineStyle: { color: "#ccc" } },
          axisLabel: { color: "#666" },
        },
        yAxis: {
          type: "value",
          name: "收益(万元)",
          splitLine: { lineStyle: { type: "dashed" } },
          axisLine: { show: false },
          axisLabel: { color: "#666" },
        },
        series: [
          {
            name: "收益",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            data: [80, 80, 80, 70, 45, 75, 45, 40, 50, 0, 10],
            itemStyle: { color: "#E6A23C" },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(230, 162, 60, 0.3)" },
                { offset: 1, color: "rgba(230, 162, 60, 0.05)" },
              ]),
            },
          },
        ],
      });
    },
    // 总电量统计
    initEnergyChart() {
      const chart = echarts.init(this.$refs.energyChart);
      this.charts.energyChart = chart;
      chart.setOption({
        tooltip: { trigger: "axis" },
        grid: { top: 40, bottom: 20, left: 40, right: 20, containLabel: true },
        legend: { top: 0, right: 10 },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "11",
            "12",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "10",
          ],
          axisLine: { lineStyle: { color: "#ccc" } },
          axisLabel: { color: "#666" },
        },
        yAxis: {
          type: "value",
          name: "电量(MWh)",
          splitLine: { lineStyle: { type: "dashed" } },
          axisLine: { show: false },
          axisLabel: { color: "#666" },
        },
        series: [
          {
            name: "充电量",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 6,
            data: [
              1100, 1150, 1080, 1000, 1150, 1050, 1150, 1020, 1000, 30, 180,
            ],
            itemStyle: { color: "#409EFF" },
            lineStyle: { width: 2 },
          },
          {
            name: "放电量",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 6,
            data: [980, 970, 960, 850, 980, 900, 980, 870, 850, 20, 150],
            itemStyle: { color: "#67C23A" },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(103, 194, 58, 0.3)" },
                { offset: 1, color: "rgba(103, 194, 58, 0.05)" },
              ]),
            },
            lineStyle: { width: 2 },
          },
        ],
      });
    },
    updateChartLocale() {
      // 销毁旧图表实例
      Object.values(this.charts).forEach((chart) => chart && chart.dispose());
      this.charts = {};
      // 重新初始化图表
      this.$nextTick(() => {
        this.initCharts();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  background-color: #f0f2f5;
  height: calc(
    100vh - 84px
  ); // 调整为固定高度（减去导航栏高度），配合 flex 实现铺满
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden; // 防止出现滚动条
  flex: 1;

  .section-title {
    font-size: 16px;
    font-weight: bold;
    border-left: 4px solid #409eff;
    padding-left: 10px;
    color: #333;
    float: left; // 保持标题靠左
  }

  // 清除浮动
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .header-stats {
    float: right;
    display: flex;
    align-items: center;
    gap: 100px;

    .stat-item {
      display: inline-flex;
      align-items: center;
      font-size: 14px;
      color: #606266;

      .stat-icon {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }

      .stat-value {
        font-weight: bold;
        margin-left: 5px;

        &.charge {
          color: #409eff;
        }

        &.discharge {
          color: #67c23a;
        }
      }
    }
  }

  .top-section {
    margin-bottom: 20px;
    display: flex; // 添加 flex 布局以实现高度拉伸
    flex: 1;
    .el-col {
      display: flex; // 确保列也使用 flex
      flex-direction: column;
    }

    .overview-card {
      flex: 1; // 让卡片填满高度
      display: flex;
      flex-direction: column;

      ::v-deep .el-card__body {
        flex: 1;
        display: flex;
        align-items: center; // 垂直居中内容
      }
    }

    .overview-items {
      width: 100%; // 确保内容宽度占满
      display: flex;
      justify-content: space-around;
      padding: 10px 0;

      .overview-item {
        display: flex;
        align-items: center;

        .icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #fff;
          margin-right: 15px;

          &.icon-blue {
            background: rgba(64, 158, 255, 0.1);
            color: #409eff;
          }
          &.icon-cyan {
            background: rgba(54, 203, 203, 0.1);
            color: #36cbcb;
          }
          &.icon-green {
            background: rgba(103, 194, 58, 0.1);
            color: #67c23a;
          }
          &.icon-purple {
            background: rgba(146, 84, 222, 0.1);
            color: #9254de;
          }
        }

        .info {
          .label {
            font-size: 12px;
            color: #999;
            margin-bottom: 5px;
          }
          .value {
            font-size: 20px;
            font-weight: bold;
            color: #333;
          }
        }
      }
    }

    .safe-run-card {
      height: 100%;

      .safe-days-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;

        .digital-card {
          background: #409eff;
          color: #fff;
          font-size: 28px;
          font-weight: bold;
          padding: 10px 15px;
          border-radius: 4px;
          margin: 0 5px;
          box-shadow: 0 4px 6px rgba(64, 158, 255, 0.4);
        }
      }
    }
  }

  .middle-section {
    flex: 2;
    margin-bottom: 20px;
    display: flex;
    // min-height: 0;

    .el-col {
      display: flex;
      flex-direction: column;
    }

    .el-row {
      flex: 1;
      display: flex;
    }

    .status-card {
      height: 100%; // 改为100%以填满可用空间
      display: flex;
      flex-direction: column;
      border-radius: 8px;

      ::v-deep .el-card__body {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .status-header {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;

        .icon-box {
          width: 140px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;

          .status-icon {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        }

        .status-title {
          font-weight: bold;
          color: #333;
          font-size: 16px;
        }
      }

      .chart-wrapper {
        flex: 1;
        width: 100%;
        min-height: 0;
        display: flex;
        padding: 0 10px;

        .chart-container {
          flex: 1;
          height: 100%;
          min-height: 100px;
        }

        .custom-legend {
          width: 45%; // 稍微增加宽度
          padding-left: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center; // 让图例垂直居中

          .legend-item {
            display: flex;
            align-items: flex-start; // 对齐到顶部，实现图例 icon 对齐第一行文字
            margin-bottom: 15px;

            .legend-dot {
              width: 8px;
              height: 8px;
              border-radius: 2px;
              margin-top: 6px; // 稍微下移以对齐文字中心
              margin-right: 8px;
              flex-shrink: 0;
            }

            .legend-text {
              flex: 1;
              min-width: 0; // 关键：允许子元素截断
              font-size: 12px;
              line-height: 1.5;
              color: #666;

              .legend-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .legend-value {
                font-weight: bold;
                color: #333;
                margin-top: 2px;
              }
            }
          }
        }
      }
    }

    .info-list-card {
      height: 100%; // 改为100%以填满可用空间
      border-radius: 8px;
      display: flex;
      flex-direction: column;

      ::v-deep .el-card__body {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .station-content {
        display: flex;
        // flex-direction: column;
        align-items: center;
        padding-top: 20px;

        .station-icon-wrapper {
          width: 60px;
          height: 50px;
          background: rgba(64, 158, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          margin-right: 20px;

          i {
            font-size: 32px;
          }
        }

        .station-info {
          width: 100%;
          .station-name {
            margin-bottom: 12px;
            color: #333;
            text-align: left;
            font-size: 16px;
            margin-left: 10px;
          }

          .info-list {
            padding: 0 10px;
            .info-row {
              font-size: 13px;
              color: #666;
              margin-bottom: 12px;
              display: flex;
              align-items: center;

              i {
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }

  .bottom-section {
    flex: 3; // 占满剩余空间
    display: flex;
    min-height: 0; // 防止 flex 子项溢出

    // 关键：禁用 el-row 的伪元素，防止干扰 flex 布局
    &::before,
    &::after {
      display: none;
    }

    .el-col {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .el-card {
      height: 100%; // 卡片高度占满
      display: flex;
      flex-direction: column;

      ::v-deep .el-card__body {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }

    .chart-box {
      flex: 1; // 图表区域自适应填充
      height: 100%; // 重要：确保高度传递
      width: 100%;
      min-height: 200px; // 最小高度保证
    }
  }
}
</style>
