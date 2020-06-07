<template>
  <div>
    <b-nav
      tabs
      class="m-3 d-none d-lg-flex"
    >
      <b-nav-item
        v-for="tab in tabs"
        :key="tab.text"
        :to="tab.to"
        :exact="tab.exact ? tab.exact : false"
      >
        <font-awesome-icon
          v-if="tab.icon"
          :icon="tab.icon"
          class="mr-2"
        />
        <span>
          {{ tab.text }}
        </span>
      </b-nav-item>
    </b-nav>

    <b-dropdown
      :text="activeTabText"
      :variant="variant"
      block
      menu-class="w-100"
      class="m-3 d-lg-none"
    >
      <b-dropdown-item
        v-for="tab in tabs"
        :key="tab.text"
        :to="tab.to"
        :exact="tab.exact ? tab.exact : false"
      >
        <font-awesome-icon
          v-if="tab.icon"
          :icon="tab.icon"
          class="mr-2"
        />
        <span>
          {{ tab.text }}
        </span>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { BNav, BNavItem, BDropdown, BDropdownItem } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faUserSecret, faHammer, faClipboardCheck, faPollH, faBook, faChartPie, faListOl, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faUserSecret, faHammer, faClipboardCheck, faPollH, faBook, faChartPie, faListOl, faChartLine)

export default {
  components: {
    BNav,
    BNavItem,
    BDropdown,
    BDropdownItem,
    FontAwesomeIcon
  },
  props: {
    tabs: {
      type: Array,
      default: function () { return [] }
    },
    sectionRouteName: {
      type: String,
      default: null
    }
  },

  computed: {
    activeTabText () {
      if (this.$route.meta && this.$route.meta.text) {
        return this.$route.meta.text
      }

      return this.$route.name
    },

    section () {
      // get name of active outer route
      var activeSectionRouteName = this.$route.matched[0].name

      // if prop is set use that instead
      if (this.sectionRouteName) {
        activeSectionRouteName = this.sectionRouteName
      }

      // get active outer route
      return this.$router.options.routes.find(r => r.name === activeSectionRouteName)
    },

    variant () {
      var section = this.section
      if (!section) {
        return 'secondary'
      }

      if (section.meta && section.meta.variant) {
        return section.meta.variant
      }

      return 'secondary'
    }
  }
}
</script>
