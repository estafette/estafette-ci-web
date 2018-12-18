<template>
<div class="alert rounded border" :class="[alertClass, borderClass]" role="alert">
  <vue-markdown>{{warning.message}}</vue-markdown>
</div>
</template>

<script>
export default {
  components: {
    'vue-markdown': () => import(/* webpackChunkName: "vue-markdown" */ 'vue-markdown')
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
