<template>
  <div class="m-3">
    <h1><span :class="['text-muted d-none d-md-inline']">{{ catalogItem.repoSource }}/{{ catalogItem.repoOwner }}/</span><strong>{{ catalogItem.repoName }}</strong></h1>
  </div>
</template>

<script>
export default {
  props: {
    catalogItem: {
      type: Object,
      default: null
    }
  }
}
</script>
