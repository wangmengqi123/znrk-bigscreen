<template>
  <div class="panel events-panel">
    <CommonHeader
      :title="$t('bigScreen.eventsPanel.title')"
      rightIcon="things"
    />
    <div class="panel-content">
      <div class="events-list">
        <div class="event-header">
          <span>{{ $t("bigScreen.eventsPanel.headerTime") }}</span>
          <span>{{ $t("bigScreen.eventsPanel.headerLevel") }}</span>
          <span>{{ $t("bigScreen.eventsPanel.headerContent") }}</span>
        </div>
        <div class="event-body">
          <div class="scroll-wrapper">
            <div
              class="event-row"
              v-for="(item, index) in eventList"
              :key="index"
              :style="{ color: getRowColor(item) }"
            >
              <div class="col-time">
                <span class="date">{{ item.date }}</span>
                <span class="time">{{ item.time }}</span>
              </div>
              <span class="col-level" :class="'level-' + item.level">{{
                item.level
              }}</span>
              <div class="col-content">
                <span class="content-text" :title="item.content1">{{
                  item.content1
                }}</span>
                <span class="content-text" :title="item.content2">{{
                  item.content2
                }}</span>
              </div>
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
  name: "EventsPanel",
  components: {
    CommonHeader,
  },
  mounted() {
    // 复制多份数据以确保在高度较高的大屏上也能无缝滚动，避免底部出现空白
    // 为了消除性能顾虑，我们限制原始数据的最大显示数量（例如只显示最新的 50 条）
    // 这样即使后端返回大量数据，渲染的节点数也在可控范围内（50 * 4 = 200 个节点，对浏览器来说非常轻松）
    const MAX_ITEMS = 50;
    const originalList = this.eventList.slice(0, MAX_ITEMS);

    // 原始数据 1 份，复制 3 份，共 4 份
    // 对应 CSS 动画 translateY(-25%)，即滚动完 1 份的高度后重置
    this.eventList = [
      ...originalList,
      ...originalList,
      ...originalList,
      ...originalList,
    ];
  },
  methods: {
    getRowColor(item) {
      if (item.waringstatus === 2) return "#92dfff";
      if (item.waringstatus === 3) return "#ffd700";
      return "#597ed6";
    },
  },
  data() {
    return {
      eventList: [
        {
          date: "11-11",
          time: "16:07:42",
          level: "L3",
          content1: "东风日产3#-2",
          content2: "3BC系统总报警",
          waringstatus: 1,
        },
        {
          date: "11-11",
          time: "16:07:39",
          level: "Info",
          content1: "东风日产户外柜3#-3",
          content2: "系统放空",
          waringstatus: 2,
        },
        {
          date: "11-11",
          time: "16:08:57",
          level: "L3",
          content1: "东风日产3#-2",
          content2: "4BC系统总报警",
          waringstatus: 3,
        },
        {
          date: "11-11",
          time: "16:08:56",
          level: "L3",
          content1: "东风日产3#-2",
          content2: "组串式系统4 BMS综合故障报警",
          waringstatus: 1,
        },
        {
          date: "11-11",
          time: "16:08:56",
          level: "L2",
          content1: "东风日产3#-2",
          content2: "组串式系统4 综合故障报警",
          waringstatus: 1,
        },
        {
          date: "11-11",
          time: "16:07:48",
          level: "L3",
          content1: "东风日产4#-2",
          content2: "3BC系统总报警",
          waringstatus: 1,
        },
        {
          date: "11-11",
          time: "16:07:47",
          level: "L2",
          content1: "东风日产4#-2",
          content2: "组串式系统3 综合故障报警",
          waringstatus: 1,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.events-panel {
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 15px 15px 15px;
  }

  .events-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    overflow: hidden;

    .event-header {
      display: flex;
      padding: 12px 10px;
      color: #00f5d4; // 主题青色
      border-bottom: 1px solid rgba(0, 245, 212, 0.3);
      background: linear-gradient(
        135deg,
        rgba(6, 24, 70, 0.5) 0%,
        rgba(10, 35, 90, 0.3) 100%
      );
      border-radius: 8px;
      margin-bottom: 10px;
      font-weight: 600;

      span {
        text-align: center;
        font-size: 13px;
        letter-spacing: 0.5px;
      }
      span:nth-child(1) {
        flex: 1;
      }
      span:nth-child(2) {
        flex: 1;
      }
      span:nth-child(3) {
        flex: 2;
      }
    }

    .event-body {
      flex: 1;
      overflow: hidden; // 隐藏滚动条，使用动画滚动
      position: relative;

      .scroll-wrapper {
        animation: scroll-up 20s linear infinite;
        /* 鼠标悬停时暂停动画 */
        &:hover {
          animation-play-state: paused;
        }
      }

      .event-row {
        display: flex;
        padding: 10px 8px;
        align-items: center;
        border-bottom: 1px solid rgba(0, 245, 212, 0.1);
        transition: background 0.3s ease;

        &:hover {
          background: rgba(0, 245, 212, 0.05);
        }

        .col-time {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.4;
          font-size: 12px;

          .date {
            color: #a0c4e8;
          }
          .time {
            color: #94f0f8;
            font-size: 11px;
          }
        }

        .col-level {
          flex: 1;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .col-content {
          flex: 2;
          display: flex;
          flex-direction: column;
          text-align: center;
          line-height: 1.4;
          font-size: 12px;

          .content-text {
            &:first-child {
              color: #a0c4e8;
              margin-bottom: 2px;
            }
            &:last-child {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        .level-L3 {
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.15);
        }
        .level-L2 {
          color: #ffd700;
          background: rgba(255, 215, 0, 0.15);
        }
        .level-Info {
          color: #92dfff;
          background: rgba(146, 223, 255, 0.15);
        }
      }
    }
  }
}

@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-25%);
  }
}
</style>
