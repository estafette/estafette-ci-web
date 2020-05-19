<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="dark"
  >
    <b-navbar-brand
      :to="{ name: 'Pipelines'}"
      class="text-white mr-5 text-nowrap"
    >
      <font-awesome-icon
        icon="shipping-fast"
        class="ml-1 mr-2"
      />
      <em class="align-top">
        Estafette
      </em>
    </b-navbar-brand>
    <b-navbar-toggle
      target="nav_collapse"
    />

    <b-collapse
      is-nav
      id="nav_collapse"
    >
      <navigation-bar-items :items="items" />

      <b-navbar-nav
        class="ml-auto"
        v-if="user && user.authenticated"
      >
        <b-nav-item-dropdown
          right
          class="pb-1 text-white"
        >
          <template slot="button-content">
            <font-awesome-icon
              icon="user-circle"
              class="m-0 mr-2 h4 d-none d-lg-inline"
            />
            <em class="align-top">
              {{ user.email }}
            </em>
          </template>
          <b-dropdown-item
            :to="{ name: 'Config'}"
          >
            <font-awesome-icon
              icon="cogs"
              class="mr-2"
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
              class="mr-2"
            />
            IAP session refresh tab
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavbarToggle, BNavbarNav, BNavItemDropdown, BDropdownItem, BCollapse } from 'bootstrap-vue'

import NavigationBarItems from '@/components/NavigationBarItems'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShippingFast, faTools, faBookOpen, faLightbulb, faPlusCircle, faCogs, faExternalLinkAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShippingFast, faTools, faBookOpen, faLightbulb, faPlusCircle, faCogs, faExternalLinkAlt, faUserCircle)

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BCollapse,
    NavigationBarItems,
    FontAwesomeIcon
  },

  data: function () {
    return {
      items: [
        {
          text: 'Builds & Releases',
          icon: 'tools',
          to: { name: 'Pipelines' }
        },
        {
          text: 'Catalog',
          icon: 'book-open',
          to: { name: 'Catalog' }
        },
        {
          text: 'Insights',
          icon: 'lightbulb',
          to: { name: 'Statistics' }
        },
        {
          text: 'Create',
          icon: 'plus-circle',
          to: { name: 'Manifest' }
        }
      ]
    }
  },

  computed: {
    user () {
      return this.$store.state.user.me
    }
  }
}
</script>
