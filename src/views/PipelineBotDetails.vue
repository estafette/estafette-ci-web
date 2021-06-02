<template>
  <div>
    <section-header section-route-name="Pipelines" />

    <b-breadcrumb
      :items="breadcrumbs"
      class="m-3 rounded"
    />

    <bot-header
      v-if="bot"
      :bot="bot"
      :pipeline="pipeline && (bot.botStatus === 'pending' || bot.botStatus === 'running') ? pipeline : bot"
    />

    <inner-navigation-tabs section-route-name="Pipelines" />

    <router-view
      :bot="bot"
      v-if="bot"
      class="m-3"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BBreadcrumb } from 'bootstrap-vue'
import SectionHeader from '@/components/SectionHeader'
import BotHeader from '@/components/BotHeader'
import InnerNavigationTabs from '@/components/InnerNavigationTabs'

export default {
  components: {
    BBreadcrumb,
    SectionHeader,
    BotHeader,
    InnerNavigationTabs
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
    }
  },
  data: function () {
    return {
      bot: null,
      pipeline: null,
      refresh: true,
      breadcrumbs: [
        {
          text: 'Builds & bots',
          to: { name: 'Pipelines' }
        },
        {
          text: `${this.repoName}`,
          to: { name: 'PipelineOverview', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: 'bots',
          to: { name: 'PipelineBots', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: '...'
        }
      ]
    }
  },

  created () {
    this.loadBot()
  },

  methods: {
    loadBot () {
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/bots/${this.botID}`)
        .then(response => {
          this.bot = response.data

          if (this.bot.botStatus === 'pending' || this.bot.botStatus === 'running') {
            // load pipeline in order to show progress bar growing (pipeline has median (pending) bot time, bot does not)
            this.loadPipeline()
          }

          this.breadcrumbs[this.breadcrumbs.length - 1] = {
            text: `${this.bot.name}`,
            to: { name: 'PipelineBotLogs', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName, botID: this.botID } },
            active: true
          }

          if (this.bot.botStatus !== 'succeeded' && this.bot.botStatus !== 'failed') {
            this.periodicallyRefreshBot(5)
          } else {
            this.periodicallyRefreshBot(15)
          }
        })
        .catch(e => {
          this.periodicallyRefreshBot(30)
        })
    },

    loadPipeline () {
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}`)
        .then(response => {
          this.pipeline = response.data
        })
        .catch(e => {
          console.warn(e)
        })
    },

    periodicallyRefreshBot (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadBot, timeoutWithJitter)
      }
    },

    sortLabels (labels) {
      if (!labels) {
        return labels
      }
      return labels.slice().sort(function (a, b) {
        return a.key > b.key
      })
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
