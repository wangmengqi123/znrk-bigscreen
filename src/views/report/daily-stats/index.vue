<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="filter-container">
          <div class="left-panel">
            <span class="title">日报统计</span>
            <el-date-picker
              v-model="queryMonth"
              type="month"
              placeholder="选择月"
              size="small"
              style="width: 150px; margin-left: 20px"
              value-format="yyyy-MM"
            />
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
          show-summary
          :summary-method="getSummaries"
          :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
        >
          <el-table-column type="selection" width="55" align="center" fixed />
          <el-table-column prop="date" label="时间" width="100" align="center" fixed />

          <el-table-column label="充电量(kWh)" align="center">
            <el-table-column prop="chargeTip" label="尖" min-width="80" align="center" />
            <el-table-column prop="chargePeak" label="峰" min-width="80" align="center" />
            <el-table-column prop="chargeFlat" label="平" min-width="80" align="center" />
            <el-table-column prop="chargeValley" label="谷" min-width="80" align="center" />
          </el-table-column>

          <el-table-column label="放电量(kWh)" align="center">
            <el-table-column prop="dischargeTip" label="尖" min-width="80" align="center" />
            <el-table-column prop="dischargePeak" label="峰" min-width="80" align="center" />
            <el-table-column prop="dischargeFlat" label="平" min-width="80" align="center" />
            <el-table-column prop="dischargeValley" label="谷" min-width="80" align="center" />
          </el-table-column>

          <el-table-column label="充电成本(元)" align="center">
            <el-table-column prop="costTip" label="尖" min-width="90" align="center" />
            <el-table-column prop="costPeak" label="峰" min-width="90" align="center" />
            <el-table-column prop="costFlat" label="平" min-width="90" align="center" />
            <el-table-column prop="costValley" label="谷" min-width="90" align="center" />
          </el-table-column>

          <el-table-column label="放电收益(元)" align="center">
            <el-table-column prop="revenueTip" label="尖" min-width="90" align="center" />
            <el-table-column prop="revenuePeak" label="峰" min-width="90" align="center" />
            <el-table-column prop="revenueFlat" label="平" min-width="90" align="center" />
            <el-table-column prop="revenueValley" label="谷" min-width="90" align="center" />
          </el-table-column>

          <el-table-column label="总电量(kWh)" align="center">
            <el-table-column prop="totalCharge" label="充" min-width="100" align="center" />
            <el-table-column prop="totalDischarge" label="放" min-width="100" align="center" />
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DailyStats',
  data() {
    return {
      queryMonth: '2025-11',
      tableData: []
    }
  },
  created() {
    this.generateMockData()
  },
  methods: {
    generateMockData() {
      const data = []
      const days = 10 // Generate 10 days for demo
      
      for (let i = 0; i < days; i++) {
        const date = `11-${String(10 - i).padStart(2, '0')}`
        
        // Mock logic roughly matching the image data patterns
        const chargeTip = i === 1 || i === 4 || i === 5 ? 0 : 120 + (i % 2) * 120
        const chargePeak = 120 + (i % 3) * 120
        const chargeFlat = 17000 + Math.floor(Math.random() * 2000)
        const chargeValley = 19000 + Math.floor(Math.random() * 2000)
        
        const dischargeTip = 14000 + Math.floor(Math.random() * 2000)
        const dischargePeak = 16000 + Math.floor(Math.random() * 2000)
        const dischargeFlat = i === 4 ? 120 : 0
        const dischargeValley = 0

        const costTip = chargeTip * 0.935 // Approx rate
        const costPeak = chargePeak * 0.935
        const costFlat = chargeFlat * 0.58 // Approx rate
        const costValley = chargeValley * 0.26 // Approx rate

        const revenueTip = dischargeTip * 0.935
        const revenuePeak = dischargePeak * 0.935
        const revenueFlat = dischargeFlat * 0.58
        const revenueValley = 0

        const totalCharge = chargeTip + chargePeak + chargeFlat + chargeValley
        const totalDischarge = dischargeTip + dischargePeak + dischargeFlat + dischargeValley

        data.push({
          date,
          chargeTip,
          chargePeak,
          chargeFlat,
          chargeValley,
          dischargeTip,
          dischargePeak,
          dischargeFlat,
          dischargeValley,
          costTip: costTip.toFixed(2),
          costPeak: costPeak.toFixed(2),
          costFlat: costFlat.toFixed(2),
          costValley: costValley.toFixed(2),
          revenueTip: revenueTip.toFixed(2),
          revenuePeak: revenuePeak.toFixed(2),
          revenueFlat: revenueFlat.toFixed(2),
          revenueValley: revenueValley.toFixed(2),
          totalCharge,
          totalDischarge
        })
      }
      this.tableData = data
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          
          // Format to 2 decimal places for money related columns
          if (column.property && (column.property.startsWith('cost') || column.property.startsWith('revenue'))) {
             sums[index] = sums[index].toFixed(2)
          } else {
             // For energy, maybe keep integers or 2 decimals? Image shows integers for energy mostly.
             // But total row in image has decimals for money and integers for energy.
             sums[index] = Number.isInteger(sums[index]) ? sums[index] : sums[index].toFixed(2)
          }
        } else {
          sums[index] = ''
        }
      })

      return sums
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  background-color: #f0f2f5;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.box-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 0;

  ::v-deep .el-card__header {
    padding: 15px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  ::v-deep .el-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
  flex: 1;
  overflow: hidden;
}
</style>