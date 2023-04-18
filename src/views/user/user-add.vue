<template>
  <el-form
    ref="vForm"
    :model="userInfo"
    :rules="rules"
    label-position="left"
    label-width="80px"
    size="medium"
    @submit.native.prevent
  >
    <el-form-item label="姓名" prop="username" class="required">
      <el-input v-model="userInfo.username" type="text" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password" class="required">
      <el-input v-model="userInfo.password" type="text" clearable />
    </el-form-item>
    <!-- <el-form-item label="确认密码" prop="password" class="required">
      <el-input v-model="userInfo.password" type="text" show-password clearable />
    </el-form-item> -->
    <el-form-item label="手机号" prop="phone" class="required">
      <el-input v-model="userInfo.phone" type="text" clearable />
    </el-form-item>
    <el-form-item label="职位" prop="role" class="required">
      <el-select v-model="userInfo.roleId" clearable>
        <el-option
          v-for="(item, index) in roles"
          :key="index"
          :label="item.name"
          :value="item.id"
          :disabled="item.disabled"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="部门" prop="dept" class="required">
      <el-select v-model="userInfo.departmentId" clearable>
        <el-option
          v-for="(item, index) in depts"
          :key="index"
          :label="item.name"
          :value="item.id"
          :disabled="item.disabled"
        />
      </el-select>
    </el-form-item>
    <div>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </div>
  </el-form>

</template>

<script>
import { getRoleIdName } from '@/api/role'
import { getDeptIdName } from '@/api/dept'
import { saveUser } from '@/api/user'

export default {
  components: {},
  props: {},
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
        phone: '',
        role: 1,
        dept: 1
      },
      rules: {
        username: [{
          required: true,
          message: '字段值不可为空'
        }],
        password: [{
          required: true,
          message: '字段值不可为空'
        }],
        phone: [{
          required: true,
          message: '字段值不可为空'
        }],
        role: [{
          required: true,
          message: '字段值不可为空'
        }],
        dept: [{
          required: true,
          message: '字段值不可为空'
        }]
      },
      roles: [],
      depts: [],
      edit: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.init()
  },
  mounted() {

  },
  methods: {
    init() {
      this.getDeptIdName()
      this.getRoleIdName()
      if (this.$query && this.$query.id) {
        this.edit = true
      }
    },
    submitForm() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
        saveUser(this.userInfo).then(result => {
          if (result.code === 20000) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          }
        })
      })
    },
    resetForm() {
      this.$refs['vForm'].resetFields()
    },
    getRoleIdName() {
      getRoleIdName().then(result => {
        if (result.code === 20000) {
          this.roles = result.data.list
        }
      })
    },
    getDeptIdName() {
      getDeptIdName().then(result => {
        if (result.code === 20000) {
          this.depts = result.data.list
        }
      })
    }
  }
}

</script>
