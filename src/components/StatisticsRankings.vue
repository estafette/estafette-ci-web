<template>
  <div class="m-3">
    <div class="row mt-0 mr-0 mb-3 ml-0">
      <div class="col-12 col-sm-8 col-lg" />
      <div class="col-12 col-sm-4 col-lg-2 p-0 text-right">
        <b-form-select
          v-model="filter.since"
          :options="sinceOptions"
          @change="setSince"
          class="border-primary text-primary"
        />
      </div>
    </div>

    <div class="row m-0" />

    <div class="row">
      <div class="col-12 col-xl-6">
        <stats-ranking-table
          :filter="filter"
          type="builds"
          status="primary"
        />
      </div>
      <div class="col-12 col-xl-6">
        <stats-ranking-table
          :filter="filter"
          type="releases"
          status="success"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatsRankingTable from '@/components/StatsRankingTable'
import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select'

export default {
  components: {
    StatsRankingTable,
    bFormSelect
  },

  data: function () {
    return {
      filter: {
        since: '1d'
      },
      sinceOptions: [
        { value: '1h', text: 'Since 1 hour ago' },
        { value: '1d', text: 'Since 1 day ago' },
        { value: '1w', text: 'Since 1 week ago' },
        { value: '1m', text: 'Since 1 month ago' },
        { value: '1y', text: 'Since 1 year ago' },
        { value: 'eternity', text: 'Since dawn of mankind' }
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
