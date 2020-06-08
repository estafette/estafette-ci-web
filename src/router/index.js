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
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      meta: {
        icon: 'home',
        exact: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      meta: {
        allowedWithoutAuth: true,
        hide: true
      }
    },
    {
      path: '/pipelines',
      name: 'Pipelines',
      component: () => import(/* webpackChunkName: "pipelines" */ '../views/Pipelines.vue'),
      props: (route) => ({ query: route.query }),
      meta: {
        text: 'Builds & releases',
        icon: 'tools',
        banner: true,
        lead: 'View and release applications',
        variant: 'success'
      }
    },
    {
      path: '/pipelines/:repoSource/:repoOwner/:repoName',
      name: 'PipelineDetails',
      props: true,
      meta: {
        hide: true
      },
      component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineDetails.vue'),
      redirect: { name: 'PipelineOverview' },
      children: [
        {
          path: 'overview',
          name: 'PipelineOverview',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineOverview.vue'),
          meta: {
            text: 'Overview',
            icon: 'industry'
          }
        },
        {
          path: 'builds',
          name: 'PipelineBuilds',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineBuilds.vue'),
          meta: {
            text: 'Builds',
            icon: 'tools'
          }
        },
        {
          path: 'releases',
          name: 'PipelineReleases',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineReleases.vue'),
          meta: {
            text: 'Releases',
            icon: 'upload'
          }
        },
        {
          path: 'triggers',
          name: 'PipelineTriggers',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineTriggers.vue'),
          meta: {
            text: 'Trigger',
            icon: 'project-diagram'
          }
        },
        {
          path: 'statistics',
          name: 'PipelineStatistics',
          props: (route) => ({ query: route.query }),
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineStatistics.vue'),
          meta: {
            text: 'Insights',
            icon: 'lightbulb'
          }
        },
        {
          path: 'encrypt',
          name: 'PipelineSecretEncrypter',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/SecretEncrypter.vue'),
          meta: {
            text: 'Secrets',
            icon: 'user-secret'
          }
        }
      ]
    },
    {
      path: '/pipelines/:repoSource/:repoOwner/:repoName/builds/:id',
      name: 'PipelineBuildDetails',
      props: true,
      meta: {
        hide: true
      },
      component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineBuildDetails.vue'),
      children: [
        {
          path: 'logs',
          name: 'PipelineBuildLogs',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineBuildLogs.vue'),
          meta: {
            text: 'Logs',
            icon: 'poll-h'
          }
        },
        {
          path: 'manifest',
          name: 'PipelineBuildManifest',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineBuildManifest.vue'),
          meta: {
            text: 'Manifest',
            icon: 'book'
          }
        }
      ]
    },
    {
      path: '/pipelines/:repoSource/:repoOwner/:repoName/releases/:releaseID',
      name: 'PipelineReleaseDetails',
      props: true,
      meta: {
        hide: true
      },
      component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineReleaseDetails.vue'),
      children: [
        {
          path: 'logs',
          name: 'PipelineReleaseLogs',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineReleaseLogs.vue'),
          meta: {
            text: 'Logs',
            icon: 'poll-h'
          }
        }
      ]
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: () => import(/* webpackChunkName: "catalog" */ '../views/Catalog.vue'),
      props: (route) => ({ query: route.query }),
      meta: {
        icon: 'book-open',
        banner: true,
        lead: 'View ownership, performance and more',
        variant: 'info'
      }
    },
    {
      path: '/catalog/:repoSource/:repoOwner/:repoName',
      name: 'CatalogItemDetails',
      meta: {
        hide: true
      },
      component: () => import(/* webpackChunkName: "catalog" */ '../views/CatalogItemDetails.vue'),
      props: true,
      redirect: { name: 'CatalogItemOverview' },
      children: [
        {
          path: 'overview',
          name: 'CatalogItemOverview',
          props: true,
          component: () => import(/* webpackChunkName: "catalog" */ '../views/CatalogItemOverview.vue'),
          meta: {
            text: 'Overview',
            icon: 'industry'
          }
        }
      ]
    },
    {
      path: '/insights',
      name: 'Insights',
      component: () => import(/* webpackChunkName: "views" */ '../views/ViewWithNav.vue'),
      meta: {
        icon: 'lightbulb',
        banner: true,
        lead: 'See stats, rankings and trends',
        variant: 'primary'
      },
      props: true,
      redirect: { name: 'InsightsCounters' },
      children: [
        {
          path: 'counters',
          name: 'InsightsCounters',
          props: true,
          component: () => import(/* webpackChunkName: "insights" */ '../views/InsightsCounters.vue'),
          meta: {
            text: 'Counters',
            icon: 'chart-pie'
          }
        },
        {
          path: 'rankings',
          name: 'InsightsRankings',
          props: true,
          component: () => import(/* webpackChunkName: "insights" */ '../views/InsightsRankings.vue'),
          meta: {
            text: 'Rankings',
            icon: 'list-ol'
          }
        },
        {
          path: 'trends',
          name: 'InsightsTrends',
          props: true,
          component: () => import(/* webpackChunkName: "insights" */ '../views/InsightsTrends.vue'),
          meta: {
            text: 'Trends',
            icon: 'chart-line'
          }
        }
      ]
    },
    {
      path: '/create',
      name: 'Create',
      component: () => import(/* webpackChunkName: "views" */ '../views/ViewWithNav.vue'),
      meta: {
        icon: 'plus-circle',
        banner: true,
        lead: 'Generate manifests and secrets',
        variant: 'warning'
      },
      props: true,
      redirect: { name: 'ManifestGenerator' },
      children: [
        {
          path: 'generate',
          name: 'ManifestGenerator',
          props: true,
          meta: {
            icon: 'hammer',
            text: 'Generate'
          },
          component: () => import(/* webpackChunkName: "create" */ '../views/ManifestGenerator.vue')
        },
        {
          path: 'validate',
          name: 'ManifestValidator',
          props: true,
          meta: {
            text: 'Validate',
            icon: 'clipboard-check'
          },
          component: () => import(/* webpackChunkName: "create" */ '../views/ManifestValidator.vue')
        },
        {
          path: 'encrypt',
          name: 'SecretEncrypter',
          props: true,
          meta: {
            text: 'Secrets',
            icon: 'user-secret'
          },
          component: () => import(/* webpackChunkName: "create" */ '../views/SecretEncrypter.vue')
        }
      ]
    },
    {
      path: '/configuration',
      name: 'Configuration',
      props: true,
      component: () => import(/* webpackChunkName: "views" */ '../views/ViewWithNav.vue'),
      meta: {
        icon: 'cogs',
        position: 'bottom'
      },
      redirect: { name: 'ConfigurationCredentials' },
      children: [
        {
          path: 'credentials',
          name: 'ConfigurationCredentials',
          props: true,
          component: () => import(/* webpackChunkName: "configuration" */ '../views/ConfigurationCredentials.vue'),
          meta: {
            text: 'Credentials',
            icon: 'key'
          }
        },
        {
          path: 'trusted-images',
          name: 'ConfigurationTrustedImages',
          props: true,
          component: () => import(/* webpackChunkName: "configuration" */ '../views/ConfigurationTrustedImages.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Trusted Images',
            icon: 'shield-alt'
          }
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      props: true,
      component: () => import(/* webpackChunkName: "views" */ '../views/ViewWithNav.vue'),
      meta: {
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
          component: () => import(/* webpackChunkName: "users" */ '../views/AdminUsers.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Users',
            icon: 'user'
          }
        },
        {
          path: 'groups',
          name: 'AdminGroups',
          props: true,
          component: () => import(/* webpackChunkName: "views" */ '../views/ViewDummyPage.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Groups',
            icon: 'users'
          }
        },
        {
          path: 'organizations',
          name: 'AdminOrganizations',
          props: true,
          component: () => import(/* webpackChunkName: "views" */ '../views/ViewDummyPage.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Organizations',
            icon: 'sitemap'
          }
        }
      ]
    },
    {
      path: '/user',
      name: 'User',
      props: true,
      component: () => import(/* webpackChunkName: "views" */ '../views/ViewWithNav.vue'),
      redirect: { name: 'UserDetails' },
      meta: {
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
      },
      children: [
        {
          path: 'details',
          name: 'UserDetails',
          props: true,
          component: () => import(/* webpackChunkName: "preferences" */ '../views/UserDetails.vue'),
          meta: {
            text: 'Details',
            icon: 'passport'
          }
        },
        {
          path: 'preferences',
          name: 'UserPreferences',
          props: true,
          component: () => import(/* webpackChunkName: "views" */ '../views/ViewDummyPage.vue'),
          meta: {
            text: 'Preferences',
            icon: 'heart'
          }
        }
      ]
    },
    // redirects
    {
      path: '/logs/:repoSource/:repoOwner/:repoName/:repoBranch/:id',
      name: 'LegacyLogs',
      redirect: { name: 'PipelineBuildLogs' },
      meta: {
        hide: true
      }
    },
    {
      path: '/statistics',
      redirect: { name: 'Insights' },
      meta: {
        hide: true
      },
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
      path: '/config',
      redirect: { name: 'Configuration' },
      meta: {
        hide: true
      }
    },
    {
      path: '/manifest',
      redirect: { name: 'Create' },
      meta: {
        hide: true
      },
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
    }
  ]
})
