<template>
    <div v-if="matchingReleases.length > 0" class="btn btn-light btn-sm mr-1 mb-1">{{releaseTarget.name}}<router-link v-for="release in matchingReleases" v-bind:key="release.id" :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}" exact class="badge ml-1" :class="release.releaseStatus | bootstrapClass('badge')" tag="span" :title="release.action"><span v-if="release.action">{{release.action}}: </span>{{release.releaseStatus}}</router-link></div>
</template>

<script>
export default {
  props: {
    releaseTarget: Object,
    build: Object
  },

  computed: {
    matchingReleases: function () {
      return this.build && this.build.buildStatus && this.build.buildStatus === 'succeeded' && this.releaseTarget && this.releaseTarget.activeReleases ? this.releaseTarget.activeReleases.filter(r => r.releaseVersion === this.build.buildVersion) : []
    }
  }
}
</script>
