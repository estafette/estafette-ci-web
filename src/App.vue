<template>
  <div id="app">
    <side-navigation-bar />
    <div id="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideNavigationBar from '@/components/SideNavigationBar'

export default {
  components: {
    SideNavigationBar
  }
}
</script>

<style lang="scss">
@import 'assets/css/estafette.scss';
</style>
