<template>
  <div>
    <section-header section-route-name="Pipelines" />

    <b-breadcrumb
      :items="breadcrumbs"
      class="m-3 rounded"
    />

    <pipeline-header
      :pipeline="pipeline"
      v-if="pipeline"
    />

    <inner-navigation-tabs section-route-name="Pipelines" />

    <router-view
      :pipeline="pipeline"
      v-if="pipeline"
      class="m-3"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BBreadcrumb } from 'bootstrap-vue'
import PipelineHeader from '@/components/PipelineHeader'
import SectionHeader from '@/components/SectionHeader'
import InnerNavigationTabs from '@/components/InnerNavigationTabs'

export default {
  components: {
    BBreadcrumb,
    SectionHeader,
    PipelineHeader,
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
    }
  },
  data: function () {
    return {
      pipeline: null,
      refresh: true,
      breadcrumbs: [
        {
          text: 'Builds & releases',
          to: { name: 'Pipelines' }
        },
        {
          text: `${this.repoName}`,
          to: { name: 'PipelineOverview', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } },
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

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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
