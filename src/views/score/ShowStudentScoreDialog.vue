<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="showTitle", width="900px")
    div
      el-table.list-el-table(ref="table", :data="dataList.data", border)
        el-table-column(label="考试科目")
          template(slot-scope="scope")
            div {{scope.row.class_curriculum_name}}
        el-table-column(label="成绩")
          template(slot-scope="scope")
            div(style="color:#f32b2b") {{scope.row.score | score}}
        el-table-column(label="授课教师")
          template(slot-scope="scope")
            div {{scope.row.curriculum_teacher_name}}
        el-table-column(label="班级教师")
          template(slot-scope="scope")
            div {{scope.row.class_teacher_name}}
        el-table-column(label="最后更新时间", width="160px")
          template(slot-scope="scope")
            div {{scope.row.score_mt | datetime}}
    div(style="margin-top:20px; font-size:26px; color:#f32b2b") 总分：{{totalScore()}}
</template>

<script>

import { listAchievementStudentScore } from '../../api/achievement'
import { convertFenToYuan } from '../../util/moneyUtil'
import { dateFormat } from '../../util/format'

export default {
  data () {
    return {
      dialogVisible: false,
      dataList: {
        data: []
      },
      studentName: '',
      examinationName: '',
      examinationTime: '',
      className: ''
    }
  },
  computed: {
    showTitle () {
      return `${this.examinationName}(${dateFormat(this.examinationTime, 'YYYY-MM-DD')})-${this.className}-${this.studentName} 考试成绩`
    }
  },
  methods: {
    async show (studentId, examinationClassId, studentName, examinationName, examinationTime, className) {
      this.dialogVisible = true
      this.studentName = studentName
      this.examinationName = examinationName
      this.examinationTime = examinationTime
      this.className = className
      const res = await listAchievementStudentScore({ student_id: studentId, examination_class_id: examinationClassId })
      this.dataList = res.data
    },
    hide () {
      this.dialogVisible = false
    },
    totalScore () {
      let totalScore = 0
      this.R.forEach(item => {
        totalScore += item.score
      })(this.dataList.data || [])
      return convertFenToYuan(totalScore)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
