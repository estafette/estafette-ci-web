// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Strip the leading `'./` and extension from the filename
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
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
  if (value === 'succeeded') {
    return prefix + '-success'
  }
  if (value === 'running') {
    return prefix + '-warning'
  }
  if (value === 'failed') {
    return prefix + '-danger'
  }
  if (value === 'skipped') {
    return prefix + '-secondary'
  }
  if (value === 'all') {
    return prefix + '-primary'
  }
  return prefix + '-light'
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

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

// intercept api responses to check for 401 caused by iap session timeout and reload entire vue app
Vue.axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  if (error.response.status === 401) {
    location.reload()
    return
  }
  return Promise.reject(error)
})

Vue.use(BootstrapVue)
Vue.use(Vuex)

// use vue-moment for rendering timestamps
const moment = require('moment')
require('moment/locale/en-il')
Vue.use(require('vue-moment'), {
  moment
})

Vue.use(VueAnalytics, {
  id: 'UA-464018-10',
  router
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
