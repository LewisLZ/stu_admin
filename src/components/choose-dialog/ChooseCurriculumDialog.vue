<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="选择课程", width="700px", @close="closeCallback", v-loading="loading")
    div.warning 考试课程不可删除
    div
      el-checkbox-group(v-model="selectedIds")
        el-table.list-el-table(ref="table", :data="dataList.data", border, default-expand-all)
          el-table-column(label="课程")
            template(slot-scope="scope")
              el-checkbox(:label="scope.row.id", :disabled="disabledCheck(scope.row)") {{scope.row.name}}
    div.dialog-footer(slot="footer")
      el-button(type="primary", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>
import { listCurriculumChoose } from '../../api/curriculum'

export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      dataList: {
        data: [],
        disabled_ids: []
      },
      selectedIds: [],
      ccYearId: 0
    }
  },
  methods: {
    async initData () {
      this.loading = true
      const res = await listCurriculumChoose({ cc_year_id: this.ccYearId })
      this.dataList = res.data
      this.loading = false
    },
    show (ccYearId, selectedIds) {
      this.ccYearId = ccYearId
      this.selectedIds = this.R.clone(selectedIds)
      this.dialogVisible = true
      this.initData()
    },
    hide () {
      this.dialogVisible = false
    },
    disabledCheck (row) {
      return this.R.any(item => item === row.id)(this.dataList.disabled_ids || [])
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
