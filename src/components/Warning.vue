<template>
  <div
    class="alert rounded border d-flex flex-row h-100"
    :class="[alertClass, borderClass]"
    role="alert"
  >
    <font-awesome-icon
      icon="exclamation-circle"
      class="h2 mr-3 align-self-center"
    />
    <mark-down>{{ warning.message }}</mark-down>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationCircle)

export default {
  components: {
    'MarkDown': () => import(/* webpackChunkName: "marked" */ '@/components/MarkDown'),
    FontAwesomeIcon
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
