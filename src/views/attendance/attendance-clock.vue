<template>
  <div class="text-center">
    <div class="current-time">{{ currentTime }}</div>
    <div class="current-date">{{ currentDate }}</div>
    <div class="clock-button">
      <el-button-group>
        <el-button :disabled="hasAttendance" size="large" type="primary" @click="clockIn">
          签到
        </el-button>
        <el-button
          :disabled="!hasAttendance || Boolean(attendance.clockOutTime)"
          size="large"
          type="primary"
          @click="clockOut"
        >
          签退
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import { clockIn, clockOut, getAttendances } from '@/api/attendance'
import * as dateUtils from '@/utils/date'
export default {
  name: 'AttendaceClock',
  data() {
    return {
      hasAttendance: false,
      attendance: {
      },
      currentTime: dateUtils.formatDate(new Date(), 'hh:mm:ss'),
      currentDate: dateUtils.formatDate(new Date(), 'yyyy:mm:dd')
    }
  },
  created() {
    this.getAttendances()
  },
  methods: {
    getAttendances() {
      const day = new Date(new Date().setHours(0)).setMinutes(0)
      const start = dateUtils.formatDate(new Date(day - 1000 * 60), 'yyyy-MM-dd hh:mm:ss')
      const end = dateUtils.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      getAttendances({ start: start, end: end }).then(result => {
        if (result.code === 20000) {
          if (result.data && result.data.length > 0) {
            this.hasAttendance = true
            this.attendance = result.data[0]
          } else {
            this.hasAttendance = false
          }
        }
      })
    },
    clockIn() {
      const day = new Date(new Date().setHours(0)).setMinutes(0)
      const clockDate = dateUtils.formatDate(new Date(day), 'yyyy-MM-dd hh:mm:ss')
      clockIn({ clockDate: clockDate, clockInTime: dateUtils.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') }).then(result => {
        if (result.code === 20000) {
          this.attendance = result.data
          this.$message({
            message: '签到成功',
            type: 'success'
          })
        }
      })
    },
    clockOut() {
      const day = new Date(new Date().setHours(0)).setMinutes(0)
      const clockDate = dateUtils.formatDate(new Date(day), 'yyyy-MM-dd hh:mm:ss')
      clockOut({ clockDate: clockDate, clockOutTime: dateUtils.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') }).then(result => {
        if (result.code === 20000) {
          this.attendance = result.data
          this.$message({
            message: '签退成功',
            type: 'success'
          })
        }
      })
    }
  }
}

</script>

<style>
.text-center {
    text-align: center;
}

.current-time {
    margin-top: 40px;
    font-size: 50px;
}

.current-date {
    margin: 20px 0;
}

.clock-button {
    margin-top: 100px;
}

</style>
