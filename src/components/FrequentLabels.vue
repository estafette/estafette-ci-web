<template>
  <div
    class="btn-group mb-3 text-truncate"
    v-if="filteredLabels.length > 0"
  >
    <a class="btn btn-outline-light bg-btn-group-prepend">
      <font-awesome-icon icon="tags" />
    </a>
    <router-link
      :to="{ query: { status: filter.status, since: filter.since, labels: label.key + '=' + label.value, page: 1 } }"
      exact
      class="btn btn-outline-secondary border-btn-group"
      v-for="label in filteredLabels"
      tag="span"
      :key="label.key=label.value"
    >
      {{ label.key }}={{ label.value }} ({{ label.count }})
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
      refresh: true
    }
  },

  created () {
    this.loadFrequentLabels()
  },

  methods: {
    loadFrequentLabels () {
      this.axios.get(`/api/labels/frequent?filter[status]=${this.filter.status}&filter[since]=${this.filter.since}&filter[search]=${this.filter.search}&filter[labels]=${this.filter.labels}`)
        .then(response => {
          this.labels = response.data.items

          this.periodicallyRefreshFrequentLabels(5)
        })
        .catch(e => {
          this.errors.push(e)
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
    }
  },

  computed: {
    filteredLabels () {
      if (!this.labels) {
        return []
      }

      var numberOfLabels = 7
      var filteredLabels = this.labels.filter(i => !this.filter || !this.filter.labels || `${i.key}=${i.value}` !== this.filter.labels).filter(i => i.count > 1)
      return filteredLabels.slice(0, filteredLabels.length > numberOfLabels ? numberOfLabels : filteredLabels.length)
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
