<template>
  <div>
    <el-table :data="announcements" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="标题" width="600px">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
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
                <router-link :to="'/ammoucement/publish?id='+scope.row.id">
                  编辑
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item command="delete">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="true"
      :pager-count="5"
      :total="size"
      background
      class="pagination"
      layout="prev, pager, next"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import { getPageAnoucement, deleteAnnoucement } from '@/api/announcement'
export default {
  name: 'AnnoucementManger',
  data() {
    return {
      page: 1,
      pageSize: 10,
      announcements: [],
      size: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getAnnoucements()
    },
    getAnnoucements() {
      getPageAnoucement({ page: this.page, pageSize: this.pageSize }).then(result => {
        if (result.code === 20000) {
          this.announcements = result.data.list
          this.size = result.data.total
        }
      })
    },
    handlePageChange() {

    },
    deleteAnnoucenment(row) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAnnoucement({ id: row.id }).then(result => {
          if (result.code === 20000) {
            const idx = this.announcements.indexOf(row)
            this.announcements.splice(idx, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCommand(command, row) {
      switch (command) {
        case 'delete':
          this.deleteAnnoucenment(row)
          break
      }
    }
  }
}

</script>

<style>
.flex-end {
    display: flex;
    justify-content: flex-end;
}

.flex-start {
    display: flex;
    justify-content: flex-start;
}

.flex-between {
    display: flex;
    justify-content: space-between;
}
</style>
