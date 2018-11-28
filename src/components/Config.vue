<template>
  <div>
    <nav class="m-3" aria-label="breadcrumb">
      <ol class="breadcrumb flex-nowrap">
        <li class="breadcrumb-item text-truncate active">Configuration</li>
      </ol>
    </nav>

    <pre v-if="config" class="bg-light m-3 p-3">{{config}}</pre>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      config: null,
      refresh: true
    }
  },

  created () {
    this.loadConfig()
  },

  methods: {
    loadConfig () {
      this.axios.get(`/api/config`)
        .then(response => {
          this.config = response.data.config
          this.periodicallyRefreshStat(60)
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshStat(120)
        })
    },

    periodicallyRefreshConfig (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadConfig, timeoutWithJitter)
      }
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
