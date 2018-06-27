import Vue from 'vue'
import Router from 'vue-router'
import Pipelines from '@/components/Pipelines'
import Targets from '@/components/Targets'
import Statistics from '@/components/Statistics'
import PipelineDetails from '@/components/PipelineDetails'
import PipelineBuilds from '@/components/PipelineBuilds'
import PipelineBuildDetails from '@/components/PipelineBuildDetails'
import PipelineBuildLogs from '@/components/PipelineBuildLogs'
import PipelineBuildManifest from '@/components/PipelineBuildManifest'
import PipelineStatistics from '@/components/PipelineStatistics'
import PipelineReleases from '@/components/PipelineReleases'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'Pipelines' }
    },
    {
      path: '/pipelines',
      name: 'Pipelines',
      component: Pipelines,
      props: (route) => ({ query: route.query })
    },
    {
      path: '/pipelines/:repoSource/:repoOwner/:repoName',
      name: 'PipelineDetails',
      props: true,
      component: PipelineDetails,
      redirect: { name: 'PipelineBuilds' },
      children: [
        {
          path: 'builds',
          name: 'PipelineBuilds',
          props: true,
          component: PipelineBuilds
        },
        {
          path: 'statistics',
          name: 'PipelineStatistics',
          props: true,
          component: PipelineStatistics
        },
        {
          path: 'releases',
          name: 'PipelineReleases',
          props: true,
          component: PipelineReleases
        }
      ]
    },
    {
      path: '/pipelines/:repoSource/:repoOwner/:repoName/builds/:repoRevision',
      name: 'PipelineBuildDetails',
      props: true,
      component: PipelineBuildDetails,
      children: [
        {
          path: 'logs',
          name: 'PipelineBuildLogs',
          props: true,
          component: PipelineBuildLogs
        },
        {
          path: 'manifest',
          name: 'PipelineBuildManifest',
          props: true,
          component: PipelineBuildManifest
        }
      ]
    },
    {
      path: '/targets',
      name: 'Targets',
      component: Targets
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    }
  ]
})