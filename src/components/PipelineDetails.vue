<template>
  <div>
    <nav
      class="m-3"
      aria-label="breadcrumb"
    >
      <ol class="breadcrumb flex-nowrap">
        <li class="breadcrumb-item text-truncate">
          <router-link :to="{ name: 'Pipelines'}">
            Pipelines
          </router-link>
        </li>
        <li
          class="breadcrumb-item text-truncate active"
          aria-current="page"
        >
          <span class="d-none d-md-inline">{{ repoSource }}/{{ repoOwner }}/</span>{{ repoName }}
        </li>
      </ol>
    </nav>

    <pipeline
      :pipeline="pipeline"
      v-if="pipeline"
      class="m-3"
    />

    <pipeline-warnings
      v-if="pipeline"
      :pipeline="pipeline"
    />

    <tabs
      :tabs="tabs"
      :params="{ repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }"
    />

    <router-view
      :user="user"
      :pipeline="pipeline"
      v-if="pipeline"
    />
  </div>
</template>

<script>
import Pipeline from '@/components/Pipeline'
import PipelineWarnings from '@/components/PipelineWarnings'
import Tabs from '@/components/Tabs'

export default {
  components: {
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
      tabs: [
        {
          routeName: 'PipelineOverview',
          tabName: 'Overview',
          icon: 'industry',
          active: true
        },
        {
          routeName: 'PipelineBuilds',
          tabName: 'Builds',
          icon: 'tools',
          active: () => { return this.pipeline && this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0 }
        },
        {
          routeName: 'PipelineReleases',
          tabName: 'Releases',
          icon: 'upload',
          active: true
        },
        {
          routeName: 'PipelineTriggers',
          tabName: 'Trigger',
          icon: 'project-diagram',
          active: true
        },
        {
          routeName: 'PipelineStatistics',
          tabName: 'Insights',
          icon: 'lightbulb',
          active: true
        },
        {
          routeName: 'PipelineSecretEncrypter',
          tabName: 'Insights',
          icon: 'user-secret',
          active: true
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
