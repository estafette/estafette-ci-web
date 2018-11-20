<template>
  <span v-if="releaseTarget">
    <div v-if="releaseTarget.activeReleases.length > 0" class="btn btn-light btn-sm mr-1 mb-1">{{releaseTarget.name}}<router-link v-for="release in releaseTarget.activeReleases" v-bind:key="release.id" :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}" exact class="badge ml-1" :class="release.releaseStatus | bootstrapClass('badge')" tag="span" :title="release.action">{{release.releaseVersion | defaultValue('-')}}</router-link></div>
    <div v-else class="btn btn-light btn-sm mr-1 mb-1">{{releaseTarget.name}}<span class="badge ml-1 badge-light">-</span></div>
  </span>
</template>

<script>
export default {
  props: {
    releaseTarget: Object
  }
}
</script>
