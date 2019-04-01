<template>
  <div class="container-fluid">
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
          class="bg-light p-3"
        ><code>{{ credentials }}</code></pre>

        <h3 id="trustedimages">
          Trusted images
        </h3>
        <pre
          v-if="trustedimages"
          class="bg-light p-3"
        ><code>{{ trustedimages }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
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

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
