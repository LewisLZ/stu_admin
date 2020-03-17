<template lang="pug">
   div
     div.bottom-outer-content
       el-table.list-el-table(ref="table", :data="dataList", max-height="400", style="width: 100%", v-loading="loading")
         el-table-column(v-for="(item, index) in tableHeader", :key="item.class_curriculum_name", :label="item.class_curriculum_name", :width="getColumnWidth(index)", :fixed="getColumnFixed(index)")
            template(slot-scope="scope")
              div(v-if="index === 0") {{scope.row[index].student_name}}
              div(v-else-if="index === tableHeader.length - 1") {{showSourceAll(scope.row)}}
              div(v-else)
                el-input(v-model="scope.row[index].score")
     div
       bottom-container
         el-button.button(type="primary", :loading="loading", @click="handleSave") 保 存
         el-button.button(@click="$router.back()") 返 回
</template>

<script>
import { listAchievementScore, saveAchievementScore } from '../../api/achievement'
import { convertFenToYuan, convertYuanToFen } from '../../util/moneyUtil'

export default {
  name: 'Edit',
  components: {
  },
  data () {
    return {
      loading: false,
      dataList: [],
      classInfo: {},
      tableHeader: []
    }
  },
  methods: {
    async initData () {
      const res = await listAchievementScore({ examination_class_id: this.$route.params.ecid })
      this.convertData(res.data.data)
    },
    getColumnWidth (index) {
      if (index === 0 || index === this.tableHeader.length - 1) {
        return '100px'
      }
      return '-'
    },
    getColumnFixed (index) {
      if (index === 0) {
        return true
      } else if (index === this.tableHeader.length - 1) {
        return 'right'
      }
      return false
    },
    showSourceAll (row) {
      let scoreAll = 0
      this.R.forEach(item => {
        let score = 0
        if (item.score) {
          score = convertYuanToFen(item.score)
        }
        scoreAll += score
      })(row || [])
      return convertFenToYuan(scoreAll)
    },
    convertData (data) {
      let titles = [{ class_curriculum_id: 0, class_curriculum_name: '姓名' }]
      this.R.forEach(item => {
        // 判断score 插入
        if (!item.score) {
          item.score = 0
        } else {
          item.score = convertFenToYuan(item.score)
        }

        const have = this.R.any(v => v.class_curriculum_id === item.class_curriculum_id)(titles || [])
        if (have) {
          return
        }
        titles.push({ class_curriculum_id: item.class_curriculum_id, class_curriculum_name: item.class_curriculum_name })
      })(data || [])

      titles = this.R.sort((a, b) => a.class_curriculum_id - b.class_curriculum_id)(titles || [])
      titles.push({ class_curriculum_id: 0, class_curriculum_name: '总分' })
      this.tableHeader = titles

      let students = []
      this.R.forEach(item => {
        const have = this.R.any(v => v.student_id === item.student_id)(students || [])
        if (have) {
          return
        }
        students.push({ student_id: item.student_id, student_name: item.student_name })
      })(data || [])

      students = this.R.sort((a, b) => a.student_id - b.student_id)(students || [])

      let datas = []

      this.R.forEach(item => {
        let d = this.R.filter(v => v.student_id === item.student_id)(data || [])
        d = this.R.sort((a, b) => a.class_curriculum_id - b.class_curriculum_id)(d || [])
        d.unshift({ student_name: item.student_name })
        datas.push(d)
      })(students || [])

      this.dataList = datas
    },
    convertForm () {
      const formData = []
      this.R.forEach(item => {
        this.R.forEach(v => {
          if (!v.class_curriculum_id) {
            return
          }
          formData.push(v)
        })(item || [])
      })(this.dataList || [])
      return formData
    },
    async handleSave () {
      this.loading = true
      try {
        const formData = this.convertForm()
        await saveAchievementScore(formData)
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$router.back()
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped>

</style>
