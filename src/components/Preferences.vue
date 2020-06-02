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
            v-if="avatarSource"
            :src="avatarSource"
            class="mr-2"
          />
          {{ name }} ({{ email }})
        </h4>

        <h6>User object as stored in database</h6>
        <pre
          v-if="user.user"
          class="rounded border bg-white p-3"
        ><code class="bg-white">{{ user.user }}</code></pre>
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

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    avatarSource () {
      if (this.user && this.user.authenticated && this.user.user && this.user.user.identities && this.user.user.identities.length > 0) {
        var identity = this.user.user.identities.find(i => i.avatar)
        if (identity && identity.avatar) {
          return identity.avatar
        }
      }

      return ''
    },

    name () {
      if (this.user && this.user.authenticated) {
        if (this.user.user && this.user.user.identities && this.user.user.identities.length > 0) {
          var identity = this.user.user.identities.find(i => i.name)
          if (identity && identity.name) {
            return identity.name
          }
        }

        if (this.user.email) {
          return this.user.email
        }
      }

      return ''
    },

    email () {
      if (this.user && this.user.authenticated) {
        if (this.user.email) {
          return this.user.email
        }
      }

      return ''
    }
  }
}
</script>
