<template>
  <div>
    <div class="row">
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

        <h4>Logout</h4>
        <b-button
          href="/api/auth/logout/"
          variant="danger"
          block
          class="mt-3 mb-3"
        >
          Log out
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BAvatar, BButton } from 'bootstrap-vue'

export default {
  components: {
    BAvatar,
    BButton
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
