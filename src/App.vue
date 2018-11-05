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
  name: 'App',
  data: function () {
    return {
      user: null
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

      this.refreshTimeout = setTimeout(this.loadUser, timeoutWithJitter)
    }
  },

  beforeDestroy () {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/css/estafette.scss';
</style>
