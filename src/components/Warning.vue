<template>
  <b-alert
    :variant="$options.filters.bootstrapVariant(this.warning.status)"
    show
    class="d-flex flex-row h-100"
  >
    <font-awesome-icon
      icon="exclamation-circle"
      class="h2 mr-3 align-self-center"
    />
    <mark-down>{{ warning.message }}</mark-down>
  </b-alert>
</template>

<script>
import { BAlert } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationCircle)

export default {
  components: {
    BAlert,
    'MarkDown': () => import(/* webpackChunkName: "marked" */ '@/components/MarkDown'),
    FontAwesomeIcon
  },
  props: {
    warning: {
      type: Object,
      default: null
    }
  }
}
</script>
