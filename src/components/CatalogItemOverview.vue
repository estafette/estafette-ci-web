<template>
  <div class="m-3">
    <h1>{{ catalogItem.repoName }}</h1>
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
