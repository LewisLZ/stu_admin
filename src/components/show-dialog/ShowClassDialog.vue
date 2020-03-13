<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="班级", width="700px")
    div
      el-table.list-el-table(ref="table", :data="cla", border)
        el-table-column(label="Id", width="55")
          template(slot-scope="scope")
            div {{scope.row.id}}
        el-table-column(label="班级")
          template(slot-scope="scope")
            div {{scope.row.name}}
</template>

<script>

export default {
  data () {
    return {
      dialogVisible: false,
      cla: []
    }
  },
  methods: {
    show (cla) {
      this.cla = this.R.clone(cla)
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
