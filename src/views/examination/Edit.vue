<template lang="pug">
   div
     div
       el-button(type="primary", @click="handleAddClass") 添加班级
     div(v-if="dataList.data.length > 0")
       el-table.list-el-table(ref="table", :data="dataList.data", border)
         el-table-column(type="expand")
           template(slot-scope="scope")
             edit-info(:curriculumNames="getCurriculumNames(scope.row)", :curriculumIds="getCurriculumIds(scope.row)", :classId="scope.row.class_id", :examinationClassId="scope.row.id", @submit="initData")
         el-table-column(label="Id")
           template(slot-scope="scope")
             div {{scope.row.id}}
         el-table-column(label="")
           template(slot-scope="scope")
             div {{scope.row.class_name}}
         el-table-column(label="操作", width="300")
           template(slot-scope="scope")
             el-button(type="danger", plain, size="mini", :disabled="disabledClassDelete(scope.row)" @click="handleDelete(scope.row)") 删 除
     choose-single-class-dialog(ref="dlgChooseSingleClass", @submit="handleChooseClass")
</template>

<script>
import EditInfo from './EditInfo'
import {
  createExaminationClass,
  deleteExaminationClass,
  listExaminationClass
} from '../../api/examination'
import ChooseSingleClassDialog from '../../components/choose-dialog/ChooseSingleClassDialog'

export default {
  name: 'Edit',
  components: {
    EditInfo,
    ChooseSingleClassDialog
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
      const res = await listExaminationClass({ examination_id: this.$route.params.id })
      this.dataList = res.data
    },
    getCurriculumIds (row) {
      return this.R.map(item => item.class_curriculum_id)(row.examination_class_curriculum || [])
    },
    getCurriculumNames (row) {
      return this.R.map(item => item.class_curriculum_name)(row.examination_class_curriculum || [])
    },
    disabledClassDelete (row) {
      if (!row.examination_class_curriculum) {
        return false
      }
      return row.examination_class_curriculum.length > 0
    },
    handleAddClass () {
      this.$refs.dlgChooseSingleClass && this.$refs.dlgChooseSingleClass.show()
    },
    async handleChooseClass (id) {
      await createExaminationClass({ examination_id: this.$route.params.id, class_id: id })
      this.initData()
    },
    async handleDelete (row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteExaminationClass({ id: row.id })
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
