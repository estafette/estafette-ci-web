<template>
  <div>
    <b-jumbotron
      header="Configuration"
      bg-variant="secondary"
      text-variant="white"
      header-level="5"
      container-fluid
      fluid
      class="mb-3 p-3"
    />

    <div class="row">
      <div class="col mt-4 mb-4 border-right sidebar d-none d-lg-block">
        <ul>
          <li class="section-item">
            <router-link
              v-if="user && user.authenticated"
              :to="{ name: 'Config'}"
              class="section-item-link ancestor active"
            >
              Configuration
            </router-link>
            <ul>
              <li class="page-item">
                <a
                  href="#credentials"
                  class="page-item-link"
                >
                  Credentials
                </a>
              </li>
              <li class="page-item">
                <a
                  href="#trustedimages"
                  class="page-item-link"
                >
                  Trusted images
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="col mt-4 mb-4 pl-5 pt-4 content-block">
        <h1 class="mb-4">
          Configuration
        </h1>

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

export default {
  components: {
    BJumbotron
  },

  data: function () {
    return {
      credentials: null,
      trustedimages: null,
      refresh: true
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
