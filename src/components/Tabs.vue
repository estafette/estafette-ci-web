<template>
  <ul
    class="nav nav-tabs m-3"
  >
    <li
      v-for="tab in tabs"
      :key="tab.routeName"
      class="nav-item"
    >
      <router-link
        :to="{ name: tab.routeName, params: params}"
        v-if="tab.active"
        class="nav-link"
      >
        <font-awesome-icon
          :icon="tab.icon"
          class="mr-2"
        />
        {{ tab.tabName }}
      </router-link>
      <span
        v-else
        class="nav-link disabled"
      >
        <font-awesome-icon
          :icon="tab.icon"
          class="mr-2"
        />
        {{ tab.tabName }}
      </span>
    </li>
  </ul>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faIndustry, faTools, faUpload, faProjectDiagram, faLightbulb, faUserSecret)

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    tabs: {
      type: Array,
      default: function () { return [] }
    },
    params: {
      type: Object,
      default: null
    }
  }
}
</script>
