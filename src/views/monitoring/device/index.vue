<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div class="left-panel">
            <span class="title">充放电记录</span>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="→"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              style="width: 240px; margin-left: 20px"
              value-format="yyyy-MM-dd"
            />
            <el-select
              v-model="status"
              placeholder="请选择状态"
              clearable
              size="small"
              style="width: 150px; margin-left: 10px"
            >
              <el-option label="充电" value="charge" />
              <el-option label="放电" value="discharge" />
            </el-select>
          </div>
          <div class="right-panel">
            <el-button icon="el-icon-refresh" size="small">刷新</el-button>
            <el-button icon="el-icon-download" size="small">导出</el-button>
          </div>
        </div>
      </div>

      <div class="table-wrapper">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe
          size="small"
          height="100%"
          :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
        >
          <el-table-column
            prop="startTime"
            label="开始时间"
            width="160"
            align="center"
            fixed
          />
          <el-table-column
            prop="endTime"
            label="结束时间"
            width="160"
            align="center"
            fixed
          />
          <el-table-column
            prop="status"
            label="状态"
            width="80"
            align="center"
            fixed
          >
            <template slot-scope="scope">
              <span
                :style="{
                  color: scope.row.status === '充电' ? '#67C23A' : '#F56C6C',
                }"
              >
                {{ scope.row.status }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isEmpty"
            label="放空"
            min-width="80"
            align="center"
          />
          <el-table-column
            prop="isFull"
            label="充满"
            min-width="80"
            align="center"
          />
          <el-table-column
            prop="energy"
            label="充/放电量(kWh)"
            min-width="140"
            align="center"
          />
          <el-table-column
            prop="avgPower"
            label="平均功率(kW)"
            min-width="140"
            align="center"
          />
          <el-table-column
            prop="startSoc"
            label="起始SOC(%)"
            min-width="110"
            align="center"
          />
          <el-table-column
            prop="endSoc"
            label="结束SOC(%)"
            min-width="110"
            align="center"
          />

          <el-table-column label="电表读数(kWh)" align="center">
            <el-table-column
              prop="meterStart"
              label="开始"
              min-width="140"
              align="center"
            />
            <el-table-column
              prop="meterEnd"
              label="结束"
              min-width="140"
              align="center"
            />
          </el-table-column>

          <el-table-column label="开始时间电压(V)" align="center">
            <el-table-column
              prop="startVoltMax"
              label="最高"
              min-width="120"
              align="center"
              class-name="blue-text"
            />
            <el-table-column
              prop="startVoltMin"
              label="最低"
              min-width="120"
              align="center"
              class-name="blue-text"
            />
          </el-table-column>

          <el-table-column label="结束时间电压(V)" align="center">
            <el-table-column
              prop="endVoltMax"
              label="最高"
              min-width="120"
              align="center"
              class-name="blue-text"
            />
            <el-table-column
              prop="endVoltMin"
              label="最低"
              min-width="120"
              align="center"
              class-name="blue-text"
            />
          </el-table-column>

          <el-table-column
            prop="duration"
            label="持续时间"
            min-width="120"
            align="center"
          />
        </el-table>
      </div>

      <div class="pagination-container">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DeviceMonitoring",
  data() {
    return {
      dateRange: ["2025-11-01", "2025-11-11"],
      status: "",
      tableData: [],
      total: 100,
      currentPage: 1,
      pageSize: 20,
    };
  },
  created() {
    this.generateMockData();
  },
  methods: {
    generateMockData() {
      const data = [];
      const statuses = ["放电", "充电"];
      const baseTime = new Date("2025-11-11 14:00:00").getTime();

      for (let i = 0; i < 20; i++) {
        const isCharge = i > 15; // Make some charge records
        const status = isCharge ? "充电" : "放电";
        const startTime = new Date(baseTime + i * 1000 * 60 * 10);
        const endTime = new Date(
          startTime.getTime() + 1000 * 60 * 5 + Math.random() * 1000 * 60
        );

        data.push({
          startTime: this.formatDate(startTime),
          endTime: this.formatDate(endTime),
          status: status,
          isEmpty: "否",
          isFull: "否",
          energy: (Math.random() * 50 + 10).toFixed(2),
          avgPower: (Math.random() * 500 + 100).toFixed(2),
          startSoc: (Math.random() * 50 + 10).toFixed(1),
          endSoc: (Math.random() * 50 + 10).toFixed(1),
          meterStart: (1150000 + Math.random() * 1000).toFixed(1),
          meterEnd: (1151000 + Math.random() * 1000).toFixed(1),
          startVoltMax: (3.2 + Math.random() * 0.1).toFixed(4),
          startVoltMin: (2.9 + Math.random() * 0.1).toFixed(4),
          endVoltMax: (3.2 + Math.random() * 0.1).toFixed(4),
          endVoltMin: (2.9 + Math.random() * 0.1).toFixed(4),
          duration:
            Math.floor(Math.random() * 10) +
            "分" +
            Math.floor(Math.random() * 60) +
            "秒",
        });
      }
      this.tableData = data;
    },
    formatDate(date) {
      const pad = (n) => (n < 10 ? "0" + n : n);
      return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
        date.getHours()
      )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  background-color: #f0f2f5;
  height: calc(100vh - 84px); // 固定高度，减去导航和标签栏高度
  display: flex;
  flex-direction: column;
  overflow: hidden; // 防止整个页面出现滚动条
}

.box-card {
  flex: 1; // 占满剩余高度
  display: flex;
  flex-direction: column;
  overflow: hidden; // 关键：防止卡片溢出
  margin-bottom: 0;

  ::v-deep .el-card__header {
    padding: 15px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    flex-shrink: 0; // 头部不收缩
  }

  ::v-deep .el-card__body {
    flex: 1; // 内容区域占满剩余高度
    display: flex;
    flex-direction: column;
    overflow: hidden; // 关键：内容区域溢出隐藏，交给内部表格滚动
    padding: 20px;
  }
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-panel {
    display: flex;
    align-items: center;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }
}

.table-wrapper {
  flex: 1; // 表格容器占满剩余高度
  overflow: hidden; // 关键
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 0;
  text-align: right;
  flex-shrink: 0; // 分页不收缩
}

::v-deep .blue-text {
  color: #409eff;
}
</style>
