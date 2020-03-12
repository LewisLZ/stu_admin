<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="titleName", width="400px", @close="closeCallback")
    el-form(ref="form", :model="formData", :rules="formRules", labelPosition="top")
      el-form-item.top-el-form-fix(label="名称", prop="name")
        el-input(v-model="formData.name")
    div.dialog-footer(slot="footer")
      el-button(type="primary", :loading="loading", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>

import { createClass, updateClass } from '../../api/class'

export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      formData: {
        id: 0,
        name: '',
        parent_id: 0
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
    titleName () {
      if (this.isEdit) {
        return '编辑'
      }
      return '创建'
    }
  },
  methods: {
    show (data) {
      if (data) {
        this.formData = data
      } else {
        this.formData = {
          id: 0,
          name: '',
          parent_id: 0
        }
      }
      this.dialogVisible = true
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
              await updateClass(this.formData)
            } else {
              await createClass(this.formData)
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
