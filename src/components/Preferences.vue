<template>
  <div v-if="user && user.active">
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
          v-if="user"
          class="rounded border bg-white p-3"
        ><code class="bg-white">{{ user }}</code></pre>
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
      refresh: true
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    avatar () {
      if (this.user && this.user.identities && this.user.identities.length > 0) {
        var identity = this.user.identities.find(i => i.avatar)
        if (identity && identity.avatar) {
          return identity.avatar
        }
      }

      return ''
    },

    name () {
      if (this.user && this.user.identities && this.user.identities.length > 0) {
        var identity = this.user.identities.find(i => i.name)
        if (identity && identity.name) {
          return identity.name
        }
      }

      return ''
    },

    email () {
      if (this.user && this.user.identities && this.user.identities.length > 0) {
        var identity = this.user.identities.find(i => i.email)
        if (identity && identity.email) {
          return identity.email
        }
      }

      return ''
    }
  }
}
</script>
