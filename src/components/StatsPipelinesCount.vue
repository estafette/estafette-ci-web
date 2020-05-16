<template>
  <div class="col-12 col-md-6 col-xxl p-0 stat">
    <div
      :class="[
        $options.filters.bootstrapClass(status, 'border'),
        'rounded border text-center bg-white'
      ]"
    >
      <h6 :class="[$options.filters.bootstrapClass(status, 'text')]">
        {{ status | capitalize }} pipelines
      </h6>
      <p
        class="display-1"
        :class="[$options.filters.bootstrapClass(status, 'text')]"
      >
        {{ animatedCount | formatNumber }}
      </p>
    </div>
  </div>
</template>

<script>
import TweenLite from 'gsap/TweenLite'
import 'gsap/CSSPlugin'

export default {
  props: {
    filter: {
      type: Object,
      default: null
    },
    status: {
      type: String,
      default: null
    }
  },

  data: function () {
    return {
      count: 0,
      refresh: true
    }
  },

  created () {
    this.loadStat()
  },

  methods: {
    loadStat () {
      var statusFilter = `filter[status]=${this.status}`
      if (this.status === 'running') {
        statusFilter += `&filter[status]=pending&filter[status]=canceling`
      }

      this.axios.get(`/api/stats/pipelinescount?${statusFilter}&filter[since]=${this.filter.since}`)
        .then(response => {
          TweenLite.to(this.$data, 1.0, { count: response.data.count })
          this.periodicallyRefreshStat(15)
        })
        .catch(e => {
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

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadStat, timeoutWithJitter)
      }
    }
  },

  computed: {
    animatedCount: function () {
      return this.count.toFixed(0)
    }
  },

  watch: {
    filter: {
      handler: function (to, from) {
        this.loadStat()
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
