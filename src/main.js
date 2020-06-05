// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import store from './store'
import './filters'
import { VBTooltip } from 'bootstrap-vue'
// Note: Vue automatically prefixes the directive name with 'v-'
Vue.directive('b-tooltip', VBTooltip)
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
    store.dispatch('user/logout')
    return
  }
  return Promise.reject(error)
})

var handleLoginRedirect = (to, next) => {
  var user = store.state.user.me
  var isAuthenticated = user && user.active

  // by default all routes need authentication unless they have meta: { allowedWithoutAuth: true }
  if (to.matched.some(record => !record.meta.allowedWithoutAuth) && !isAuthenticated) {
    next({ name: 'Login', query: { returnURL: to.fullPath } })
  } else {
    next()
  }
}

// check if user is authenticated
router.beforeEach((to, from, next) => {
  // check store to see if user is logged on
  if (!store.state.user.loaded) {
    console.log('user is not loaded yet')
    store.dispatch('user/load').then(() => {
      handleLoginRedirect(to, next)
    })
  } else {
    console.log('user is already loaded')
    handleLoginRedirect(to, next)
  }
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
