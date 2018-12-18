<template>
  <div class="m-3">
    <div class="row mt-0 mr-0 mb-3 ml-0">
      <div class="col-12 col-sm-8 col-lg"></div>
      <div class="col-12 col-sm-4 col-lg-2 p-0 text-right">
        <b-form-select v-model="filter.last" :options="lastOptions" v-on:change="setLast" class="border-primary text-primary" />
      </div>
    </div>

    <div class="m-3 row">
      <pipeline-stats-timeline :pipeline="pipeline" :filter="filter" type="builds" status="primary" />
      <pipeline-stats-timeline v-if="pipeline.releaseTargets && pipeline.releaseTargets.length > 0" :pipeline="pipeline" :filter="filter" type="releases" status="success" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'pipeline-stats-timeline': () => import(/* webpackChunkName: "components" */ '@/components/PipelineStatsTimeline'),
    'b-form-select': () => import(/* webpackChunkName: "bootstrap-vue" */ 'bootstrap-vue/es/components/form-select/form-select')
  },

  props: {
    query: Object,
    pipeline: Object
  },
  data: function () {
    return {
      filter: {
        last: '100'
      },
      lastOptions: [
        { value: '25', text: 'Last 25 builds/releases' },
        { value: '100', text: 'Last 100 builds/releases' },
        { value: '250', text: 'Last 250 builds/releases' },
        { value: '1000', text: 'Last 1000 builds/releases' },
        { value: '25000', text: 'All builds/releases' }
      ]
    }
  },

  created () {
    this.setDataFromQueryParams(this.query)
  },

  methods: {
    setDataFromQueryParams (query) {
      this.filter.last = query && query.last ? query.last : '100'
    },

    updateQueryParams () {
      this.$router.push({ query: { last: this.filter.last } })
    },

    setLast (value) {
      this.filter.last = value
      this.updateQueryParams()
    }
  }
}
</script>
