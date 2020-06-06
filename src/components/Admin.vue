<template>
  <div v-if="user && user.active">
    <b-jumbotron
      header="Admin"
      bg-variant="secondary"
      text-variant="white"
      header-level="5"
      container-fluid
      fluid
      class="section-header"
    />

    <div class="row m-0">
      <div class="col-auto d-none d-lg-block">
        <inner-navigation-bar
          :items="items"
        />
      </div>
      <div class="col p-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BJumbotron } from 'bootstrap-vue'
import InnerNavigationBar from '@/components/InnerNavigationBar'

export default {
  components: {
    BJumbotron,
    InnerNavigationBar
  },

  data: function () {
    return {
      credentials: null,
      trustedimages: null,
      refresh: true,
      items: [
        {
          text: 'Users',
          to: { name: 'AdminUsers' },
          icon: 'user',
          exact: false
        },
        {
          text: 'Groups',
          to: { name: 'AdminGroups' },
          icon: 'users',
          exact: false
        },
        {
          text: 'Organizations',
          to: { name: 'AdminOrganizations' },
          icon: 'sitemap',
          exact: false
        }
      ]
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  }
}
</script>
