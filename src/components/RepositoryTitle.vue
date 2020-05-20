<template>
  <span>
    <span class="text-muted d-none d-lg-inline">{{ repo.repoSource }}/{{ repo.repoOwner }}/</span><strong>{{ repo.repoName }}</strong>
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
