<template>
  <log-viewer
    :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}/logs`"
    :status="this.release.releaseStatus"
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
    releaseID: {
      type: String,
      default: null
    },
    release: {
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
