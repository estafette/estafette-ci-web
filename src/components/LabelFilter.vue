<template>
  <b-button-group
    class="mb-3 mr-2 bg-white"
    v-if="splitLabels.length > 0"
  >
    <b-input-group-prepend
      is-text
    >
      <font-awesome-icon icon="tag" />
    </b-input-group-prepend>
    <b-button
      v-for="label in splitLabels"
      :key="label"
      variant="outline-primary"
      class="border-btn-group bg-white"
    >
      {{ label }} <router-link
        :to="{ query: { status: filter.status, since: filter.since, labels: labelLinkGenerator(label), page: 1 } }"
        active-class="router-link-active"
        class="badge badge-primary"
      >
        &times;
      </router-link>
    </b-button>
  </b-button-group>
</template>

<script>
import { BButtonGroup, BButton, BInputGroupPrepend } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTag)

export default {
  components: {
    BButtonGroup,
    BButton,
    BInputGroupPrepend,
    FontAwesomeIcon
  },

  props: {
    filter: {
      type: Object,
      default: null
    }
  },

  methods: {
    labelLinkGenerator (labelToRemove) {
      if (!this.filter || !this.filter.labels || this.filter.labels.length === 0) {
        return ''
      }

      var selectedLabelsArray = []
      if (this.filter && this.filter.labels) {
        selectedLabelsArray = this.filter.labels.split(',')
      }

      return selectedLabelsArray.filter(i => i !== labelToRemove).join(',')
    }
  },

  computed: {
    splitLabels () {
      if (!this.filter.labels || this.filter.labels.length === 0) {
        return []
      }

      return this.filter.labels.split(',')
    }
  }
}
</script>
