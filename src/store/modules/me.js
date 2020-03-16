import { UPDATE_ME } from '../types'

const state = {
  me: null
}

const getters = {
  isLogin: state => {
    if (state.me && state.me.id) {
      return true
    }
    return false
  },
  uc: state => {
    return state.me
  },
  isSuper: state => {
    if (state.me && state.me.type === 1) {
      return true
    } else {
      return false
    }
  }
}

const mutations = {
  [UPDATE_ME] (state, me) {
    state.me = me
  }
}

export default {
  state,
  getters,
  mutations
}
