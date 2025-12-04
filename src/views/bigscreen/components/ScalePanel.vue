<template>
  <div class="panel scale-panel">
    <dv-border-box-13>
      <div class="panel-content">
        <div class="panel-title">{{ $t("bigScreen.scalePanel.title") }}</div>
        <dv-decoration-10 style="width: 98%; height: 5px" />

        <!-- 装饰背景区 (模拟图片顶部的箭头条纹) -->
        <div class="deco-bg-stripes">
          <div class="stripe" v-for="n in 8" :key="n"></div>
        </div>

        <!-- 安全运行天数 -->
        <div class="safe-run-days">
          <span class="label">{{ $t("bigScreen.scalePanel.safeDays") }}</span>
          <div class="days-container">
            <div class="day-card">4</div>
            <div class="day-card">8</div>
            <div class="day-card">6</div>
          </div>
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
    </dv-border-box-13>
  </div>
</template>

<script>
export default {
  name: "ScalePanel",
};
</script>

<style lang="scss" scoped>
.scale-panel {
  flex: 1;
  display: flex;
  flex-direction: column;

  // Need to duplicate panel styles or use global/mixin, keeping it scoped for now
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

  .deco-bg-stripes {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    opacity: 0.2; // 隐约可见

    .stripe {
      width: 20px;
      height: 100%;
      background: #54b5ff;
      transform: skewX(-45deg);
      margin: 0 10px;
    }
  }

  .safe-run-days {
    display: flex;
    flex-direction: column;
    align-items: center; // 居中对齐
    justify-content: center;
    margin: 20px 10px;
    padding: 15px 0;
    background: linear-gradient(
      to bottom,
      rgba(36, 129, 227, 0.1),
      rgba(36, 129, 227, 0.05)
    );
    border-radius: 6px;
    border: 1px solid rgba(65, 166, 255, 0.2);
    position: relative; // 相对定位以便背景条纹在下方

    .label {
      position: absolute;
      top: 10px;
      left: 10px;
      color: #fff;
      font-size: 0.875rem; // 14px / 16px
      opacity: 0.9;
    }

    .days-container {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 25px; // 给label留出空间

      .day-card {
        width: 50px;
        height: 70px;
        background: #2481e3; // 实色背景
        border: 2px solid #fff; // 白色描边
        border-radius: 4px;
        color: #fff;
        font-size: 2.25rem; // 36px / 16px
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 10px rgba(36, 129, 227, 0.6);
        position: relative;

        // 上下半圆缺口模拟翻牌器孔
        &::before,
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          width: 8px;
          height: 8px;
          background: #050b1d; // 背景色遮挡形成孔
          border-radius: 50%;
          transform: translateX(-50%);
        }
        &::before {
          top: -5px;
        }
        &::after {
          bottom: -5px;
        }
      }
    }
  }

  .scale-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-bottom: 20px;
  }

  .stat-row {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: 2.625rem; // 42px / 16px
        font-weight: bold;
        color: #54b5ff;
        margin-bottom: 5px;
        text-shadow: 0 0 10px rgba(84, 181, 255, 0.4);
      }
      .stat-label {
        font-size: 0.875rem; // 14px / 16px
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
