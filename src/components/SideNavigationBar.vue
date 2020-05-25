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
      v-for="item in items"
      :key="item.text"
      :to="item.to"
      :exact="item.exact"
    >
      <font-awesome-icon
        :icon="item.icon"
        class="sidebar-icon"
      />
      <span>
        {{ item.text }}
      </span>
    </b-nav-item>
    <b-nav-item-dropdown
      v-if="user && user.authenticated"
      dropright
      offset="5em"
      boundary="viewport"
      class="mt-auto"
    >
      <template slot="button-content">
        <font-awesome-icon
          icon="user-circle"
          class="sidebar-icon"
        />
        <span>
          {{ user.email }}
        </span>
      </template>
      <b-dropdown-item
        :to="{ name: 'Config'}"
      >
        <font-awesome-icon
          icon="cogs"
          class="sidebar-icon"
        />
        Configuration
      </b-dropdown-item>
      <b-dropdown-item
        href="/_gcp_iap/session_refresher"
        target="_blank"
        title="Keep the session refresh tab open to prevent the Identity Aware Proxy (IAP) session from expiring"
      >
        <font-awesome-icon
          icon="external-link-alt"
          class="sidebar-icon"
        />
        IAP session refresh tab
      </b-dropdown-item>
    </b-nav-item-dropdown>

    <!-- <a
      href="https://estafette.io/usage/"
      target="_blank"
      class="nav-link text-light"
    >
      Documentation
    </a>
    <a
      href="https://github.com/estafette/estafette-ci"
      target="_blank"
      class="nav-link text-light"
    >
      Github
    </a>
    <a
      href="https://github.com/estafette/estafette-ci/issues/new"
      target="_blank"
      class="nav-link text-light"
    >
      File an issue
    </a>     -->
  </b-nav>
</template>

<script>
import { mapState } from 'vuex'
import { BNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShippingFast, faTools, faBookOpen, faLightbulb, faPlusCircle, faCogs, faExternalLinkAlt, faUserCircle, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShippingFast, faTools, faBookOpen, faLightbulb, faPlusCircle, faCogs, faExternalLinkAlt, faUserCircle, faHome)

export default {
  components: {
    BNav,
    BNavItem,
    BNavItemDropdown,
    BDropdownItem,
    FontAwesomeIcon
  },

  data: function () {
    return {
      items: [
        {
          text: 'Home',
          icon: 'home',
          to: { name: 'Home' },
          exact: true
        },
        {
          text: 'Builds & releases',
          icon: 'tools',
          to: { name: 'Pipelines' },
          exact: false
        },
        {
          text: 'Catalog',
          icon: 'book-open',
          to: { name: 'Catalog' },
          exact: false
        },
        {
          text: 'Insights',
          icon: 'lightbulb',
          to: { name: 'Statistics' },
          exact: false
        },
        {
          text: 'Create',
          icon: 'plus-circle',
          to: { name: 'Manifest' },
          exact: false
        }
      ]
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  }
}
</script>
