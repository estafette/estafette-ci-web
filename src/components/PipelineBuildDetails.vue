<template>
  <div>
    <b-breadcrumb
      :items="breadcrumbs"
      class="m-3 rounded"
    />

    <build
      v-if="build"
      :build="build"
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
import { mapState } from 'vuex'
import { BBreadcrumb } from 'bootstrap-vue'
import Build from '@/components/Build'
import PipelineBuildWarnings from '@/components/PipelineBuildWarnings'
import Tabs from '@/components/Tabs'

export default {
  components: {
    BBreadcrumb,
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
    }
  },
  data: function () {
    return {
      build: null,
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
          to: { name: 'PipelineOverview', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: 'builds',
          to: { name: 'PipelineBuilds', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: '...'
        }
      ],
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

          this.breadcrumbs[this.breadcrumbs.length - 1] = {
            text: `${this.build.buildVersion}`,
            to: { name: 'PipelineBuildLogs', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName, id: this.id } },
            active: true
          }

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
