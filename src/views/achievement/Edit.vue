<template lang="pug">
   div
     div(v-if="dataList.data.length > 0")
       el-table.list-el-table(ref="table", :data="dataList.data", border)
         el-table-column(label="Id", prop="id")
         el-table-column(label="班级")
           template(slot-scope="scope")
             div {{scope.row.class_name}}
         el-table-column(label="操作", width="300")
           template(slot-scope="scope")
             el-button(type="primary", plain, size="mini", :disabled="disabledEdit(scope.row)" @click="handleEdit(scope.row)") 录入成绩
             el-button(type="primary", plain, size="mini", :disabled="disabledArchived(scope.row)" @click="handleArchived(scope.row)") 归 档
</template>

<script>
import { listExaminationClass } from '../../api/examination'
import { archivedAchievement } from '../../api/achievement'

export default {
  name: 'Edit',
  components: {
  },
  data () {
    return {
      loading: false,
      dataList: {
        data: [],
        can_edit: true
      },
      classInfo: {}
    }
  },
  methods: {
    async initData () {
      const res = await listExaminationClass({ examination_id: this.$route.params.id })
      this.dataList = res.data
    },
    disabledEdit (row) {
      return row.status === 1
    },
    disabledArchived (row) {
      return row.status === 1
    },
    async handleEdit (row) {
      this.$router.push({
        name: 'AchievementScoreEdit',
        params: {
          ecid: row.id
        }
      })
    },
    handleArchived (row) {
      this.$confirm('归档后不可以在编辑', '确定归档吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await archivedAchievement({ examination_class_id: row.id })
        this.$message({
          type: 'success',
          message: '归档成功!'
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
