<template>
  <div
    class="spinner-border estafette-spinner"
    :class="color | bootstrapClass('text')"
    role="status"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: null
    }
  }
}
</script>
