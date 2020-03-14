<template lang="pug">
  div
    div
      el-form(:inline="true")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.name", placeholder="姓名", @keyup.native.enter="search", clearable, style="width: 300px")
        el-form-item(label="开始时间")
          el-date-picker(v-model="selectTime", type="daterange", range-separator="至", start-placeholder="开始日期", end-placeholder="结束日期", clearable)
        el-form-item.el-form-item-search
          el-button(type="primary", icon="el-icon-search", @click="handlerSearch") 查 询
          el-button(@click="handlerReset") 重 置
    div
      el-button(type="primary", @click="handleAdd") 添 加
    div
      el-table.list-el-table(ref="table", :data="dataList.data", border)
        el-table-column(label="Id", prop="id")
        el-table-column(label="名称")
          template(slot-scope="scope")
            div {{scope.row.name}}
        el-table-column(label="考试时间")
          template(slot-scope="scope")
            div {{scope.row.start_time | date}}
        el-table-column(label="备注")
          template(slot-scope="scope")
            div {{scope.row.remark}}
        el-table-column(label="操作", width="300")
          template(slot-scope="scope")
            el-button(type="primary", plain, size="mini", @click="handleEdit(scope.row)") 编 辑
            el-button(type="primary", plain, size="mini", @click="handleCurriculumEdit(scope.row)") 编辑班级
            el-button(type="danger", plain, size="mini", :disabled="disabledClassDelete(scope.row)" @click="handleDelete(scope.row)") 删 除
    save-dialog(ref="dlgSave", @callback="handlerSearch")
</template>

<script>
import LoadPagerData from 'src/mixins/load-pager-data'
import { deleteExamination, listExamination } from '../../api/examination'
import SaveDialog from './SaveDialog'

export default {
  name: 'Index',
  mixins: [LoadPagerData],
  components: {
    SaveDialog
  },
  data () {
    return {
      queryParams: {
        name: '',
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
      return listExamination(params)
    },
    handlerSearch () {
      this.queryChange(this.queryParams)
    },
    handlerReset () {
      this.queryParams.name = ''
      this.queryChange(this.queryParams)
    },
    disabledClassDelete (row) {
      return false
    },
    handleAdd () {
      this.$refs.dlgSave && this.$refs.dlgSave.show()
    },
    handleEdit (row) {
      this.$refs.dlgSave && this.$refs.dlgSave.show(row)
    },
    handleCurriculumEdit (row) {
      this.$router.push({
        name: 'ExaminationEdit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete (row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteExamination({ id: row.id })
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

</style>
