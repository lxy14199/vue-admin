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
        v-model="menu.name"
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
        v-model="menu.component"
        maxlength="40"
        placeholder="组件路径"
        show-word-limit
        type="text"
      />
    </el-form-item>
    <el-form-item class="text-right">
      <el-button :loading="loading" type="primary" @click="onSubmit()">
        确认
      </el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import { getIdName, submitMenu, getMenu } from '@/api/menu'

const defaultFrom = {
  title: '',
  icon: '',
  parentId: 0,
  name: '',
  component: '',
  path: ''
}

export default {
  name: 'AddMenu',
  data() {
    return {
      menu: defaultFrom,
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
      menuIdNames: [],
      loading: false,
      isEdit: false
    }
  },
  watch: {
    $route(to, from) {
      console.log('watch $route')
      this.init()
    }
  },
  created() {
    console.log('created')
    this.init()
  },
  methods: {
    init() {
      console.log(this.$route)
      this.getName()
      if (this.$route.query && this.$route.query.id) {
        this.isEdit = true
        this.getMenu(this.$route.query.id)
      } else {
        this.menu = { ...defaultFrom }
      }
    },
    getName() {
      getIdName().then(result => {
        if (result.code === 20000) {
          this.menuIdNames = result.data
          this.menuIdNames.push({ id: 0, name: '根路由' })
        }
      })
    },
    getMenu(id) {
      getMenu(id).then(result => {
        if (result.code === 20000) {
          this.menu = result.data
        }
      })
    },
    onSubmit() {
      if (this.isEdit) {
        //
      } else {
        submitMenu(this.menu).then(result => {
          if (result.code === 20000) {
            this.$message({
              type: 'success',
              message: result.msg
            })
          }
        })
      }
    }
  }
}
</script>
