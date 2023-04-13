<template>
  <div>
    <ul class="announcement">
      <li v-for="(announcement, index) in announcements" :key="index" class="list" @click="visitAnnoucenment(announcement)">
        <div class="flex-between">
          <div class="flex-start">
            <i class="el-icon-document" />
            {{ announcement.title }}
          </div>
          <div class="update-time">
            <i class="el-icon-time" />
            {{ announcement.createAt }}
          </div>
        </div>

      </li>
    </ul>
    <el-dialog :visible.sync="dialogVisible" :title="dialogValue.title" center>
      <span>
        {{ dialogValue.content }}
      </span>
      <span slot="footer" class="dialog-footer">
        更新时间：{{ dialogValue.updateAt }}
      </span>
    </el-dialog>
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
import { getPageAnoucement } from '@/api/announcement'

export default {
  name: 'AnnoucementView',
  data() {
    return {
      announcements: [],
      page: 1,
      size: 0,
      dialogValue: {},
      dialogVisible: false,
      pageSize: 10
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
    visitAnnoucenment(announcement) {
      // console.log('121123123')
      this.dialogVisible = true
      this.dialogValue = announcement
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
.announcements {
    margin: 10px;
}

.list {
    line-height: 1;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
