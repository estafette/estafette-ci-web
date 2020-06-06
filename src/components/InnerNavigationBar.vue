<template>
  <b-nav
    vertical
    class="inner-sidebar-nav"
  >
    <b-nav-item
      v-for="item in items"
      :key="item.text"
      :to="item.to"
      :exact="item.exact"
      :href="item.href"
    >
      <font-awesome-icon
        v-if="item.icon"
        :icon="item.icon"
        class="sidebar-icon"
      />
      {{ item.text }}
    </b-nav-item>
  </b-nav>
</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faKey, faShieldAlt, faUser, faUsers, faSitemap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faKey, faShieldAlt, faUser, faUsers, faSitemap)

export default {
  components: {
    BNav,
    BNavItem,
    FontAwesomeIcon
  },

  props: {
    items: {
      type: Array,
      default: function () { return [] }
    }
  }
}
</script>
