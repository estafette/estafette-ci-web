<template>
  <div>
    <nav class="m-3" aria-label="breadcrumb">
      <ol class="breadcrumb flex-nowrap">
        <li class="breadcrumb-item text-truncate"><router-link :to="{ name: 'Pipelines'}">Pipelines</router-link></li>
        <li class="breadcrumb-item text-truncate"><router-link :to="{ name: 'PipelineReleases', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName }}"><span class="d-none d-md-inline">{{repoSource}}/{{repoOwner}}/</span>{{repoName}}</router-link></li>
        <li class="breadcrumb-item text-truncate active">releases</li>
        <li class="breadcrumb-item text-truncate active" aria-current="page" v-if="release" >{{release.releaseVersion}} to {{release.name}}</li>
      </ol>
    </nav>

    <div v-if="release" class="row rounded border pt-3 pr-2 pb-2 pl-2 mt-2 mr-3 mb-2 ml-3" :class="release.releaseStatus | bootstrapClass('border')">
      <div class="mb-2 col-6 col-md-4 col-lg-3 col-xl-2 text-truncate" :title="release.name">
        <div class="small text-muted mb-1">Name</div>
        {{release.name}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-lg-3 col-xl-2 text-truncate" :title="release.releaseVersion">
        <div class="small text-muted mb-1">Version</div>
        {{release.releaseVersion}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-lg-3 col-xl-2 align-middle">
        <div class="small text-muted mb-1">Status</div>
        <div class="progress mt-2">
            <div class="progress-bar" :class="release.releaseStatus | bootstrapClass('bg')" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
      <div class="mb-2 col-6 col-md-4 col-lg-3 col-xl-2 text-truncate" :title="moment(release.insertedAt)">
        <div class="small text-muted mb-1">Triggered at</div>
        {{release.insertedAt | moment("calendar")}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-lg-3 col-xl-4 text-truncate" :title="release.triggeredBy">
        <div class="small text-muted mb-1">Triggered by</div>
        {{release.triggeredBy}}
      </div>
    </div>

    <ul class="nav nav-tabs m-3">
      <li class="nav-item">
        <router-link :to="{ name: 'PipelineReleaseLogs', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName, releaseID: releaseID }}" class="nav-link">Logs</router-link>
      </li>
    </ul>

    <router-view :release="release" v-if="release"/>
  </div>
</template>

<script>
const moment = require('moment')
require('moment/locale/en-il')

export default {
  props: {
    repoSource: String,
    repoOwner: String,
    repoName: String,
    releaseID: String
  },
  data: function () {
    return {
      release: null,
      errors: []
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
          if (response.data.releaseStatus === 'running') {
            this.periodicallyRefreshRelease(15)
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    periodicallyRefreshRelease (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      this.refreshTimeout = setTimeout(this.loadRelease, timeoutWithJitter)
    },

    sortLabels (labels) {
      if (!labels) {
        return labels
      }
      return labels.slice().sort(function (a, b) {
        return a.key > b.key
      })
    },

    moment (value) {
      return moment(value).calendar()
    }
  },

  beforeDestroy () {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
