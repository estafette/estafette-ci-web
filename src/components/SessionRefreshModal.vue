<template>
    <b-modal ref="sessionRefreshModal" centered hide-footer hide-header hide-header-close no-close-on-esc no-close-on-backdrop v-model="modalVisible">
      <div class="d-block text-center">
        <h3>Your session has expired. Please refresh!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="refreshSession">Refresh session</b-button>
    </b-modal>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bButton from 'bootstrap-vue/es/components/button/button'

export default {
  components: {
    bModal,
    bButton
  },

  data: function () {
    return {
      refresh: true
    }
  },

  computed: {
    modalVisible: {
      get: function () {
        return this.$store.state.sessionRefreshModalActive
      },
      set: function (newValue) {
        if (newValue === true) {
          this.$store.commit('showModal')
        } else {
          this.$store.commit('hideModal')
        }
      }
    }
  },

  methods: {
    refreshSession () {
      if (this.iapSessionRefreshWindow == null) {
        this.iapSessionRefreshWindow = window.open('/_gcp_iap/do_session_refresh')
        if (this.refresh) {
          this.refreshTimeout = window.setTimeout(this.checkSessionRefresh, 500)
        }
      }
      return false
    },

    checkSessionRefresh () {
      if (this.iapSessionRefreshWindow != null && !this.iapSessionRefreshWindow.closed) {
        fetch('/favicon.ico').then((response) => {
          if (response.status === 401) {
            if (this.refresh) {
              this.refreshTimeout = window.setTimeout(this.checkSessionRefresh, 500)
            }
          } else {
            this.iapSessionRefreshWindow.close()
            this.iapSessionRefreshWindow = null
            this.$store.commit('hideModal')
          }
        })
      } else {
        this.iapSessionRefreshWindow = null
        this.$store.commit('hideModal')
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
