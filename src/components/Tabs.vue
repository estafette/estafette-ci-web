<template>
  <ul
    class="nav nav-tabs m-3"
  >
    <li
      v-for="tab in tabs"
      :key="tab.text"
      class="nav-item"
    >
      <router-link
        v-if="tab.enabled"
        :to="tab.to"
        :exact="tab.exact ? tab.exact : false"
        class="nav-link"
      >
        <font-awesome-icon
          v-if="tab.icon"
          :icon="tab.icon"
          class="mr-2"
        />
        {{ tab.text }}
      </router-link>
      <span
        v-else
        class="nav-link disabled"
      >
        <font-awesome-icon
          :icon="tab.icon"
          class="mr-2"
        />
        {{ tab.text }}
      </span>
    </li>
  </ul>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faUserSecret, faHammer, faClipboardCheck, faPollH, faBook, faChartPie, faListOl, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faUserSecret, faHammer, faClipboardCheck, faPollH, faBook, faChartPie, faListOl, faChartLine)
export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    tabs: {
      type: Array,
      default: function () { return [] }
    }
  }
}
</script>
