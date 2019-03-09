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
        class="m-0 ml-2 mr-2 h5"
      />
      <span class="align-top">Estafette</span>
    </b-navbar-brand>
    <b-navbar-toggle target="nav_collapse" />

    <b-collapse
      is-nav
      id="nav_collapse"
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
        <b-nav-text
          right
          class="pb-1"
        >
          <font-awesome-icon
            icon="user-circle"
            class="m-0 mr-2 h4"
          />
          <em class="align-top">
            {{ user.email }}
          </em>
        </b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar'
import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand'
import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle'
import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav'
import bNavItem from 'bootstrap-vue/es/components/nav/nav-item'
import bNavText from 'bootstrap-vue/es/components/nav/nav-text'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShippingFast, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShippingFast, faUserCircle)

export default {
  components: {
    bNavbar,
    bNavbarBrand,
    bNavbarToggle,
    bNavbarNav,
    bNavItem,
    bNavText,
    bCollapse,
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
