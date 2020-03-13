<template lang="pug">
  div
    el-form.bottom-outer-content(ref="form", :model="formData", :rules="formRules", labelWidth="150px")
      el-form-item(label="课程：", prop="class_id")
        el-button.button(type="primary", size="mini", plain, @click="handleAddCurriculum") 选 择
        div {{curriculumNames}}
    el-button.button(type="primary", :loading="loading", @click="handleSave") 保 存
    el-button.button(@click="$router.back()") 取 消
    choose-curriculum-dialog(ref="dlgChooseCurriculum", @submit="handleChooseCurriculum")
</template>

<script>

import ChooseCurriculumDialog from '../../components/choose-dialog/ChooseCurriculumDialog'
import { listCurriculumNameByIds } from '../../api/curriculum'
import { createStudent, updateStudent } from '../../api/student'

export default {
  name: 'EditInfo',
  components: {
    ChooseCurriculumDialog
  },
  props: {
    data: {
      curriculum_ids: []
    }
  },
  watch: {
    'data': {
      handler (val, old) {
        console.log('====', val, old)
        this.formData.curriculum_ids = this.R.clone(val.curriculum_ids)
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      formData: {
        curriculum_ids: []
      },
      curriculumNames: []
    }
  },
  methods: {
    handleAddCurriculum () {
      this.$refs.dlgChooseCurriculum && this.$refs.dlgChooseCurriculum.show(this.formData.curriculum_ids)
    },
    async handleChooseCurriculum (ids) {
      this.formData.curriculum_ids = ids
      const res = await listCurriculumNameByIds(ids)
      this.curriculumNames = res.data.data.join('，')

      this.$emit('update:data', this.formData)
    },
    handleSave () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            if (this.isEdit) {
              await updateStudent(this.$route.params.id, this.formData)
            } else {
              await createStudent(this.formData)
            }
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.back()
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

</style>
