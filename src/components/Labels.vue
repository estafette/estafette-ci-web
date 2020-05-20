<template>
  <span>
    <router-link
      v-for="label in sortedLabels"
      :key="label.key"
      :to="{ name: 'Pipelines', query: query({labels: label.key + '=' + label.value }) }"
      exact
      class="btn btn-light btn-sm mr-1 mb-1"
    >
      {{ label.key }}={{ label.value }}
    </router-link>
  </span>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      default: function () { return [] }
    }
  },

  methods: {
    query (newQuery) {
      return {
        ...this.$route.query,
        ...newQuery
      }
    }
  },

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
