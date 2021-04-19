<template>
  <div
    id="app"
    :class="{ authenticated: user && user.active }"
  >
    <side-navigation-bar />
    <div id="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideNavigationBar from '@/components/SideNavigationBar'

export default {
  components: {
    SideNavigationBar
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  }
}
</script>

<style lang="scss">
@import 'assets/css/estafette.scss';
</style>
