<template>
<div class="alert rounded border" :class="[alertClass, borderClass]" role="alert">
  <mark-down>{{warning.message}}</mark-down>
</div>
</template>

<script>
export default {
  components: {
    'mark-down': () => import(/* webpackChunkName: "mark-down" */ '@/components/MarkDown')
  },
  props: {
    warning: Object
  },
  data: function () {
    return {
      alertClass: this.$options.filters.bootstrapClass(this.warning.status, 'alert'),
      borderClass: this.$options.filters.bootstrapClass(this.warning.status, 'border')
    }
  }
}
</script>
