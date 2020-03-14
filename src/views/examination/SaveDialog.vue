<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="showTitle", width="400px", @close="closeCallback")
    el-form(ref="form", :model="formData", :rules="formRules", labelPosition="top")
      el-form-item.top-el-form-fix(label="名称", prop="name")
        el-input(v-model="formData.name", :max="20")
      el-form-item(label="考试时间", prop="start_time")
        el-date-picker(v-model="formData.start_time", type="date", placeholder="请选择", valueFormat="timestamp")
      el-form-item.top-el-form-fix(label="备注", prop="remark")
        el-input(v-model="formData.remark", :max="200")
    div.dialog-footer(slot="footer")
      el-button(type="primary", :loading="loading", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>

import { createExamination, updateExamination } from '../../api/examination'

export default {
  data () {
    const timeValidator = (rule, value, callback) => {
      if (value <= new Date().getTime()) {
        callback(new Error('考试时间不能小于或等于当前时间'))
        return
      }
      callback()
    }
    return {
      loading: false,
      dialogVisible: false,
      formData: {
        id: 0,
        name: '',
        start_time: '',
        remark: ''
      },
      formRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '考试时间不能为空', trigger: 'blur' },
          { validator: timeValidator, trigger: 'blur' }
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
        return '编辑考试'
      }
      return '创建考试'
    }
  },
  methods: {
    async show (data) {
      if (data) {
        this.formData = data
      } else {
        this.formData = {
          id: 0,
          name: '',
          start_time: '',
          remark: ''
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
              await updateExamination(this.formData)
            } else {
              await createExamination(this.formData)
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
