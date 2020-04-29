<template>
  <span v-if="releaseTarget">
    <div
      v-if="releaseTarget.activeReleases && releaseTarget.activeReleases.length > 0"
      :class="['btn-light', 'btn btn-sm mr-1 mb-1']"
    >
      {{ releaseTarget.name }}<router-link
        v-for="release in releaseTarget.activeReleases"
        :key="release.id"
        :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
        exact
        :class="[$options.filters.bootstrapClass(release.releaseStatus, 'badge'), 'badge ml-1']"
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
    }
  }
}
</script>
