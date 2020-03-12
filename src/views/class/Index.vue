<template lang="pug">
  div
    div.warning 有二级数据一级数据不可删，有授课教师二级数据不可删
    div
      el-button(type="primary", @click="handleAdd") 添 加
    div
      el-table.list-el-table(ref="table", :data="dataList.data", border, default-expand-all)
        el-table-column(label="Id", width="55")
          template(slot-scope="scope")
            div {{scope.row.id}}
        el-table-column(type="expand", width="55")
          template(slot-scope="scope")
            el-table.list-el-table(ref="table2", :data="scope.row.children", border, default-expand-all)
              el-table-column(label="Id", width="55")
                template(slot-scope="scope2")
                  div {{scope2.row.id}}
              el-table-column(label="Name")
                template(slot-scope="scope2")
                  div {{scope2.row.name}}
              el-table-column(label="授课教师")
                template(slot-scope="scope2")
                  el-button(type="text", :disabled="showTeacherCount(scope2.row)===0", @click="handleShowTeacher(scope2.row)") {{showTeacherCount(scope2.row)}}
              el-table-column
                template(slot-scope="scope2")
                  el-button(type="primary", plain, size="mini", @click="handleEdit(scope2.row)") 编 辑
                  el-button(type="danger", plain, size="mini", :disabled="showTeacherCount(scope2.row)" @click="handleDelete(scope2.row)") 删 除
        el-table-column(label="Name")
          template(slot-scope="scope")
            div {{scope.row.name}}
        el-table-column
          template(slot-scope="scope")
            el-button(type="primary", plain, size="mini", @click="handleCreate(scope.row)") 添 加
            el-button(type="primary", plain, size="mini", @click="handleEdit(scope.row)") 编 辑
            el-button(type="danger", plain, size="mini", @click="handleDelete(scope.row)", :disabled="scope.row.children") 删 除
    save-dialog(ref="dlgSave", @callback="initData")
    show-teacher-dialog(ref="dlgShowTeacher")
</template>

<script>
import SaveDialog from './SaveDialog'
import { deleteClass, listClass } from '../../api/class'
import ShowTeacherDialog from '../../components/show-dialog/ShowTeacherDialog'

export default {
  name: 'Class',
  components: {
    SaveDialog,
    ShowTeacherDialog
  },
  data () {
    return {
      dataList: {
        data: []
      }
    }
  },
  methods: {
    async initData () {
      const res = await listClass()
      this.dataList = res.data
    },
    showTeacherCount (row) {
      return row.teacher.length
    },
    handleAdd () {
      this.$refs.dlgSave && this.$refs.dlgSave.show()
    },
    handleCreate (row) {
      this.$refs.dlgSave && this.$refs.dlgSave.show({ parent_id: row.id })
    },
    handleEdit (row) {
      this.$refs.dlgSave && this.$refs.dlgSave.show({ id: row.id, name: row.name, parent_id: row.parent_id })
    },
    handleShowTeacher (row) {
      this.$refs.dlgShowTeacher && this.$refs.dlgShowTeacher.show(row.teacher)
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
        this.initData()
      })
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped>
  .warning {
    color: #F32B2B;
    margin-bottom: 20px;
  }
</style>
