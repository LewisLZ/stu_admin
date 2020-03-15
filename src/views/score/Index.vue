<template lang="pug">
  div
    div
      el-form(:inline="true")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.student_name", placeholder="学生姓名", @keyup.native.enter="search", clearable, style="width: 200px")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.curriculum_name", placeholder="科目名称", @keyup.native.enter="search", clearable, style="width: 200px")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.examination_name", placeholder="考试名称", @keyup.native.enter="search", clearable, style="width: 200px")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.class_name", placeholder="班级名称", @keyup.native.enter="search", clearable, style="width: 200px")
        el-form-item(label="考试时间")
          el-date-picker(v-model="selectTime", type="daterange", range-separator="至", start-placeholder="开始日期", end-placeholder="结束日期", clearable)
        el-form-item.el-form-item-search
          el-button(type="primary", icon="el-icon-search", @click="handlerSearch") 查 询
          el-button(@click="handlerReset") 重 置
    div
      el-table.list-el-table(ref="table", :data="dataList.data", border, @sort-change="sortChanged", :defaultSort!='dataListSortInfo')
        el-table-column(label="学生姓名(学号)")
          template(slot-scope="scope")
            el-button(type="text", @click="handleShowStudentScore(scope.row)") {{`${scope.row.student_name}(${scope.row.student_code})`}}
        el-table-column(label="考试科目")
          template(slot-scope="scope")
            el-button(type="text", @click="handleShowCurriculumScore(scope.row)") {{scope.row.class_curriculum_name}}
        el-table-column(label="成绩", width="80px", prop="score", sortable)
          template(slot-scope="scope")
            div(style="color:#f32b2b") {{scope.row.score | score}}
        el-table-column(label="考试班级")
          template(slot-scope="scope")
            el-button(type="text", @click="handleShowClassScore(scope.row)") {{scope.row.class_name}}
        el-table-column(label="考试名称", width="100px")
          template(slot-scope="scope")
            div {{scope.row.examination_name}}
        el-table-column(label="考试时间", width="100px")
          template(slot-scope="scope")
            div {{scope.row.examination_time | date}}
        el-table-column(label="最后更新时间", width="160px")
          template(slot-scope="scope")
            div {{scope.row.score_mt | datetime}}
    div
      el-pagination(:currentPage.sync="queryPager.page", background, layout="prev, pager, next, jumper, sizes, total", :page-sizes="[20, 50, 100, 200]", :pageSize="queryPager.limit", :total="dataListTotal", @current-change="changePage", @size-change="changeSize")
    show-student-score-dialog(ref="dlgShowStudentScore")
    show-curriculum-score-dialog(ref="dlgShowCurriculumScore")
    show-class-score-dialog(ref="dlgShowClassScore")
</template>

<script>
import LoadPagerData from 'src/mixins/load-pager-data'
import { listAchievementSearchScore } from '../../api/achievement'
import ShowStudentScoreDialog from './ShowStudentScoreDialog'
import ShowCurriculumScoreDialog from './ShowCurriculumScoreDialog'
import ShowClassScoreDialog from './ShowClassScoreDialog'

export default {
  name: 'Index',
  mixins: [LoadPagerData],
  components: {
    ShowStudentScoreDialog,
    ShowCurriculumScoreDialog,
    ShowClassScoreDialog
  },
  data () {
    return {
      queryParams: {
        student_name: '',
        curriculum_name: '',
        examination_name: '',
        class_name: '',
        start_time: '',
        end_time: ''
      },
      selectTimes: []
    }
  },
  computed: {
    selectTime: {
      get () {
        return this.selectTimes
      },
      set (val) {
        this.selectTimes = val
        if (val && val.length === 2) {
          this.queryParams.start_time = val[0].getTime()
          this.queryParams.end_time = val[1].getTime()
        } else {
          this.queryParams.start_time = ''
          this.queryParams.end_time = ''
        }
      }
    }
  },
  methods: {
    getQueryApi (params) {
      return listAchievementSearchScore(params)
    },
    handlerSearch () {
      this.queryChange(this.queryParams)
    },
    handlerReset () {
      this.queryParams = {
        student_name: '',
        curriculum_name: '',
        examination_name: '',
        class_name: '',
        start_time: '',
        end_time: ''
      }
      this.queryChange(this.queryParams)
    },
    handleShowStudentScore (row) {
      this.$refs.dlgShowStudentScore && this.$refs.dlgShowStudentScore.show(row.student_id, row.examination_class_id, row.student_name, row.examination_name, row.examination_time, row.class_name)
    },
    handleShowCurriculumScore (row) {
      this.$refs.dlgShowCurriculumScore && this.$refs.dlgShowCurriculumScore.show(row.class_curriculum_id, row.examination_class_id, row.class_curriculum_name, row.examination_name, row.examination_time, row.class_name)
    },
    handleShowClassScore (row) {
      this.$refs.dlgShowClassScore && this.$refs.dlgShowClassScore.show(row.examination_class_id, row.examination_name, row.examination_time, row.class_name)
    }
  }
}
</script>

<style scoped>

</style>
