<template>
  <div>
    <section-header section-route-name="Pipelines" />
    <migration-notice
      v-if="migration"
      :to-source="migration.repoSource"
      :to-owner="migration.repoOwner"
      :to-name="migration.repoName"
      :to-id="migration.id"
      page="releases"
    />

    <b-breadcrumb
      :items="breadcrumbs"
      class="m-3 rounded"
    />

    <release-header
      v-if="release"
      :release="release"
      :pipeline="pipeline && (release.releaseStatus === 'pending' || release.releaseStatus === 'running') ? pipeline : release"
    />

    <inner-navigation-tabs section-route-name="Pipelines" />

    <router-view
      :release="release"
      v-if="release"
      class="m-3"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BBreadcrumb } from 'bootstrap-vue'
import SectionHeader from '@/components/SectionHeader'
import MigrationNotice from '@/components/MigrationNotice'
import ReleaseHeader from '@/components/ReleaseHeader'
import InnerNavigationTabs from '@/components/InnerNavigationTabs'

export default {
  components: {
    BBreadcrumb,
    SectionHeader,
    ReleaseHeader,
    MigrationNotice,
    InnerNavigationTabs
  },
  props: {
    repoSource: {
      type: String,
      required: true,
      default: null
    },
    repoOwner: {
      type: String,
      required: true,
      default: null
    },
    repoName: {
      type: String,
      required: true,
      default: null
    },
    releaseID: {
      type: String,
      required: true,
      default: null
    }
  },
  data: function () {
    return {
      release: null,
      pipeline: null,
      refresh: true,
      migration: null,
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
      ]
    }
  },

  created () {
    this.loadRelease()
  },

  methods: {
    loadRelease () {
      this.axios.get(`/api/migrations/releases/${this.releaseID}`)
        .then(response => {
          if (response.data) {
            this.migration = response.data
          }
        }).catch(e => {
          console.debug('release probably not migrated', e)
        })
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases/${this.releaseID}`)
        .then(response => {
          this.release = response.data

          if (this.release.releaseStatus === 'pending' || this.release.releaseStatus === 'running') {
            // load pipeline in order to show progress bar growing (pipeline has median (pending) release time, release does not)
            this.loadPipeline()
          }

          this.breadcrumbs[this.breadcrumbs.length - 1] = {
            text: `${this.release.releaseVersion} to ${this.release.name}` + (this.release.action ? ` (${this.release.action})` : ''),
            to: { name: 'PipelineReleaseLogs', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName, releaseID: this.releaseID } },
            active: true
          }

          if (this.release.releaseStatus !== 'succeeded' && this.release.releaseStatus !== 'failed') {
            this.periodicallyRefreshRelease(5)
          } else {
            this.periodicallyRefreshRelease(18000)
          }
        })
        .catch(e => {
          this.periodicallyRefreshRelease(30)
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

    periodicallyRefreshRelease (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

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
