<template>
  <div>
    <el-form ref="announcement" :model="announcement" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="announcement.title" maxlength="100" placeholder="标题" show-word-limit type="text" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="announcement.content"
          :autosize="{minRows: 6}"
          maxlength="2000"
          minlength="10"
          placeholder="内容"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-form-item class="text-right">
        <el-button :loading="loading" type="primary" @click="onSubmit('announcement')">
          确认
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addAnnoucement, getAnnoucement, updateAnnoucement } from '@/api/announcement'

const annoucementForm = {
  title: '',
  content: ''
}

export default {
  name: 'AnnoucenmentAdd',
  data() {
    return {
      announcement: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 5, max: 2000, message: '长度在 5 到 2000 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      edit: false
    }
  },
  watch: {
    $route(from, to) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query && this.$route.query.id) {
        this.edit = true
        getAnnoucement({ id: this.$route.query.id }).then(result => {
          if (result.code === 20000) {
            this.announcement = result.data
          }
        })
      } else {
        this.announcement = annoucementForm
      }
    },
    onSubmit(announcement) {
      this.$refs[announcement].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.edit) {
            updateAnnoucement(this.announcement).then(result => {
              if (result.code === 20000) {
                this.$message({
                  message: result.msg,
                  type: 'success'
                })
              }
            }).finally(() => { this.loading = false })
          } else {
            addAnnoucement(this.announcement).then(result => {
              if (result.code === 20000) {
                this.$message({
                  message: result.msg,
                  type: 'success'
                })
              }
            }).finally(() => { this.loading = false })
          }
        }
      })
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
