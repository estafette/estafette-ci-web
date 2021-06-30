<template>
  <font-awesome-icon
    v-if="supported"
    :icon="icon"
    v-b-tooltip.hover
    :title="status"
  />
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faDotCircle, faPauseCircle, faPlayCircle, faPlusCircle, faStopCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckCircle, faPlayCircle, faTimesCircle, faDotCircle, faStopCircle, faPauseCircle, faPlusCircle)

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    status: {
      type: String,
      default: null
    }
  },
  data: function () {
    return {
      icons: {
        succeeded: 'check-circle',
        running: 'play-circle',
        failed: 'times-circle',
        skipped: 'dot-circle',
        canceled: 'stop-circle',
        canceling: 'pause-circle',
        pending: 'plus-circle'
      }
    }
  },
  computed: {
    supported () {
      return this.status && this.status.toLowerCase() in this.icons
    },
    icon () {
      return this.icons[this.status.toLowerCase()]
    }
  }
}
</script>
