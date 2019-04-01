<template>
  <div class="m-3">
    <div
      class="row mt-0 mr-0 mb-3 ml-0"
      v-if="!dashboardModeActive"
    >
      <div class="col-12 col-sm-8 col-lg" />
      <div class="col-12 col-sm-4 col-lg-3 p-0 text-right">
        <since-selector
          :model="filter.since"
          :on-change="setSince"
        />
      </div>
    </div>

    <div
      class="h2 text-center text-white mb-5"
      v-if="dashboardModeActive"
    >
      <font-awesome-icon
        icon="list-ol"
        class="mr-2"
      />
      Rankings
    </div>

    <div class="row m-0" />

    <div class="row">
      <div class="col-12 col-xl-6 col-xxxl-4">
        <stats-pipeline-ranking-table
          :filter="filter"
          type="builds"
          status="primary"
          :dashboard-mode-active="dashboardModeActive"
        />
      </div>
      <div class="col-12 col-xl-6 col-xxxl-4">
        <stats-pipeline-ranking-table
          :filter="filter"
          type="releases"
          status="success"
          :dashboard-mode-active="dashboardModeActive"
        />
      </div>
      <div class="col-12 col-xl-6 col-xxxl-4">
        <stats-label-ranking-table
          :filter="filter"
          type="frequent"
          status="warning"
          :dashboard-mode-active="dashboardModeActive"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatsPipelineRankingTable from '@/components/StatsPipelineRankingTable'
import StatsLabelRankingTable from '@/components/StatsLabelRankingTable'
import SinceSelector from '@/components/SinceSelector'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faListOl)

export default {
  components: {
    StatsPipelineRankingTable,
    StatsLabelRankingTable,
    SinceSelector,
    FontAwesomeIcon
  },

  props: {
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  },

  data: function () {
    return {
      filter: {
        since: '1d'
      }
    }
  },

  created () {
    this.setDataFromQueryParams(this.query)
  },

  methods: {
    setDataFromQueryParams (query) {
      this.filter.since = query && query.since ? query.since : '1d'

      this.updateQueryParams()
    },

    updateQueryParams () {
      this.$router.push({ query: { since: this.filter.since } })
    },

    setSince (value) {
      this.filter.since = value
      this.updateQueryParams()
    }
  }
}
</script>
