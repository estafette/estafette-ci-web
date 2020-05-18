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
        <li class="breadcrumb-item text-truncate">
          <router-link :to="{ name: 'PipelineBuilds', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName }}">
            <span class="d-none d-md-inline">{{ repoSource }}/{{ repoOwner }}/</span>{{ repoName }}
          </router-link>
        </li>
        <li class="breadcrumb-item text-truncate">
          <router-link :to="{ name: 'PipelineBuilds', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName }}">
            builds
          </router-link>
        </li>
        <li
          class="breadcrumb-item text-truncate active"
          aria-current="page"
          v-if="build"
        >
          {{ build.buildVersion }}
        </li>
      </ol>
    </nav>

    <build
      v-if="build"
      :build="build"
      :user="user"
      :pipeline="build"
      class="m-3"
    />

    <pipeline-build-warnings
      v-if="build"
      :build="build"
    />

    <tabs :tabs="tabs" />

    <router-view
      :build="build"
      v-if="build"
    />
  </div>
</template>

<script>
import Build from '@/components/Build'
import PipelineBuildWarnings from '@/components/PipelineBuildWarnings'
import Tabs from '@/components/Tabs'

export default {
  components: {
    Build,
    PipelineBuildWarnings,
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
    id: {
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
      build: null,
      refresh: true,
      tabs: [
        {
          text: 'Logs',
          icon: 'poll-h',
          enabled: true,
          to: { name: 'PipelineBuildLogs', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName, id: this.id } }
        },
        {
          text: 'Manifest',
          icon: 'book',
          enabled: true,
          to: { name: 'PipelineBuildManifest', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName, id: this.id } }
        }
      ]
    }
  },

  created () {
    this.loadBuild()
  },

  methods: {
    loadBuild () {
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.id}`)
        .then(response => {
          this.build = response.data
          if (this.build.buildStatus !== 'succeeded' && this.build.buildStatus !== 'failed') {
            this.periodicallyRefreshBuild(5)
          } else {
            this.periodicallyRefreshBuild(15)
          }
        })
        .catch(e => {
          this.periodicallyRefreshBuild(30)
        })
    },

    periodicallyRefreshBuild (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadBuild, timeoutWithJitter)
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
