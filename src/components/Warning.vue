<template>
  <b-alert
    :variant="$options.filters.bootstrapVariant(this.warning.status)"
    show
    class="d-flex flex-row h-100"
  >
    <mark-down>{{ warning.message }}</mark-down>
  </b-alert>
</template>

<script>
// import { BAlert } from 'bootstrap-vue'

export default {
  components: {
    // BAlert,
    'MarkDown': () => import(/* webpackChunkName: "marked" */ '@/components/MarkDown')
  },
  props: {
    warning: {
      type: Object,
      default: null
    }
  }
}
</script>
