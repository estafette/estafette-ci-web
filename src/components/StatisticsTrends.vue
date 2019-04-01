<template>
  <div class="m-3 row">
    <div
      class="col-12 h2 text-center text-white mb-5"
      v-if="dashboardModeActive"
    >
      <font-awesome-icon
        icon="chart-line"
        class="mr-2"
      />
      Trends
    </div>

    <div class="col-12 col-xl-6">
      <stats-adoption
        type="builds"
        status="primary"
        class="mb-3"
      />
    </div>
    <div class="col-12 col-xl-6">
      <stats-adoption
        type="releases"
        status="success"
        class="mb-3"
      />
    </div>
  </div>
</template>

<script>
import StatsAdoption from '@/components/StatsAdoption'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChartLine)

export default {
  components: {
    StatsAdoption,
    FontAwesomeIcon
  },

  props: {
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  }
}
</script>
