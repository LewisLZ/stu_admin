<template lang="pug">
   div
     div
       el-button(type="primary", @click="handleAddYear") 添 加
     div(v-if="dataList.data.length > 0")
       el-table.list-el-table(ref="table", :data="dataList.data", border)
         el-table-column(type="expand")
           template(slot-scope="scope")
             edit-info(:data="scope.row")
         el-table-column(label="")
           template(slot-scope="scope")
             div {{scope.row.class_name}}
         el-table-column(label="操作", width="300")
           template(slot-scope="scope")
             el-button(type="danger", plain, size="mini", :disabled="disabledClassDelete(scope.row)" @click="handleDelete(scope.row)") 删 除
     save-year-dialog(ref="dlgSaveYear", @callback="initData")
</template>

<script>
import EditInfo from './EditInfo'
import { deleteClassCurriculumYear, getClass, listClassCurriculumYear } from '../../api/class'
import SaveYearDialog from './SaveYearDialog'

export default {
  name: 'Edit',
  components: {
    EditInfo,
    SaveYearDialog
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      dataList: {
        data: []
      },
      classInfo: {}
    }
  },
  methods: {
    async initData () {
      const res = await listClassCurriculumYear({ class_id: this.$route.params.id })
      this.dataList = res.data
      const classRes = await getClass({ id: this.$route.params.id })
      this.classInfo = classRes.data
    },
    disabledClassDelete (row) {
      if (!row.class_curriculum) {
        return false
      }
      return row.class_curriculum.length > 0
    },
    handleAddYear () {
      this.$refs.dlgSaveYear && this.$refs.dlgSaveYear.show({ class_id: this.$route.params.id, pos: 1 }, this.classInfo)
    },
    async handleDelete (row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteClassCurriculumYear({ id: row.id })
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

</style>
