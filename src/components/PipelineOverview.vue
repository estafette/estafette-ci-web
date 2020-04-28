<template>
  <div class="m-3">
    <div class="row justify-content-center">
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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFire)

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
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
    }
  }
}
</script>
