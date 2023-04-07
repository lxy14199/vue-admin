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
    <el-form-item label="姓名" prop="name" class="required">
      <el-input v-model="userInfo.name" type="text" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password" class="required">
      <el-input v-model="userInfo.password" type="text" show-password clearable />
    </el-form-item>
    <el-form-item label="确认密码" prop="password" class="required">
      <el-input v-model="userInfo.password" type="text" show-password clearable />
    </el-form-item>
    <el-form-item label="手机号" prop="phone" class="required">
      <el-input v-model="userInfo.phone" type="text" clearable />
    </el-form-item>
    <el-form-item label="职位" prop="role" class="required">
      <el-select v-model="userInfo.role" clearable>
        <el-option
          v-for="(item, index) in roleOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="部门" prop="dept" class="required">
      <el-select v-model="userInfo.dept" clearable>
        <el-option
          v-for="(item, index) in deptOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select>
    </el-form-item>
    <div>
      <el-button plain>提交</el-button>
    </div>
  </el-form>

</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      userInfo: {
        name: '',
        password: '',
        phone: '',
        role: 1,
        dept: 1
      },
      rules: {
        name: [{
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
      roleOptions: [{
        'label': '员工',
        'value': 1
      }],
      deptOptions: [{
        'label': '后端',
        'value': 1
      }]
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {
    submitForm() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
      })
    },
    resetForm() {
      this.$refs['vForm'].resetFields()
    }
  }
}

</script>
