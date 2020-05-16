<template>
  <div
    class="btn-group mb-3 text-truncate bg-white"
    v-if="filteredLabels.length > 0"
  >
    <a class="btn btn-outline-light bg-btn-group-prepend icon-container">
      <font-awesome-icon icon="tags" />
    </a>
    <router-link
      :to="{ query: { status: filter.status, since: filter.since, labels: labelLinkGenerator(label), page: 1 } }"
      exact
      class="btn btn-outline-secondary border-btn-group"
      v-for="label in filteredLabels"
      tag="span"
      :key="label.key+'='+label.value"
    >
      {{ label.key }}={{ label.value }} ({{ label.pipelinescount }})
    </router-link>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTags)

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    filter: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      labels: [],
      pagination: {
        page: 1,
        size: 7
      },
      refresh: true
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
        return label.key + '=' + label.value
      }

      return this.filter.labels + ',' + label.key + '=' + label.value
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

      return this.labels.filter(i => selectedLabelsArray.indexOf(`${i.key}=${i.value}`) === -1)
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
