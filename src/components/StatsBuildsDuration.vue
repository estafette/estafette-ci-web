<template>
    <div class="col-12 col-lg-3 col-xxxl p-0 stat">
      <div class="rounded border text-center" :class="status | bootstrapClass('border')">
        <h6 :class="status | bootstrapClass('text')">{{status | capitalize}} builds duration</h6>
        <p class="display-1" :class="status | bootstrapClass('text')">{{duration | formatDuration}}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    filter: Object,
    status: String
  },

  data: function () {
    return {
      duration: 0
    }
  },

  created () {
    this.loadStat()
  },

  methods: {
    loadStat () {
      axios.get(`/api/stats/buildsduration?filter[status]=${this.status}&filter[since]=${this.filter.since}`)
        .then(response => {
          this.duration = response.data.duration
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
