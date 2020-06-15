<template>
  <div class="m-3">
    <div class="row justify-content-center m-0">
      <div class="col-12 col-md-6 col-xl-3 text-center">
        <h1>Login</h1>
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
import { BButton } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGoogle, faMicrosoft, faFacebook, faGithub, faBitbucket, faGitlab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGoogle, faMicrosoft, faFacebook, faGithub, faBitbucket, faGitlab)

export default {
  components: {
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
      var path = provider.path

      var returnURL = this.$route.query.returnURL
      if (returnURL) {
        path += '?returnURL=' + returnURL
      }

      return path
    },

    loadProviders () {
      this.axios.get(`/api/auth/providers`)
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
