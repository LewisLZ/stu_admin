<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="showTitle", width="400px", @close="closeCallback")
    el-form(ref="form", :model="formData", :rules="formRules", labelPosition="top")
      el-form-item.top-el-form-fix(label="名称", prop="name")
        el-input(v-model="formData.name", :max="20")
    div.dialog-footer(slot="footer")
      el-button(type="primary", :loading="loading", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>

import { createCurriculum, getCurriculum, updateCurriculum } from '../../api/curriculum'

export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      formData: {
        id: 0,
        name: ''
      },
      formRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isEdit () {
      return this.formData.id > 0
    },
    showTitle () {
      if (this.isEdit) {
        return '编辑课程'
      }
      return '创建课程'
    }
  },
  methods: {
    async show (id) {
      this.formData.id = id
      this.dialogVisible = true
      if (id) {
        const res = await getCurriculum({ id: id })
        this.formData = res.data
      }
    },
    hide () {
      this.dialogVisible = false
    },
    closeCallback () {
      this.$refs.form && this.$refs.form.resetFields()
    },
    handleSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            if (this.isEdit) {
              await updateCurriculum(this.formData)
            } else {
              await createCurriculum(this.formData)
            }
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.hide()
            this.$emit('callback')
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
