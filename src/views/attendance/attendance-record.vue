<template>
  <el-calendar v-model="currentDate">
    <template slot="dateCell" slot-scope="{date, data}">
      <el-popover
        placement="bottom"
        title="签到信息"
        width="200"
        trigger="click"
      >
        <template v-if="Boolean(attendance.clockInTime)">
          <div class="clock-time">
            签到时间：{{ attendance.clockInTime }}
          </div>
          <div class="clock-time">
            签退时间：{{ attendance.clockOutTime }}
          </div>
        </template>
        <template v-else>
          无签到信息内容
        </template>
        <span slot="reference" @click="getAttdances(date)">{{ data.day.slice(8) }}</span>
      </el-popover>

    </template>>
  </el-calendar>
</template>

<script>
import { getAttendances } from '@/api/attendance'
import * as dateUtils from '@/utils/date'
export default {
  name: 'AttendanceRecord',
  data() {
    return {
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentDay: new Date().setHours(0),
      attendance: {}
    }
  },
  created() {
  },
  methods: {
    getAttdances(date) {
      this.attendance = {}
      const day = new Date(date.setHours(0)).setMinutes(0)
      const start = dateUtils.formatDate(new Date(day - 1000 * 60), 'yyyy-MM-dd hh:mm:ss')
      const end = dateUtils.formatDate(new Date(day + 1000 * 60), 'yyyy-MM-dd hh:mm:ss')
      getAttendances({ start: start, end: end }).then(result => {
        if (result.code === 20000) {
          if (result.data && result.data.length > 0) {
            this.attendance = result.data[0]
          }
        }
      })
    }
  }
}
</script>
