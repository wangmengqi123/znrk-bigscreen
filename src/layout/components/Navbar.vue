<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <tags-view class="tags-view-container" />

    <div class="right-menu">
      <i
        class="el-icon-refresh"
        style="font-size: 20px; margin-right: 20px"
        @click="refresh"
      ></i>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <i class="el-icon-more-outline" style="font-size: 20px"></i> -->
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t("common.bigScreen") }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="switchLanguage">
            <span style="display: block">{{
              currentLanguage === "zh"
                ? $t("common.english")
                : $t("common.chinese")
            }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">{{ $t("common.logout") }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import TagsView from "./TagsView";

export default {
  components: {
    Hamburger,
    TagsView,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "language"]),
    currentLanguage() {
      return this.language || "zh";
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    },
    refresh() {
      window.location.reload();
    },
    switchLanguage() {
      const newLang = this.currentLanguage === "zh" ? "en" : "zh";
      this.$store.dispatch("language/setLanguage", newLang).then(() => {
        this.$i18n.locale = newLang;
        // Update Element UI locale
        const locale = require("element-ui/lib/locale");
        if (newLang === "zh") {
          locale.use(require("element-ui/lib/locale/lang/zh-CN").default);
        } else {
          locale.use(require("element-ui/lib/locale/lang/en").default);
        }
        this.$message.success(
          this.$t("common.language") +
            " " +
            (newLang === "zh"
              ? this.$t("common.chinese")
              : this.$t("common.english"))
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex; // 使用 Flex 布局
  align-items: center; // 垂直居中

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    flex-shrink: 0; // 防止压缩

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .tags-view-container {
    flex: 1; // 占据剩余空间
    width: 0; // 防止溢出
    height: 100%;
    background: transparent;
    border-bottom: none;
    box-shadow: none;
  }

  .right-menu {
    height: 100%;
    // line-height: 50px;
    flex-shrink: 0; // 防止压缩
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      cursor: pointer;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.el-icon-refresh {
  cursor: pointer;
}
</style>
