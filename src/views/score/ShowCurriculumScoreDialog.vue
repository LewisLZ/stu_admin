<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="showTitle", width="900px")
    div
      el-table.list-el-table(ref="table", :data="dataList.data", border)
        el-table-column(label="学生姓名")
          template(slot-scope="scope")
            div {{scope.row.student_name}}
        el-table-column(label="成绩", prop="score", sortable)
          template(slot-scope="scope")
            div(style="color:#f32b2b") {{scope.row.score | score}}
        el-table-column(label="最后更新时间", width="160px")
          template(slot-scope="scope")
            div {{scope.row.score_mt | datetime}}
</template>

<script>

import { listAchievementCurriculumScore } from '../../api/achievement'
import { dateFormat } from '../../util/format'

export default {
  data () {
    return {
      dialogVisible: false,
      dataList: {
        data: []
      },
      classCurriculumName: '',
      examinationName: '',
      examinationTime: '',
      className: ''
    }
  },
  computed: {
    showTitle () {
      return `${this.examinationName}(${dateFormat(this.examinationTime, 'YYYY-MM-DD')})-${this.className}-${this.classCurriculumName} 考试成绩`
    }
  },
  methods: {
    async show (classCurriculumId, examinationClassId, classCurriculumName, examinationName, examinationTime, className) {
      this.dialogVisible = true
      this.classCurriculumName = classCurriculumName
      this.examinationName = examinationName
      this.examinationTime = examinationTime
      this.className = className
      const res = await listAchievementCurriculumScore({ class_curriculum_id: classCurriculumId, examination_class_id: examinationClassId })
      this.dataList = res.data
    },
    hide () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
