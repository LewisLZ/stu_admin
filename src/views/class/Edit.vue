<template lang="pug">
   div
     el-form.bottom-outer-content(ref="form", :model="formData", :rules="formRules", labelWidth="150px")
       el-form-item(label="姓名：", prop="name")
         el-input.medium-el-input(v-model="formData.name")
       el-form-item(label="性别：", prop="sex", :required="true")
         el-radio-group(v-model="formData.sex")
           el-radio(:label="1") 男
           el-radio(:label="2") 女
       el-form-item(label="电话：", prop="mobile")
         el-input.medium-el-input(v-model="formData.mobile")
       el-form-item(label="出生日期：", prop="birthday")
         el-date-picker(v-model="formData.birthday", placeholder="选择日期", valueFormat="yyyy-MM-dd", format="yyyy 年 MM 月 dd 日")
       el-form-item(label="入学时间：", prop="intake_time")
         el-date-picker(v-model="formData.intake_time", placeholder="选择日期", valueFormat="yyyy-MM", format="yyyy 年 MM 月")
       el-form-item(label="地址：", prop="address")
         el-input.medium-el-input(v-model="formData.address")
       el-form-item(label="班级：", prop="class_id")
         el-button.button(type="primary", size="mini", plain, @click="handleAddClass") 选 择
         div {{formData.class_name}}
     bottom-container
       el-button.button(type="primary", :loading="loading", @click="handleSave") 保 存
       el-button.button(@click="$router.back()") 取 消
     choose-single-class-dialog(ref="dlgChooseClass", @submit="handleChooseClass")
</template>

<script>
import ChooseSingleClassDialog from '../../components/choose-dialog/ChooseSingleClassDialog'
import { listClassNameByIds } from '../../api/class'
import { createStudent, getStudent, updateStudent } from '../../api/student'

export default {
  name: 'Edit',
  components: {
    ChooseSingleClassDialog
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
        birthday: '',
        intake_time: '',
        address: '',
        class_id: 0,
        class_name: ''
      },
      formRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mobile: [
          { validator: mobileValidator, trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '出生日期不能为空', trigger: 'blur' }
        ],
        intake_time: [
          { required: true, message: '入学时间不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        class_id: [
          { required: true, message: '请选择班级', trigger: 'blur' }
        ]
      }
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
        const res = await getStudent({ id: this.$route.params.id })
        this.formData = res.data
      }
    },
    handleAddClass () {
      this.$refs.dlgChooseClass && this.$refs.dlgChooseClass.show(this.formData.class_id)
    },
    async handleChooseClass (id) {
      this.formData.class_id = id
      const res = await listClassNameByIds([id])
      this.formData.class_name = res.data.data.join('，')
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
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped>

</style>
