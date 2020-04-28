<template>
  <div class="">
    <div
      class="row m-0 mt-3 mb-3 ml-3 justify-content-center"
    >
      <div class="h5 text-center mt-3 mb-3 text-secondary">
        <font-awesome-icon
          icon="shipping-fast"
          class="mr-2"
        />
        Recent builds
      </div>
    </div>

    <transition-group
      name="list-complete"
      tag="div"
      class="row justify-content-center m-0 mt-3 mb-3 ml-3"
      v-if="builds.length > 0"
    >
      <drag
        v-for="build in builds"
        :key="build.id"
        :disabled="!user || !user.authenticated || build.buildStatus !== 'succeeded'"
        :data="build"
        class="col-12 col-md-6 col-xl-4 col-xxl-3 col-xxxl-2 m-0 p-0 pr-3 pb-3 list-complete-item"
      >
        <div
          :class="[
            $options.filters.bootstrapClass(build.buildStatus, 'border'),
            dashboardModeActive ? $options.filters.bootstrapClass(build.buildStatus, 'bg') : 'bg-light',
            dashboardModeActive ? $options.filters.bootstrapTextClass(build.buildStatus) : '',
            'rounded border align-items-center pt-3 pr-2 pb-2 pl-2 text-center'
          ]"
        >
          <h6 class="text-truncate">
            {{ build.repoBranch }}
          </h6>

          <router-link
            :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}"
            exact
            :class="[
              $options.filters.bootstrapClass(build.buildStatus, 'btn'),
              'btn btn-sm btn-block mr-1 mb-1 text-truncate'
            ]"
            tag="span"
          >
            <span v-if="build.buildVersion">
              {{ build.buildVersion }}
            </span>
            <span v-else>
              -
            </span>
          </router-link>
        </div>
      </drag>
    </transition-group>
    <div
      v-else-if="loaded"
      class="row m-0 mt-3 mb-3 ml-3 alert alert-warning text-center p-5"
    >
      There are no recent builds for the current pipeline.
    </div>
    <div
      v-else
      class="row m-0 mt-3 mb-3 ml-3"
    >
      <spinner color="primary" />
    </div>

    <div
      class="row m-0 mt-3 mb-3 ml-3 justify-content-center"
    >
      <div class="h5 text-center mt-3 mb-3 text-secondary">
        <font-awesome-icon
          icon="upload"
          class="mr-2"
        />
        Releases
      </div>
    </div>

    <div class="row m-0 mt-3 mb-3 ml-3 justify-content-center">
      <div
        v-for="releaseTarget in pipeline.releaseTargets"
        :key="releaseTarget.name"
        class="col-12 col-md-6 col-xl-4 col-xxl-3 col-xxxl-2 m-0 p-0 pr-3 pb-3"
      >
        <drop
          :data="releaseTarget"
          @drop="releaseBuildToTargetDefault($event, releaseTarget)"
          :class="[
            $options.filters.bootstrapClass(aggregatedStatus(releaseTarget), 'border'),
            dashboardModeActive ? $options.filters.bootstrapClass(aggregatedStatus(releaseTarget), 'bg') : 'bg-light',
            dashboardModeActive ? $options.filters.bootstrapTextClass(aggregatedStatus(releaseTarget)) : '',
            'rounded border align-items-center pt-3 pr-2 pb-2 pl-2 text-center'
          ]"
        >
          <h6 class="text-truncate">
            {{ releaseTarget.name }}
          </h6>

          <div
            v-if="releaseTarget.activeReleases && releaseTarget.activeReleases.length > 0"
          >
            <drop
              v-for="release in releaseTarget.activeReleases"
              :key="release.id"
              @drop="releaseBuildToTargetAction($event, releaseTarget, release)"
            >
              <router-link
                :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
                exact
                :class="[
                  $options.filters.bootstrapClass(release.releaseStatus, 'btn'),
                  'btn btn-sm btn-block mr-1 mb-1 text-truncate'
                ]"
                tag="span"
                :title="release.action"
              >
                <span v-if="release.action">
                  {{ release.action }}:
                </span>{{ release.releaseVersion | defaultValue('-') }}

                <font-awesome-icon
                  icon="fire"
                  v-if="releaseIsUpToDate(release)"
                />
              </router-link>
            </drop>
          </div>
          <div
            v-else
            :class="[dashboardModeActive ? 'btn-dark' : 'btn-light', 'btn btn-sm btn-block mr-1 mb-1']"
          >
            <span :class="['badge ml-1']">
              -
            </span>
          </div>
        </drop>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import { Drag, Drop } from 'vue-easy-dnd'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFire, faShippingFast, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFire, faShippingFast, faUpload)

