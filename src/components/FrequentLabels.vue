<template>
  <b-button-group
    class="mb-3 bg-white"
    v-if="filteredLabels.length > 0"
  >
    <b-input-group-prepend
      is-text
    >
      <font-awesome-icon icon="tags" />
    </b-input-group-prepend>
    <b-dropdown
      text="Frequent labels"
      variant="outline"
      class="border rounded-right bg-white"
    >
      <b-dropdown-item
        :to="{ query: { status: filter.status, since: filter.since, labels: labelLinkGenerator(label), page: 1 } }"
        exact
        v-for="label in filteredLabels"
        :key="label.key+'='+label.value"
      >
        {{ label.key }}={{ label.value }} ({{ label.pipelinescount }})
      </b-dropdown-item>
    </b-dropdown>
  </b-button-group>
</template>

<script>
import { BButtonGroup, BDropdown, BDropdownItem, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTags)

export default {
  components: {
    BButtonGroup,
    BDropdown,
    BDropdownItem,
    BInputGroupPrepend,
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
        size: 15
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
