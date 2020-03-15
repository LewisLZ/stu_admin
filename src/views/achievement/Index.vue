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
      el-table.list-el-table(ref="table", :data="dataList.data", border)
        el-table-column(label="考试Id", prop="examination_id")
        el-table-column(label="考试名称")
          template(slot-scope="scope")
            div {{scope.row.examination_name}}
        el-table-column(label="考试时间")
          template(slot-scope="scope")
            div {{scope.row.examination_time | date}}
        el-table-column(label="考试班级")
          template(slot-scope="scope")
            div {{scope.row.examination_class_count}}
        el-table-column(label="操作")
          template(slot-scope="scope")
            el-button(type="primary", plain, size="mini", @click="handleCurriculumEdit(scope.row)") 编辑成绩
</template>

<script>
import LoadPagerData from 'src/mixins/load-pager-data'
import { listAchievement } from '../../api/achievement'

export default {
  name: 'Index',
  mixins: [LoadPagerData],
  components: {
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
      return listAchievement(params)
    },
    handlerSearch () {
      this.queryChange(this.queryParams)
    },
    handlerReset () {
      this.queryParams.name = ''
      this.queryParams.start_time = ''
      this.queryParams.end_time = ''
      this.queryChange(this.queryParams)
    },
    handleCurriculumEdit (row) {
      this.$router.push({
        name: 'AchievementEdit',
        params: {
          id: row.examination_id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
