<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="titleName", width="400px", @close="closeCallback")
    el-form(ref="form", :model="formData", :rules="formRules", labelPosition="top")
      el-form-item.top-el-form-fix(label="年份", prop="year", :required="true")
        el-date-picker(v-model="formData.year", type="year", placeholder="请选择", value-format="timestamp")
      el-form-item(label="入学时间：", prop="pos", :required="true")
        el-radio-group(v-model="formData.pos")
          el-radio(:label="1") 上半年
          el-radio(:label="2") 下半年
    div.dialog-footer(slot="footer")
      el-button(type="primary", :loading="loading", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>

import { createSchoolYear, updateSchoolYear } from '../../api/school_year'

export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      formData: {
        id: 0,
        year: '',
        pos: 1
      },
      formRules: {
        year: [
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
          year: '',
          pos: 1
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
              await updateSchoolYear(this.formData)
            } else {
              await createSchoolYear(this.formData)
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
