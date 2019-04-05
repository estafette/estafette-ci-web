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

    <div
      v-if="pipeline && pipeline.triggers && pipeline.triggers.length > 0"
      class="alert alert-secondary text-center p-5"
    >
      WORK IN PROGRESS - visualize triggers
    </div>

    <div
      v-else
      class="alert alert-warning text-center p-5"
    >
      This pipeline has no triggers; if you want the pipeline to trigger on other events than a git push look at the <a
        href="https://estafette.io/usage/manifest/#triggers"
        target="_blank"
      >
        documentation
      </a> on how to start using triggers.
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
