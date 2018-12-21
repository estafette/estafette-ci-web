<template>
  <div
    class="alert rounded border"
    :class="[alertClass, borderClass]"
    role="alert"
  >
    <mark-down>{{ warning.message }}</mark-down>
  </div>
</template>

<script>
export default {
  components: {
    'MarkDown': () => import(/* webpackChunkName: "marked" */ '@/components/MarkDown')
  },
  props: {
    warning: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      alertClass: this.$options.filters.bootstrapClass(this.warning.status, 'alert'),
      borderClass: this.$options.filters.bootstrapClass(this.warning.status, 'border')
    }
  }
}
</script>
