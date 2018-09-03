<template>
    <div class="m-3">
      <div class="row mt-0 mr-0 mb-3 ml-0">
        <div class="col-12 col-sm-8 col-lg"></div>
        <div class="col-12 col-sm-4 col-lg-2 p-0 text-right">
          <b-form-select v-model="filter.since" :options="sinceOptions" v-on:change="setSince" class="border-primary text-primary" />
        </div>
      </div>
      <div class="row m-0">
        <stats-pipelines-count :filter="filter" status="all"/>
        <stats-pipelines-count :filter="filter" status="succeeded"/>
        <stats-pipelines-count :filter="filter" status="failed"/>
        <stats-pipelines-count :filter="filter" status="running"/>

        <stats-builds-count :filter="filter" status="all"/>
        <stats-builds-count :filter="filter" status="succeeded"/>
        <stats-builds-count :filter="filter" status="failed"/>
        <stats-builds-count :filter="filter" status="running"/>
      </div>
      <!-- <div class="row m-0">
        <stats-builds-duration :filter="filter" status="all"/>
        <stats-builds-duration :filter="filter" status="succeeded"/>
        <stats-builds-duration :filter="filter" status="failed"/>
        <stats-builds-duration :filter="filter" status="running"/>
      </div> -->
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      filter: {
        since: '1d'
      },
      sinceOptions: [
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
      this.$router.push({query: { since: this.filter.since }})
    },

    setSince (value) {
      this.filter.since = value
      this.updateQueryParams()
    }
  }
}
</script>
