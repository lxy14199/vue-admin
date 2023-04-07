<template>
  <el-form ref="menu" :model="menu" :rules="rules" label-width="80px">
    <el-form-item label="名称" prop="title">
      <el-input v-model="menu.title" maxlength="20" placeholder="名称" show-word-limit type="text" />
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-input v-model="menu.icon" maxlength="40" placeholder="图标" show-word-limit type="text" />
    </el-form-item>
    <el-form-item label="父节点" prop="parentId">
      <el-select v-model="menu.parentId">
        <el-option
          v-for="menuIdName in menuIdNames"
          :key="menuIdName.id"
          :label="menuIdName.name"
          :value="menuIdName.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="路由名称" prop="name">
      <el-input
        v-model="menu.routerName"
        maxlength="40"
        placeholder="路由名称"
        show-word-limit
        type="text"
      />
    </el-form-item>
    <el-form-item label="路由路径" prop="path">
      <el-input
        v-model="menu.path"
        maxlength="40"
        placeholder="路由路径"
        show-word-limit
        type="text"
      />
    </el-form-item>
    <el-form-item label="组件路径" prop="component">
      <el-input
        v-model="menu.componentPath"
        maxlength="40"
        placeholder="组件路径"
        show-word-limit
        type="text"
      />
    </el-form-item>

  </el-form>

</template>

<script>
import { getIdName } from '@/api/menu'

export default {
  name: 'AddMenu',
  data() {
    return {
      menu: {},
      rules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        icon: [
          { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择父级', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入路由名称', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入路由路径', trigger: 'blur' }
        ]
      },
      menuIdNames: []
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
