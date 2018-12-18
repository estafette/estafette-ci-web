import Vue from 'vue'
import Router from 'vue-router'

const Pipelines = () => import(/* webpackChunkName: "pipelines" */ '@/components/Pipelines')
const PipelineDetails = () => import(/* webpackChunkName: "pipeline-details" */ '@/components/PipelineDetails')
const PipelineBuilds = () => import(/* webpackChunkName: "pipeline-builds" */ '@/components/PipelineBuilds')
const PipelineBuildDetails = () => import(/* webpackChunkName: "pipeline-build-details" */ '@/components/PipelineBuildDetails')
const PipelineBuildLogs = () => import(/* webpackChunkName: "pipeline-build-logs" */ '@/components/PipelineBuildLogs')
const PipelineBuildManifest = () => import(/* webpackChunkName: "pipeline-build-manifest" */ '@/components/PipelineBuildManifest')
const PipelineStatistics = () => import(/* webpackChunkName: "pipeline-statistics" */ '@/components/PipelineStatistics')
const PipelineReleases = () => import(/* webpackChunkName: "pipeline-releases" */ '@/components/PipelineReleases')
const PipelineReleaseDetails = () => import(/* webpackChunkName: "pipeline-release-details" */ '@/components/PipelineReleaseDetails')
const PipelineReleaseLogs = () => import(/* webpackChunkName: "pipeline-release-logs" */ '@/components/PipelineReleaseLogs')

const Config = () => import(/* webpackChunkName: "config" */ '@/components/Config')

const Statistics = () => import(/* webpackChunkName: "statistics" */ '@/components/Statistics')
const StatisticsCounters = () => import(/* webpackChunkName: "statistics-counters" */ '@/components/StatisticsCounters')
const StatisticsRankings = () => import(/* webpackChunkName: "statistics-rankings" */ '@/components/StatisticsRankings')
const StatisticsTrends = () => import(/* webpackChunkName: "statistics-trends" */ '@/components/StatisticsTrends')

const Manifest = () => import(/* webpackChunkName: "manifest" */ '@/components/Manifest')
const ManifestGenerator = () => import(/* webpackChunkName: "manifest-generator" */ '@/components/ManifestGenerator')
const ManifestValidator = () => import(/* webpackChunkName: "manifest-validator" */ '@/components/ManifestValidator')
const SecretEncrypter = () => import(/* webpackChunkName: "secret-encrypter" */ '@/components/SecretEncrypter')

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
