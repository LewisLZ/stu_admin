<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="选择班级", width="700px", @close="closeCallback", v-loading="loading")
    div
      el-checkbox-group(v-model="selectedIds")
        el-table.list-el-table(ref="table", :data="dataList.data", border, default-expand-all)
          el-table-column(label="班级")
            template(slot-scope="scope")
              el-checkbox(:label="scope.row.id") {{scope.row.name}}
          el-table-column(label="学年")
            template(slot-scope="scope")
              div {{showYearName(scope.row)}}

    div.dialog-footer(slot="footer")
      el-button(type="primary", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
</template>

<script>
import { listClass } from '../../api/class'
import { convertAttrName } from '../../service/common'
import { allPos } from '../../service/school_year'

export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      dataList: {
        data: []
      },
      selectedIds: []
    }
  },
  methods: {
    async initData () {
      this.loading = true
      const res = await listClass({ page: 1, limit: 10000 })
      this.dataList = res.data
      this.loading = false
    },
    show (selectedIds) {
      this.selectedIds = this.R.clone(selectedIds)
      this.dialogVisible = true
      this.initData()
    },
    hide () {
      this.dialogVisible = false
    },
    showYearName (row) {
      return `${row.year}年-${convertAttrName(row.pos, allPos)}`
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
