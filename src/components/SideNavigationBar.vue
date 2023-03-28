<template>
  <b-nav
    vertical
    class="main-sidebar-nav"
  >
    <b-nav-item
      :to="{ name: 'Home'}"
      exact
      class="logo"
    >
      <font-awesome-icon
        icon="shipping-fast"
        class="sidebar-icon"
      />
      <span>
        Estafette
      </span>
    </b-nav-item>
    <b-nav-item
      v-for="route in routes"
      :key="route.name"
      :to="{ name: route.name }"
      :exact="route.meta ? route.meta.exact : false"
      :class="route.meta && route.meta.class ? route.meta.class : ''"
    >
      <font-awesome-icon
        :icon="route.meta ? route.meta.icon : ''"
        class="sidebar-icon"
      />
      <span>
        {{ route.meta && route.meta.text ? route.meta.text : route.name }}
      </span>
    </b-nav-item>
  </b-nav>
</template>

<script>
import { mapState } from 'vuex'
import { BNav, BNavItem } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShippingFast, faTools, faBookOpen, faLightbulb, faPlusCircle, faCogs, faExternalLinkAlt, faUserCircle, faHome, faUsers, faSlidersH, faDolly } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShippingFast, faTools, faBookOpen, faLightbulb, faPlusCircle, faCogs, faExternalLinkAlt, faUserCircle, faHome, faUsers, faSlidersH, faDolly)

export default {
  components: {
    BNav,
    BNavItem,
    FontAwesomeIcon
  },

  methods: {
    isFunction (functionToCheck) {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    routes () {
      let seenPositionBottom = false
      return this.$router.options.routes.filter(r => {
        // only include routes without meta.hide: true
        if (r.meta && r.meta.hide) {
          return false
        }

        // only include routes with meta.allowedWithoutAuth: true if user is not logged in
        if ((!this.user || !this.user.active) && (!r.meta || !r.meta.allowedWithoutAuth)) {
          return false
        }

        // filter out routes that require a role the user does not have
        if (r.meta && r.meta.requiredRole && (!this.user || !this.user.active || !this.user.roles || !this.user.roles.includes(r.meta.requiredRole))) {
          return false
        }

        return true
      }).map(r => {
        // if meta.textFunction is set use it to set text
        if (r.meta && r.meta.textFunction && this.isFunction(r.meta.textFunction)) {
          r.meta.text = r.meta.textFunction(this.user)
        }

        // if meta.position: 'bottom' occurs first time set class to move this and following menu items to the bottom
        if (r.meta && r.meta.position && r.meta.position === 'bottom' && !seenPositionBottom) {
          r.meta.class = 'mt-auto'
          seenPositionBottom = true
        }

        return r
      })
    }
  }
}
</script>
