<template>
    <div class="col-12 col-sm p-0 stat">
      <div class="rounded border border-success text-center">
        <h6 class="text-muted">Nr of pipelines</h6>
        <p class="display-1">{{count}}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    filter: Object
  },

  data: function () {
    return {
      count: '-'
    }
  },

  created () {
    this.loadStat()
  },

  methods: {
    loadStat () {
      axios.get(`/api/stats/pipelinescount?filter[since]=${this.filter.since}`)
        .then(response => {
          this.count = response.data.count
          this.periodicallyRefreshStat(15)
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshStat(60)
        })
    },

    periodicallyRefreshStat (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      this.refreshTimeout = setTimeout(this.loadStat, timeoutWithJitter)
    }
  },

  watch: {
    '$route' (to, from) {
      this.loadStat()
    }
  },

  beforeDestroy () {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
