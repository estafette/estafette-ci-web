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
      v-for="item in permittedItems"
      :key="item.text"
      :to="item.to"
      :exact="item.exact"
      :class="item.class"
    >
      <font-awesome-icon
        :icon="item.icon"
        class="sidebar-icon"
      />
      <span>
        {{ item.text }}
      </span>
    </b-nav-item>
  </b-nav>
</template>

<script>
import { mapState } from 'vuex'
import { BNav, BNavItem } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShippingFast, faTools, faBookOpen, faLightbulb, faPlusCircle, faCogs, faExternalLinkAlt, faUserCircle, faHome, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShippingFast, faTools, faBookOpen, faLightbulb, faPlusCircle, faCogs, faExternalLinkAlt, faUserCircle, faHome, faUsers)

export default {
  components: {
    BNav,
    BNavItem,
    FontAwesomeIcon
  },

  data: function () {
    return {
      items: [
        {
          if: () => this.user && this.user.active,
          text: 'Home',
          icon: 'home',
          to: { name: 'Home' },
          exact: true
        },
        {
          if: () => this.user && this.user.active,
          text: 'Builds & releases',
          icon: 'tools',
          to: { name: 'Pipelines' },
          exact: false
        },
        {
          if: () => this.user && this.user.active,
          text: 'Catalog',
          icon: 'book-open',
          to: { name: 'Catalog' },
          exact: false
        },
        {
          if: () => this.user && this.user.active,
          text: 'Insights',
          icon: 'lightbulb',
          to: { name: 'Insights' },
          exact: false
        },
        {
          if: () => this.user && this.user.active,
          text: 'Configuration',
          icon: 'cogs',
          to: { name: 'Configuration' },
          exact: false
        },
        {
          if: () => this.user && this.user.active,
          text: 'Create',
          icon: 'plus-circle',
          to: { name: 'Create' },
          exact: false
        },
        {
          if: () => this.user && this.user.active,
          text: 'user',
          textFunction: () => {
            if (this.user && this.user.identities && this.user.identities.length > 0) {
              var identity = this.user.identities.find(i => i.name)
              if (identity && identity.name) {
                return identity.name
              }
            }

            return this.user && this.user.email ? this.user.email : ''
          },
          icon: 'user-circle',
          to: { name: 'Preferences' },
          exact: false,
          class: 'mt-auto'
        }
      ]
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

    permittedItems () {
      return this.items.filter(i => {
        if (this.isFunction(i.if)) {
          return i.if()
        }

        return true
      }).map(i => {
        if (this.isFunction(i.textFunction)) {
          i.text = i.textFunction()
        }

        return i
      })
    }
  }
}
</script>
