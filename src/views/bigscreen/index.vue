<template>
  <div class="bigscreen-container">
    <div class="bigscreen-header">
      <div class="time">{{ time }}</div>
      <div class="project-name">{{ $t("common.projectName") }}</div>
      <div class="enter-admin-btn">
        <el-button
          icon="el-icon-setting"
          class="enter-admin-btn"
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
      time: "",
      timer: null,
    };
  },
  mounted() {
    this.getTime();
    this.timer = setInterval(() => {
      this.getTime();
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    getTime() {
      this.time = new Date().toLocaleString();
    },
  },
};
</script>
<style lang="scss" scoped>
.bigscreen-container {
  font-family: "Exo 2", sans-serif;
  background: #060922;
  overflow: hidden;
  position: relative;
  user-select: none;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  padding-bottom: 0;
  /* 网格背景 */
  background-image: linear-gradient(rgba(0, 245, 212, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 245, 212, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  .bigscreen-header {
    height: 80px;
    display: flex;
    align-items: center;
    background: rgba(15, 25, 70, 0.85);
    border-radius: 10px;
    padding: 0 30px;
    margin-bottom: 15px;
    position: relative;
    overflow: hidden;
    z-index: 10;
    border: 1px solid rgba(0, 245, 212, 0.2);
    box-shadow: 0 0 20px rgba(0, 245, 212, 0.1);
    .time {
      flex: 1;
      font-size: 1.3rem;
      font-weight: 500;
      color: #94f0f8;
      letter-spacing: 1px;
    }
    .project-name {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2.2rem;
      font-weight: 700;
      font-family: "Orbitron", sans-serif;
      letter-spacing: 3px;
      text-transform: uppercase;
      background: linear-gradient(90deg, #77a0ff, #00f5d4, #9b5de5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 20px rgba(155, 93, 229, 0.5);
      animation: titleGlow 2s infinite alternate;
      @keyframes titleGlow {
        0% {
          text-shadow: 0 0 20px rgba(155, 93, 229, 0.5);
        }
        100% {
          text-shadow: 0 0 40px rgba(0, 245, 212, 0.8),
            0 0 60px rgba(155, 93, 229, 0.7);
        }
      }
    }
    .enter-admin-btn {
      border: none;
      background: linear-gradient(90deg, #00f5d4, #9b5de5);
      color: #0c2952;
      border-radius: 30px;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 0 20px #00f5d4;
      position: relative;
      overflow: hidden;
      z-index: 10;
      font-family: "Orbitron", sans-serif;
      letter-spacing: 1px;
    }
    .enter-admin-btn::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.3)
      );
      animation: btnScan 3s infinite;
      z-index: 2;
    }

    @keyframes btnScan {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .admin-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px var(--primary-neon), 0 0 50px rgba(155, 93, 229, 0.5);
    }
  }
  .bigscreen-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 245, 212, 0.1),
      transparent
    );
    animation: headerScan 4s linear infinite;
  }
  @keyframes headerScan {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  .main-content {
    display: flex;
    height: calc(100% - 100px);
    gap: 20px; // 增加整体列间距
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
}
</style>
