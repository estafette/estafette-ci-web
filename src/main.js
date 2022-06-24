// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import './filters'
import { VBTooltip } from 'bootstrap-vue'
// Note: Vue automatically prefixes the directive name with 'v-'
Vue.directive('b-tooltip', VBTooltip)

Vue.axios = axios
Vue.$http = axios
Vue.prototype.axios = axios
Vue.prototype.$http = axios

// intercept api requests to add X-Requested-With: XMLHttpRequest header to have IAP return 401 instead of 302
Vue.axios.interceptors.request.use(
  config => {
    if (process.env.ADD_TRAILING_SLASH_TO_API_REQUEST) {
      // split url in path and query
      const url = config.url
      const urlParts = url.split('?')

      // check if path already ends with a trailing slash
      if (urlParts.length > 0 && urlParts[0][urlParts[0].length - 1] !== '/') {
        // if not add a trailing slash
        urlParts[0] += '/'

        config.url = urlParts.join('?')
      }
    }

    // add header to ensure it's treated as an XMLHttpRequest
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
  if (error.response && error.response.data) {
    if (typeof error.response.data.error === 'object') {
      return Promise.reject(error.response.data.error)
    } else {
      return Promise.reject(new Error(error.response.data.error))
    }
  } else {
    return Promise.reject(new Error(error.message))
  }
})

// redirect to login page when user gets logged out
store.watch((state) => state.user.me, (to, from) => {
  if (!to && from) {
    if (from.currentProvider) {
      let href = '/api/auth/login/' + from.currentProvider + '?returnURL=' + router.currentRoute.fullPath
      if (from.currentOrganization) {
        href += '&organization=' + from.currentOrganization
      }
      window.location.href = href
    } else {
      router.replace({ name: 'Login', query: { returnURL: router.currentRoute.fullPath } })
    }
  }
})

const handleLoginRedirect = (to, next) => {
  const user = store.state.user.me
  const isAuthenticated = user && user.active

  // if user tries to navigate to a route it does not have the required role for, disallow
  if (to.meta && to.meta.requiredRole && (!user || !user.active || !user.roles || !user.roles.includes(to.meta.requiredRole))) {
    next(false)
    return
  }

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

  // check store to see if user is logged on
  if (!store.state.user.loaded) {
    store.dispatch('user/load').then(() => {
      handleLoginRedirect(to, next)
    })
  } else {
    handleLoginRedirect(to, next)
  }
})

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    // set page title by getting the name from each match along the route
    document.title = 'Estafette | ' + to.matched.reduce((title, r) => {
      if (title && title !== '') {
        title += ' > '
      }

      if (r.meta && r.meta.title) {
        title += typeof r.meta.title === 'function' ? r.meta.title(to) : r.meta.title
      } else if (r.meta && r.meta.text) {
        title += r.meta.text
      } else {
        title += r.name
      }

      return title.toLocaleLowerCase()
    }, '')
  })
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
