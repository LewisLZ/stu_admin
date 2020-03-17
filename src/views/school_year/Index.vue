<template lang="pug">
  div
    div.warning 学年下有班级数据不可删
    div
      el-form(:inline="true")
        el-form-item.el-form-item-search(label="年份")
          el-date-picker(v-model="queryParams.year", type="year", placeholder="请选择", value-format="timestamp")
        el-form-item(label="月份")
          el-select(v-model="queryParams.pos", placeholder="请选择", clearable)
            el-option(v-for="item in allPos", :key="item.value", :label="item.text", :value="item.value")
        el-form-item.el-form-item-search
          el-button(type="primary", icon="el-icon-search", @click="handlerSearch") 查 询
          el-button(@click="handlerReset") 重 置
    div
      el-button(type="primary", @click="handleAdd") 添 加
    div
      el-table.list-el-table(ref="table", :data="dataList.data", border, default-expand-all)
        el-table-column(label="Id", width="55")
          template(slot-scope="scope")
            div {{scope.row.id}}
        el-table-column(label="年份")
          template(slot-scope="scope")
            div {{showYearName(scope.row)}}
        el-table-column(label="月份")
          template(slot-scope="scope")
            div {{showPosName(scope.row)}}
        el-table-column(label="班级")
          template(slot-scope="scope")
            el-button(type="text", :disabled="showClassCount(scope.row)===0", @click="handleShowClass(scope.row)") {{showClassCount(scope.row)}}
        el-table-column
          template(slot-scope="scope")
            el-button(type="primary", plain, size="mini", @click="handleEdit(scope.row)", :disabled="showClassCount(scope.row)>0") 编 辑
            el-button(type="danger", plain, size="mini", @click="handleDelete(scope.row)", :disabled="showClassCount(scope.row)>0") 删 除
    div
      el-pagination(:currentPage.sync="queryPager.page", background, layout="prev, pager, next, jumper, sizes, total", :page-sizes="[20, 50, 100, 200]", :pageSize="queryPager.limit", :total="dataListTotal", @current-change="changePage", @size-change="changeSize")
    save-dialog(ref="dlgSave", @callback="handlerSearch")
    show-class-dialog(ref="dlgShowClass")
</template>

<script>
import LoadPagerData from 'src/mixins/load-pager-data'
import SaveDialog from './SaveDialog'
import { deleteSchoolYear, listSchoolYear } from '../../api/school_year'
import { convertAttrName } from '../../service/common'
import { allPos } from '../../service/school_year'
import ShowClassDialog from '../../components/show-dialog/ShowClassDialog'

export default {
  name: 'SchoolYear',
  mixins: [LoadPagerData],
  components: {
    SaveDialog,
    ShowClassDialog
  },
  data () {
    return {
      queryParams: {
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
      return listSchoolYear(params)
    },
    showClassCount (row) {
      return row.class.length
    },
    showYearName (row) {
      return `${row.year}年`
    },
    showPosName (row) {
      return convertAttrName(row.pos, allPos)
    },
    handlerSearch () {
      this.queryChange(this.queryParams)
    },
    handlerReset () {
      this.queryParams.name = ''
      this.queryChange(this.queryParams)
    },
    handleShowClass (row) {
      this.$refs.dlgShowClass && this.$refs.dlgShowClass.show(row.class)
    },
    handleAdd () {
      this.$refs.dlgSave && this.$refs.dlgSave.show()
    },
    handleEdit (row) {
      this.$refs.dlgSave && this.$refs.dlgSave.show({ id: row.id, year: row.year_tmp, pos: row.pos })
    },
    handleDelete (row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteSchoolYear({ id: row.id })
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
