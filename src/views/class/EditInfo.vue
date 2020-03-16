<template lang="pug">
  div
    el-form(ref="form", :model="formData", labelWidth="150px")
      el-form-item(label="课程：")
        el-button.button(type="primary", size="mini", plain, @click="handleAddCurriculum") 选 择
        el-table.table(:data="dataCurriculumNames", border, :show-header="false")
          el-table-column
            template(slot-scope="scope")
              div {{scope.row}}
      el-form-item
        el-button(type="primary", :loading="loading", @click="handleSave") 保 存
    choose-curriculum-dialog(ref="dlgChooseCurriculum", @submit="handleChooseCurriculum")
</template>

<script>

import ChooseCurriculumDialog from '../../components/choose-dialog/ChooseCurriculumDialog'
import { listCurriculumNameByIds } from '../../api/curriculum'
import { createClassCurriculum } from '../../api/class'

export default {
  name: 'EditInfo',
  components: {
    ChooseCurriculumDialog
  },
  props: {
    curriculumIds: {
      type: Array,
      default () {
        return []
      }
    },
    curriculumNames: {
      type: Array,
      default () {
        return []
      }
    },
    ccYearId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: false,
      formData: {
        curriculum_ids: this.R.clone(this.curriculumIds || [])
      },
      dataCurriculumNames: this.R.clone(this.curriculumNames || [])
    }
  },
  methods: {
    handleAddCurriculum () {
      this.$refs.dlgChooseCurriculum && this.$refs.dlgChooseCurriculum.show(this.ccYearId, this.formData.curriculum_ids || [])
    },
    async handleChooseCurriculum (ids) {
      this.formData.curriculum_ids = ids
      const res = await listCurriculumNameByIds(ids)
      this.dataCurriculumNames = res.data.data
    },
    handleSave () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await createClassCurriculum({ cc_year_id: this.ccYearId, curriculum_ids: this.formData.curriculum_ids })
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$emit('submit')
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .table {
    margin-top: 15px;
  }
</style>
