<template>
  <div>
    <b-jumbotron
      header="Configuration"
      bg-variant="secondary"
      text-variant="white"
      header-level="5"
      container-fluid
      fluid
      class="section-header"
    />

    <div class="row m-0">
      <div class="col-auto d-none d-lg-block">
        <inner-navigation-bar
          :items="items"
        />
      </div>
      <div class="col p-3">
        <h3 id="credentials">
          Credentials
        </h3>
        <pre
          v-if="credentials"
          class="rounded border bg-white p-3"
        ><code class="bg-white">{{ credentials }}</code></pre>

        <h3 id="trustedimages">
          Trusted images
        </h3>
        <pre
          v-if="trustedimages"
          class="rounded border bg-white p-3"
        ><code class="bg-white">{{ trustedimages }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BJumbotron } from 'bootstrap-vue'
import InnerNavigationBar from '@/components/InnerNavigationBar'

export default {
  components: {
    BJumbotron,
    InnerNavigationBar
  },

  data: function () {
    return {
      credentials: null,
      trustedimages: null,
      refresh: true,
      items: [
        {
          text: 'Credentials',
          href: '#credentials'
        },
        {
          text: 'Trusted images',
          href: '#trustedimages'
        }
      ]
    }
  },

  created () {
    this.loadConfig()
  },

  methods: {
    loadConfig () {
      this.axios.all([
        this.axios.get('/api/config/credentials'),
        this.axios.get('/api/config/trustedimages')
      ])
        .then(this.axios.spread((credentialsResponse, trustedimagesResponse) => {
          this.credentials = credentialsResponse.data.config
          this.trustedimages = trustedimagesResponse.data.config
          this.periodicallyRefreshConfig(60)
        }))
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
