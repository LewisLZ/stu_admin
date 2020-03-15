<template lang="pug">
   div
     el-form.bottom-outer-content(ref="form", :model="formData", :rules="formRules", labelWidth="150px")
       el-form-item(label="姓名：", prop="name")
         el-input.medium-el-input(v-model="formData.name")
       el-form-item(label="性别：", prop="sex", :required="true")
         el-radio-group(v-model="formData.sex")
           el-radio(:label="1") 男
           el-radio(:label="2") 女
       el-form-item(label="电话：", prop="mobile", :required="true")
         el-input.medium-el-input(v-model="formData.mobile")
       el-form-item(label="课程：", prop="curriculum_ids", :required="true")
         el-button.button(type="primary", size="mini", plain, @click="handleAddCurriculum") 选 择
         div {{curriculumNames}}
       el-form-item(label="班级：", prop="class_ids")
         el-button.button(type="primary", size="mini", plain, @click="handleAddClass") 选 择
         div {{classNames}}
     bottom-container
       el-button.button(type="primary", :loading="loading", @click="handleSave") 保 存
       el-button.button(@click="$router.back()") 取 消
     choose-class-dialog(ref="dlgChooseClass", @submit="handleChooseClass")
     choose-curriculum-dialog(ref="dlgChooseCurriculum", @submit="handleChooseCurriculum")
</template>

<script>
import { listCurriculumNameByIds } from '../../api/curriculum'
import { createTeacher, getTeacher, updateTeacher } from '../../api/teacher'
import ChooseClassDialog from '../../components/choose-dialog/ChooseClassDialog'
import ChooseCurriculumDialog from './ChooseCurriculumDialog'
import { listClassNameByIds } from '../../api/class'

export default {
  name: 'Form',
  components: {
    ChooseClassDialog,
    ChooseCurriculumDialog
  },
  data () {
    const mobileValidator = (rule, value, callback) => {
      let numReg = /^[0-9]{11}$/
      if (value === '') {
        callback(new Error('请输入手机号'))
        return
      }
      if (!numReg.test(value)) {
        callback(new Error('请输入11位数字'))
        return
      }
      callback()
    }
    return {
      loading: false,
      dialogVisible: false,
      formData: {
        name: '',
        sex: 1,
        mobile: '',
        curriculum_ids: [],
        class_ids: []
      },
      formRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mobile: [
          { validator: mobileValidator, trigger: 'blur' }
        ],
        curriculum_ids: [
          { required: true, message: '请选择课程', trigger: 'blur' }
        ],
        class_ids: [
          { required: true, message: '请选择班级', trigger: 'blur' }
        ]
      },
      curriculumNames: '',
      classNames: ''
    }
  },
  computed: {
    isEdit () {
      if (this.$route.params.id) {
        return true
      }
      return false
    }
  },
  methods: {
    async initData () {
      if (this.$route.params.id) {
        const res = await getTeacher({ id: this.$route.params.id })
        this.formData = res.data
        this.curriculumNames = this.R.map(item => item.name)(res.data.curriculum || []).join('，')
        this.classNames = this.R.map(item => item.name)(res.data.class || []).join('，')
      }
    },
    handleAddCurriculum () {
      this.$refs.dlgChooseCurriculum && this.$refs.dlgChooseCurriculum.show(this.formData.curriculum_ids)
    },
    handleAddClass () {
      this.$refs.dlgChooseClass && this.$refs.dlgChooseClass.show(this.formData.class_ids)
    },
    async handleChooseCurriculum (ids) {
      this.formData.curriculum_ids = ids
      const res = await listCurriculumNameByIds(ids)
      this.curriculumNames = res.data.data.join('，')
    },
    async handleChooseClass (ids) {
      this.formData.class_ids = ids
      const res = await listClassNameByIds(ids)
      this.classNames = res.data.data.join('，')
    },
    handleSave () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            if (this.isEdit) {
              await updateTeacher(this.$route.params.id, this.formData)
            } else {
              await createTeacher(this.formData)
            }
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          } finally {
            this.loading = false
            this.$router.back()
          }
        }
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
