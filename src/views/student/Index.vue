<template lang="pug">
  div
    div
      el-form(:inline="true")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.code", placeholder="学号", @keyup.native.enter="search", clearable, style="width: 300px")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.name", placeholder="姓名", @keyup.native.enter="search", clearable, style="width: 300px")
        el-form-item(label="性别")
          el-select(v-model="queryParams.sex", placeholder="请选择", clearable)
            el-option(v-for="item in allSex", :key="item.value", :label="item.text", :value="item.value")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.address", placeholder="地址", @keyup.native.enter="search", clearable, style="width: 300px")
        el-form-item.el-form-item-search
          el-input(v-model="queryParams.mobile", placeholder="电话", @keyup.native.enter="search", clearable, style="width: 300px")
        el-form-item.el-form-item-search(label="出生日期")
          el-date-picker(v-model="queryParams.birthday", type="date", placeholder="选择日期", valueFormat="timestamp", format="yyyy 年 MM 月 dd 日")
        el-form-item.el-form-item-search(label="入学时间")
          el-date-picker(v-model="queryParams.intake_time", type="month", placeholder="选择日期", valueFormat="timestamp", format="yyyy 年 MM 月")
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
        el-table-column(label="学号")
          template(slot-scope="scope")
            div {{scope.row.code}}
        el-table-column(label="班级")
          template(slot-scope="scope")
            div {{scope.row.class_name}}
        el-table-column(label="性别")
          template(slot-scope="scope")
            div {{convertAttrName(scope.row.sex, allSex)}}
        el-table-column(label="电话")
          template(slot-scope="scope")
            div {{scope.row.mobile}}
        el-table-column(label="出生日期")
          template(slot-scope="scope")
            div {{scope.row.birthday}}
        el-table-column(label="入学日期")
          template(slot-scope="scope")
            div {{scope.row.intake_time}}
        el-table-column(label="地址")
          template(slot-scope="scope")
            div {{scope.row.address}}
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
import { allSex, convertAttrName } from '../../service/common'
import { deleteStudent, listStudent } from '../../api/student'

export default {
  name: 'Student',
  mixins: [LoadPagerData],
  data () {
    return {
      queryParams: {
        code: '',
        name: '',
        sex: 0,
        birthday: '',
        address: '',
        intake_time: '',
        mobile: ''
      },
      ...$global.$mapConst({
        'allSex': allSex
      })
    }
  },
  methods: {
    getQueryApi (params) {
      return listStudent(params)
    },
    handlerSearch () {
      this.queryChange(this.queryParams)
    },
    handlerReset () {
      this.queryParams = {
        code: '',
        name: '',
        sex: 0,
        birthday: '',
        address: '',
        intake_time: '',
        mobile: ''
      }
      this.queryChange(this.queryParams)
    },
    handleAdd () {
      this.$router.push({
        name: 'StudentCreate'
      })
    },
    handleEdit (row) {
      this.$router.push({
        name: 'StudentEdit',
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
        await deleteStudent({ id: row.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.queryChange(this.queryParams)
      })
    },
    ...$global.$mapMethods({
      'convertAttrName': convertAttrName
    })
  }
}
</script>

<style scoped>

</style>
