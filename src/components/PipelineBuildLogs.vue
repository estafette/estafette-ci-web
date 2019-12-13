<template>
  <log-viewer
    :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.id}/logs`"
    :status="this.build.buildStatus"
    :dashboard-mode-active="dashboardModeActive"
  />
</template>

<script>
import LogViewer from '@/components/LogViewer'

export default {
  components: {
    LogViewer
  },
  props: {
    repoSource: {
      type: String,
      default: null
    },
    repoOwner: {
      type: String,
      default: null
    },
    repoName: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    build: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  }
}
</script>
