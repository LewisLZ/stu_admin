<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="选择班级", width="700px", @close="closeCallback", v-loading="loading")
    div
      el-checkbox-group(v-model="selectedIds")
        el-table.list-el-table(ref="table", :data="dataList.data", border, default-expand-all)
          el-table-column(type="expand", width="55")
            template(slot-scope="scope")
              el-table.list-el-table(ref="table2", :data="scope.row.children", border)
                el-table-column(label="班级")
                  template(slot-scope="scope2")
                    el-checkbox(:label="scope2.row.id") {{scope2.row.name}}
          el-table-column(label="学年")
            template(slot-scope="scope")
              div {{scope.row.name}}

    div.dialog-footer(slot="footer")
      el-button(type="primary", @click="handleSubmit") 确定
      el-button(@click="dialogVisible = false") 取消
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
      selectedIds: []
    }
  },
  methods: {
    async initData () {
      this.loading = true
      const res = await listClass()
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
