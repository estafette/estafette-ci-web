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
            'bg-light',
            'rounded border align-items-center pt-3 pr-2 pb-2 pl-2 text-center'
          ]"
        >
          <div class="row mb-2">
            <div class="col-6 text-truncate">
              {{ build.repoBranch }}
            </div>

            <div class="col-6">
              <commit-link
                :build="build"
              />
            </div>
          </div>

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

          <div class="row mt-2">
            <div
              v-if="build.commits && build.commits.length > 0"
              class="col-12 text-muted text-truncate"
            >
              {{ build.commits[0].message }}
            </div>
          </div>
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
      v-if="pipeline.releaseTargets && pipeline.releaseTargets.length > 0"
    >
      <div class="h5 text-center mt-3 mb-3 text-secondary">
        <font-awesome-icon
          icon="upload"
          class="mr-2"
        />
        Releases
        <div class="small text-muted mt-2">
          (drag and drop a build on a release)
        </div>
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
            'bg-light',
            'rounded border align-items-center pt-3 pr-2 pb-2 pl-2 text-center'
          ]"
        >
          <h6 class="text-truncate">
            {{ releaseTarget.name }}
          </h6>

          <drop
            v-for="release in mergedActionsAndActiveReleases(releaseTarget)"
            :key="release.id"
            @drop="releaseBuildToTargetAction($event, releaseTarget, release)"
          >
            <router-link
              v-if="release && release.id && release.id > 0"
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
            <div v-else>
              <span v-if="release.action">
                {{ release.action }}:
              </span>{{ release.releaseVersion | defaultValue('-') }}
            </div>
          </drop>
        </drop>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import CommitLink from '@/components/CommitLink'

import { Drag, Drop } from 'vue-easy-dnd'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFire, faShippingFast, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFire, faShippingFast, faUpload)

export default {
  components: {
    Spinner,
    CommitLink,
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
      if (this.releaseTargetDisabled(releaseTarget)) {
        return
      }

      var defaultActionName = ''
      if (releaseTarget.actions && releaseTarget.actions.length > 0) {
        defaultActionName = releaseTarget.actions[0].name
      }

      console.log('releaseBuildToTargetDefault', e, releaseTarget, defaultActionName)
      const build = e.data
      this.startRelease(build, releaseTarget, defaultActionName)
    },

    releaseBuildToTargetAction (e, releaseTarget, release) {
      if (this.releaseTargetDisabled(releaseTarget)) {
        return
      }

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
        var startedRelease = {
          name: releaseTarget.name,
          action: actionName,
          repoSource: build.repoSource,
          repoOwner: build.repoOwner,
          repoName: build.repoName,
          releaseVersion: build.buildVersion,
          releaseStatus: 'pending'
        }
        this.updateRelease(startedRelease)

        this.axios.post(`/api/pipelines/${build.repoSource}/${build.repoOwner}/${build.repoName}/releases`, startedRelease)
          .then(response => {
            console.log(response)
            startedRelease = response.data
            this.updateRelease(startedRelease)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },

    updateRelease (startedRelease) {
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
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds?page[size]=6`)
        .then(response => {
          this.builds = response.data.items

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
    },

    getActiveRelease (activeReleases, actionName) {
      if (activeReleases) {
        return activeReleases.find(r => r.action === actionName)
      }

      return undefined
    },

    releaseTargetDisabled: function (releaseTarget) {
      return this.pipeline &&
             this.pipeline.releaseTargets &&
             this.pipeline.releaseTargets.length > 0 &&
             this.pipeline.releaseTargets.some(rt => rt.name === releaseTarget.name && rt.activeReleases && rt.activeReleases.some(ar => ar && ar.releaseStatus === 'running'))
    }
  },

  computed: {
    mergedActionsAndActiveReleases () {
      return (releaseTarget) => {
        if ((!releaseTarget.actions || releaseTarget.actions.length === 0) && (!releaseTarget.activeReleases || releaseTarget.activeReleases.length === 0)) {
          return [{
            name: releaseTarget.name,
            repoSource: this.pipeline.repoSource,
            repoOwner: this.pipeline.repoOwner,
            repoName: this.pipeline.repoName
          }]
        }

        if (!releaseTarget.actions || releaseTarget.actions.length === 0) {
          return releaseTarget.activeReleases
        }

        var releaseActions = []

        releaseTarget.actions.forEach(action => {
          // check if there's an active release for name and action
          var activeRelease = this.getActiveRelease(releaseTarget.activeReleases, action.name)
          if (activeRelease !== undefined) {
            releaseActions.push(activeRelease)
          } else {
            releaseActions.push({
              name: releaseTarget.name,
              action: action.name,
              repoSource: this.pipeline.repoSource,
              repoOwner: this.pipeline.repoOwner,
              repoName: this.pipeline.repoName
            })
          }
        })

        return releaseActions
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

.drop-in,
.drop-in .btn {
  background-color: #fff3cd !important;
  color: #212529 !important;
  border-color: #fff3cd !important;
}
</style>
