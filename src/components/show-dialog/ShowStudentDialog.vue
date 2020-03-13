<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="学生", width="700px")
    div
      el-table.list-el-table(ref="table", :data="students", border)
        el-table-column(label="Id", width="55")
          template(slot-scope="scope")
            div {{scope.row.id}}
        el-table-column(label="姓名")
          template(slot-scope="scope")
            div {{scope.row.name}}
        el-table-column(label="学号")
          template(slot-scope="scope")
            div {{scope.row.code}}
        el-table-column(label="性别")
          template(slot-scope="scope")
            div {{convertAttrName(scope.row.sex, allSex)}}
        el-table-column(label="电话")
          template(slot-scope="scope")
            div {{scope.row.mobile}}
        el-table-column(label="出生日期")
          template(slot-scope="scope")
            div {{scope.row.birthday}}
        el-table-column(label="入学日期")
          template(slot-scope="scope")
            div {{scope.row.intake_time}}
        el-table-column(label="地址")
          template(slot-scope="scope")
            div {{scope.row.address}}
</template>

<script>

import { allSex, convertAttrName } from '../../service/common'

export default {
  data () {
    return {
      dialogVisible: false,
      students: [],
      ...$global.$mapConst({
        'allSex': allSex
      })
    }
  },
  methods: {
    show (students) {
      this.students = this.R.clone(students)
      this.dialogVisible = true
    },
    hide () {
      this.dialogVisible = false
    },
    ...$global.$mapMethods({
      'convertAttrName': convertAttrName
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
