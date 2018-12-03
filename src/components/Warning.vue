<template>
<div class="alert rounded border" :class="[alertClass, borderClass]" role="alert">
  {{warning.message}}
</div>
</template>

<script>
export default {
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
