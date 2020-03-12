import Vue from 'vue'
import Router from 'vue-router'
import './plugins/axios'
import './plugins/element.js'
import App from './App.vue'
import router from './router/index'
import store from './store'
import AxiosError from './plugins/axios-error'
import FilterPlugin from 'src/filter'
import RamdaPlugin from './plugins/ramda'
import GlobalPlugin from './plugins/global'
import AuthPlugin from './plugins/auth'
import VueLazyLoad from 'vue-lazyload'
import errorImg from './assets/images/empty-image.png'
import loadingImg from './assets/images/loading.gif'
import BottomContainer from 'src/components/bottom-container/Index'
import 'normalize.css'

Vue.config.productionTip = false

Vue.use(AxiosError)
Vue.use(FilterPlugin)
Vue.use(AxiosError)
Vue.use(RamdaPlugin)
Vue.use(GlobalPlugin)
Vue.use(AuthPlugin)
Vue.use(FilterPlugin)
Vue.component('bottom-container', BottomContainer)
Vue.$router = router
Vue.$store = store
Vue.use(VueLazyLoad, {
  error: errorImg,
  loading: loadingImg
})
Vue.$router = router
Vue.$store = store

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
