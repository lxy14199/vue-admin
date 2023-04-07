<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="部门名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.chargePhone }}</span>
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
      <el-table-column align="center" label="操作" width="400px">
        <template slot-scope="scope">
          <router-link :to="'/dept/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-edit">
              删除
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.PageSize" @pagination="getList" /> -->
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getList } from '@/api/dept'
export default {
  name: 'ArticleList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        department: {
          name: '',
          chargeName: '',
          chargePhone: ''
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
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
