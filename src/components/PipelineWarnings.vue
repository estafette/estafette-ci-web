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
    pipeline: {
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
    this.loadPipelineWarnings()
  },

  methods: {
    loadPipelineWarnings () {
      this.axios.get(`/api/pipelines/${this.pipeline.repoSource}/${this.pipeline.repoOwner}/${this.pipeline.repoName}/warnings`)
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

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadPipelineWarnings, timeoutWithJitter)
      }
    }
  },

  watch: {
    pipeline: {
      handler: function (to, from) {
        this.loadPipelineWarnings()
      },
      deep: true
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
