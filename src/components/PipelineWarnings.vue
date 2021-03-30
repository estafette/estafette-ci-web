<template>
  <div
    class="col m-0 mt-3"
    v-if="warnings && warnings.length > 0"
  >
    <div
      class="row m-0 mt-3 mb-3 ml-3 justify-content-center"
    >
      <div class="h5 text-center mt-3 mb-3 text-secondary">
        <font-awesome-icon
          icon="exclamation-triangle"
          class="mr-2"
        />
        Warnings
      </div>
    </div>

    <warning
      v-for="(warning, index) in warnings"
      :key="index"
      :warning="warning"
    />
  </div>
</template>

<script>
import Warning from '@/components/Warning'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationTriangle)

export default {
  components: {
    Warning,
    FontAwesomeIcon
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

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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
