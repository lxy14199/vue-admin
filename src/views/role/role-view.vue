<template>
  <div>
    <el-form ref="role" :model="role" :rules="rules" label-width="80px">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="role.name" maxlength="20" placeholder="角色名" show-word-limit type="text" />
      </el-form-item>
      <el-form-item label="权限">
        <el-tree
          ref="tree"
          :data="comptedMenus"
          :props="{label: 'lable'}"
          check-strictly
          node-key="id"
          show-checkbox
        />
      </el-form-item>
      <el-form-item class="text-right">
        <el-button :loading="loading" type="primary">
          确认
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList } from '@/api/menu'
export default {
  name: 'RoleView',
  data() {
    return {
      role: {},
      menus: [],
      rules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    comptedMenus() {
      const traverse = (data) => {
        return data.map(item => {
          let node = {}
          if (item.type === 1) {
            node = {
              id: item.id,
              lable: item.title,
              type: 1
            }
          } else {
            node = {
              id: item.id,
              lable: item.comment,
              type: 2
            }
          }
          if (item.children && item.children.length > 0) {
            node.children = traverse(item.children)
          }
          return node
        })
      }
      return traverse(this.menus)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList().then(result => {
        this.menus = result.data.list
        // alert(this.list)
      })
    }
  }
}
</script>
