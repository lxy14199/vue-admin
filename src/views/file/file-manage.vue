<template>
  <div class="app-container">
    <el-card :body-style="{padding:'15px'}" class="breadcrumb" shadow="never">
      <div class="flex-between">
        <div class="flex-start">
          <div class="breadcrumb-icon">
            <i class="el-icon-back" @click="returnParentFolder">
              {{ "\xa0" }}
            </i>
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in paths" :key="index">
              <span>
                {{ item.name }}
              </span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="flex-end breadcrumb-icon">
          <el-popover placement="left" trigger="hover">
            <el-upload action="" :http-request="upload">
              选择上传文件
            </el-upload>
            <el-button slot="reference">
              <i class="el-icon-upload" />
            </el-button>
          </el-popover>
          <i class="el-icon-folder-add folder" @click="createFile" />
        </div>
      </div>
    </el-card>
    <!-- <div class="flex-between search-box">
      <el-input />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div> -->
    <el-table ref="table" :data="files" border empty-text="空文件夹" style="width: 100%" @row-click="enterFiles">
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span v-if="scope.row.type === '文件夹'">
            <i class="el-icon-folder" />
            {{ scope.row.name }}
          </span>
          <span v-else>
            <i class="el-icon-files" />
            {{ scope.row.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="100">
        <template slot-scope="scope">
          <span>
            {{ scope.row.type }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="大小" width="100">
        <template slot-scope="scope">
          <span>
            {{ scope.row.size }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建者" width="150">
        <template slot-scope="scope">
          <span>
            {{ scope.row.creator }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          <span>
            {{ scope.row.createAt }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="200">
        <template slot-scope="scope">
          <span>
            {{ scope.row.updateAt }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand($event, scope.row)">
            <el-button>
              <i class="el-icon-s-operation" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="rename">重命名</el-dropdown-item>
              <el-dropdown-item command="delete">删除</el-dropdown-item>
              <el-dropdown-item :disabled="scope.row.type === '文件夹'" command="download">下载</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { upload, getFiles, createFile, download, deleteFile, rename } from '@/api/file'
export default {
  data() {
    return {
      paths: [{
        id: 0,
        name: '根目录'
      }],
      files: [
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {},
  created() {
    this.getFiles(0)
  },
  mounted() {

  },
  methods: {
    getFiles(parentId) {
      getFiles({ parentId }).then(result => {
        if (result.code === 20000) {
          this.files = result.data.list
        }
      })
    },
    returnParentFolder() {
      if (this.paths.length > 1) {
        this.paths.pop()
        this.getFiles(this.paths[this.paths.length - 1].id)
      }
    },
    enterFiles(row, column) {
      console.log(row.id)
      if (row.type === '文件夹' && column.label !== '操作') {
        this.getFiles(row.id)
        this.paths.push({ id: row.id, name: row.name })
      }
    },
    upload(params) {
      const formData = new FormData()
      formData.append('file', params.file)
      console.log(this.name)
      formData.append('creator', this.name)
      formData.append('parentId', this.paths[this.paths.length - 1].id)
      upload(formData).then(result => {
        if (result.code === 20000) {
          console.log('上传成功')
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          })
          this.getFiles(this.paths[this.paths.length - 1].id)
          // this.$forceUpdate()
        }
      })
    },
    createFile() {
      this.$prompt('请输入文件夹名', '新建文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const data = {
          'name': value,
          'creator': this.name,
          'parentId': this.paths[this.paths.length - 1].id,
          'type': '文件夹'
        }
        createFile(data).then(result => {
          if (result.code === 20000) {
            this.$message({
              showClose: true,
              message: '成功',
              type: 'success'
            })
            this.getFiles(this.paths[this.paths.length - 1].id)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    download(row) {
      download({ 'id': row.id }).then(result => {
        console.log(result)
        if (result.code === 20000) {
          const url = result.data.url
          window.location.href = url
        }
      })
    },
    deleteFile(row) {
      deleteFile({ id: row.id }).then(result => {
        if (result.code === 20000) {
          const index = this.files.indexOf(row)
          this.files.splice(index, 1)
          this.$message({
            message: '删除文件成功',
            type: 'success'
          })
        }
      })
    },
    rename(file) {
      this.$prompt('请输入修改后名称', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const data = {
          'id': file.id,
          'name': value
        }
        rename(data).then(result => {
          if (result.code === 20000) {
            this.$message({
              showClose: true,
              message: '成功',
              type: 'success'
            })
            this.getFiles(this.paths[this.paths.length - 1].id)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleCommand(command, row) {
      switch (command) {
        case 'download':
          this.download(row)
          break
        case 'delete':
          this.deleteFile(row)
          break
        case 'rename':
          this.rename(row)
          break
      }
    }
  }

}

</script>

<style>

.breadcrumb {
    margin-bottom: 15px;
}

.breadcrumb-icon {
    font-size: 19px;
    margin: -4px 0 -10px;
}

.folder-icon {
    font-size: 16px;
    color: #E6A23C;
    margin-right: 5px;
}

.file-icon {
    font-size: 16px;
    color: #409EFF;
    margin-right: 5px;
}

.search-box {
    margin-bottom: 15px;
}

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

.folder {
  margin: 8px
}
</style>
