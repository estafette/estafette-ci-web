<template>
  <div>
    <div class="col-12 text-center">
      <log-navigation
        :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.id}/alllogs`"
        :status="this.build.buildStatus"
        :logid="logid"
      />
    </div>

    <log-viewer
      v-if="logid"
      :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.id}/logsbyid/${this.logid}`"
      :status="this.build.buildStatus"
      :allow-tail="false"
    />
    <log-viewer
      v-else-if="build.buildStatus === 'pending' || build.buildStatus === 'running' || build.buildStatus === 'canceling'"
      :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.id}/logs`"
      :status="this.build.buildStatus"
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
    id: {
      type: String,
      default: null
    },
    logid: {
      type: String,
      default: null
    },
    build: {
      type: Object,
      default: null
    }
  }
}
</script>
