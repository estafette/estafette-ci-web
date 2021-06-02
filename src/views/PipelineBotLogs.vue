<template>
  <div>
    <div class="col-12 text-center">
      <log-navigation
        :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/bots/${this.botID}/alllogs`"
        :status="this.bot.botStatus"
        :logid="logid"
      />
    </div>

    <log-viewer
      v-if="logid"
      :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/bots/${this.botID}/logsbyid/${this.logid}`"
      :status="this.bot.botStatus"
      :allow-tail="false"
    />
    <log-viewer
      v-else-if="bot.botStatus === 'pending' || bot.botStatus === 'running' || bot.botStatus === 'canceling'"
      :log-url="`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/bots/${this.botID}/logs`"
      :status="this.bot.botStatus"
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
    botID: {
      type: String,
      default: null
    },
    logid: {
      type: String,
      default: null
    },
    bot: {
      type: Object,
      default: null
    }
  }
}
</script>
