<template>
  <div v-if="user && user.active">
    <pre
      v-if="credentials"
      class="rounded border bg-white p-3"
    ><code class="bg-white">{{ credentials }}</code></pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      credentials: null,
      refresh: true
    }
  },

  created () {
    this.loadConfig()
  },

  methods: {
    loadConfig () {
      this.axios.get('/api/config/credentials/')
        .then(response => {
          this.credentials = response.data.config
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

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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
