<template>
  <div>
    <b-nav
      tabs
      class="mt-3 mb-3 d-none d-lg-flex"
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
      :variant="variant"
      block
      menu-class="w-100"
      class="mt-3 mb-3 d-lg-none"
    >
      <template #button-content>
        <font-awesome-icon
          v-if="activeTabIcon"
          :icon="activeTabIcon"
          class="mr-2"
        />
        {{ activeTabTextWithFallback }}
      </template>
      <b-dropdown-item
        v-for="tab in tabs"
        :key="tab.text"
        :to="tab.to"
        :exact="tab.exact ? tab.exact : false"
      >
        <font-awesome-icon
          v-if="tab.icon"
          :icon="tab.icon"
          class="dropdown-icon"
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
    activeTabText: {
      type: String,
      default: null
    },
    sectionRouteName: {
      type: String,
      default: null
    }
  },

  computed: {
    activeTabTextWithFallback () {
      if (this.activeTabText) {
        return this.activeTabText
      }
      if (this.$route.meta && this.$route.meta.text) {
        return this.$route.meta.text
      }

      return this.$route.name
    },

    activeTabIcon () {
      if (this.tabs && this.activeTabText) {
        // get tab by text
        const activeTab = this.tabs.find(r => r.text === this.activeTabText)
        if (activeTab && activeTab.icon) {
          return activeTab.icon
        }
      }

      return undefined
    },

    section () {
      // get name of active outer route
      let activeSectionRouteName = this.$route.matched[0].name

      // if prop is set use that instead
      if (this.sectionRouteName) {
        activeSectionRouteName = this.sectionRouteName
      }

      // get active outer route
      return this.$router.options.routes.find(r => r.name === activeSectionRouteName)
    },

    variant () {
      const section = this.section
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
