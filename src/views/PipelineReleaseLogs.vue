<template>
  <div>
    <div class="col-12 text-center">
      <log-navigation
        :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}/alllogs`"
        :status="this.release.releaseStatus"
        :logid="logid"
      />
    </div>

    <log-viewer
      v-if="logid"
      :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}/logsbyid/${this.logid}`"
      :status="this.release.releaseStatus"
      :allow-tail="false"
    />
    <log-viewer
      v-else-if="release.releaseStatus === 'pending' || release.releaseStatus === 'running' || release.releaseStatus === 'canceling'"
      :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}/logs`"
      :status="this.release.releaseStatus"
      :allow-tail="true"
    />
  </div>
</template>

<script>
import LogNavigation from '@/components/LogNavigation'
import LogViewer from '@/components/LogViewer'

export default {
  components: {
    LogNavigation,
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
    logid: {
      type: String,
      default: null
    },
    release: {
      type: Object,
      default: null
    }
  }
}
</script>
