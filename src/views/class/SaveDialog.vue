<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="titleName", width="400px", @close="closeCallback", v-loading="loading")
    el-form(ref="form", :model="formData", :rules="formRules", labelPosition="top")
      el-form-item.top-el-form-fix(label="名称", prop="name")
        el-input(v-model="formData.name")
      el-form-item(label="学年", prop="school_year_id")
        el-select(v-model="formData.school_year_id", placeholder="请选择", clearable, :disabled="isEdit")
          el-option(v-for="item in schoolYears", :key="item.id", :label="showSchoolYear(item)", :value="item.id")
    div.dialog-footer(slot="footer")
      el-button(type="primary", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>

import { createClass, updateClass } from '../../api/class'
import { listSchoolYear } from '../../api/school_year'
import { convertAttrName } from '../../service/common'
import { allPos } from '../../service/school_year'

export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      formData: {
        id: 0,
        name: '',
        school_year_id: ''
      },
      formRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        school_year_id: [
          { required: true, message: '学年不能为空', trigger: 'blur' }
        ]
      },
      schoolYears: []
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
      this.dialogVisible = true
      if (data) {
        this.formData = data
      } else {
        this.formData = {
          id: 0,
          name: '',
          school_year_id: ''
        }
      }
      this.initData()
    },
    hide () {
      this.dialogVisible = false
    },
    async initData () {
      this.loading = true
      const res = await listSchoolYear({ page: 1, limit: 10000 })
      this.schoolYears = res.data.data
      this.loading = false
    },
    showSchoolYear (item) {
      return `${item.year}年-${convertAttrName(item.pos, allPos)}`
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
