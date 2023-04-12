<template>
  <el-table :data="roles" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" label="ID" width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column width="200px" align="center" label="角色名">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column min-width="120px" label="创建时间">
      <template slot-scope="scope">
        <span>{{ scope.row.createAt }}</span>
      </template>
    </el-table-column>
    <el-table-column min-width="120px" label="修改时间">
      <template slot-scope="scope">
        <span>{{ scope.row.updateAt }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="100">
      <template slot-scope="scope">
        <el-dropdown @command="handleCommand($event, scope.row)">
          <el-button>
            <i class="el-icon-s-operation" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="'/role/add?id='+scope.row.id">
                编辑
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getRoles } from '@/api/role'

export default {
  name: 'RoleManage',
  data() {
    return {
      roles: []
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    getRoles() {
      getRoles().then(result => {
        if (result.code === 20000) {
          this.roles = result.data.list
        }
      })
    }
  }

}
</script>
