<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="dark"
  >
    <b-navbar-brand
      :to="{ name: 'Pipelines'}"
      class="text-white mr-3"
    >
      <font-awesome-icon
        icon="shipping-fast"
        class="m-0 ml-2 mr-1 h5"
      />
      <em class="align-top">
        Estafette
      </em>
    </b-navbar-brand>
    <b-navbar-toggle
      target="nav_collapse"
      v-if="!dashboardModeActive"
    />

    <b-collapse
      is-nav
      id="nav_collapse"
      v-if="!dashboardModeActive"
    >
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Pipelines'}">
          Pipelines
        </b-nav-item>
        <b-nav-item :to="{ name: 'Manifest'}">
          Manifest
        </b-nav-item>
        <b-nav-item :to="{ name: 'Statistics'}">
          Statistics
        </b-nav-item>
        <b-nav-item
          v-if="user && user.authenticated"
          :to="{ name: 'Config'}"
        >
          Configuration
        </b-nav-item>
      </b-navbar-nav>

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
              class="m-0 mr-2 h4"
            />
            <em class="align-top">
              {{ user.email }}
            </em>
          </template>
          <b-dropdown-item
            href="/_gcp_iap/session_refresher"
            target="_blank"
            title="Keep the session refresh tab open to prevent the Identity Aware Proxy (IAP) session from expiring"
          >
            IAP session refresh tab
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavbarToggle, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem, BCollapse } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShippingFast, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShippingFast, faUserCircle)

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BNavItem,
    BNavItemDropdown,
    BDropdownItem,
    BCollapse,
    FontAwesomeIcon
  },

  props: {
    user: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  }
}
</script>
