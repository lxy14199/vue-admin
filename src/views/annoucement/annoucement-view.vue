<template>
  <div>
    <ul class="annoucement">
      <li v-for="(annoucement, index) in annoucements" :key="index" class="list">
        <div class="flex-between">
          <div class="flex-start">
            <i src="el-icon-document" />
            {{ annoucement.title }}
          </div>
        </div>
        <div class="update-time">
          <i src="el-icon-time" />
          {{ annoucement.createTime }}
        </div>
      </li>
    </ul>
    <el-dialog v-model="dialogVisible" :title="dialogValue.title" center>
      <span>
        {{ dialogValue.content }}
      </span>
      <span slot="footer" class="dialog-footer">
        更新时间：{{ dialogValue.updateTime }}
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'AnnoucementView',
  data() {
    return {
      page: 1

    }
  },
  created() {

  },
  method() {

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
