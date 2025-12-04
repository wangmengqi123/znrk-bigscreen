<template>
  <div class="bigscreen-container">
    <!-- 顶部标题 (模拟) -->
    <div class="bigscreen-header">
      <div class="header-title">{{ $t("common.projectName") }}</div>
      <div class="header-info">
        <el-button
          class="enter-admin-btn"
          type="primary"
          @click="$router.push('/home')"
          >{{ $t("bigScreen.enterAdmin") }}</el-button
        >
      </div>
    </div>

    <div class="main-content">
      <!-- 浮动按钮 -->

      <!-- 左侧栏 -->
      <div class="column left-col">
        <!-- 储能站规模 -->
        <scale-panel />

        <!-- 运营分析 -->
        <analysis-panel />
      </div>

      <!-- 中间栏 -->
      <div class="column center-col">
        <!-- 地图区域 -->
        <map-panel />

        <!-- 电量分析 -->
        <electricity-panel />
      </div>

      <!-- 右侧栏 -->
      <div class="column right-col">
        <!-- 告警统计 -->
        <alarm-panel />

        <!-- 实时事件 -->
        <events-panel />
      </div>
    </div>
  </div>
</template>

<script>
import ScalePanel from "./components/ScalePanel";
import AnalysisPanel from "./components/AnalysisPanel";
import MapPanel from "./components/MapPanel";
import ElectricityPanel from "./components/ElectricityPanel";
import AlarmPanel from "./components/AlarmPanel";
import EventsPanel from "./components/EventsPanel";
import { getStationData } from "@/api/bigscreen";

export default {
  name: "BigScreen",
  components: {
    ScalePanel,
    AnalysisPanel,
    MapPanel,
    ElectricityPanel,
    AlarmPanel,
    EventsPanel,
  },
  data() {
    return {
      resizeTimer: null,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.getStationData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
  },
  methods: {
    // 防抖处理 resize 事件
    handleResize() {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
    },
    async getStationData() {
      const res = await getStationData();
      console.log(res, "res");
    },
  },
};
</script>

<style lang="scss" scoped>
.bigscreen-container {
  height: 100vh;
  min-height: 100vh;
  background-color: #050e26;
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  .bigscreen-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 50px;
    margin-bottom: 10px;
    position: relative;

    .header-title {
      font-size: 1.55rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-weight: bold;
      color: #00eaff;
    }
  }

  .main-content {
    display: flex;
    height: calc(100% - 50px);
    gap: 20px; // 增加整体列间距
    background: url("~@/assets/bigscreen/big-screen.png") no-repeat center
      center;
    background-size: 100% 100%;
    .column {
      display: flex;
      flex-direction: column;
      gap: 20px; // 增加上下元素间距
      height: 100%; // 确保列高度占满
    }

    .left-col {
      flex: 2.5;
    }
    .center-col {
      flex: 5;
    }
    .right-col {
      flex: 2.5;
    }
  }

  .enter-admin-btn {
    background: rgba(36, 129, 227, 0.3);
    border-color: #2481e3;
    color: #fff;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
      background: rgba(36, 129, 227, 0.8);
    }
  }
}
</style>
