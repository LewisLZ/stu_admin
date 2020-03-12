<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="选择班级", width="700px")
    div
      el-table.list-el-table(ref="table", :data="teachers", border)
        el-table-column(label="Id", width="55")
          template(slot-scope="scope")
            div {{scope.row.id}}
        el-table-column(label="姓名")
          template(slot-scope="scope")
            div {{scope.row.name}}
        el-table-column(label="电话")
          template(slot-scope="scope")
            div {{scope.row.mobile}}
</template>

<script>

export default {
  data () {
    return {
      dialogVisible: false,
      teachers: []
    }
  },
  methods: {
    show (teachers) {
      this.teachers = this.R.clone(teachers)
      this.dialogVisible = true
    },
    hide () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
