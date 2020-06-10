<template>
  <div>
    <b-nav
      tabs
      class="m-3 d-none d-lg-flex"
    >
      <b-nav-item
        v-for="route in routes"
        :key="route.name"
        :to="{ name: route.name }"
        :exact="route.meta ? route.meta.exact : false"
        :class="route.meta && route.meta.class ? route.meta.class : ''"
      >
        <font-awesome-icon
          v-if="route.meta && route.meta.icon"
          :icon="route.meta ? route.meta.icon : ''"
          class="mr-2"
        />
        <span>
          {{ route.meta && route.meta.text ? route.meta.text : route.name }}
        </span>
      </b-nav-item>
    </b-nav>

    <b-dropdown
      :variant="variant"
      block
      menu-class="w-100"
      class="m-3 d-lg-none"
    >
      <template v-slot:button-content>
        <font-awesome-icon
          v-if="activeRouteIcon"
          :icon="activeRouteIcon"
          class="mr-2"
        />
        {{ activeRouteText }}
      </template>
      <b-dropdown-item
        v-for="route in routes"
        :key="route.name"
        :to="{ name: route.name }"
        :exact="route.meta ? route.meta.exact : false"
        :class="route.meta && route.meta.class ? route.meta.class : ''"
      >
        <font-awesome-icon
          v-if="route.meta && route.meta.icon"
          :icon="route.meta ? route.meta.icon : ''"
          class="dropdown-icon"
        />
        <span>
          {{ route.meta && route.meta.text ? route.meta.text : route.name }}
        </span>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BNav, BNavItem, BDropdown, BDropdownItem } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faKey, faShieldAlt, faUser, faUsers, faSitemap, faHammer, faUserSecret, faClipboardCheck, faChartPie, faListOl, faChartLine, faHeart, faPassport, faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faPollH, faBook, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faKey, faShieldAlt, faUser, faUsers, faSitemap, faHammer, faUserSecret, faClipboardCheck, faChartPie, faListOl, faChartLine, faHeart, faPassport, faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faUserSecret, faPollH, faBook, faMobileAlt)

export default {
  components: {
    BNav,
    BNavItem,
    BDropdown,
    BDropdownItem,
    FontAwesomeIcon
  },

  props: {
    sectionRouteName: {
      type: String,
      default: null
    }
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
      // get name of active outer route
      var activeOuterRouteName = this.$route.matched[0].name

      // get active outer route
      var activeOuterRoute = this.$router.options.routes.find(r => r.name === activeOuterRouteName)
      if (!activeOuterRoute) {
        return []
      }

      if (!activeOuterRoute.children) {
        return []
      }

      return activeOuterRoute.children.filter(r => {
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
      })
    },

    activeRouteText () {
      if (this.$route.meta && this.$route.meta.text) {
        return this.$route.meta.text
      }

      return this.$route.name
    },

    activeRouteIcon () {
      if (this.$route.meta && this.$route.meta.icon) {
        return this.$route.meta.icon
      }

      return undefined
    },

    section () {
      // get name of active outer route
      var activeSectionRouteName = this.$route.matched[0].name

      // if prop is set use that instead
      if (this.sectionRouteName) {
        activeSectionRouteName = this.sectionRouteName
      }

      // get active outer route
      return this.$router.options.routes.find(r => r.name === activeSectionRouteName)
    },

    variant () {
      var section = this.section
      if (!section) {
        return 'secondary'
      }

      if (section.meta && section.meta.variant) {
        return section.meta.variant
      }

      return 'secondary'
    }
  }
}
</script>
