<template lang="pug">
  el-dialog(:visible.sync="dialogVisible", :title="showTitle", width="900px")
    div
      el-table.list-el-table(ref="table", :data="dataList", max-height="400", style="width: 100%")
        el-table-column(v-for="(item, index) in tableHeader", :key="item.class_curriculum_name", :label="item.class_curriculum_name", :width="getColumnWidth(index)", :fixed="getColumnFixed(index)")
          template(slot-scope="scope")
            div(v-if="index === 0") {{scope.row[index].student_name}}
            div(v-else-if="index === tableHeader.length - 1", style="color:#f32b2b") {{showSourceAll(scope.row)}}
            div(v-else)
              div {{scope.row[index].score}}
</template>

<script>

import { listAchievementClassScore } from '../../api/achievement'
import { dateFormat } from '../../util/format'
import { convertFenToYuan, convertYuanToFen } from '../../util/moneyUtil'

export default {
  data () {
    return {
      dialogVisible: false,
      dataList: [],
      tableHeader: [],
      examinationName: '',
      examinationTime: '',
      className: ''
    }
  },
  computed: {
    showTitle () {
      return `${this.examinationName}(${dateFormat(this.examinationTime, 'YYYY-MM-DD')})-${this.className} 考试成绩`
    }
  },
  methods: {
    async show (examinationClassId, examinationName, examinationTime, className) {
      this.dialogVisible = true
      this.examinationName = examinationName
      this.examinationTime = examinationTime
      this.className = className
      const res = await listAchievementClassScore({ examination_class_id: examinationClassId })
      this.convertData(res.data.data)
    },
    hide () {
      this.dialogVisible = false
    },
    getColumnWidth (index) {
      if (index === 0 || index === this.tableHeader.length - 1) {
        return '100px'
      }
      return '-'
    },
    getColumnFixed (index) {
      if (index === 0) {
        return true
      } else if (index === this.tableHeader.length - 1) {
        return 'right'
      }
      return false
    },
    showSourceAll (row) {
      let scoreAll = 0
      this.R.forEach(item => {
        let score = 0
        if (item.score) {
          score = convertYuanToFen(item.score)
        }
        scoreAll += score
      })(row || [])
      return convertFenToYuan(scoreAll)
    },
    convertData (data) {
      console.log('==0===', data)

      let titles = [{ class_curriculum_id: 0, class_curriculum_name: '姓名' }]
      this.R.forEach(item => {
        // 判断score 插入
        if (!item.score) {
          item.score = 0
        } else {
          item.score = convertFenToYuan(item.score)
        }

        const have = this.R.any(v => v.class_curriculum_id === item.class_curriculum_id)(titles || [])
        if (have) {
          return
        }
        titles.push({ class_curriculum_id: item.class_curriculum_id, class_curriculum_name: item.class_curriculum_name })
      })(data || [])

      titles = this.R.sort((a, b) => a.class_curriculum_id - b.class_curriculum_id)(titles || [])
      titles.push({ class_curriculum_id: 0, class_curriculum_name: '总分' })
      this.tableHeader = titles
      console.log('==1===', titles)

      let students = []
      this.R.forEach(item => {
        const have = this.R.any(v => v.student_id === item.student_id)(students || [])
        if (have) {
          return
        }
        students.push({ student_id: item.student_id, student_name: item.student_name })
      })(data || [])

      students = this.R.sort((a, b) => a.student_id - b.student_id)(students || [])

      console.log('==2===', students)

      let datas = []

      this.R.forEach(item => {
        let d = this.R.filter(v => v.student_id === item.student_id)(data || [])
        d = this.R.sort((a, b) => a.class_curriculum_id - b.class_curriculum_id)(d || [])
        d.unshift({ student_name: item.student_name })
        datas.push(d)
      })(students || [])

      this.dataList = datas
      console.log('===5==', datas)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
