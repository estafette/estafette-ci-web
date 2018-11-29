<template>

  <div class="container-fluid">
    <div class="row">
      <div class="col mt-4 mb-4 border-right sidebar d-none d-lg-block">
        <ul>
          <li class="section-item">
            <router-link v-if="user && user.authenticated" :to="{ name: 'Config'}" class="section-item-link ancestor active">Configuration</router-link>
            <ul>
              <li class="page-item"><a href="#credentials" class="page-item-link">Credentials</a></li>
              <li class="page-item"><a href="#trustedimages" class="page-item-link">Trusted images</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="col mt-4 mb-4 pl-5 pt-4 content-block">
        <h1 class="mb-4">Configuration</h1>

        <h3 id="credentials">Credentials</h3>
        <pre v-if="credentials" class="bg-light p-3"><code>{{credentials}}</code></pre>

        <h3 id="trustedimages">Trusted images</h3>
        <pre v-if="trustedimages" class="bg-light p-3"><code>{{trustedimages}}</code></pre>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
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
          this.errors.push(e)
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

<style lang="scss" scoped>
pre {
  background-color: #f8f9fa!important;
  padding: 1.5rem!important;
  border: 1px solid #dee2e6;
  border-radius: .25rem;

  code {
      color: #212529;
      padding: 0;
  }
}

code {
  background-color: #f8f9fa!important;
  color:#28a745;
  padding: .5rem .1rem .5rem .1rem;
}

.content-block {
    overflow: hidden;

    pre {
        margin-top: 1.5rem!important;
        margin-bottom: 2.5rem!important;
        max-width: 640px;
        transition: all .5s;

        &:hover {
            max-width: 100%;
        }
    }

    p {
        max-width: 640px;
    }
}

.sidebar {
    min-width: 280px;
    max-width: 280px;
    padding-top: 1.5rem!important;
    padding-bottom: 1.5rem!important;

    & > ul {
        margin-top: .25rem!important;
        margin-bottom: .25rem!important;
        padding-left: 0;
        list-style: none;

        & > li {
            margin-top: 1rem!important;
            margin-bottom: 1rem!important;

            & > a {
                color: #343a40!important;
                font-weight: bold;
            }

            ul {
                margin-top: .5rem!important;
                margin-bottom: .5rem!important;
                padding-left: 1.3rem!important;
                list-style: none;
            }

            li {
                margin-top: .5rem!important;
                margin-bottom: .5rem!important;
            }
        }
    }

    .section-item-link {

        &::before {
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: .45em;
            margin-right: .45em;
            vertical-align: .1em;
            content: "";
            border-left: .3em solid;
            border-top: .3em solid transparent;
            border-right: 0;
            border-bottom: .3em solid transparent;
        }

        &.ancestor::before {
            display: inline-block;
            width: 0;
            height: 0;
            margin-left: .3em;
            margin-right: .3em;
            vertical-align: .255em;
            content: "";
            border-top: .3em solid;
            border-right: .3em solid transparent;
            border-bottom: 0;
            border-left: .3em solid transparent;
        }
    }

    .section-item-link.active,
    .page-item-link.active {
        color: #28a745!important;
    }
}
</style>
