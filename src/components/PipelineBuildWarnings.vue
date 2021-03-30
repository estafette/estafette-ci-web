<template>
  <div
    class="col m-0 mt-3"
    v-if="warnings && warnings.length > 0"
  >
    <warning
      v-for="(warning, index) in warnings"
      :key="index"
      :warning="warning"
    />
  </div>
</template>

<script>
import Warning from '@/components/Warning'

export default {
  components: {
    Warning
  },
  props: {
    build: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      warnings: [],
      refresh: true
    }
  },

  created () {
    this.loadBuildWarnings()
  },

  methods: {
    loadBuildWarnings () {
      this.axios.get(`/api/pipelines/${this.build.repoSource}/${this.build.repoOwner}/${this.build.repoName}/builds/${this.build.id}/warnings`)
        .then(response => {
          this.warnings = response.data.warnings
        })
        .catch(e => {
          this.periodicallyRefresh(30)
        })
    },

    periodicallyRefresh (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadBuildWarnings, timeoutWithJitter)
      }
    }
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
