<template>
  <span
    v-if="duration && duration > 0"
    class="d-none d-sm-inline"
    v-b-tooltip.hover
    :title="title"
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
    },
    pendingDuration: {
      type: Number,
      default: null
    }
  },
  computed: {
    title () {
      if (this.pendingDuration > 0) {
        return `Started after ${this.$options.filters.formatDuration(this.pendingDuration)}`
      }

      return ''
    }
  }
}
</script>
