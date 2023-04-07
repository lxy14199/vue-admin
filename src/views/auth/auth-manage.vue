<template>
  <div class="app-container">
    <el-table :data="list" row-key="id" :tree-props="{children:'children'}">
      <el-table-column align="center" label="名称" width="150px">
        <template slot-scope="scope">
          <span :v-if="scope.row.type===1">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="50px" align="center" label="图标">
        <template slot-scope="scope">
          <span>
            <i v-if="scope.row.type===1" :class="scope.row.icon" />
          </span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" label="路由名称">
        <template slot-scope="scope">
          <span v-if="scope.row.type===1">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" label="路由路径">
        <template slot-scope="scope">
          <span v-if="scope.row.type===1">{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" label="组件路径">
        <template slot-scope="scope">
          <span v-if="scope.row.type===1">{{ scope.row.component }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="资源路径">
        <template slot-scope="scope">
          <span v-if="scope.row.type===2">{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="请求方法">
        <template slot-scope="scope">
          <span>{{ scope.row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="说明">
        <template slot-scope="scope">
          <span>{{ scope.row.comment }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="50px">
        <template slot-scope="scope">
          <!-- <router-link :to="'/dept/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-edit">
              删除
            </el-button>
          </router-link> -->
          <el-dropdown trigger="click" @command="handleCommand($event,scope.row)">
            <i class="el-icon-s-operation" />
            <template>
              <el-dropdown-menu>
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getList } from '@/api/menu'
export default {
  name: 'ArticleList',
  data() {
    return {
      list: [
      ],
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList().then(result => {
        this.list = result.data.list
        // alert(this.list)
      })
    }
  }
}
// {
//   id: 1,
//   name: '人员管理',
//   icon: 'el-icon-share',
//   routerName: 'user',
//   routerPath: '/user',
//   componentPath: '',
//   resourcePath: '',
//   requestMethod: '',
//   type: 1,
//   children: [
//     {
//       id: 2,
//       name: '人员管理',
//       icon: 'el-icon-share',
//       routerName: 'user',
//       routerPath: '/user',
//       componentPath: '',
//       resourcePath: '',
//       requestMethod: '',
//       type: 1,
//       children: [
//         {
//           id: 3,
//           name: 'api',
//           requestMethod: 'get',
//           type: 2,
//           comment: '说明'
//         }
//       ]
//     }
//   ]
// }

</script>
