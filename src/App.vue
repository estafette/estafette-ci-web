<template>
  <div
    id="app"
    :class="['overflow-auto']"
  >
    <div id="header-and-main">
      <navigation-bar />
      <div
        id="main"
        :class="['']"
      >
        <router-view />
      </div>
    </div>
    <site-footer />
    <session-refresh-modal />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import SiteFooter from '@/components/SiteFooter'
import SessionRefreshModal from '@/components/SessionRefreshModal'

import { mapActions } from 'vuex'

export default {
  components: {
    NavigationBar,
    SiteFooter,
    SessionRefreshModal
  },

  created () {
    this.load()
  },

  methods: {
    ...mapActions('user', [
      'load'
    ])
  },

  beforeDestroy () {
    this.$store.dispatch('user/destroy')
  }
}
</script>

<style lang="scss">
@import 'assets/css/estafette.scss';
</style>
