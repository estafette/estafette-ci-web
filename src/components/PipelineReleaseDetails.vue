<template>
  <div>
    <nav
      class="m-3"
      aria-label="breadcrumb"
      v-if="!dashboardModeActive"
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
          <router-link :to="{ name: 'PipelineReleases', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName }}">
            releases
          </router-link>
        </li>
        <li
          class="breadcrumb-item text-truncate active"
          aria-current="page"
          v-if="release"
        >
          {{ release.releaseVersion }} to {{ release.name }}<span v-if="release.action">
            / {{ release.action }}
          </span>
        </li>
      </ol>
    </nav>

    <release
      v-if="release"
      :release="release"
      :user="user"
      :dashboard-mode-active="dashboardModeActive"
      class="m-3"
    />

    <ul class="nav nav-tabs m-3">
      <li class="nav-item">
        <router-link
          :to="{ name: 'PipelineReleaseLogs', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName, releaseID: releaseID }}"
          class="nav-link"
        >
          <font-awesome-icon
            icon="poll-h"
            class="mr-2"
          />
          Logs
        </router-link>
      </li>
    </ul>

    <router-view
      :release="release"
      :dashboard-mode-active="dashboardModeActive"
      v-if="release"
    />
  </div>
</template>

<script>
import Release from '@/components/Release'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPollH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPollH)

export default {
  components: {
    Release,
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
    releaseID: {
      type: String,
      default: null
    },
    user: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  },
  data: function () {
    return {
      release: null,
      refresh: true
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

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
