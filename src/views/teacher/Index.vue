<template lang="pug">
  div
    div.search
      el-form(:inline="true")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.name", placeholder="姓名", @keyup.native.enter="search", clearable, style="width: 300px")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.mobile", placeholder="电话", @keyup.native.enter="search", clearable, style="width: 300px")
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
        el-table-column(label="姓名")
          template(slot-scope="scope")
            div {{scope.row.name}}
        el-table-column(label="电话")
          template(slot-scope="scope")
            div {{scope.row.mobile}}
        el-table-column(label="班级")
          template(slot-scope="scope")
            div {{showClass(scope.row.class)}}
        el-table-column(label="课程")
          template(slot-scope="scope")
            div {{showCurriculum(scope.row.curriculum)}}
        el-table-column(label="操作", width="160", fixed="right")
          template(slot-scope="scope")
            div
              el-button(type="primary", plain, size="mini", @click="handleEdit(scope.row)") 编 辑
              el-button(type="danger", plain, size="mini", @click="handleDelete(scope.row)") 删 除
    div
      el-pagination(:currentPage.sync="queryPager.page", background, layout="prev, pager, next, jumper, sizes, total", :page-sizes="[20, 50, 100, 200]", :pageSize="queryPager.limit", :total="dataListTotal", @current-change="changePage", @size-change="changeSize")
</template>

<script>
import LoadPagerData from 'src/mixins/load-pager-data'
import { deleteTeacher, listTeacher } from '../../api/teacher'

export default {
  mixins: [LoadPagerData],
  data () {
    return {
      queryParams: {
        name: '',
        mobile: ''
      }
    }
  },
  methods: {
    getQueryApi (params) {
      return listTeacher(params)
    },
    showCurriculum (curriculum) {
      return this.R.map(item => item.name)(curriculum || []).join('，')
    },
    showClass (cla) {
      return this.R.map(item => item.name)(cla || []).join('，')
    },
    handleAdd () {
      this.$router.push({
        name: 'TeacherCreate'
      })
    },
    handlerSearch () {
      this.queryChange(this.queryParams)
    },
    handlerReset () {
      this.queryParams.name = ''
      this.queryParams.mobile = ''
      this.queryChange(this.queryParams)
    },
    handleEdit (row) {
      this.$router.push({
        name: 'TeacherEdit',
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
        await deleteTeacher({ id: row.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.queryChange(this.queryParams)
      })
    }
  }
}
</script>

<style scoped>

</style>
