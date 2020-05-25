<template>
  <span v-if="releaseTarget">
    <div
      v-if="releaseTarget.activeReleases && releaseTarget.activeReleases.length > 0"
      class="btn-light btn btn-sm mr-1 mb-1"
    >
      {{ releaseTarget.name }}<router-link
        v-for="(release, index) in mergedActionsAndActiveReleases(releaseTarget)"
        :key="index"
        :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
        exact
        :class="[$options.filters.bootstrapClass(release.releaseStatus, 'badge'), 'badge ml-1 mb-1 d-block d-md-inline-block']"
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
      :class="['btn-light', 'btn btn-sm mr-1 mb-1']"
    >
      {{ releaseTarget.name }}<span :class="['badge ml-1']">
        -
      </span>
    </div>
  </span>
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
    releaseTarget: {
      type: Object,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    }
  },

  methods: {
    releaseIsUpToDate (release) {
      return this.pipeline && this.pipeline.buildStatus && this.pipeline.buildStatus === 'succeeded' && this.pipeline.buildVersion && release && release.releaseStatus && release.releaseStatus === 'succeeded' && this.pipeline.buildVersion === release.releaseVersion
    },

    getActiveRelease (activeReleases, actionName) {
      if (activeReleases) {
        return activeReleases.find(r => r.action === actionName)
      }

      return undefined
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
  }
}
</script>
