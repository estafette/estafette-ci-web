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

    <div
      v-if="release"
      :class="[
        $options.filters.bootstrapClass(release.releaseStatus, 'border'),
        dashboardModeActive ? $options.filters.bootstrapClass(release.releaseStatus, 'bg') : '',
        dashboardModeActive ? $options.filters.bootstrapTextClass(release.releaseStatus) : '',
        'row rounded border pt-3 pr-2 pb-2 pl-2 mt-2 mr-3 mb-2 ml-3'
      ]"
    >
      <div
        class="mb-2 col-6 col-md-4 col-xl-2 text-truncate"
        :title="release.name"
      >
        <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(build.buildStatus) : 'text-black-50', 'small mb-1']">
          Name
        </div>
        {{ release.name }}<span v-if="release.action">
          / {{ release.action }}
        </span>
      </div>
      <div
        class="mb-2 col-6 col-md-4 col-xl-2 text-truncate"
        :title="release.releaseVersion"
      >
        <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(build.buildStatus) : 'text-black-50', 'small mb-1']">
          Version
        </div>
        {{ release.releaseVersion }}
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2 align-middle">
        <div class="small text-muted mb-1">
          Status
        </div>
        <router-link
          :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
          tag="div"
          class="progress mt-2 clickable"
        >
          <div
            class="progress-bar"
            :class="[$options.filters.bootstrapClass(release.releaseStatus,'bg'), $options.filters.stripedProgressBarClass(release.releaseStatus)]"
            role="progressbar"
            style="width: 100%"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            :title="release.releaseStatus"
          />
        </router-link>
      </div>
      <div
        class="mb-2 col-6 col-md-4 col-xl-2 text-truncate"
        :title="$options.filters.formatDuration(release.duration) + ', ' + $options.filters.formatDatetime(release.insertedAt)"
      >
        <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(build.buildStatus) : 'text-black-50', 'small mb-1']">
          Released
        </div>
        <span
          v-if="release.duration > 0"
          :class="release.duration | colorDurationClass"
        >
          {{ release.duration | formatDuration }}
        </span> {{ release.insertedAt | formatDatetime }}
      </div>
      <div
        class="mb-2 col-6 col-md-4 col-xl-2 text-truncate"
        :title="release.triggeredBy"
      >
        <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(build.buildStatus) : 'text-black-50', 'small mb-1']">
          By
        </div>
        {{ release.triggeredBy }}
      </div>

      <div
        v-if="user && user.authenticated && release && release.releaseStatus === 'running'"
        class="mb-2 col-6 col-md-4 col-xl-2"
      >
        <div class="small text-black-50 mb-1">
          Actions
        </div>
        <cancel-button
          :release="release"
          :user="user"
        />
      </div>
    </div>

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
import CancelButton from '@/components/CancelButton'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPollH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPollH)

export default {
  components: {
    CancelButton,
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
      errors: [],
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
          if (this.release.releaseStatus === 'running' || this.release.releaseStatus === 'canceling') {
            this.periodicallyRefreshRelease(5)
          }
        })
        .catch(e => {
          this.errors.push(e)
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
