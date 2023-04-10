<template>
  <el-form ref="api" :model="api" :rules="rules" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="api.name" maxlength="20" placeholder="名称" show-word-limit type="text" />
    </el-form-item>
    <el-form-item label="请求路径" prop="path">
      <el-input v-model="api.path" maxlength="40" placeholder="请求路径" show-word-limit type="text" />
    </el-form-item>
    <el-form-item label="父节点" prop="parentId">
      <el-select v-model="api.parentId">
        <el-option
          v-for="menuIdName in menuIdNames"
          :key="menuIdName.id"
          :label="menuIdName.name"
          :value="menuIdName.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="请求方法" prop="method">
      <el-radio v-model="api.method" label="GET">GET</el-radio>
      <el-radio v-model="api.method" label="POST">POST</el-radio>
      <el-radio v-model="api.method" label="PUT">PUT</el-radio>
      <el-radio v-model="api.method" label="DELETE">DELETE</el-radio>
    </el-form-item>
    <el-form-item label="说明" prop="comment">
      <el-input v-model="api.comment" maxlength="40" placeholder="请求路径" show-word-limit type="text" />
    </el-form-item>
  </el-form>
</template>

<script>
import { getIdName } from '@/api/menu'
export default {
  name: 'AddApi',
  data() {
    return {
      api: {},
      menuIdNames: [],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        path: [
          { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '请输入说明', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getName()
  },
  methods: {
    getName() {
      getIdName().then(result => {
        if (result.code === 20000) {
          this.menuIdNames = result.data
        }
      })
    }
  }
}
</script>
