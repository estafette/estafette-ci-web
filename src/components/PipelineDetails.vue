<template>
  <div>
    <b-breadcrumb
      :items="breadcrumbs"
      class="m-3 rounded"
    />

    <pipeline
      :pipeline="pipeline"
      v-if="pipeline"
      class="m-3"
    />

    <pipeline-warnings
      v-if="pipeline"
      :pipeline="pipeline"
    />

    <tabs :tabs="tabs" />

    <router-view
      :user="user"
      :pipeline="pipeline"
      v-if="pipeline"
    />
  </div>
</template>

<script>
import { BBreadcrumb } from 'bootstrap-vue'
import Pipeline from '@/components/Pipeline'
import PipelineWarnings from '@/components/PipelineWarnings'
import Tabs from '@/components/Tabs'

export default {
  components: {
    BBreadcrumb,
    Pipeline,
    PipelineWarnings,
    Tabs
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
    user: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      pipeline: null,
      refresh: true,
      breadcrumbs: [
        {
          text: 'Home',
          to: { name: 'Home' }
        },
        {
          text: 'builds & releases',
          to: { name: 'Pipelines' }
        },
        {
          text: `${this.repoSource}/${this.repoOwner}/${this.repoName}`,
          to: { name: 'PipelineOverview', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } },
          active: true
        }
      ],
      tabs: [
        {
          text: 'Overview',
          icon: 'industry',
          enabled: true,
          to: { name: 'PipelineOverview', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: 'Builds',
          icon: 'tools',
          enabled: () => { return this.pipeline && this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0 },
          to: { name: 'PipelineBuilds', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: 'Releases',
          icon: 'upload',
          enabled: true,
          to: { name: 'PipelineReleases', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: 'Trigger',
          icon: 'project-diagram',
          enabled: true,
          to: { name: 'PipelineTriggers', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: 'Insights',
          icon: 'lightbulb',
          enabled: true,
          to: { name: 'PipelineStatistics', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: 'Secrets',
          icon: 'user-secret',
          enabled: true,
          to: { name: 'PipelineSecretEncrypter', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        }
      ]
    }
  },

  created () {
    this.loadPipeline()
  },

  methods: {
    loadPipeline () {
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}`)
        .then(response => {
          this.pipeline = response.data
          this.periodicallyRefreshPipeline(5)
        })
        .catch(e => {
          this.periodicallyRefreshPipeline(30)
        })
    },

    periodicallyRefreshPipeline (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadPipeline, timeoutWithJitter)
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

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
