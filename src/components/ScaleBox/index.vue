<template>
  <div
    class="scale-box"
    ref="scaleBox"
    :style="{
      width: width + 'px',
      height: height + 'px',
      transform: 'scale(' + scale + ') translate(-50%, -50%)',
      '-webkit-transform': 'scale(' + scale + ') translate(-50%, -50%)',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ScaleBox",
  props: {
    width: {
      type: Number,
      default: 1920,
    },
    height: {
      type: Number,
      default: 1080,
    },
  },
  data() {
    return {
      scale: 1,
    };
  },
  mounted() {
    this.setScale();
    window.addEventListener("resize", this.debounce(this.setScale, 100));
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setScale);
  },
  methods: {
    getScale() {
      const { width, height } = this;
      const wh = window.innerHeight / height;
      const ww = window.innerWidth / width;
      return ww < wh ? ww : wh;
    },
    setScale() {
      this.scale = this.getScale();
    },
    debounce(fn, delay) {
      let timer;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, delay);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.scale-box {
  position: absolute;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  z-index: 999;
  background: #060922; // 保持背景色一致，避免缩放时的缝隙
}
</style>
