import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue'),
      meta: {
        sidebar: true,
        icon: 'home',
        exact: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue'),
      meta: { allowedWithoutAuth: true }
    },
    {
      path: '/pipelines',
      name: 'Pipelines',
      component: () => import(/* webpackChunkName: "pipelines" */ '../components/Pipelines.vue'),
      props: (route) => ({ query: route.query }),
      meta: {
        sidebar: true,
        text: 'Builds & releases',
        icon: 'tools'
      }
    },
    {
      path: '/pipelines/:repoSource/:repoOwner/:repoName',
      name: 'PipelineDetails',
      props: true,
      component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineDetails.vue'),
      redirect: { name: 'PipelineOverview' },
      children: [
        {
          path: 'overview',
          name: 'PipelineOverview',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineOverview.vue')
        },
        {
          path: 'builds',
          name: 'PipelineBuilds',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineBuilds.vue')
        },
        {
          path: 'statistics',
          name: 'PipelineStatistics',
          props: (route) => ({ query: route.query }),
          component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineStatistics.vue')
        },
        {
          path: 'releases',
          name: 'PipelineReleases',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineReleases.vue')
        },
        {
          path: 'triggers',
          name: 'PipelineTriggers',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineTriggers.vue')
        },
        {
          path: 'encrypt',
          name: 'PipelineSecretEncrypter',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../components/SecretEncrypter.vue')
        }
      ]
    },
    {
      path: '/pipelines/:repoSource/:repoOwner/:repoName/builds/:id',
      name: 'PipelineBuildDetails',
      props: true,
      component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineBuildDetails.vue'),
      children: [
        {
          path: 'logs',
          name: 'PipelineBuildLogs',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineBuildLogs.vue')
        },
        {
          path: 'manifest',
          name: 'PipelineBuildManifest',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineBuildManifest.vue')
        }
      ]
    },
    {
      path: '/pipelines/:repoSource/:repoOwner/:repoName/releases/:releaseID',
      name: 'PipelineReleaseDetails',
      props: true,
      component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineReleaseDetails.vue'),
      children: [
        {
          path: 'logs',
          name: 'PipelineReleaseLogs',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../components/PipelineReleaseLogs.vue')
        }
      ]
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: () => import(/* webpackChunkName: "catalog" */ '../components/Catalog.vue'),
      props: (route) => ({ query: route.query }),
      meta: {
        sidebar: true,
        icon: 'book-open'
      }
    },
    {
      path: '/catalog/:repoSource/:repoOwner/:repoName',
      name: 'CatalogItemDetails',
      component: () => import(/* webpackChunkName: "catalog" */ '../components/CatalogItemDetails.vue'),
      props: true,
      redirect: { name: 'CatalogItemOverview' },
      children: [
        {
          path: 'overview',
          name: 'CatalogItemOverview',
          props: true,
          component: () => import(/* webpackChunkName: "catalog" */ '../components/CatalogItemOverview.vue')
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
      component: () => import(/* webpackChunkName: "insights" */ '../components/Insights.vue'),
      meta: {
        sidebar: true,
        icon: 'lightbulb'
      },
      props: true,
      redirect: { name: 'InsightsCounters' },
      children: [
        {
          path: 'counters',
          name: 'InsightsCounters',
          props: true,
          component: () => import(/* webpackChunkName: "insights" */ '../components/InsightsCounters.vue')
        },
        {
          path: 'rankings',
          name: 'InsightsRankings',
          props: true,
          component: () => import(/* webpackChunkName: "insights" */ '../components/InsightsRankings.vue')
        },
        {
          path: 'trends',
          name: 'InsightsTrends',
          props: true,
          component: () => import(/* webpackChunkName: "insights" */ '../components/InsightsTrends.vue')
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
      component: () => import(/* webpackChunkName: "configuration" */ '../components/Configuration.vue'),
      meta: {
        sidebar: true,
        icon: 'cogs'
      },
      redirect: { name: 'ConfigurationCredentials' },
      children: [
        {
          path: 'credentials',
          name: 'ConfigurationCredentials',
          props: true,
          component: () => import(/* webpackChunkName: "configuration" */ '../components/ConfigurationCredentials.vue'),
          meta: {
            text: 'Credentials',
            icon: 'key',
            innerbar: true
          }
        },
        {
          path: 'trusted-images',
          name: 'ConfigurationTrustedImages',
          props: true,
          component: () => import(/* webpackChunkName: "configuration" */ '../components/ConfigurationTrustedImages.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Trusted Images',
            icon: 'shield-alt',
            innerbar: true
          }
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
      component: () => import(/* webpackChunkName: "create" */ '../components/Create.vue'),
      meta: {
        sidebar: true,
        icon: 'plus-circle'
      },
      props: true,
      redirect: { name: 'ManifestGenerator' },
      children: [
        {
          path: 'generate',
          name: 'ManifestGenerator',
          props: true,
          component: () => import(/* webpackChunkName: "create" */ '../components/ManifestGenerator.vue')
        },
        {
          path: 'validate',
          name: 'ManifestValidator',
          props: true,
          component: () => import(/* webpackChunkName: "create" */ '../components/ManifestValidator.vue')
        },
        {
          path: 'encrypt',
          name: 'SecretEncrypter',
          props: true,
          component: () => import(/* webpackChunkName: "create" */ '../components/SecretEncrypter.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      props: true,
      component: () => import(/* webpackChunkName: "admin" */ '../components/Admin.vue'),
      meta: {
        sidebar: true,
        icon: 'sliders-h',
        position: 'bottom',
        requiredRole: 'administrator'
      },
      redirect: { name: 'AdminUsers' },
      children: [
        {
          path: 'users',
          name: 'AdminUsers',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../components/AdminUsers.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Users',
            icon: 'user',
            innerbar: true
          }
        },
        {
          path: 'groups',
          name: 'AdminGroups',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../components/AdminGroups.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Groups',
            icon: 'users',
            innerbar: true
          }
        },
        {
          path: 'organizations',
          name: 'AdminOrganizations',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../components/AdminOrganizations.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Organizations',
            icon: 'sitemap',
            innerbar: true
          }
        }
      ]
    },
    {
      path: '/preferences',
      name: 'Preferences',
      props: true,
      component: () => import(/* webpackChunkName: "preferences" */ '../components/Preferences.vue'),
      meta: {
        sidebar: true,
        textFunction: (user) => {
          if (user && user.identities && user.identities.length > 0) {
            var identity = user.identities.find(i => i.name)
            if (identity && identity.name) {
              return identity.name
            }
          }

          return user && user.email ? user.email : ''
        },
        icon: 'user-circle',
        position: 'bottom'
      }
    },
    {
      path: '/logs/:repoSource/:repoOwner/:repoName/:repoBranch/:id',
      name: 'LegacyLogs',
      redirect: { name: 'PipelineBuildLogs' }
    }
  ]
})
