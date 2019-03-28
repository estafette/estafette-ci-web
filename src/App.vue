<template>
  <div id="app">
    <div id="header-and-main">
      <navigation-bar
        :user="user"
        :dashboard-mode-active="dashboardModeActive"
      />
      <div id="main">
        <router-view
          :user="user"
          :dashboard-mode-active="dashboardModeActive"
        />
      </div>
    </div>
    <site-footer v-if="!dashboardModeActive" />
    <session-refresh-modal />
    <help-modal :visible="helpModalActive" />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import SiteFooter from '@/components/SiteFooter'
import SessionRefreshModal from '@/components/SessionRefreshModal'
import HelpModal from '@/components/HelpModal'

export default {
  components: {
    NavigationBar,
    SiteFooter,
    SessionRefreshModal,
    HelpModal
  },
  data: function () {
    return {
      user: null,
      refresh: true,
      dashboardModeActive: false,
      helpModalActive: false
    }
  },

  mounted () {
    window.addEventListener('keyup', e => this.handleKeyboardShortcuts(e))
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
    },

    handleKeyboardShortcuts (event) {
      switch (event.key) {
        case 'd':
          this.dashboardModeActive = !this.dashboardModeActive
          console.log('toggle dashboard mode', this.dashboardModeActive)
          break
        case 'h':
          this.helpModalActive = !this.helpModalActive
          console.log('toggle keyboard shortcut help dialog', this.helpModalActive)
          break
        case 'Escape':
          this.dashboardModeActive = false
          this.helpModalActive = false
          console.log('escape back to defaults')
          break
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
