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
          <el-dropdown trigger="click" @command="handleCommand($event,scope.row)">
            <i class="el-icon-s-operation" />
            <template>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <template v-if="scope.row.type===1">
                    <router-link :to="{path:'edit', query: {id: scope.row.id}}">
                      编辑
                    </router-link>
                  </template>
                </el-dropdown-item>
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
        // this.changeId(this.list)
        for (let i = 0; i < this.list.length; i++) {
          this.changeId(this.list[i])
        }
        console.log(this.list)
      })
    },
    changeId(data) {
      data.id = data.id + 100000 * data.type
      console.log(data.id)
      if (data.children && data.children.length > 0) {
        for (let i = 0; i < data.children.length; i++) {
          this.changeId(data.children[i])
        }
      }
    },
    generateRowKey() {
      return Date.now() + Math.random()
    }
  }
}
</script>
