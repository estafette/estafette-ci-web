<template>
  <div id="app">
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

export default {
  components: {
    SideNavigationBar,
    SessionRefreshModal
  }
}
</script>

<style lang="scss">
@import 'assets/css/estafette.scss';
</style>
