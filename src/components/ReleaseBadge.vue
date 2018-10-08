<template>
  <span v-if="release">
    <router-link v-if="release.id" :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}" exact class="btn btn-light btn-sm mr-1 mb-1">
      {{release.name}} <span class="badge" :class="release.releaseStatus | bootstrapClass('badge')">{{release.releaseVersion | defaultValue('-')}}</span>
    </router-link>
    <div v-else class="btn btn-light btn-sm mr-1 mb-1">
      {{release.name}} <span class="badge" :class="release.releaseStatus | bootstrapClass('badge')">{{release.releaseVersion | defaultValue('-')}}</span>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    release: Object
  }
}
</script>
