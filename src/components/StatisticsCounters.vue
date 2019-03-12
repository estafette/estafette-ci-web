<template>
  <div class="m-3">
    <div class="row mt-0 mr-0 mb-3 ml-0">
      <div class="col-12 col-sm-8 col-lg" />
      <div class="col-12 col-sm-4 col-lg-3 p-0 text-right">
        <since-selector
          :model="filter.since"
          :on-change="setSince"
        />
      </div>
    </div>

    <div class="row m-0">
      <stats-pipelines-count
        :filter="filter"
        status="all"
      />
      <stats-pipelines-count
        :filter="filter"
        status="succeeded"
      />
      <stats-pipelines-count
        :filter="filter"
        status="failed"
      />
      <stats-pipelines-count
        :filter="filter"
        status="running"
      />
      <stats-pipelines-count
        :filter="filter"
        status="canceled"
      />
    </div>

    <div class="row m-0">
      <stats-builds-count
        :filter="filter"
        status="all"
      />
      <stats-builds-count
        :filter="filter"
        status="succeeded"
      />
      <stats-builds-count
        :filter="filter"
        status="failed"
      />
      <stats-builds-count
        :filter="filter"
        status="running"
      />
      <stats-builds-count
        :filter="filter"
        status="canceled"
      />
    </div>

    <div class="row m-0">
      <stats-releases-count
        :filter="filter"
        status="all"
      />
      <stats-releases-count
        :filter="filter"
        status="succeeded"
      />
      <stats-releases-count
        :filter="filter"
        status="failed"
      />
      <stats-releases-count
        :filter="filter"
        status="running"
      />
      <stats-releases-count
        :filter="filter"
        status="canceled"
      />
    </div>
  </div>
</template>

<script>
import SinceSelector from '@/components/SinceSelector'

export default {
  components: {
    StatsPipelinesCount: () => import(/* webpackChunkName: "tweenlite" */ '@/components/StatsPipelinesCount'),
    StatsBuildsCount: () => import(/* webpackChunkName: "tweenlite" */ '@/components/StatsBuildsCount'),
    StatsReleasesCount: () => import(/* webpackChunkName: "tweenlite" */ '@/components/StatsReleasesCount'),
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
