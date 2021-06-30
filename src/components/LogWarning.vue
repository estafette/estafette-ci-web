<template>
  <font-awesome-icon
    v-if="step && step.logLines && step.logLines.length > maxLinesToShow"
    v-b-tooltip.hover
    :title="`This stage has a total of ${step.logLines.length} log lines; please make it less verbose to avoid it getting truncated`"
    icon="exclamation-circle"
  />
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationCircle)

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    step: {
      type: Object,
      default: null
    },
    maxLinesToShow: {
      type: Number,
      default: 1000
    }
  }
}
</script>
