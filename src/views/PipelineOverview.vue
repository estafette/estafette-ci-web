<template>
  <div class="">
    <pipeline-warnings
      v-if="pipeline"
      :pipeline="pipeline"
    />

    <div
      class="row m-0 mt-3 mb-3 ml-3 justify-content-center"
    >
      <div class="h5 text-center mt-3 mb-3 text-secondary">
        <font-awesome-icon
          icon="tools"
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
        :disabled="!user || !user.active || build.buildStatus !== 'succeeded'"
        :data="build"
        class="col-12 col-md-6 col-xl-4 col-xxl-3 col-xxxl-2 m-0 p-0 pr-3 pb-3 list-complete-item"
      >
        <div
          :class="[
            'bg-light',
            'rounded border align-items-center pt-3 pr-2 pb-2 pl-2 text-center bg-white'
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

          <div class="row no-gutters">
            <div class="col text-truncate">
              <b-button
                :to="{ name: 'PipelineBuildLogs', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName, id: build.id }}"
                exact
                :variant="$options.filters.bootstrapVariant(build.buildStatus)"
                size="sm"
                block
                class="mr-1 mb-1 text-truncate"
              >
                <span v-if="build.buildVersion">
                  {{ build.buildVersion }}
                </span>
                <span v-else>
                  -
                </span>
              </b-button>
            </div>
            <div
              v-if="showActions(build)"
              class="col-auto"
            >
              <rebuild-button-compact
                :build="build"
                :builds="builds"
                class="mr-1 mb-1 ml-1"
              />
              <cancel-button-compact
                :build="build"
                class="mr-1 mb-1 ml-1"
              />
            </div>
          </div>

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
        <div
          :class="[
            'bg-light',
            'rounded border align-items-center pt-3 pr-2 pb-2 pl-2 text-center bg-white'
          ]"
        >
          <h6 class="text-truncate">
            {{ releaseTarget.name }}
          </h6>

          <drop
            v-for="(release, index) in mergedActionsAndActiveReleases(releaseTarget)"
            :key="index"
            @drop="releaseBuildToTargetAction($event, releaseTarget, release)"
          >
            <b-button
              v-if="release && release.id"
              :to="{ name: 'PipelineReleaseLogs', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName, releaseID: release.id }}"
              exact
              :variant="$options.filters.bootstrapVariant(release.releaseStatus)"
              size="sm"
              block
              class="mr-1 mb-1 text-truncate"
            >
              <span v-if="release.action">
                {{ release.action }}:
              </span>{{ release.releaseVersion | defaultValue('-') }}

              <font-awesome-icon
                icon="fire"
                v-if="releaseIsUpToDate(release)"
              />
            </b-button>
            <button
              v-else-if="release"
              :class="[
                'btn btn-sm btn-block mr-1 mb-1 text-truncate',
                $options.filters.bootstrapClass(release.releaseStatus, 'btn')
              ]"
            >
              <span v-if="release.action">
                {{ release.action }}:
              </span>{{ release.releaseVersion | defaultValue('-') }}
            </button>
          </drop>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PipelineWarnings from '@/components/PipelineWarnings'
import { mapState } from 'vuex'
import { BButton } from 'bootstrap-vue'
import Spinner from '@/components/Spinner'
import CommitLink from '@/components/CommitLink'
import RebuildButtonCompact from '@/components/RebuildButtonCompact'
import CancelButtonCompact from '@/components/CancelButtonCompact'
import { Drag, Drop } from 'vue-easy-dnd'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFire, faTools, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFire, faTools, faUpload)

export default {
  components: {
    PipelineWarnings,
    BButton,
    Spinner,
    CommitLink,
    RebuildButtonCompact,
    CancelButtonCompact,
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
    pipeline: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      builds: [],
      loaded: false,
      refresh: true,
      migration: false
    }
  },

  created () {
    this.loadRecentBuilds()
  },

  methods: {
    releaseBuildToTargetAction (e, releaseTarget, release) {
      if (this.releaseTargetDisabled(releaseTarget)) {
        return
      }

      let actionName = ''
      if (release.action) {
        actionName = release.action
      }

      const build = e.data
      this.startRelease(build, releaseTarget, actionName)
    },

    startRelease: function (build, releaseTarget, actionName) {
      if (this.user.active) {
        let startedRelease = {
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
            startedRelease = response.data
            this.updateRelease(startedRelease)
          })
          .catch(e => {
            console.warn(e)
          })
      }
    },

    updateRelease (startedRelease) {
      const releaseTarget = this.pipeline.releaseTargets.find(rt => rt.name === startedRelease.name)
      if (releaseTarget) {
        if (!releaseTarget.activeReleases) {
          releaseTarget.activeReleases = [startedRelease]
        } else {
          // replace corresponding active release with started release
          let hasMatchingActiveRelease = false
          const newActiveReleases = releaseTarget.activeReleases.map(r => {
            // if there's no actions on the active releases there's just one and it's a match, so replace it
            if (!r.action) {
              hasMatchingActiveRelease = true
              return startedRelease
            }

            // otherwise it has to match the action
            if (startedRelease.action && r.action === startedRelease.action) {
              hasMatchingActiveRelease = true
              return startedRelease
            }

            // any of the other release targets stay the same
            return r
          })

          if (!hasMatchingActiveRelease) {
            newActiveReleases.push(startedRelease)
          }

          // atomically update active releases
          releaseTarget.activeReleases = newActiveReleases
        }
      }
    },

    releaseIsUpToDate (release) {
      return this.pipeline && this.pipeline.buildStatus && this.pipeline.buildStatus === 'succeeded' && this.pipeline.buildVersion && release && release.releaseStatus && release.releaseStatus === 'succeeded' && this.pipeline.buildVersion === release.releaseVersion
    },

    loadRecentBuilds () {
      this.axios.get(`/api/migrations/from/${this.repoSource}/${this.repoOwner}/${this.repoName}`)
        .then(response => {
          if (response.data && response.data.toName) {
            this.migration = response.data
          }
        }).catch(e => {
          console.warn('pipeline not found and not migrated', e)
        })
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds?page[size]=6`)
        .then(response => {
          this.builds = response.data.items

          this.loaded = true
        })
        .catch(e => {
          if (e.message === 'Not Found') {
            this.refresh = false
            return
          }
          this.periodicallyRefreshRecentBuilds(18000)
        })
    },

    periodicallyRefreshRecentBuilds (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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
    },

    showActions (build) {
      return this.user && this.user.active && build && ((build.buildStatus === 'failed' || build.buildStatus === 'pending' || build.buildStatus === 'running' || build.buildStatus === 'canceled' || build.buildStatus === 'canceling'))
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),
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

        const releaseActions = []

        releaseTarget.actions.forEach(action => {
          // check if there's an active release for name and action
          const activeRelease = this.getActiveRelease(releaseTarget.activeReleases, action.name)
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
