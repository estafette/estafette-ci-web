<template>
  <div class="m-3">
    <div
      class="h2 text-center text-white mt-5 mb-5"
      v-if="dashboardModeActive"
    >
      <font-awesome-icon
        icon="chart-line"
        class="mr-2"
      />
      Triggers
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faProjectDiagram)

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  }
}
</script>
