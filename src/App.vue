<template>
  <div
    id="app"
  >
    <side-navigation-bar />
    <div id="main">
      <router-view />
    </div>
    <session-refresh-modal />
  </div>
</template>

<script>
import SideNavigationBar from '@/components/SideNavigationBar'
import SessionRefreshModal from '@/components/SessionRefreshModal'

import { mapActions } from 'vuex'

export default {
  components: {
    SideNavigationBar,
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
