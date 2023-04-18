<template>
  <div>
    <el-form ref="department" :model="department" :rules="rules" label-width="100px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="department.name" maxlength="20" placeholder="部门名称" show-word-limit type="text" />
      </el-form-item>
      <el-form-item label="负责人姓名" prop="chargeName">
        <el-input v-model="department.chargeName" maxlength="20" placeholder="负责人姓名" show-word-limit type="text" />
      </el-form-item>
      <el-form-item label="负责人电话" prop="chargePhone">
        <el-input v-model="department.chargePhone" maxlength="20" placeholder="负责人电话" show-word-limit type="text" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" center @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addDept, getDept } from '@/api/dept'

export default {
  name: 'DepartmentAdd',
  data() {
    return {
      department: {
        name: '',
        chargeName: '',
        chargePhone: ''
      },
      rules: {
        name: [{
          required: true,
          message: '字段值不可为空'
        }],
        chargeName: [{
          required: true,
          message: '字段值不可为空'
        }],
        chargePhone: [{
          required: true,
          message: '字段值不可为空'
        }]
      },
      isEdit: false,
      id: 0
    }
  },
  watch: {
    $route(to, from) {
      console.log('watch $route')
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query && this.$route.query.id) {
        this.isEdit = true
        this.id = this.$route.query.id
        getDept({ id: this.id }).then(result => {
          if (result.code === 20000) {
            this.department = result.data
          }
        })
      } else {
        this.isEdit = false
      }
    },
    submitForm() {
      this.$refs['department'].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            //
          } else {
            addDept(this.department).then(result => {
              if (result.code === 20000) {
                this.$message({
                  message: '创建部门成功',
                  type: 'success'
                })
              }
            })
          }
        }
      })
    }
  }
}
</script>
