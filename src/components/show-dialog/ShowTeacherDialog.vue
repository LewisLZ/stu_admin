<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", title="教师", width="700px")
    div
      el-table.list-el-table(ref="table", :data="teachers", border)
        el-table-column(label="Id", width="55")
          template(slot-scope="scope")
            div {{scope.row.id}}
        el-table-column(label="姓名")
          template(slot-scope="scope")
            div {{scope.row.name}}
        el-table-column(label="性别")
          template(slot-scope="scope")
            div {{convertAttrName(scope.row.sex, allSex)}}
        el-table-column(label="电话")
          template(slot-scope="scope")
            div {{scope.row.mobile}}
        el-table-column(label="课程")
          template(slot-scope="scope")
            div {{showCurriculum(scope.row.curriculum)}}
</template>

<script>

import { allSex, convertAttrName } from '../../service/common'

export default {
  data () {
    return {
      dialogVisible: false,
      teachers: [],
      ...$global.$mapConst({
        'allSex': allSex
      })
    }
  },
  methods: {
    show (teachers) {
      this.teachers = this.R.clone(teachers)
      this.dialogVisible = true
    },
    hide () {
      this.dialogVisible = false
    },
    showCurriculum (curriculum) {
      return this.R.map(item => item.name)(curriculum || []).join('，')
    },
    ...$global.$mapMethods({
      'convertAttrName': convertAttrName
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
