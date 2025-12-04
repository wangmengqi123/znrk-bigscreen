<template>
  <div class="panel events-panel">
    <dv-border-box-13>
      <div class="panel-content">
        <div class="panel-title">{{ $t("bigScreen.eventsPanel.title") }}</div>
        <dv-decoration-10 style="width: 98%; height: 5px" />
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
    </dv-border-box-13>
  </div>
</template>

<script>
export default {
  name: "EventsPanel",
  mounted() {
    // 复制一份数据以实现无缝滚动
    this.eventList = [...this.eventList, ...this.eventList];
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
    font-size: 1.25rem;
    font-weight: 800;
    color: #fff;
    padding-left: 10px;
    margin: 15px 0;
  }

  .events-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 15px;
    overflow: hidden;
    padding: 0 10px;

    .event-header {
      display: flex;
      padding: 10px 0;
      color: #fff; // 表头文字白色
      border-bottom: 1px solid rgba(65, 166, 255, 0.3);
      background: rgba(36, 129, 227, 0.15); // 表头浅蓝色背景
      border-radius: 0;
      margin-top: 10px;
      margin-bottom: 5px;

      span {
        text-align: center;
        font-size: 14px;
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
        padding: 12px 0;
        align-items: center;
        /* color: rgba(255, 255, 255, 0.8); */

        .col-time {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1.4;
        }

        .col-level {
          flex: 1;
          text-align: center;
          font-size: 15px;
        }

        .col-content {
          flex: 2;
          display: flex;
          flex-direction: column;
          text-align: center;
          line-height: 1.4;

          .content-text:last-child {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            /* color: #ff8c00; // 告警内容橙色 */
          }
        }

        .level-L3 {
          color: inherit;
        }
        .level-L2 {
          color: inherit;
        }
        .level-Info {
          color: inherit;
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
    transform: translateY(-50%);
  }
}
</style>
