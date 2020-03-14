<template lang="pug">
  div
    div.warning 有授课教师或者有学生不可删
    div
      el-form(:inline="true")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.name", placeholder="名称", @keyup.native.enter="search", clearable, style="width: 300px")
        el-form-item.el-form-item-search(label="学年年份")
          el-date-picker(v-model="queryParams.year", type="year", placeholder="请选择", value-format="timestamp")
        el-form-item(label="学年月份")
          el-select(v-model="queryParams.pos", placeholder="请选择", clearable)
            el-option(v-for="item in allPos", :key="item.value", :label="item.text", :value="item.value")
        el-form-item.el-form-item-search
          el-button(type="primary", icon="el-icon-search", @click="handlerSearch") 查 询
          el-button(@click="handlerReset") 重 置
    div
      el-button(type="primary", @click="handleAdd") 添 加
    div
      el-table.list-el-table(ref="table", :data="dataList.data", border)
        el-table-column(label="Id", width="55")
          template(slot-scope="scope")
            div {{scope.row.id}}
        el-table-column(label="班级")
          template(slot-scope="scope")
            div {{scope.row.name}}
        el-table-column(label="学年")
          template(slot-scope="scope")
            div {{showYearName(scope.row)}}
        el-table-column(label="授课教师")
          template(slot-scope="scope")
            el-button(type="text", :disabled="showTeacherCount(scope.row)===0", @click="handleShowTeacher(scope.row)") {{showTeacherCount(scope.row)}}
        el-table-column(label="学生")
          template(slot-scope="scope")
            el-button(type="text", :disabled="showStudentCount(scope.row)===0", @click="handleShowStudent(scope.row)") {{showStudentCount(scope.row)}}
        el-table-column(label="课程")
          template(slot-scope="scope")
            div {{scope.row.class_curriculum_year_count}}
        el-table-column(label="操作", width="300")
          template(slot-scope="scope")
            el-button(type="primary", plain, size="mini", @click="handleEdit(scope.row)") 编 辑
            el-button(type="primary", plain, size="mini", @click="handleCurriculumEdit(scope.row)") 编辑课程
            el-button(type="danger", plain, size="mini", :disabled="disabledClassDelete(scope.row)" @click="handleDelete(scope.row)") 删 除
    div
      el-pagination(:currentPage.sync="queryPager.page", background, layout="prev, pager, next, jumper, sizes, total", :page-sizes="[20, 50, 100, 200]", :pageSize="queryPager.limit", :total="dataListTotal", @current-change="changePage", @size-change="changeSize")
    save-dialog(ref="dlgSave", @callback="handlerSearch")
    show-teacher-dialog(ref="dlgShowTeacher")
    show-student-dialog(ref="dlgShowStudent")
</template>

<script>
import LoadPagerData from 'src/mixins/load-pager-data'
import SaveDialog from './SaveDialog'
import { deleteClass, listClass } from '../../api/class'
import ShowTeacherDialog from '../../components/show-dialog/ShowTeacherDialog'
import ShowStudentDialog from '../../components/show-dialog/ShowStudentDialog'
import { allPos } from '../../service/school_year'
import { convertAttrName } from '../../service/common'

export default {
  name: 'Class',
  mixins: [LoadPagerData],
  components: {
    SaveDialog,
    ShowTeacherDialog,
    ShowStudentDialog
  },
  data () {
    return {
      queryParams: {
        name: '',
        year: '',
        pos: 0
      },
      ...$global.$mapConst({
        'allPos': allPos
      })
    }
  },
  methods: {
    getQueryApi (params) {
      return listClass(params)
    },
    handlerSearch () {
      this.queryChange(this.queryParams)
    },
    handlerReset () {
      this.queryParams = {
        name: '',
        year: '',
        pos: 0
      }
      this.queryChange(this.queryParams)
    },
    showTeacherCount (row) {
      return row.teacher.length
    },
    showStudentCount (row) {
      return row.student.length
    },
    showYearName (row) {
      return `${row.year}年-${convertAttrName(row.pos, allPos)}`
    },
    disabledClassDelete (row) {
      return this.showTeacherCount(row) > 0 || this.showStudentCount(row) > 0 || row.class_curriculum_year_count > 0
    },
    handleAdd () {
      this.$refs.dlgSave && this.$refs.dlgSave.show()
    },
    handleEdit (row) {
      this.$refs.dlgSave && this.$refs.dlgSave.show({ id: row.id, name: row.name, school_year_id: row.school_year_id })
    },
    handleCurriculumEdit (row) {
      this.$router.push({
        name: 'ClassCurriculumEdit',
        params: {
          id: row.id
        }
      })
    },
    handleShowTeacher (row) {
      this.$refs.dlgShowTeacher && this.$refs.dlgShowTeacher.show(row.teacher)
    },
    handleShowStudent (row) {
      this.$refs.dlgShowStudent && this.$refs.dlgShowStudent.show(row.student)
    },
    handleDelete (row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteClass({ id: row.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handlerSearch()
      })
    }
  }
}
</script>

<style scoped>
  .warning {
    color: #F32B2B;
    margin-bottom: 20px;
  }
</style>
