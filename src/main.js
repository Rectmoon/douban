// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/lib/styles/reset.styl'
import '@/lib/styles/index.styl'
import '@/lib/styles/animate.css'
import store from '@/store'
import util from '@/lib/js/util'
Vue.config.productionTip = false
Vue.prototype.util = util
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
