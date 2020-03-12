import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import me from './modules/me'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    me
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
