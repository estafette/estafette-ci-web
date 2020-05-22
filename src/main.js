// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import store from './store'
import './filters'

Vue.use(VueAxios, axios)

// intercept api requests to add X-Requested-With: XMLHttpRequest header to have IAP return 401 instead of 302
Vue.axios.interceptors.request.use(
  config => {
    config.headers = { 'X-Requested-With': 'XMLHttpRequest' }
    return config
  },
  error => Promise.reject(error)
)

// intercept api responses to check for 401 caused by iap session timeout and reload entire vue app
Vue.axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (typeof error.response !== 'undefined' && error.response.status === 401) {
    // open session refresh modal
    store.commit('modal/show')
    return
  }
  return Promise.reject(error)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
