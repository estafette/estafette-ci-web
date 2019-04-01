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
        icon="chart-pie"
        class="mr-2"
      />
      Counters
    </div>

    <div class="row m-0">
      <stats-pipelines-count
        v-for="status in statuses"
        :key="status"
        :filter="filter"
        :status="status"
        :dashboard-mode-active="dashboardModeActive"
      />
    </div>

    <div class="row m-0">
      <stats-builds-count
        v-for="status in statuses"
        :key="status"
        :filter="filter"
        :status="status"
        :dashboard-mode-active="dashboardModeActive"
      />
    </div>

    <div class="row m-0">
      <stats-releases-count
        v-for="status in statuses"
        :key="status"
        :filter="filter"
        :status="status"
        :dashboard-mode-active="dashboardModeActive"
      />
    </div>
  </div>
</template>

<script>
import SinceSelector from '@/components/SinceSelector'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChartPie)

export default {
  components: {
    StatsPipelinesCount: () => import(/* webpackChunkName: "tweenlite" */ '@/components/StatsPipelinesCount'),
    StatsBuildsCount: () => import(/* webpackChunkName: "tweenlite" */ '@/components/StatsBuildsCount'),
    StatsReleasesCount: () => import(/* webpackChunkName: "tweenlite" */ '@/components/StatsReleasesCount'),
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
      },
      statuses: [
        'all',
        'succeeded',
        'failed',
        'running',
        'canceled'
      ]
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
