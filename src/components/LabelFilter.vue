<template>
  <div
    class="btn-group mb-3 mr-2"
    v-if="splitLabels.length > 0"
  >
    <a class="btn btn-outline-light bg-btn-group-prepend icon-container">
      <font-awesome-icon icon="tag" />
    </a>
    <span
      v-for="label in splitLabels"
      :key="label"
      class="btn btn-outline-primary border-btn-group"
    >
      {{ label }} <router-link
        :to="{ query: { status: filter.status, since: filter.since, labels: labelLinkGenerator(label), page: 1 } }"
        active-class="router-link-active"
        class="badge badge-primary"
      >
        &times;
      </router-link>
    </span>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTag)

export default {
  components: {
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
