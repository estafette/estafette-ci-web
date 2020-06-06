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

// intercept api responses to check for 401 caused by expired jwt
Vue.axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        store.dispatch('user/logout')
        break
    }
  }

  return Promise.reject(new Error(error.response.data.error || error.message))
})

// redirect to login page when user gets logged out
store.watch((state) => state.user.me, (to, from) => {
  if (!to && from) {
    if (from.currentProvider) {
      window.location.href = '/api/auth/login/' + from.currentProvider + '?returnURL=' + router.currentRoute.fullPath
    } else {
      router.replace({ name: 'Login', query: { returnURL: router.currentRoute.fullPath } })
    }
  }
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
  // if already on login page don't try to load user
  if (to.name === 'Login') {
    next()
    return
  }

  // if user tries to navigate to a route it does not have the required role for, disallow
  if (to.meta && to.meta.requiredRole && (!store.state.user.me || !store.state.user.me.active || !store.state.user.me.roles || !store.state.user.me.roles.includes(to.meta.requiredRole))) {
    next(false)
    return
  }

  // check store to see if user is logged on
  if (!store.state.user.loaded) {
    store.dispatch('user/load').then(() => {
      handleLoginRedirect(to, next)
    })
  } else {
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
