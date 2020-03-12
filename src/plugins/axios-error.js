import Vue from 'vue'
import { UPDATE_ME } from 'src/store/types'

const COMMON_ERROR_MESSAGE = '查询失败'
const NET_CODE_401_ERROR_MSG = '没有权限, 请重新登录'

const commonErrorHandler = (_, msg) => {
  Vue.prototype.$message({
    message: msg,
    type: 'error'
  })
  return true
}

const axiosErrorHandler = (err) => {
  if (err.response) {
    if (err.response.status === 401) {
      Vue.prototype.$message({
        message: NET_CODE_401_ERROR_MSG,
        type: 'error'
      })
      Vue.$store.commit(UPDATE_ME, null)
      Vue.$router.replace({
        name: 'Login'
      })
      return true
    } else if (err.response.status === 403) {
      Vue.$router.replace({
        name: 'Home'
      })
    }
    let msg = err.response.data
    if (!(err.config && err.config.fullError)) {
      if (!msg) {
        if (err.response.status === 500) {
          msg = '服务器错误'
        } else {
          msg = err.response.status
        }
      }
    }
    Vue.prototype.$message({
      message: msg,
      type: 'error',
      customClass: 'el-message-axios',
      showClose: true
    })
    return true
  }
}

const errorHandlers = [
  axiosErrorHandler,
  commonErrorHandler
]

const plugin = {

  install (vue, options = {}) {
    const handleError = (err, defaultMsg = COMMON_ERROR_MESSAGE) => {
      for (const item of errorHandlers) {
        if (item(err, defaultMsg)) {
          break
        }
      }
    }
    if (!vue.$my) {
      vue.$my = {
        handleError
      }
    } else {
      vue.$my.handleError = handleError
    }
    vue.mixin({
      created () {
        this.$my = vue.$my
      }
    })
  }

}

export default plugin
export const install = plugin.install
