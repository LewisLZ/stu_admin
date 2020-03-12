<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="修改密码", width="400px", @close="closeCallback")
    el-form(ref="form", :model="formData", :rules="formRules", labelPosition="top")
      el-form-item.top-el-form-fix(label="原密码", prop="oldPwd")
        el-input(type="password", v-model="formData.oldPwd")
      el-form-item.top-el-form-fix(label="新密码", prop="newPwd")
        el-input(type="password", v-model="formData.newPwd")
      el-form-item.top-el-form-fix(label="确认密码", prop="confirmPwd")
        el-input(type="password", v-model="formData.confirmPwd")
    div.dialog-footer(slot="footer")
      el-button(type="primary", :loading="loading", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>
import { updatePwd } from 'src/api/user'
import Vue from 'vue'
import { UPDATE_ME } from 'src/store/types'

export default {
  data () {
    const confirmPwdValidator = (rule, value, callback) => {
      if (value !== this.formData.newPwd) {
        callback(new Error('两次输入密码不一致'))
        return
      }
      callback()
    }
    return {
      loading: false,
      dialogVisible: false,
      formData: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      formRules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入6-20个数字或字母', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: confirmPwdValidator, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show () {
      this.dialogVisible = true
    },
    hide () {
      this.dialogVisible = false
    },
    closeCallback () {
      this.$refs.form && this.$refs.form.resetFields()
    },
    async logout () {
      Vue.$store.commit(UPDATE_ME, null)
      Vue.$router.replace({
        name: 'Login'
      })
    },
    handleSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            let params = {}
            params.userId = this.$Uid
            params.oldPwd = this.formData.oldPwd
            params.newPwd = this.formData.newPwd
            await updatePwd(params)
            this.$message({
              type: 'success',
              message: '更新成功,请重新登陆'
            })
            this.hide()
            this.logout()
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
