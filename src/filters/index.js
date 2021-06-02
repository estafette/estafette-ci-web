import Vue from 'vue'

import gitHash from './gitHash'
import bootstrapClass from './bootstrapClass'
import bootstrapVariant from './bootstrapVariant'
import animatedProgressBar from './animatedProgressBar'
import buildProgressBarValue from './buildProgressBarValue'
import buildProgressBarLabel from './buildProgressBarLabel'
import releaseProgressBarValue from './releaseProgressBarValue'
import releaseProgressBarLabel from './releaseProgressBarLabel'
import botProgressBarValue from './botProgressBarValue'
import botProgressBarLabel from './botProgressBarLabel'
import defaultValue from './defaultValue'
import capitalize from './capitalize'
import colorDurationClass from './colorDurationClass'
import formatDatetime from './formatDatetime'
import moment from './moment'
import formatDuration from './formatDuration'
import formatBytes from './formatBytes'
import formatNumber from './formatNumber'
import splitCamelcase from './splitCamelcase'

Vue.filter('gitHash', gitHash)
Vue.filter('bootstrapClass', bootstrapClass)
Vue.filter('bootstrapVariant', bootstrapVariant)
Vue.filter('animatedProgressBar', animatedProgressBar)
Vue.filter('buildProgressBarValue', buildProgressBarValue)
Vue.filter('buildProgressBarLabel', buildProgressBarLabel)
Vue.filter('releaseProgressBarValue', releaseProgressBarValue)
Vue.filter('releaseProgressBarLabel', releaseProgressBarLabel)
Vue.filter('botProgressBarValue', botProgressBarValue)
Vue.filter('botProgressBarLabel', botProgressBarLabel)
Vue.filter('defaultValue', defaultValue)
Vue.filter('capitalize', capitalize)
Vue.filter('colorDurationClass', colorDurationClass)
Vue.filter('formatDatetime', formatDatetime)
Vue.filter('moment', moment)
Vue.filter('formatDuration', formatDuration)
Vue.filter('formatBytes', formatBytes)
Vue.filter('formatNumber', formatNumber)
Vue.filter('splitCamelcase', splitCamelcase)
