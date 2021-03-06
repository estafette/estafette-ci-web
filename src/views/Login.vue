<template>
  <div>
    <b-jumbotron
      header="Estafette"
      bg-variant="dark"
      text-variant="success"
      header-level="4"
      container-fluid
      fluid
      class="section-header"
    />

    <div class="row mr-0 ml-0">
      <div class="col-12">
        <b-jumbotron
          lead="Your portal to application development & management"
          bg-variant="white"
          text-variant="dark"
          header-level="3"
          container-fluid
          fluid
          class="mb-3 pl-4 pt-4 pr-4 pb-5 rounded border"
        >
          <template
            #header
          >
            <span class="text-success font-italic">
              Estafette
            </span>
          </template>

          <p>For more information visit the public website.</p>

          <b-button
            variant="success"
            href="https://estafette.io/"
            target="_blank"
          >
            Learn more
          </b-button>
        </b-jumbotron>
      </div>
    </div>

    <div class="row justify-content-center ml-3 mr-3 border rounded bg-white pt-5 pb-5">
      <div class="col-12 col-md-6 col-xl-3 text-center">
        <h1 class="display-4">
          Login
        </h1>
        <p>Please log in with one of the following providers:</p>
        <b-button
          v-for="provider in providers"
          :key="provider.id"
          :href="path(provider)"
          variant="success"
          block
          class="mt-3 mb-3"
        >
          <font-awesome-icon
            :icon="['fab', provider.id]"
            class="mr-2"
          />
          {{ provider.name }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BJumbotron, BButton } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle, faMicrosoft, faFacebook, faGithub, faBitbucket, faGitlab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGoogle, faMicrosoft, faFacebook, faGithub, faBitbucket, faGitlab)

export default {
  components: {
    BJumbotron,
    BButton,
    FontAwesomeIcon
  },

  data: function () {
    return {
      providers: []
    }
  },

  created () {
    this.loadProviders()
  },

  methods: {
    path (provider) {
      let path = provider.path

      let hasQueryParam = false
      const returnURL = this.$route.query.returnURL
      if (returnURL) {
        path += '?returnURL=' + returnURL
        hasQueryParam = true
      }

      if (provider.organization) {
        if (hasQueryParam) {
          path += '&'
        } else {
          path += '?'
        }
        path += 'organization=' + provider.organization
      }

      return path
    },

    loadProviders () {
      this.axios.get('/api/auth/providers')
        .then(response => {
          this.providers = response.data
        })
        .catch(e => {
          console.warn(e)
        })
    }
  }
}
</script>
