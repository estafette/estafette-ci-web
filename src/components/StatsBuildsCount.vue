<template>
  <div class="col-12 col-md-6 col-xxl p-0 stat">
    <div
      :class="[
        'rounded border text-center bg-white'
      ]"
    >
      <h6 :class="[$options.filters.bootstrapClass(status, 'text')]">
        {{ status | capitalize }} builds
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
import gsap from 'gsap'

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
      let statusFilter = `filter[status]=${this.status}`
      if (this.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }

      this.axios.get(`/api/stats/buildscount?${statusFilter}&filter[since]=${this.filter.since}`)
        .then(response => {
          gsap.to(this.$data, { duration: 1.0, count: response.data.count })
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

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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
