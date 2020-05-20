<template>
  <span
    v-if="duration && duration > 0"
    class="d-none d-sm-inline"
  >
    in <span :class="$options.filters.colorDurationClass(duration)">{{ duration | formatDuration }}</span>
  </span>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: null
    }
  }
}
</script>
