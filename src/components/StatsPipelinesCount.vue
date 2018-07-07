<template>
    <div class="col-12 col-lg-3 col-xxxl p-0 stat">
      <div class="rounded border text-center" :class="status | bootstrapClass('border')">
        <h6 :class="status | bootstrapClass('text')">{{status | capitalize}} pipelines</h6>
        <p class="display-1" :class="status | bootstrapClass('text')">{{animatedCount}}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import TweenLite from 'gsap/TweenMax'

export default {
  props: {
    filter: Object,
    status: String
  },

  data: function () {
    return {
      count: 0
    }
  },

  created () {
    this.loadStat()
  },

  methods: {
    loadStat () {
      axios.get(`/api/stats/pipelinescount?filter[status]=${this.status}&filter[since]=${this.filter.since}`)
        .then(response => {
          TweenLite.to(this.$data, 0.5, { count: response.data.count })
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

  computed: {
    animatedCount: function () {
      return this.count.toFixed(0)
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
