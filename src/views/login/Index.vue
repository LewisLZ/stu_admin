<template lang="pug">
  div.background
    div.head
      div.head-box
        div.title 学生成绩管理系统
    div.body
      div.login-container
        el-form(ref="formLogin", :model="form", :rules="rules", labelPosition="left", labelWidth="0")
          div.title
          el-form-item(prop="mobile")
            el-input(type="text", placeholder="用户名", v-model="form.mobile", clearable)
          el-form-item(prop="passwd")
            el-input(placeholder="登录密码", v-model="form.passwd", show-password, clearable)
          el-form-item(style="border: none")
            el-button.loginBtn(type="primary", @click="handleLogin", :loading="loading") 登 录
</template>

<script>
import { login } from 'src/api/auth'
import logoImage from 'src/assets/images/logo.png'

export default {
  data () {
    return {
      loading: false,
      logoImage: logoImage,
      form: {
        mobile: '',
        passwd: ''
      },
      rules: {
        mobile: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        passwd: [
          { required: true, trigger: 'blur', message: '请输入登录密码' }
        ]
      }
    }
  },
  methods: {
    async handleLogin () {
      this.$refs.formLogin.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            await login(this.form)
            this.$router.replace({
              name: 'Curriculum'
            })
          } finally {
            this.loading = false
          }
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>

  $bg-color: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .background {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100%;
    background: #409EFF;
  }

  .body {
    width: 100%;
    position: fixed;
    height: 92%;
    top: 22%;
  }

  .head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    background: rgba(245, 247, 250, 0.4);
    z-index: 1;
    .head-box {
      position: absolute;
      width: 73%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      line-height: 70px;
      left: 50%;
      transform: translate(-50%);
      color: #ffffff;
      min-width: 500px;
      .title {
        height: 22px;
        font-size: 22px;
        line-height: 22px;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
  }

  .login-container {
    width: 500px;
    height: 400px;
    background-color: #ffffff;
    margin-right: auto;
    margin-left: auto;
    margin-top: 5%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    position: relative;

    .el-form {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      left: 0;
      right: 0;
      width: 400px;
      height: 320px;
      margin-left: auto;
      margin-right: auto;
      top: 45%;
      transform: translate(0, -60%);
    }

    .title {
      width: 72px;
      height: 44px;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .el-form-item {
      border: 1px solid #DCDFE6;
      border-radius: 5px;
      color: #454545;
    }
    .el-input {
      display: inline-block;
    }
    .loginBtn {
      position: absolute;
      left: 50%;
      font-size: 16px;
      transform: translate(-50%);
      width: 400px;
      height: 50px;
    }
  }

  .bottom {
    flex-direction: column;
    flex-wrap: wrap;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: flex-end;
    bottom: 10px;
    height: 48px;
    width: 760px;
    align-items: center;
    .company {
      height: 14px;
      font-size: 12px;
      color: #ffffff;
      line-height: 14px;
    }
  }
</style>

<style lang="scss">
  $light_gray: #eee;

  .login-container {
    input {
      background: rgba(255, 255, 255, 0.50);
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      height: 47px;
    }

  }

</style>
