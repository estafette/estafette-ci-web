<template>
<div class="alert rounded border" :class="[alertClass, borderClass]" role="alert">
  <vue-markdown>{{warning.message}}</vue-markdown>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    'vue-markdown': VueMarkdown
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
