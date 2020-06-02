<template>
  <span :title="repo.repoSource+'/'+repo.repoOwner+'/'+repo.repoName">
    <span class="repo-source-and-owner">{{ repo.repoSource }}/{{ repo.repoOwner }}/</span><strong>{{ repo.repoName }}</strong>
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
