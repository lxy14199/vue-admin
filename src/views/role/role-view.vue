<template>
  <div>
    <el-form ref="role" :model="role" :rules="rules" label-width="80px">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="role.name" maxlength="20" placeholder="角色名" show-word-limit type="text" />
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input v-model="role.introduction" maxlength="20" placeholder="简介" show-word-limit type="text" />
      </el-form-item>

      <el-form-item v-show="edit" label="权限">
        <el-tree
          ref="tree"
          :data="comptedMenus"
          :props="{label: 'lable'}"
          default-expand-all
          check-strictly
          node-key="id"
          show-checkbox
        />
      </el-form-item>
      <el-form-item class="text-right">
        <el-button :loading="loading" type="primary" @click="onSubmit('role')">
          确认
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList } from '@/api/menu'
import { addRole } from '@/api/role'
import { getRoleDetail, setRoleApi, setRoleMenu } from '@/api/auth'
export default {
  name: 'RoleView',
  data() {
    return {
      role: {
        name: '',
        introduction: ''
      },
      menus: [],
      rules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      menuIds: [],
      apiIds: [],
      loading: false,
      edit: false
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
        this.edit = true
        this.getList()
        const roleId = this.$route.query.id
        this.getRole(roleId)
        getRoleDetail({ 'id': roleId }).then(result => {
          if (result.code === 20000) {
            this.role.name = result.data.name
            this.role.introduction = result.data.introduction
            const apis = result.data.apis
            const menus = result.data.menus
            const treeNode = []
            if (apis && apis.length > 0) {
              for (let i = 0; i < apis.length; i++) {
                treeNode.push({
                  id: apis[i].id,
                  label: apis[i].name,
                  type: 2
                })
              }
            }
            if (menus && menus.length > 0) {
              for (let i = 0; i < menus.length; i++) {
                treeNode.push({
                  id: menus[i].id,
                  label: menus[i].name,
                  type: 1
                })
              }
            }
            this.$refs.tree.setCheckedNodes(treeNode)
          }
        })
      } else {
        this.edit = false
      }
    },
    getList() {
      getList().then(result => {
        this.menus = result.data.list
      })
    },
    onSubmit(role) {
      this.$refs[role].validate((valid) => {
        const auth = this.$refs.tree.getCheckedNodes()
        for (let i = 0; i < auth.length; i++) {
          const node = auth[i]
          if (node.type === 1) {
            this.menuIds.push(node.id)
          } else {
            this.apiIds.push(node.id)
          }
        }
        if (valid) {
          if (this.edit) {
            const roleId = parseInt(this.$route.query.id)
            let success = true
            setRoleApi({ roleId: roleId, apiIds: this.apiIds }).then(result => {
              if (result.code !== 20000) {
                success = false
              }
            })
            setRoleMenu({ roleId: roleId, menuIds: this.menuIds }).then(result => {
              if (result.code !== 20000) {
                success = false
              }
            })
            if (success) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          } else {
            addRole(this.role).then(result => {
            // this.traverseTree(auth)
              if (result.code === 20000) {
                this.$message({
                  message: '添加角色成功',
                  type: 'success'
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    getRole(roleId) {

    },
    traverseTree(node) {
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          this.traverseTree(node.children[i])
        }
      }
    }
  }
}
</script>
