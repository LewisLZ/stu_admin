<template lang="pug">
  div
    div.warning 有授课教师不能删除课程
    div.search
      el-form(:inline="true")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.name", placeholder="姓名", @keyup.native.enter="search", clearable, style="width: 300px")
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
        el-table-column(label="名称")
          template(slot-scope="scope")
            div {{scope.row.name}}
        el-table-column(label="授课教师")
          template(slot-scope="scope")
            el-button(type="text", :disabled="showTeacherCount(scope.row)===0", @click="handleShowTeacher(scope.row)") {{showTeacherCount(scope.row)}}
        el-table-column(label="操作", width="160", fixed="right")
          template(slot-scope="scope")
            div
              el-button(type="primary", plain, size="mini", @click="handleEdit(scope.row)") 编 辑
              el-button(type="danger", plain, size="mini", @click="handleDelete(scope.row)", :disabled="showTeacherCount(scope.row)") 删 除
    div
      el-pagination(:currentPage.sync="queryPager.page", background, layout="prev, pager, next, jumper, sizes, total", :page-sizes="[20, 50, 100, 200]", :pageSize="queryPager.limit", :total="dataListTotal", @current-change="changePage", @size-change="changeSize")
    save-dialog(ref="dlgSave", @callback="handlerSearch")
    show-teacher-dialog(ref="dlgShowTeacher")
</template>

<script>
import LoadPagerData from 'src/mixins/load-pager-data'
import SaveDialog from './SaveDialog'
import { deleteCurriculum, listCurriculum } from '../../api/curriculum'
import ShowTeacherDialog from '../../components/show-dialog/ShowTeacherDialog'

export default {
  mixins: [LoadPagerData],
  components: {
    SaveDialog,
    ShowTeacherDialog
  },
  data () {
    return {
      queryParams: {
        name: ''
      }
    }
  },
  methods: {
    getQueryApi (params) {
      return listCurriculum(params)
    },
    showTeacherCount (row) {
      return row.teacher.length
    },
    handleAdd () {
      this.$refs.dlgSave && this.$refs.dlgSave.show()
    },
    handlerSearch () {
      this.queryChange(this.queryParams)
    },
    handlerReset () {
      this.queryParams.name = ''
      this.queryChange(this.queryParams)
    },
    handleEdit (row) {
      this.$refs.dlgSave && this.$refs.dlgSave.show(row.id)
    },
    handleShowTeacher (row) {
      this.$refs.dlgShowTeacher && this.$refs.dlgShowTeacher.show(row.teacher)
    },
    async handleDelete (row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteCurriculum({ id: row.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.loadFirstPageDataList()
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
