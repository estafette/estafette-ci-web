<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="dark"
  >
    <b-navbar-brand
      :to="{ name: 'Pipelines'}"
      class="pb-1"
    >
      <!-- <font-awesome-icon
        icon="bullseye"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="code"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="ellipsis-h"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="ellipsis-v"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="fire"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="list"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="list-ul"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="network-wired"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="stream"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="tasks"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="vector-square"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="list-alt"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="route"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="layer-group"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="bolt"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="circle-notch"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="code-branch"
        class="m-0 ml-2 mr-1 h4"
      /> -->
      <font-awesome-icon
        icon="shipping-fast"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="spinner"
        class="m-0 ml-2 mr-1 h4"
      />
      <font-awesome-icon
        icon="project-diagram"
        class="m-0 ml-2 mr-1 h5"
      />
      <font-awesome-icon
        icon="fingerprint"
        class="m-0 ml-2 mr-1 h4"
      />
      <span class="align-top">Estafette CI</span>
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
import { faBolt, faUserCircle, faBullseye, faCircleNotch, faCode, faCodeBranch, faEllipsisH, faEllipsisV, faFingerprint, faFire, faLayerGroup, faList, faListAlt, faListUl, faNetworkWired, faProjectDiagram, faRoute, faShippingFast, faSpinner, faStream, faTasks, faVectorSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBolt, faBullseye, faCode, faCodeBranch, faCircleNotch, faUserCircle, faEllipsisH, faEllipsisV, faFingerprint, faFire, faLayerGroup, faList, faListAlt, faListUl, faNetworkWired, faProjectDiagram, faRoute, faShippingFast, faSpinner, faStream, faTasks, faVectorSquare)

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
