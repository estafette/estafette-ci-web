<template>
  <b-navbar-nav>
    <b-nav-item
      v-for="item in items"
      :key="item.text"
      :to="item.to"
      class="mr-3 text-nowrap"
    >
      <font-awesome-icon
        :icon="item.icon"
        class="mr-2 d-none d-lg-inline"
      />
      {{ item.text }}
    </b-nav-item>
  </b-navbar-nav>
</template>

<script>
import { BNavbarNav, BNavItem } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTools, faBookOpen, faLightbulb, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTools, faBookOpen, faLightbulb, faPlusCircle)

export default {
  components: {
    BNavbarNav,
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
