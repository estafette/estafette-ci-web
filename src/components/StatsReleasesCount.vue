<template>
    <div class="col-12 col-lg-3 col-xxxl p-0 stat">
      <div class="rounded border text-center" :class="status | bootstrapClass('border')">
        <h6 :class="status | bootstrapClass('text')">{{status | capitalize}} releases</h6>
        <p class="display-1" :class="status | bootstrapClass('text')">{{animatedCount}}</p>
      </div>
    </div>
</template>

<script>
import TweenLite from 'gsap/TweenLite'
import 'gsap/CSSPlugin'

export default {
  props: {
    filter: Object,
    status: String
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
      this.axios.get(`/api/stats/releasescount?filter[status]=${this.status}&filter[since]=${this.filter.since}`)
        .then(response => {
          TweenLite.to(this.$data, 1.0, { count: response.data.count })
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
