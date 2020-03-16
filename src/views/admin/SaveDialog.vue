<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="showTitle", width="400px", @close="closeCallback")
    el-form(ref="form", :model="formData", :rules="formRules", labelPosition="top")
      el-form-item.top-el-form-fix(label="名称", prop="name")
        el-input(v-model.trim="formData.name", :max="20")
      el-form-item.top-el-form-fix(label="电话", prop="mobile")
        el-input(v-model.trim="formData.mobile", :max="11")
      el-form-item.top-el-form-fix(label="密码", prop="passwd")
        el-input(type="password", v-model.trim="formData.passwd", :max="20", @focus="handlePwdFocus")
    div.dialog-footer(slot="footer")
      el-button(type="primary", :loading="loading", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>

import { createUser, updateUser } from '../../api/user'

export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      initPwd: false,
      formData: {
        id: 0,
        name: '',
        mobile: '',
        passwd: ''
      },
      formRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '电话不能为空', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
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
        return '编辑'
      }
      return '创建'
    }
  },
  methods: {
    async show (data) {
      if (data) {
        this.formData = this.R.clone(data)
        this.formData.passwd = '********'
      } else {
        this.formData = {
          id: 0,
          name: '',
          mobile: '',
          passwd: ''
        }
      }
      this.dialogVisible = true
    },
    hide () {
      this.dialogVisible = false
    },
    closeCallback () {
      this.initPwd = false
      this.$refs.form && this.$refs.form.resetFields()
    },
    handlePwdFocus () {
      if (!this.initPwd) {
        this.formData.passwd = ''
        this.initPwd = true
      }
    },
    handleSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const frm = this.R.clone(this.formData)
          if (!this.initPwd) {
            frm.passwd = ''
          }
          try {
            if (this.isEdit) {
              await updateUser(frm)
            } else {
              await createUser(frm)
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
