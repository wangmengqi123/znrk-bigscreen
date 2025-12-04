<template>
  <div class="common-header">
    <!-- 左侧装饰线 -->
    <div class="header-left-corner"></div>

    <!-- 左侧图标 -->
    <div class="header-icon-left" v-if="leftIcon">
      <span></span>
      <div class="header-title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>

    <!-- 右侧图标 -->
    <div class="header-icon-right" v-if="showRightIcon && rightIcon">
      <svg-icon class="myicon" :icon-class="rightIcon" />
    </div>

    <!-- 右侧装饰线 -->
    <div class="header-right-corner"></div>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  props: {
    // 标题文本
    title: {
      type: String,
      default: "全国储能站分布",
    },
    // 左侧图标路径
    leftIcon: {
      type: Boolean,
      default: true,
    },
    // 右侧图标路径
    rightIcon: {
      type: String,
      default: "",
    },
    // 是否显示右侧图标
    showRightIcon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
.common-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: linear-gradient(
    90deg,
    rgba(0, 20, 40, 0.8) 0%,
    rgba(0, 40, 80, 0.6) 50%,
    rgba(0, 20, 40, 0.8) 100%
  );
  border-bottom: 2px solid rgba(0, 200, 255, 0.3);
  padding: 0 20px;

  // 左侧装饰角
  .header-left-corner {
    position: absolute;
    left: 0;
    top: 0;
    width: 15px;
    height: 15px;
    border-top: 2px solid #00d4ff;
    border-left: 2px solid #00d4ff;
  }

  // 右侧装饰角
  .header-right-corner {
    position: absolute;
    right: 0;
    top: 0;
    width: 15px;
    height: 15px;
    border-top: 2px solid #9b5de5;
    border-right: 2px solid #9b5de5;
  }

  // 左侧图标
  .header-icon-left {
    display: flex;
    align-items: center;
    margin-right: 10px;

    span {
      display: inline-block;
      width: 4px;
      height: 32px;
      background: linear-gradient(to bottom, #00f5d4, #9b5de5);
      border-radius: 3px;
    }
  }

  // 标题
  .header-title {
    flex: 1;
    font-size: 20px;
    font-weight: bold;
    color: #00d4ff;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
    margin-left: 10px;
  }

  // 右侧图标
  .header-icon-right {
    display: flex;
    align-items: center;
    margin-left: 10px;

    .myicon {
      width: 28px;
      height: 28px;
    }
  }
}
</style>
