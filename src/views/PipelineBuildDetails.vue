<template>
  <div>
    <section-header section-route-name="Pipelines" />

    <b-breadcrumb
      :items="breadcrumbs"
      class="m-3 rounded"
    />

    <build-header
      v-if="build"
      :build="build"
      :pipeline="pipeline && (build.buildStatus === 'pending' || build.buildStatus === 'running') ? pipeline : build"
    />

    <pipeline-build-warnings
      v-if="build"
      :build="build"
    />

    <inner-navigation-tabs section-route-name="Pipelines" />

    <router-view
      :build="build"
      v-if="build"
      class="m-3"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BBreadcrumb } from 'bootstrap-vue'
import SectionHeader from '@/components/SectionHeader'
import BuildHeader from '@/components/BuildHeader'
import PipelineBuildWarnings from '@/components/PipelineBuildWarnings'
import InnerNavigationTabs from '@/components/InnerNavigationTabs'

export default {
  components: {
    BBreadcrumb,
    SectionHeader,
    BuildHeader,
    PipelineBuildWarnings,
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
    id: {
      type: String,
      default: null
    }
  },
  data: function () {
    return {
      build: null,
      pipeline: null,
      refresh: true,
      breadcrumbs: [
        {
          text: 'Builds & releases',
          to: { name: 'Pipelines' }
        },
        {
          text: `${this.repoName}`,
          to: { name: 'PipelineOverview', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: 'builds',
          to: { name: 'PipelineBuilds', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
        },
        {
          text: '...'
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

          if (this.build.buildStatus === 'pending' || this.build.buildStatus === 'running') {
            // load pipeline in order to show progress bar growing (pipeline has median (pending) build time, build does not)
            this.loadPipeline()
          }

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
          console.warn(e)
          this.periodicallyRefreshBuild(30)
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

    periodicallyRefreshBuild (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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
