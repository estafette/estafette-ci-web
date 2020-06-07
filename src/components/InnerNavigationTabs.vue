<template>
  <b-nav
    tabs
    class="m-3"
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
</template>

<script>
import { mapState } from 'vuex'
import { BNav, BNavItem } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faKey, faShieldAlt, faUser, faUsers, faSitemap, faHammer, faUserSecret, faClipboardCheck, faChartPie, faListOl, faChartLine, faHeart, faPassport, faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faPollH, faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faKey, faShieldAlt, faUser, faUsers, faSitemap, faHammer, faUserSecret, faClipboardCheck, faChartPie, faListOl, faChartLine, faHeart, faPassport, faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faUserSecret, faPollH, faBook)

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
    }
  }
}
</script>
