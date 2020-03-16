<template lang="pug">
  div
    el-form(ref="form", :model="formData", labelWidth="150px")
      el-form-item(label="课程：")
        el-button.button(type="primary", size="mini", plain, @click="handleAddCurriculum", v-if="canEdit") 选 择
        el-table.table(:data="dataCurriculumNames", border, :show-header="false")
          el-table-column
            template(slot-scope="scope")
              div {{scope.row}}
      el-form-item(v-if="canEdit")
        el-button(type="primary", :loading="loading", @click="handleSave") 保 存
    choose-examination-curriculum-dialog(ref="dlgChooseCurriculum", @submit="handleChooseCurriculum")
</template>

<script>

import ChooseExaminationCurriculumDialog from '../../components/choose-dialog/ChooseExaminationCurriculumDialog'
import { listCurriculumNameByClassCurriculumIds } from '../../api/curriculum'
import { createExaminationClassCurriculum } from '../../api/examination'

export default {
  name: 'EditInfo',
  components: {
    ChooseExaminationCurriculumDialog
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
    classId: {
      type: Number,
      default: 0
    },
    examinationClassId: {
      type: Number,
      default: 0
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      formData: {
        class_curriculum_ids: this.R.clone(this.curriculumIds || [])
      },
      dataCurriculumNames: this.R.clone(this.curriculumNames || [])
    }
  },
  methods: {
    handleAddCurriculum () {
      this.$refs.dlgChooseCurriculum && this.$refs.dlgChooseCurriculum.show(this.classId, this.formData.class_curriculum_ids || [])
    },
    async handleChooseCurriculum (classCurriculumIds) {
      this.formData.class_curriculum_ids = classCurriculumIds
      const res = await listCurriculumNameByClassCurriculumIds(classCurriculumIds)
      this.dataCurriculumNames = res.data.data
    },
    handleSave () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await createExaminationClassCurriculum({ examination_class_id: this.examinationClassId, class_curriculum_ids: this.formData.class_curriculum_ids })
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
