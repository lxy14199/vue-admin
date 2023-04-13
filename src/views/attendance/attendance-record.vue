<template>
  <el-calendar v-model="currentDate">
    <template slot="dateCell" slot-scope="{date, data}">
      {{ data.day.slice(8) }}
    </template>>
  </el-calendar>
</template>

<script>
export default {
  name: 'AttendanceRecord',
  data() {
    return {
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentDay: new Date().setHours(0),
      attendances: []
    }
  },
  created() {
  },
  methods: {

  }
}
</script>
