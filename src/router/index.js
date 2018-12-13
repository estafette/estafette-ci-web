import Vue from 'vue'
import Router from 'vue-router'
import Pipelines from '@/components/Pipelines'
import Config from '@/components/Config'
import Statistics from '@/components/Statistics'
import StatisticsCounters from '@/components/StatisticsCounters'
import StatisticsRankings from '@/components/StatisticsRankings'
import StatisticsTrends from '@/components/StatisticsTrends'
import PipelineDetails from '@/components/PipelineDetails'
import PipelineBuilds from '@/components/PipelineBuilds'
import PipelineBuildDetails from '@/components/PipelineBuildDetails'
import PipelineBuildLogs from '@/components/PipelineBuildLogs'
import PipelineBuildManifest from '@/components/PipelineBuildManifest'
import PipelineStatistics from '@/components/PipelineStatistics'
import PipelineReleases from '@/components/PipelineReleases'
import PipelineReleaseDetails from '@/components/PipelineReleaseDetails'
import PipelineReleaseLogs from '@/components/PipelineReleaseLogs'
import Manifest from '@/components/Manifest'
import ManifestGenerator from '@/components/ManifestGenerator'
import ManifestValidator from '@/components/ManifestValidator'
import SecretEncrypter from '@/components/SecretEncrypter'

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
          props: (route) => ({ query: route.query }),
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
      path: '/pipelines/:repoSource/:repoOwner/:repoName/builds/:id',
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
      path: '/pipelines/:repoSource/:repoOwner/:repoName/releases/:releaseID',
      name: 'PipelineReleaseDetails',
      props: true,
      component: PipelineReleaseDetails,
      children: [
        {
          path: 'logs',
          name: 'PipelineReleaseLogs',
          props: true,
          component: PipelineReleaseLogs
        }
      ]
    },
    {
      path: '/config',
      name: 'Config',
      props: true,
      component: Config
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics,
      props: true,
      redirect: { name: 'StatisticsCounters' },
      children: [
        {
          path: 'counters',
          name: 'StatisticsCounters',
          props: true,
          component: StatisticsCounters
        },
        {
          path: 'rankings',
          name: 'StatisticsRankings',
          props: true,
          component: StatisticsRankings
        },
        {
          path: 'trends',
          name: 'StatisticsTrends',
          props: true,
          component: StatisticsTrends
        }
      ]
    },
    {
      path: '/manifest',
      name: 'Manifest',
      component: Manifest,
      props: true,
      redirect: { name: 'ManifestGenerator' },
      children: [
        {
          path: 'generate',
          name: 'ManifestGenerator',
          props: true,
          component: ManifestGenerator
        },
        {
          path: 'validate',
          name: 'ManifestValidator',
          props: true,
          component: ManifestValidator
        },
        {
          path: 'encrypt',
          name: 'SecretEncrypter',
          props: true,
          component: SecretEncrypter
        }
      ]
    },
    {
      path: '/logs/:repoSource/:repoOwner/:repoName/:repoBranch/:id',
      name: 'LegacyLogs',
      redirect: { name: 'PipelineBuildLogs' }
    }
  ]
})
