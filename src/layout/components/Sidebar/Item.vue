<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    const i18n = context.parent.$i18n || context.parent.$root.$i18n;

    if (icon) {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        vnodes.push(<svg-icon icon-class={icon} />);
      }
    }

    if (title) {
      // Check if title is an i18n key (contains dot) or plain text
      const displayTitle = i18n && title.includes(".") ? i18n.t(title) : title;
      vnodes.push(
        <span slot="title">
          <el-tooltip effect="dark" content={displayTitle} placement="right">
            <span style="display:inline-block; width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; vertical-align:middle;">
              {displayTitle}
            </span>
          </el-tooltip>
        </span>
      );
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
