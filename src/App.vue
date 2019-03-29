<template>
  <div
    id="app"
    :class="[dashboardModeActive ? 'bg-dark' : '', 'overflow-auto']"
  >
    <div id="header-and-main">
      <navigation-bar
        :user="user"
        :dashboard-mode-active="dashboardModeActive"
      />
      <div
        id="main"
        :class="[dashboardModeActive ? 'p-0' : '']"
      >
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
    this.setDataFromQueryParams(this.$route.query)
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

    setDataFromQueryParams (query) {
      this.dashboardModeActive = query && query.dashboard ? query.dashboard === 'true' : false
    },

    updateQueryParams () {
      var query = { ...this.$route.query }
      if (this.dashboardModeActive) {
        query.dashboard = true
      } else {
        delete query.dashboard
      }

      this.$router.push({ query: query })
    },

    handleKeyboardShortcuts (event) {
      var targetsToIgnore = ['input', 'textarea', 'select', 'button']
      var targetNodeType = event && event.target && event.target.localName ? event.target.localName : ''
      var ignore = targetsToIgnore.indexOf(targetNodeType) !== -1

      if (!ignore) {
        switch (event.key) {
          case 'd':
            this.dashboardModeActive = !this.dashboardModeActive
            break
          case 'h':
            this.helpModalActive = !this.helpModalActive
            break
          case 'Escape':
            this.dashboardModeActive = false
            this.helpModalActive = false
            break
        }
        this.updateQueryParams()
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
