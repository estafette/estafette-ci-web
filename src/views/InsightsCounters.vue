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

    <div class="row ml-0">
      <stats-pipelines-count
        v-for="status in statuses"
        :key="status"
        :filter="filter"
        :status="status"
      />
    </div>

    <div class="row ml-0">
      <stats-builds-count
        v-for="status in statuses"
        :key="status"
        :filter="filter"
        :status="status"
      />
    </div>

    <div class="row ml-0">
      <stats-releases-count
        v-for="status in statuses"
        :key="status"
        :filter="filter"
        :status="status"
      />
    </div>

    <div class="row ml-0">
      <stats-bots-count
        v-for="status in statuses"
        :key="status"
        :filter="filter"
        :status="status"
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
    StatsBotsCount: () => import(/* webpackChunkName: "tweenlite" */ '@/components/StatsBotsCount'),
    SinceSelector
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
      const query = { ...this.$route.query }
      const newQuerySince = this.filter.since

      if (query.since !== newQuerySince) {
        query.since = newQuerySince

        this.$router.push({ query: query })
      }
    },

    setSince (value) {
      this.filter.since = value
      this.updateQueryParams()
    }
  }
}
</script>
