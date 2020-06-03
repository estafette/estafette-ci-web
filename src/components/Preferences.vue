<template>
  <div v-if="user && user.authenticated">
    <b-jumbotron
      header="Preferences"
      bg-variant="secondary"
      text-variant="white"
      header-level="5"
      container-fluid
      fluid
      class="section-header"
    />

    <div class="row m-3">
      <div class="col-12">
        <h4>
          <b-avatar
            v-if="avatar"
            :src="avatar"
            class="mr-2"
          />
          {{ name }} ({{ email }})
        </h4>

        <h6>User object as stored in database</h6>
        <pre
          v-if="profile"
          class="rounded border bg-white p-3"
        ><code class="bg-white">{{ profile }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BJumbotron, BAvatar } from 'bootstrap-vue'

export default {
  components: {
    BJumbotron,
    BAvatar
  },

  data: function () {
    return {
      profile: null,
      refresh: true
    }
  },

  created () {
    this.loadProfile()
  },

  methods: {
    loadProfile () {
      this.axios.get(`/api/auth/profile`)
        .then(response => {
          this.profile = response.data

          this.periodicallyRefreshProfile(30)
        })
        .catch(e => {
          this.periodicallyRefreshProfile(60)
        })
    },

    periodicallyRefreshProfile (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadProfile, timeoutWithJitter)
      }
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    avatar () {
      if (this.profile && this.profile.identities && this.profile.identities.length > 0) {
        var identity = this.profile.identities.find(i => i.avatar)
        if (identity && identity.avatar) {
          return identity.avatar
        }
      }

      return ''
    },

    name () {
      if (this.profile && this.profile.identities && this.profile.identities.length > 0) {
        var identity = this.profile.identities.find(i => i.name)
        if (identity && identity.name) {
          return identity.name
        }
      }

      return ''
    },

    email () {
      if (this.profile && this.profile.identities && this.profile.identities.length > 0) {
        var identity = this.profile.identities.find(i => i.email)
        if (identity && identity.email) {
          return identity.email
        }
      }

      return ''
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
