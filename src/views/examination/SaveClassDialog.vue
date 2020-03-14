<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="titleName", width="400px", @close="closeCallback", v-loading="loading")
    el-form(ref="form", :model="formData", :rules="formRules", labelPosition="top")
      el-form-item.top-el-form-fix(label="年份：", prop="year", :required="true")
        el-date-picker(v-model="formData.year", type="year", placeholder="请选择", value-format="timestamp")
      el-form-item(label="月份：", prop="pos", :required="true")
        el-radio-group(v-model="formData.pos")
          el-radio(:label="1") 上半年
          el-radio(:label="2") 下半年
    div.dialog-footer(slot="footer")
      el-button(type="primary", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>

import { createClassCurriculumYear, updateClassCurriculumYear } from '../../api/class'

export default {
  data () {
    const yearValidator = (rule, value, callback) => {
      if (value < this.classInfo.year_tmp) {
        callback(new Error('年份不能小于班级'))
        return
      }
      callback()
    }
    const posValidator = (rule, value, callback) => {
      if (this.formData.year === this.classInfo.year_tmp) {
        if (value < this.classInfo.pos) {
          callback(new Error('年份相同月份不能小于班级'))
          return
        }
      }
      callback()
    }
    return {
      loading: false,
      dialogVisible: false,
      formData: {
        id: 0,
        class_id: 0,
        year: '',
        pos: 1
      },
      formRules: {
        year: [
          { required: true, message: '年份不能为空', trigger: 'blur' },
          { validator: yearValidator, trigger: 'blur' }
        ],
        pos: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: posValidator, trigger: 'blur' }
        ]
      },
      schoolYears: [],
      classInfo: {}
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
    show (data, classInfo) {
      this.classInfo = classInfo
      this.dialogVisible = true
      if (data) {
        this.formData = data
      } else {
        this.formData = {
          id: 0,
          class_id: 0,
          year: '',
          pos: 1
        }
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
              await updateClassCurriculumYear(this.formData)
            } else {
              await createClassCurriculumYear(this.formData)
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
