<template>
  <div v-if="user && user.active">
    <pre
      v-if="buildControl"
      class="rounded border bg-white p-3"
    ><code class="bg-white">{{ buildControl }}</code></pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      buildControl: null,
      refresh: true
    }
  },

  created () {
    this.loadConfig()
  },

  methods: {
    loadConfig () {
      this.axios.get('/api/config/buildControl')
        .then(response => {
          this.buildControl = response.data.config
          this.periodicallyRefreshConfig(60)
        })
        .catch(e => {
          this.periodicallyRefreshConfig(120)
        })
    },

    periodicallyRefreshConfig (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadConfig, timeoutWithJitter)
      }
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
