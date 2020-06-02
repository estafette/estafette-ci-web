<template>
  <div class="m-3">
    <div class="row justify-content-center m-0">
      <div class="col-12 col-md-6 col-xl-3 text-center">
        <h1>Login</h1>
        <p>Please log in with one of the following providers:</p>
        <b-button
          v-for="provider in providers"
          :key="provider.id"
          :href="'/api/login/'+provider.id"
          type="submit"
          block
          class="mt-3 mb-3"
        >
          {{ provider.name }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'

export default {
  components: {
    BButton
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
