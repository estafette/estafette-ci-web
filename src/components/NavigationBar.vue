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
        class="mr-2"
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
      <b-navbar-nav>
        <b-nav-item
          :to="{ name: 'Pipelines'}"
          class="mr-3 text-nowrap"
        >
          <font-awesome-icon
            icon="tools"
            class="mr-2 d-none d-lg-inline"
          />
          Builds &amp; Releases
        </b-nav-item>
        <b-nav-item
          :to="{ name: 'Catalog'}"
          class="mr-3 text-nowrap"
        >
          <font-awesome-icon
            icon="book-open"
            class="mr-2 d-none d-lg-inline"
          />
          Catalog
        </b-nav-item>
        <b-nav-item
          :to="{ name: 'Statistics'}"
          class="mr-3 text-nowrap"
        >
          <font-awesome-icon
            icon="lightbulb"
            class="mr-2 d-none d-lg-inline"
          />
          Insights
        </b-nav-item>
        <b-nav-item
          :to="{ name: 'Manifest'}"
          class="mr-3 text-nowrap"
        >
          <font-awesome-icon
            icon="plus-circle"
            class="mr-2 d-none d-lg-inline"
          />
          Create
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
              class="m-0 mr-2 h4 d-none d-lg-inline"
            />
            <em class="align-top">
              {{ user.email }}
            </em>
          </template>
          <b-dropdown-item-button
            :to="{ name: 'Config'}"
          >
            <font-awesome-icon
              icon="cogs"
              class="mr-2"
            />
            Configuration
          </b-dropdown-item-button>
          <b-dropdown-item-button
            href="/_gcp_iap/session_refresher"
            target="_blank"
            title="Keep the session refresh tab open to prevent the Identity Aware Proxy (IAP) session from expiring"
          >
            <font-awesome-icon
              icon="external-link-alt"
              class="mr-2"
            />
            IAP session refresh tab
          </b-dropdown-item-button>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavbarToggle, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItemButton, BCollapse } from 'bootstrap-vue'

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
    BNavItem,
    BNavItemDropdown,
    BDropdownItemButton,
    BCollapse,
    FontAwesomeIcon
  },

  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>
