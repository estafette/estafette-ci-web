import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'

import Pipelines from '@/components/Pipelines'
import PipelineDetails from '@/components/PipelineDetails'
import PipelineOverview from '@/components/PipelineOverview'
import PipelineBuilds from '@/components/PipelineBuilds'
import PipelineBuildDetails from '@/components/PipelineBuildDetails'
import PipelineBuildLogs from '@/components/PipelineBuildLogs'
import PipelineBuildManifest from '@/components/PipelineBuildManifest'
import PipelineReleases from '@/components/PipelineReleases'
import PipelineTriggers from '@/components/PipelineTriggers'
import PipelineReleaseDetails from '@/components/PipelineReleaseDetails'
import PipelineReleaseLogs from '@/components/PipelineReleaseLogs'
import PipelineStatistics from '@/components/PipelineStatistics'

import Catalog from '@/components/Catalog'
import CatalogItemDetails from '@/components/CatalogItemDetails'
import CatalogItemOverview from '@/components/CatalogItemOverview'

import Create from '@/components/Create'
import ManifestGenerator from '@/components/ManifestGenerator'
import ManifestValidator from '@/components/ManifestValidator'
import SecretEncrypter from '@/components/SecretEncrypter'

import InsightsRankings from '@/components/InsightsRankings'
import Insights from '@/components/Insights'
import InsightsCounters from '@/components/InsightsCounters'
import InsightsTrends from '@/components/InsightsTrends'

import Configuration from '@/components/Configuration'
import Preferences from '@/components/Preferences'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { allowedWithoutAuth: true }
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
      redirect: { name: 'PipelineOverview' },
      children: [
        {
          path: 'overview',
          name: 'PipelineOverview',
          props: true,
          component: PipelineOverview
        },
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
        },
        {
          path: 'triggers',
          name: 'PipelineTriggers',
          props: true,
          component: PipelineTriggers
        },
        {
          path: 'encrypt',
          name: 'PipelineSecretEncrypter',
          props: true,
          component: SecretEncrypter
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
      path: '/catalog',
      name: 'Catalog',
      component: Catalog,
      props: (route) => ({ query: route.query })
    },
    {
      path: '/catalog/:repoSource/:repoOwner/:repoName',
      name: 'CatalogItemDetails',
      component: CatalogItemDetails,
      props: true,
      redirect: { name: 'CatalogItemOverview' },
      children: [
        {
          path: 'overview',
          name: 'CatalogItemOverview',
          props: true,
          component: CatalogItemOverview
        }
      ]
    },
    {
      path: '/config',
      redirect: { name: 'Configuration' }
    },
    {
      path: '/configuration',
      name: 'Configuration',
      props: true,
      component: Configuration
    },
    {
      path: '/preferences',
      name: 'Preferences',
      props: true,
      component: Preferences
    },
    {
      path: '/admin',
      name: 'Admin',
      props: true,
      component: () => import('../components/Admin.vue'),
      meta: { requiredRole: 'administrator' },
      children: [
        {
          path: 'users',
          name: 'AdminUsers',
          props: true,
          component: () => import('../components/AdminUsers.vue'),
          meta: { requiredRole: 'administrator' }
        },
        {
          path: 'groups',
          name: 'AdminGroups',
          props: true,
          component: () => import('../components/AdminGroups.vue'),
          meta: { requiredRole: 'administrator' }
        },
        {
          path: 'organizations',
          name: 'AdminOrganizations',
          props: true,
          component: () => import('../components/AdminOrganizations.vue'),
          meta: { requiredRole: 'administrator' }
        }
      ]
    },
    {
      path: '/statistics',
      redirect: { name: 'Insights' },
      children: [
        {
          path: 'counters',
          redirect: { name: 'InsightsCounters' }
        },
        {
          path: 'rankings',
          redirect: { name: 'InsightsRankings' }
        },
        {
          path: 'trends',
          redirect: { name: 'InsightsTrends' }
        }
      ]
    },
    {
      path: '/insights',
      name: 'Insights',
      component: Insights,
      props: true,
      redirect: { name: 'InsightsCounters' },
      children: [
        {
          path: 'counters',
          name: 'InsightsCounters',
          props: true,
          component: InsightsCounters
        },
        {
          path: 'rankings',
          name: 'InsightsRankings',
          props: true,
          component: InsightsRankings
        },
        {
          path: 'trends',
          name: 'InsightsTrends',
          props: true,
          component: InsightsTrends
        }
      ]
    },
    {
      path: '/manifest',
      redirect: { name: 'Create' },
      children: [
        {
          path: 'generate',
          redirect: { name: 'ManifestGenerator' }
        },
        {
          path: 'validate',
          redirect: { name: 'ManifestValidator' }
        },
        {
          path: 'encrypt',
          redirect: { name: 'SecretEncrypter' }
        }
      ]
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
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
