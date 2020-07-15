<template>
  <div>
    <div class="row m-0">
      <div class="col-12 col-sm-8 col-lg" />
      <div class="col-12 col-sm-4 col-lg-3 p-0 text-right">
        <since-selector
          :model="filter.since"
          :on-change="setSince"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-xl-6 col-xxxl-4">
        <stats-pipeline-ranking-table
          :filter="filter"
          type="builds"
          status="primary"
        />
      </div>
      <div class="col-12 col-xl-6 col-xxxl-4">
        <stats-pipeline-ranking-table
          :filter="filter"
          type="releases"
          status="success"
        />
      </div>
      <div class="col-12 col-xl-6 col-xxxl-4">
        <stats-label-ranking-table
          :filter="filter"
          type="frequent"
          status="warning"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatsPipelineRankingTable from '@/components/StatsPipelineRankingTable'
import StatsLabelRankingTable from '@/components/StatsLabelRankingTable'
import SinceSelector from '@/components/SinceSelector'

export default {
  components: {
    StatsPipelineRankingTable,
    StatsLabelRankingTable,
    SinceSelector
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
