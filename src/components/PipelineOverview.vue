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

    <div
      class="row justify-content-center m-0 mt-3 mb-3 ml-3"
      v-if="builds.length > 0"
    >
      <div
        v-for="build in builds"
        :key="build.id"
        class="col-12 col-md-6 col-xl-4 col-xxl-3 col-xxxl-2 m-0 p-0 pr-3 pb-3"
      >
        <div
          :class="[
            $options.filters.bootstrapClass(build.buildStatus, 'border'),
            dashboardModeActive ? $options.filters.bootstrapClass(build.buildStatus, 'bg') : 'bg-light',
            dashboardModeActive ? $options.filters.bootstrapTextClass(build.buildStatus) : '',
            'rounded border align-items-center pt-3 pr-2 pb-2 pl-2 text-center'
          ]"
        >
          <h6>
            {{ build.repoBranch }}
          </h6>

          <router-link
            :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}"
            exact
            :class="[
              $options.filters.bootstrapClass(build.buildStatus, 'btn'),
              'btn btn-sm btn-block mr-1 mb-1'
            ]"
            tag="span"
          >
            {{ build.buildVersion }}
          </router-link>
        </div>
      </div>
    </div>
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
        <div
          :class="[
            $options.filters.bootstrapClass(aggregatedStatus(releaseTarget), 'border'),
            dashboardModeActive ? $options.filters.bootstrapClass(aggregatedStatus(releaseTarget), 'bg') : 'bg-light',
            dashboardModeActive ? $options.filters.bootstrapTextClass(aggregatedStatus(releaseTarget)) : '',
            'rounded border align-items-center pt-3 pr-2 pb-2 pl-2 text-center'
          ]"
        >
          <h6>
            {{ releaseTarget.name }}
          </h6>

          <div
            v-if="releaseTarget.activeReleases && releaseTarget.activeReleases.length > 0"
          >
            <router-link
              v-for="release in releaseTarget.activeReleases"
              :key="release.id"
              :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
              exact
              :class="[
                $options.filters.bootstrapClass(release.releaseStatus, 'btn'),
                'btn btn-sm btn-block mr-1 mb-1'
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
          </div>
          <div
            v-else
            :class="[dashboardModeActive ? 'btn-dark' : 'btn-light', 'btn btn-sm btn-block mr-1 mb-1']"
          >
            <span :class="['badge ml-1']">
              -
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFire, faShippingFast, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFire, faShippingFast, faUpload)

export default {
  components: {
    Spinner,
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
