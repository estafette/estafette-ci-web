<template>
  <div class="col m-0 mt-3" v-if="warnings && warnings.length > 0">
    <warning v-for="(warning, index) in warnings" v-bind:key="index" :warning="warning" />
  </div>
</template>

<script>
export default {
  props: {
    pipeline: Object
  },
  data: function () {
    return {
      warnings: [],
      refresh: true
    }
  },

  created () {
    this.loadPipelineWarnings()
  },

  methods: {
    loadPipelineWarnings () {
      this.axios.get(`/api/pipelines/${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/warnings`)
        .then(response => {
          this.warnings = response.data.warnings
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefresh(30)
        })
    },

    periodicallyRefresh (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadPipelineWarnings, timeoutWithJitter)
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
