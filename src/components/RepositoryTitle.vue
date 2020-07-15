<template>
  <span :title="repo.repoSource+'/'+repo.repoOwner+'/'+repo.repoName">
    <span class="repo-source-and-owner">{{ repo.repoSource }}/{{ repo.repoOwner }}/</span><span class="repo-name">{{ repo.repoName }}</span>
  </span>
</template>

<script>

export default {
  props: {
    repo: {
      type: Object,
      default: null
    }
  }
}
</script>
