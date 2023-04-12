<template>
  <div>
    <el-table :data="annoucements" border fit highlight-current-row style="width: 100%">
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
                <router-link :to="'/annoucement/add?id='+scope.row.id">
                  编辑
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
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

export default {
  name: 'AnnoucementManger',
  data() {
    return {
      page: 1

    }
  },
  created() {

  },
  methods: {

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
