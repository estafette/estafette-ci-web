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
      class="m-3"
      v-if="pipeline"
    />

    <pipeline-warnings
      v-if="pipeline"
      :pipeline="pipeline"
    />

    <ul
      class="nav nav-tabs m-3"
    >
      <li class="nav-item">
        <router-link
          :to="{ name: 'PipelineOverview', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="industry"
            class="mr-2"
          />
          Overview
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'PipelineBuilds', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="tools"
            class="mr-2"
          />
          Builds
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'PipelineReleases', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}"
          v-if="pipeline && pipeline.releaseTargets && pipeline.releaseTargets.length > 0"
          class="nav-link"
        >
          <font-awesome-icon
            icon="upload"
            class="mr-2"
          />
          Releases
        </router-link>
        <span
          v-else
          class="nav-link disabled"
        >
          <font-awesome-icon
            icon="upload"
            class="mr-2"
          />
          Releases
        </span>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'PipelineTriggers', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="project-diagram"
            class="mr-2"
          />
          Triggers
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'PipelineStatistics', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="chart-line"
            class="mr-2"
          />
          Statistics
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'PipelineSecretEncrypter', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="user-secret"
            class="mr-2"
          />
          Secrets
        </router-link>
      </li>
    </ul>

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

import { library } from '@fortawesome/fontawesome-svg-core'
import { faIndustry, faTools, faUpload, faProjectDiagram, faChartLine, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faIndustry, faTools, faUpload, faProjectDiagram, faChartLine, faUserSecret)

export default {
  components: {
    Pipeline,
    PipelineWarnings,
    FontAwesomeIcon
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
      refresh: true
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
