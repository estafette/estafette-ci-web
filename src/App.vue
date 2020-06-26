<template>
  <vk-grid id="app">
    <side-navigation-bar />
    <div id="main">
      <router-view />
    </div>
  </vk-grid>
</template>

<script>
import SideNavigationBar from '@/components/SideNavigationBar'

import '@vuikit/theme'

import { Grid } from 'vuikit'

export default {
  components: {
    VkGrid: Grid,
    SideNavigationBar
  }
}
</script>

<style lang="scss">
@import 'assets/css/estafette.scss';
</style>
