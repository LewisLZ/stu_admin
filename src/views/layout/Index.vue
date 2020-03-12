<template lang="pug">
  div
    div.top-wrapper
      div.logo(@click="showVersion") 学生成绩管理系统
      div(style="margin: 0 20px")
        el-dropdown(@command="handleMenuCommand")
          span.dropdown-link
            | {{ profileName }}
            i.el-icon-arrow-down.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(command="password") 修改密码
            el-dropdown-item(command="logout") 退出登录
    div.side-wrapper
      div
        side.side-content
    div.body-wrapper
      div
        div#app-content.content-wrapper(ref="routerDiv")
          div.breadcrumb-wrapper
            div.items-wrapper
              el-breadcrumb(v-if="showBreadcrumb")
                template(v-for!="item in breadcrumbItems")
                  el-breadcrumb-item(:to="item.to", :replace="!!item.replace") {{ item.text === '审批中心' ? '发起审批' : item.text }}
            div.desc-wrapper
              div {{ breadcrumbDesc }}
          div.mid-wrapper
            router-view
    change-password-dialog(ref="dlgChangePassword")
</template>

<script>
import Side from './Side'
import Vue from 'vue'
import { UPDATE_ME } from 'src/store/types'
import ChangePasswordDialog from 'src/views/layout/dialog/ChangePasswordDialog.vue'
import { clearAuthCookie } from 'src/service/auth/index'
import { dateFormat } from 'src/util/format'

export default {
  components: {
    Side,
    ChangePasswordDialog
  },
  data () {
    return {
      showBreadcrumb: true,
      breadcrumbItems: [],
      breadcrumbDesc: '',
      dataList: {
        data: []
      },
      visibleData: false,
      messageCount: 0
    }
  },
  methods: {
    async autoUpdateBreadcrumb () {
      if (!this.$route.meta.customBreadcrumb) {
        if (this.$route.meta.breadcrumbItems) {
          this.updateBreadcrumb(this.$route.meta.breadcrumbItems)
        } else {
          this.updateBreadcrumb([{
            text: this.$route.meta.title ? this.$route.meta.title : this.$route.name
          }])
        }
        this.updateBreadcrumbDescText(this.$route.meta.breadcrumbDesc || '')
      }
    },
    async updateBreadcrumb (breadcrumbItems) {
      this.breadcrumbItems = breadcrumbItems
      this.showBreadcrumb = false
      await this.$nextTick()
      this.showBreadcrumb = true
    },
    updateBreadcrumbDescText (desc) {
      this.breadcrumbDesc = desc
    },
    handleMenuCommand (command) {
      switch (command) {
        case 'password':
          this.$refs.dlgChangePassword.show()
          break
        case 'logout':
          this.logout()
      }
    },
    async logout () {
      Vue.$store.commit(UPDATE_ME, null)
      clearAuthCookie()
      Vue.$router.replace({
        name: 'Login'
      })
    },
    handleMsgShow () {
      this.$refs.notice.refreshList(true)
    },
    changeVisibleData (data) {
      this.visibleData = data
    },
    showVersion () {
      if (!this.clickCount) {
        this.clickCount = 0
      }
      this.clickCount += 1
      if (this.clickCount >= 5) {
        if (!process.version) {
          alert('开发版')
        } else {
          let versionText = `${process.version.CODE}.${dateFormat(process.version.BUILD_TIME, 'MMDDHHmm')}`
          if (process.env.RELEASE_ENV && process.env.RELEASE_ENV !== 'prod') {
            versionText += process.env.RELEASE_ENV
          }
          alert(versionText)
        }
      }
      if (this.tmrClickCount) {
        clearTimeout(this.tmrClickCount)
      }
      this.tmrClickCount = setTimeout(() => {
        this.clickCount = 0
      }, 1000)
    }
  },
  computed: {
    profileName () {
      return this.$name
    }
  },
  watch: {
    $route () {
      this.$refs.routerDiv.scrollTop = 0
      this.autoUpdateBreadcrumb()
    }
  },
  mounted () {
  },
  created () {
    this.autoUpdateBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
  $content-padding: 20px;
  $header-height: 70px;

  .top-wrapper {
    position: fixed;
    display: flex;
    align-items: center;
    height: $header-height;
    width: 100%;
    background: #F5F7FA;
    box-sizing: border-box;
    z-index: 1;
    border-bottom: solid 1px #E4E7ED;

    .dropdown-link {
      cursor: pointer;
      color: #303133;
    }
    .el-icon-bell {
      font-size: 22px;
      cursor: pointer;
      color: #303133;
    }

    & > :nth-child(1) {
      flex: 1;
      padding-left: $content-padding + 15;
      font-size: 20px;
      color: #303133;
    }

    & > :nth-child(2) {
      width: 200px;
      text-align: right;
      padding-right: $content-padding;
    }

  }

  .side-wrapper {
    position: fixed;
    top: $header-height;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    width: $side-width;
    z-index: 100;
    background: #f0f2f5;

    & > div {
      position: relative;
      width: $side-width - 10;
      height: 100%;
      overflow-x: hidden;

      .side-content {
        transition: all .28s ease-out;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-x: hidden;
        overflow-y: scroll;
      }
    }
  }

  .breadcrumb-wrapper {
    height: $header-height;
    overflow: hidden;
    padding-top: 20px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding-left: $content-padding;
    padding-right: $content-padding;
    .desc-wrapper {
      position: relative;
      margin-left: 10px;
      height: 28px;
      color: #606266;
      font-size: 14px;
      flex: 1;

      & > div {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: auto;
        padding-bottom: 3px;
      }
    }
  }

  .body-wrapper {
    position: absolute;
    width: 100%;
    top: $header-height;
    bottom: 0;

    & > div {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      width: auto;
      background: #ffffff;
    }

    .content-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: auto;
      left: $side-width;

      overflow-y: auto;
    }

    .mid-wrapper {
      padding: $content-padding;
    }

  }

</style>
