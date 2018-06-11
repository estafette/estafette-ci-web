import Vue from 'vue'
import Router from 'vue-router'
import Pipelines from '@/components/Pipelines'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/pipelines',
      name: 'Pipelines',
      component: Pipelines
    },
    {
      path: '/',
      name: 'Pipelines',
      component: Pipelines
    }
  ]
})
