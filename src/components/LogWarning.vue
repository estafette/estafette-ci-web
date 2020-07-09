<template>
  <span
    v-if="step && step.logLines && step.logLines.length > 1000"
    class="text-danger align-bottom"
    v-b-tooltip.hover
    title="This stage has a large number of log lines; please make it less verbose to keep things responsive"
  >
    <font-awesome-icon
      icon="exclamation-triangle"
    />
  </span>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationTriangle)

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    step: {
      type: Object,
      default: null
    }
  }
}
</script>
