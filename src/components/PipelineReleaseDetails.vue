<template>
  <div>
    <b-jumbotron
      header="Builds & releases"
      bg-variant="success"
      text-variant="white"
      header-level="5"
      container-fluid
      fluid
      class="section-header"
    />

    <b-breadcrumb
      :items="breadcrumbs"
      class="m-3 rounded"
    />

    <release-header
      v-if="release"
      :release="release"
    />

    <tabs :tabs="tabs" />

    <router-view
      :release="release"
      v-if="release"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BBreadcrumb, BJumbotron } from 'bootstrap-vue'
import ReleaseHeader from '@/components/ReleaseHeader'
import Tabs from '@/components/Tabs'

export default {
  components: {
    BBreadcrumb,
    BJumbotron,
    ReleaseHeader,
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
    releaseID: {
      type: String,
      default: null
    }
  },
  data: function () {
    return {
      release: null,
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
          text: 'releases',
          to: { name: 'PipelineReleases', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName } }
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
          to: { name: 'PipelineReleaseLogs', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName, releaseID: this.releaseID } }
        }
      ]
    }
  },

  created () {
    this.loadRelease()
  },

  methods: {
    loadRelease () {
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}`)
        .then(response => {
          this.release = response.data

          this.breadcrumbs[this.breadcrumbs.length - 1] = {
            text: `${this.release.releaseVersion} to ${this.release.name}` + (this.release.action ? ` (${this.release.action})` : ''),
            to: { name: 'PipelineReleaseLogs', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName, releaseID: this.releaseID } },
            active: true
          }

          if (this.release.releaseStatus !== 'succeeded' && this.release.releaseStatus !== 'failed') {
            this.periodicallyRefreshRelease(5)
          } else {
            this.periodicallyRefreshRelease(15)
          }
        })
        .catch(e => {
          this.periodicallyRefreshRelease(30)
        })
    },

    periodicallyRefreshRelease (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadRelease, timeoutWithJitter)
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
