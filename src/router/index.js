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
      redirect: { name: 'AllPipelines' },
      meta: {
        text: 'Builds & releases',
        icon: 'tools',
        banner: true,
        lead: 'View and release applications',
        variant: 'success'
      },
      children: [
        {
          path: 'all',
          name: 'AllPipelines',
          props: (route) => ({ query: route.query }),
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/AllPipelines.vue'),
          meta: {
            text: 'Pipelines',
            icon: 'industry'
          }
        },
        {
          path: 'builds',
          name: 'AllBuilds',
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/AllBuilds.vue'),
          props: (route) => ({ query: route.query }),
          meta: {
            text: 'Builds',
            icon: 'tools'
          }
        },
        {
          path: 'releases',
          name: 'AllReleases',
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/AllReleases.vue'),
          props: (route) => ({ query: route.query }),
          meta: {
            text: 'Releases',
            icon: 'upload'
          }
        },
        {
          path: 'bots',
          name: 'AllBots',
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/AllBots.vue'),
          props: (route) => ({ query: route.query }),
          meta: {
            text: 'Bots',
            icon: 'robot'
          }
        }
      ]
    },
    {
      path: '/pipelines/:repoSource/:repoOwner/:repoName',
      name: 'PipelineDetails',
      props: true,
      meta: {
        title: route => route && route.params ? route.params.repoName : '',
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
          props: (route) => ({ query: route.query, ...route.params }),
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineBuilds.vue'),
          meta: {
            text: 'Builds',
            icon: 'tools'
          }
        },
        {
          path: 'releases',
          name: 'PipelineReleases',
          props: (route) => ({ query: route.query, ...route.params }),
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineReleases.vue'),
          meta: {
            text: 'Releases',
            icon: 'upload'
          }
        },
        {
          path: 'bots',
          name: 'PipelineBots',
          props: (route) => ({ query: route.query, ...route.params }),
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineBots.vue'),
          meta: {
            text: 'Bots',
            icon: 'robot'
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
          redirect: { name: 'PipelineInsights' },
          meta: {
            hide: true
          }
        },
        {
          path: 'insights',
          name: 'PipelineInsights',
          props: (route) => ({ query: route.query }),
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineInsights.vue'),
          meta: {
            text: 'Insights',
            icon: 'lightbulb'
          }
        },
        {
          path: 'encrypt',
          redirect: { name: 'PipelineSecrets' },
          meta: {
            hide: true
          }
        },
        {
          path: 'secrets',
          name: 'PipelineSecrets',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineSecrets.vue'),
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
        title: route => route && route.params ? `${route.params.repoName} > builds > ${route.params.id}` : '',
        hide: true
      },
      component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineBuildDetails.vue'),
      children: [
        {
          path: 'logs/:logid?',
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
        title: route => route && route.params ? `${route.params.repoName} > releases > ${route.params.releaseID}` : '',
        hide: true
      },
      component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineReleaseDetails.vue'),
      children: [
        {
          path: 'logs/:logid?',
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
      path: '/pipelines/:repoSource/:repoOwner/:repoName/bots/:botID',
      name: 'PipelineBotDetails',
      props: true,
      meta: {
        title: route => route && route.params ? `${route.params.repoName} > bots > ${route.params.botID}` : '',
        hide: true
      },
      component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineBotDetails.vue'),
      children: [
        {
          path: 'logs/:logid?',
          name: 'PipelineBotLogs',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/PipelineBotLogs.vue'),
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
      component: () => import(/* webpackChunkName: "views" */ '../views/ViewWithNav.vue'),
      props: (route) => ({ query: route.query }),
      meta: {
        icon: 'book-open',
        banner: true,
        lead: 'View ownership, performance and more',
        variant: 'info'
      },
      redirect: { name: 'CatalogGroups' },
      children: [
        {
          path: 'groups',
          name: 'CatalogGroups',
          props: (route) => ({ query: route.query }),
          component: () => import(/* webpackChunkName: "catalog" */ '../views/CatalogGroups.vue'),
          meta: {
            text: 'Groups',
            icon: 'users'
          }
        },
        {
          path: 'services',
          name: 'CatalogServices',
          props: (route) => ({ query: route.query }),
          component: () => import(/* webpackChunkName: "catalog" */ '../views/CatalogServices.vue'),
          meta: {
            text: 'Services',
            icon: 'shapes'
          }
        },
        {
          path: 'entities',
          name: 'CatalogEntities',
          props: (route) => ({ query: route.query }),
          component: () => import(/* webpackChunkName: "catalog" */ '../views/CatalogEntities.vue'),
          meta: {
            text: 'Entities',
            icon: 'cubes'
          }
        }
      ]
    },
    {
      path: '/catalog/groups/:id',
      name: 'CatalogGroupDetails',
      props: true,
      component: () => import(/* webpackChunkName: "admin" */ '../views/CatalogGroupDetails.vue'),
      meta: {
        hide: true
      }
    },
    {
      path: '/catalog/services/:repoSource/:repoOwner/:repoName',
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
        lead: 'Generate and validate manifests',
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
        },
        {
          path: 'build-control',
          name: 'BuildControl',
          props: true,
          component: () => import(/* webpackChunkName: "configuration" */ '../views/ConfigurationBuildControl.vue'),
          meta: {
            text: 'Build Control',
            icon: 'check-square'
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
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminUsers.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Users',
            icon: 'user'
          }
        },
        {
          path: 'users/:id/edit',
          name: 'AdminUserUpdate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminUserUpdate.vue'),
          meta: {
            requiredRole: 'administrator',
            title: route => route && route.params ? `users > ${route.params.id}` : '',
            hide: true
          }
        },
        {
          path: 'groups',
          name: 'AdminGroups',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminGroups.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Groups',
            icon: 'users'
          }
        },
        {
          path: 'groups/create',
          name: 'AdminGroupCreate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminGroupCreate.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Groups > Create',
            hide: true
          }
        },
        {
          path: 'groups/:id/edit',
          name: 'AdminGroupUpdate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminGroupUpdate.vue'),
          meta: {
            requiredRole: 'administrator',
            title: route => route && route.params ? `groups > ${route.params.id}` : '',
            hide: true
          }
        },
        {
          path: 'organizations',
          name: 'AdminOrganizations',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminOrganizations.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Organizations',
            icon: 'sitemap'
          }
        },
        {
          path: 'organizations/create',
          name: 'AdminOrganizationCreate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminOrganizationCreate.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Organizations > Create',
            hide: true
          }
        },
        {
          path: 'organizations/:id/edit',
          name: 'AdminOrganizationUpdate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminOrganizationUpdate.vue'),
          meta: {
            requiredRole: 'administrator',
            title: route => route && route.params ? `organization > ${route.params.id}` : '',
            hide: true
          }
        },
        {
          path: 'clients',
          name: 'AdminClients',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminClients.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Clients',
            icon: 'mobile-alt'
          }
        },
        {
          path: 'clients/create',
          name: 'AdminClientCreate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminClientCreate.vue'),
          meta: {
            requiredRole: 'administrator',
            hide: true
          }
        },
        {
          path: 'clients/:id/edit',
          name: 'AdminClientUpdate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminClientUpdate.vue'),
          meta: {
            requiredRole: 'administrator',
            title: route => route && route.params ? `clients > ${route.params.id}` : '',
            hide: true
          }
        },
        {
          path: 'pipelines',
          name: 'AdminPipelines',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminPipelines.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Pipelines',
            icon: 'tools'
          }
        },
        {
          path: 'pipelines/:repoSource/:repoOwner/:repoName/edit',
          name: 'AdminPipelineUpdate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminPipelineUpdate.vue'),
          meta: {
            requiredRole: 'administrator',
            title: route => route && route.params ? `pipelines > ${route.params.repoName}` : '',
            hide: true
          }
        },
        {
          path: 'encrypt',
          redirect: { name: 'AdminSecrets' },
          meta: {
            hide: true
          }
        },
        {
          path: 'secrets',
          name: 'AdminSecrets',
          props: true,
          component: () => import(/* webpackChunkName: "pipelines" */ '../views/AdminSecrets.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Secrets',
            icon: 'user-secret'
          }
        },
        {
          path: 'integrations',
          name: 'AdminIntegrations',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminIntegrations.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Integrations',
            icon: 'plug'
          }
        },
        {
          path: 'integrations/github/:id/edit',
          name: 'AdminIntegrationsGithubUpdate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminIntegrationsGithubUpdate.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Integrations',
            title: route => route && route.params ? `github installations > ${route.params.id}` : '',
            hide: true
          }
        },
        {
          path: 'integrations/bitbucket/:clientKey/edit',
          name: 'AdminIntegrationsBitbucketUpdate',
          props: true,
          component: () => import(/* webpackChunkName: "admin" */ '../views/AdminIntegrationsBitbucketUpdate.vue'),
          meta: {
            requiredRole: 'administrator',
            text: 'Integrations',
            title: route => route && route.params ? `bitbucket installations > ${route.params.id}` : '',
            hide: true
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
            const identity = user.identities.find(i => i.name)
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
        }// ,
        // {
        //   path: 'preferences',
        //   name: 'UserPreferences',
        //   props: true,
        //   component: () => import(/* webpackChunkName: "views" */ '../views/ViewDummyPage.vue'),
        //   meta: {
        //     text: 'Preferences',
        //     icon: 'heart'
        //   }
        // }
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
        }
      ]
    }
  ]
})
