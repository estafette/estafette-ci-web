// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueAnalytics from 'vue-analytics'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import moment from 'moment'
import 'moment/locale/en-il'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

moment.locale('en-il')

Vue.use(VueAnalytics, {
  id: 'UA-464018-10',
  router
})

// filter to trim a git commit revision to 6 chars
Vue.filter('gitHash', function (value) {
  if (!value) {
    return ''
  }
  value = value.toString()
  if (value.length !== 40) {
    return value
  }
  return value.substring(0, 6)
})

Vue.filter('bootstrapClass', function (value, prefix) {
  if (!value) {
    return prefix + '-light'
  }
  value = value.toString().toLowerCase()
  if (value === 'succeeded' || value === 'success') {
    return prefix + '-success'
  }
  if (value === 'running' || value === 'warning') {
    return prefix + '-warning'
  }
  if (value === 'failed' || value === 'danger') {
    return prefix + '-danger'
  }
  if (value === 'skipped' || value === 'secondary') {
    return prefix + '-secondary'
  }
  if (value === 'canceling') {
    return prefix + '-secondary'
  }
  if (value === 'canceled') {
    return prefix + '-secondary'
  }
  if (value === 'pending') {
    return prefix + '-info'
  }
  if (value === 'all' || value === 'primary') {
    return prefix + '-primary'
  }
  return prefix + '-light'
})

Vue.filter('bootstrapTextClass', function (value) {
  if (!value) {
    return 'text-body'
  }
  value = value.toString().toLowerCase()
  if (value === 'succeeded' || value === 'success') {
    return 'text-white'
  }
  if (value === 'running' || value === 'warning') {
    return 'text-body'
  }
  if (value === 'failed' || value === 'danger') {
    return 'text-white'
  }
  if (value === 'skipped' || value === 'secondary') {
    return 'text-white'
  }
  if (value === 'canceling') {
    return 'text-white'
  }
  if (value === 'canceled') {
    return 'text-white'
  }
  if (value === 'all' || value === 'primary') {
    return 'text-white'
  }
  return 'text-body'
})

Vue.filter('bootstrapMutedTextClass', function (value) {
  if (!value) {
    return 'text-black-50'
  }
  value = value.toString().toLowerCase()
  if (value === 'succeeded' || value === 'success') {
    return 'text-white-50'
  }
  if (value === 'running' || value === 'warning') {
    return 'text-black-50'
  }
  if (value === 'failed' || value === 'danger') {
    return 'text-white-50'
  }
  if (value === 'skipped' || value === 'secondary') {
    return 'text-white-50'
  }
  if (value === 'canceling') {
    return 'text-white-50'
  }
  if (value === 'canceled') {
    return 'text-white-50'
  }
  if (value === 'all' || value === 'primary') {
    return 'text-white-50'
  }
  return 'text-black-50'
})

Vue.filter('stripedProgressBarClass', function (value) {
  if (!value) {
    return ''
  }
  value = value.toString().toLowerCase()
  if (value === 'pending' || value === 'running' || value === 'canceling') {
    return 'progress-bar-striped progress-bar-animated'
  }
  return ''
})

Vue.filter('defaultValue', function (value, defaultValue) {
  if (!value) {
    return defaultValue
  }
  return value
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('colorDurationClass', function (value) {
  if (value === null) {
    return ''
  }

  if (value <= 0) {
    return ''
  }

  var seconds = Math.floor(value / Math.pow(10, 9))
  if (seconds > 300) {
    return 'text-danger'
  }
  if (seconds > 120) {
    return 'text-warning'
  }

  return 'text-success'
})

Vue.filter('formatDatetime', function (value) {
  if (value === null) {
    return ''
  }

  if (!moment(value).isSame(moment(), 'year')) {
    return moment(value).format('D MMM YYYY [at] H:mm')
  }

  if (!moment(value).isSame(moment(), 'day')) {
    return moment(value).format('D MMM [at] H:mm')
  }

  // other day
  return moment(value).format('[today] [at] H:mm')
})

Vue.filter('moment', function (value, format) {
  return moment(value).format(format)
})

Vue.filter('formatDuration', function (value) {
  if (value === null) {
    return ''
  }

  if (value < 0) {
    return ''
  }

  var days = Math.floor(value / (24 * 3600 * Math.pow(10, 9)))
  var remainderForHours = value % (24 * 3600 * Math.pow(10, 9))
  var hours = Math.floor(remainderForHours / (3600 * Math.pow(10, 9)))
  var remainderForMinutes = remainderForHours % (3600 * Math.pow(10, 9))
  var minutes = Math.floor(remainderForMinutes / (60 * Math.pow(10, 9)))
  var remainderForSeconds = remainderForMinutes % (60 * Math.pow(10, 9))
  var seconds = Math.floor(remainderForSeconds / Math.pow(10, 9))
  var remainderForMilliseconds = remainderForSeconds % Math.pow(10, 9)

  var deciSeconds = Math.floor(remainderForMilliseconds / Math.pow(10, 8))

  var formattedString = ''

  if (days > 0) {
    formattedString += `${days}d`
  }
  if (hours > 0 || days > 0) {
    formattedString += `${hours}h`
  }
  if (minutes > 0 || hours > 0 || days > 0) {
    formattedString += `${minutes}m`
  }
  if ((deciSeconds > 0 || seconds > 0) && minutes === 0 && hours === 0) {
    formattedString += `${seconds}.${deciSeconds}s`
  } else if (seconds > 0 || minutes > 0 || hours > 0 || days > 0) {
    formattedString += `${seconds}s`
  }

  if (formattedString === '') {
    formattedString = '-'
  }

  return formattedString
})

Vue.filter('formatBytes', function (value) {
  if (!value) {
    return ''
  }

  if (value <= 0) {
    return ''
  }

  var gigabytes = Math.floor(value / Math.pow(2, 30))
  var remainderForMegabytes = value % Math.pow(2, 30)
  var megabytes = Math.floor(remainderForMegabytes / Math.pow(2, 20))

  var formattedString = ''

  if (gigabytes > 0) {
    var decigigabytes = Math.floor(10 * remainderForMegabytes / Math.pow(2, 30))
    formattedString += `${gigabytes}.${decigigabytes}GB`
  }
  if (megabytes > 0 && gigabytes === 0) {
    formattedString += `${megabytes}MB`
  }

  return formattedString
})

Vue.filter('formatNumber', function (value) {
  if (value === null) {
    return ''
  }

  return new Intl.NumberFormat('de-DE').format(value)
})

Vue.filter('splitCamelcase', function (value) {
  if (!value) {
    return ''
  }

  return value.replace(/([a-z])([A-Z])/g, '$1 $2')
})

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    sessionRefreshModalActive: false
  },
  mutations: {
    showModal (state) {
      if (!state.sessionRefreshModalActive) {
        state.sessionRefreshModalActive = true
      }
    },
    hideModal (state) {
      if (state.sessionRefreshModalActive) {
        state.sessionRefreshModalActive = false
      }
    }
  }
})

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
    store.commit('showModal')
    return
  }
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
