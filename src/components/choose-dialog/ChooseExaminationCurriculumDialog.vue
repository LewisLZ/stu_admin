<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="选择课程", width="700px", @close="closeCallback", v-loading="loading")
    div
      el-checkbox-group(v-model="selectedIds")
        el-table.list-el-table(ref="table", :data="dataList.data", border, default-expand-all)
          el-table-column(label="课程")
            template(slot-scope="scope")
              el-checkbox(:label="scope.row.class_curriculum_id") {{scope.row.name}}
    div.dialog-footer(slot="footer")
      el-button(type="primary", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>
import { listExaminationCurriculum } from '../../api/curriculum'

export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      dataList: {
        data: []
      },
      selectedIds: [],
      classId: 0
    }
  },
  methods: {
    async initData () {
      this.loading = true
      const res = await listExaminationCurriculum({ class_id: this.classId })
      this.dataList = res.data
      this.loading = false
    },
    show (classId, selectedIds) {
      this.classId = classId
      this.selectedIds = this.R.clone(selectedIds)
      this.dialogVisible = true
      this.initData()
    },
    hide () {
      this.dialogVisible = false
    },
    closeCallback () {
      this.$refs.form && this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    handleSubmit () {
      this.$emit('submit', this.R.clone(this.selectedIds))
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
