<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" label="职位">
        <template slot-scope="scope">
          <span>{{ scope.row.role.name }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" label="部门">
        <template slot-scope="scope">
          <span>{{ scope.row.department.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
          <div>
            <!-- <el-button type="primary" size="small" icon="el-icon-edit">
              修改
            </el-button> -->
            <el-button type="primary" size="small" icon="el-icon-edit" @click="deleteUser(scope.row)">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getUserList, deleteUser } from '@/api/user'

export default {
  name: 'ArticleList',
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      query: {
        roleId: 0,
        departmentId: 0,
        username: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getUserList(this.query).then(result => {
        if (result.code === 20000) {
          this.list = result.data.list
        }
      })
    },
    deleteUser(row) {
      console.log(1111)
      deleteUser({ id: row.id }).then(result => {
        if (result.code === 20000) {
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
