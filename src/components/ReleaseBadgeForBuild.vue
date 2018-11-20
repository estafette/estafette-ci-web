<template>
  <span>
      <router-link v-for="release in matchingReleases" v-bind:key="release.name" :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}" exact class="btn btn-light btn-sm mr-1">
        {{release.name}}<span class="badge ml-1" :class="release.releaseStatus | bootstrapClass('badge')">{{release.releaseStatus | defaultValue('-')}}</span>
      </router-link>
  </span>
</template>

<script>
export default {
  props: {
    releaseTarget: Object,
    build: Object
  },

  computed: {
    matchingReleases: function () {
      return this.releaseTarget.activeReleases.filter(r => r.releaseVersion === this.build.buildVersion)
    }
  }
}
</script>
