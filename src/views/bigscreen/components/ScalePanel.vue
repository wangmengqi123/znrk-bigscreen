<template>
  <div class="panel scale-panel">
    <CommonHeader
      :title="$t('bigScreen.scalePanel.title')"
      rightIcon="station"
    ></CommonHeader>
    <div class="panel-content">
      <div class="days">
        <div class="days-item1">安全运行天数</div>
        <div class="days-item2">456</div>
        <div class="days-item3">天</div>
      </div>
      <div class="scale-content">
        <div class="stat-row top-stats">
          <div class="stat-item">
            <div class="stat-value">1</div>
            <div class="stat-label">
              {{ $t("bigScreen.scalePanel.totalStations") }}
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-value">9</div>
            <div class="stat-label">
              {{ $t("bigScreen.scalePanel.totalCabinets") }}
            </div>
          </div>
        </div>
        <div class="stat-row bottom-stats">
          <div class="stat-item">
            <div class="stat-value">20.12</div>
            <div class="stat-label">
              {{ $t("bigScreen.scalePanel.totalCapacity") }}
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-value">9.90</div>
            <div class="stat-label">
              {{ $t("bigScreen.scalePanel.totalPower") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";
export default {
  name: "ScalePanel",
  components: {
    CommonHeader,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.scale-panel {
  flex: 1;
  min-height: 0; // 修复 flex 子元素溢出问题
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  background: rgba(8, 14, 44, 0.75);
  border: 1px solid rgba(0, 245, 212, 0.2);
  border-radius: 10px;
  .panel-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 16px;
    color: #fff;
    .days {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      // min-height: 120px;
      background: rgba(15, 30, 70, 0.6);
      border-radius: 10px;
      padding: 15px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      position: relative;
      overflow: hidden;
      .days-item1 {
        color: #cce6ff;
        font-size: 0.9rem;
      }
      .days-item2 {
        font-size: 3rem;
        color: #00d664;
        text-shadow: 0 0 20px rgba(0, 214, 100, 0.6);
        font-weight: bold;
        font-family: "Orbitron", sans-serif;
      }
      .days-item3 {
        color: #00f5d4;
        font-size: 1.1rem;
      }
    }
    .days::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(0, 245, 212, 0.1),
        transparent
      );
      animation: statGlow 2s infinite;
    }
    @keyframes statGlow {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }

    .scale-content {
      flex: 1;
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;

      .stat-row {
        display: contents;
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 15px;
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
          font-size: 2.5rem;
          font-weight: bold;
          color: #00f5d4;
          text-shadow: 0 0 15px rgba(0, 245, 212, 0.6);
          font-family: "Orbitron", "Arial", sans-serif;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #a0c4e8;
          letter-spacing: 1px;
          text-align: center;
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