export default {
  components: {
    Spinner,
    Drag,
    Drop,
    FontAwesomeIcon
  },

  props: {
    repoSource: {
      type: String,
      default: null
    },
    repoOwner: {
      type: String,
      default: null
    },
    repoName: {
      type: String,
      default: null
    },
    user: {
      type: Object,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  },

  data: function () {
    return {
      builds: [],
      loaded: false,
      refresh: true
    }
  },

  created () {
    this.loadRecentBuilds()
  },

  methods: {
    releaseBuildToTargetDefault (e, releaseTarget) {
      var defaultActionName = ''
      if (releaseTarget.actions && releaseTarget.actions.length > 0) {
        defaultActionName = releaseTarget.actions[0].name
      }

      console.log('releaseBuildToTargetDefault', e, releaseTarget, defaultActionName)
      const build = e.data
      this.startRelease(build, releaseTarget, defaultActionName)
    },

    releaseBuildToTargetAction (e, releaseTarget, release) {
      var actionName = ''
      if (release.action) {
        actionName = release.action
      }
      console.log('releaseBuildToTargetAction', e, releaseTarget, actionName)
      const build = e.data
      this.startRelease(build, releaseTarget, actionName)
    },

    startRelease: function (build, releaseTarget, actionName) {
      if (this.user.authenticated) {
        this.axios.post(`/api/pipelines/${build.repoSource}/${build.repoOwner}/${build.repoName}/releases`, {
          name: releaseTarget.name,
          action: actionName,
          repoSource: build.repoSource,
          repoOwner: build.repoOwner,
          repoName: build.repoName,
          releaseVersion: build.buildVersion
        })
          .then(response => {
            console.log(response)
            var startedRelease = response.data

            var releaseTarget = this.pipeline.releaseTargets.find(rt => rt.name === startedRelease.name)
            if (releaseTarget) {
              if (!releaseTarget.activeReleases) {
                releaseTarget.activeReleases = [startedRelease]
              } else {
                // remove active release item if name and optional action matches the just started release
                releaseTarget.activeReleases = releaseTarget.activeReleases.filter(r => r.action && startedRelease.action && r.action !== startedRelease.action)

                // prepend newly started release
                releaseTarget.activeReleases.unshift(startedRelease)
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },

    releaseIsUpToDate (release) {
      return this.pipeline && this.pipeline.buildStatus && this.pipeline.buildStatus === 'succeeded' && this.pipeline.buildVersion && release && release.releaseStatus && release.releaseStatus === 'succeeded' && this.pipeline.buildVersion === release.releaseVersion
    },

    aggregatedStatus (releaseTarget) {
      return releaseTarget && releaseTarget.activeReleases && releaseTarget.activeReleases.length > 0 ? releaseTarget.activeReleases.reduce((acc, release) => {
        const statusPriorities = [
          'pending',
          'running',
          'canceling',
          'failed',
          'canceled',
          'succeeded'
        ]

        statusPriorities.some(statusPriority => {
          if (acc === statusPriority || release.releaseStatus === statusPriority) {
            acc = statusPriority
            return true
          }
        })

        return acc
      }, 'skipped') : 'skipped'
    },

    loadRecentBuilds () {
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/recentbuilds`)
        .then(response => {
          this.builds = response.data

          this.loaded = true
        })
        .catch(e => {
          this.periodicallyRefreshRecentBuilds(15)
        })
    },

    periodicallyRefreshRecentBuilds (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadRecentBuilds, timeoutWithJitter)
      }
    }
  },

  watch: {
    '$route' (to, from) {
      this.loadRecentBuilds()
    },

    pipeline: {
      handler: function (to, from) {
        this.loadRecentBuilds()
      },
      deep: true
    }
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>

<style lang="scss">
.border.drop-allowed {
  border-style: dashed !important;
}

.border.drop-forbidden {
  border-style: solid !important;
}

.drop-in {
  background-color: #fff3cd !important;
}
</style>
