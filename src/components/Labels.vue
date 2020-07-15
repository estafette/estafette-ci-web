<template>
  <span>
    <router-link
      v-for="label in sortedLabels"
      :key="label.key"
      :to="{ name: routeName ? routeName : 'Pipelines', query: queryGenerator({labels: label.key + '=' + label.value }) }"
      exact
      class="label btn btn-light btn-sm mr-1 mb-1"
    >
      {{ label.key }}={{ label.value }}
    </router-link>
  </span>
</template>

<script>
import queryGenerator from '@/mixins/queryGenerator'

export default {
  props: {
    labels: {
      type: Array,
      default: function () { return [] }
    },
    routeName: {
      type: String,
      default: null
    }
  },

  mixins: [queryGenerator],

  computed: {
    sortedLabels () {
      if (!this.labels) {
        return []
      }

      return this.labels.slice().sort(function (a, b) {
        return a.key > b.key
      })
    }
  }
}
</script>
