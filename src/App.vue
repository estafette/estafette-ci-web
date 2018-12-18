<template>
  <div id="app">
    <div id="header-and-main">
      <navigation-bar :user="user"/>
      <div id="main">
        <router-view :user="user"/>
      </div>
    </div>
    <site-footer/>
    <session-refresh-modal/>
  </div>
</template>

<script>
export default {
  components: {
    'navigation-bar': () => import(/* webpackChunkName: "components" */ '@/components/NavigationBar'),
    'site-footer': () => import(/* webpackChunkName: "components" */ '@/components/SiteFooter'),
    'session-refresh-modal': () => import(/* webpackChunkName: "components" */ '@/components/SessionRefreshModal')
  },
  data: function () {
    return {
      user: null,
      refresh: true
    }
  },

  created () {
    this.loadUser()
  },

  methods: {
    loadUser () {
      this.axios.get(`/api/users/me`)
        .then(response => {
          this.user = response.data
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshUser(60)
        })
    },

    periodicallyRefreshUser (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadUser, timeoutWithJitter)
      }
    }
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/css/estafette.scss';
</style>
