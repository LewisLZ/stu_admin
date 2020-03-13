<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="选择班级", width="700px", @close="closeCallback", v-loading="loading")
    div
      el-table.list-el-table(ref="table", :data="dataList.data", border, default-expand-all)
        el-table-column(type="expand", width="55")
          template(slot-scope="scope")
            el-table.list-el-table(ref="table2", :data="scope.row.children", border,  :row-class-name="tableRowClassName", @current-change="handleCurrentChange")
              el-table-column(label="班级")
                template(slot-scope="scope2")
                 div {{scope2.row.name}}
        el-table-column(label="学年")
          template(slot-scope="scope")
            div {{scope.row.name}}
</template>

<script>
import { listClass } from '../../api/class'

export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      dataList: {
        data: []
      },
      selectedId: 0
    }
  },
  methods: {
    async initData () {
      this.loading = true
      const res = await listClass()
      this.dataList = res.data
      this.loading = false
    },
    show (selectedId) {
      this.selectedId = this.R.clone(selectedId)
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
    tableRowClassName ({ row, rowIndex }) {
      if (!row) {
        return
      }
      if (row.id === this.selectedId) {
        return 'success-row'
      }
      return ''
    },
    handleCurrentChange (row) {
      if (!row) {
        return
      }
      this.selectedId = row.id
      this.$emit('submit', row.id)
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
