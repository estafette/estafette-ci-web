<template>
  <b-input-group
    class="mb-3 d-inline-flex"
    v-if="filteredLabels.length > 1"
  >
    <b-input-group-prepend
      is-text
      v-vk-tooltip
      title="Filter pipelines on frequently used labels"
    >
      <font-awesome-icon icon="tags" />
    </b-input-group-prepend>
    <b-form-select
      v-model="mutableModel"
      :options="filteredLabels"
      @change="onChange"
      class="d-inline-flex"
    />
  </b-input-group>
</template>

<script>
// import { BInputGroup, BInputGroupPrepend, BFormSelect } from 'bootstrap-vue'
import queryGenerator from '@/mixins/queryGenerator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTags)

export default {
  components: {
    // BInputGroup,
    // BInputGroupPrepend,
    // BFormSelect,
    FontAwesomeIcon
  },

  props: {
    filter: {
      type: Object,
      default: null
    }
  },

  mixins: [queryGenerator],

  data: function () {
    return {
      labels: [],
      pagination: {
        page: 1,
        size: 15
      },
      refresh: true,
      mutableModel: null
    }
  },

  created () {
    this.loadFrequentLabels()
  },

  methods: {
    loadFrequentLabels () {
      var labelFilterParams = ''
      if (this.filter && this.filter.labels && this.filter.labels.length > 0) {
        labelFilterParams = this.filter.labels.split(',').join('&filter[labels]=')
      }

      var statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += `&filter[status]=pending&filter[status]=canceling`
      }

      this.axios.get(`/api/labels/frequent?${statusFilter}&filter[since]=${this.filter.since}&filter[search]=${this.filter.search}&filter[labels]=${labelFilterParams}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.labels = response.data.items
          this.periodicallyRefreshFrequentLabels(5)
        })
        .catch(e => {
          this.periodicallyRefreshFrequentLabels(30)
        })
    },

    periodicallyRefreshFrequentLabels (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadFrequentLabels, timeoutWithJitter)
      }
    },

    labelLinkGenerator (label) {
      if (!this.filter || !this.filter.labels || this.filter.labels.length === 0) {
        return label
      }

      return this.filter.labels + ',' + label
    },

    onChange (value) {
      this.$router.push({ query: this.queryGenerator({ labels: this.labelLinkGenerator(value), page: 1 }) })
      this.mutableModel = null
    }
  },

  computed: {
    filteredLabels () {
      if (!this.labels) {
        return []
      }

      var selectedLabelsArray = []
      if (this.filter && this.filter.labels) {
        selectedLabelsArray = this.filter.labels.split(',')
      }

      return [{ value: null, text: 'Frequent labels' }].concat(this.labels.filter(i => selectedLabelsArray.indexOf(`${i.key}=${i.value}`) === -1).map(i => {
        return {
          value: `${i.key}=${i.value}`,
          text: `${i.key}=${i.value} (${i.pipelinescount})`
        }
      }))
    }
  },

  watch: {
    filter: {
      handler: function (to, from) {
        this.loadFrequentLabels()
      },
      deep: true
    }
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
