<template>
  <div>
    <nav class="m-3" aria-label="breadcrumb">
      <ol class="breadcrumb flex-nowrap">
        <li class="breadcrumb-item text-truncate"><router-link :to="{ name: 'Pipelines'}">Pipelines</router-link></li>
        <li class="breadcrumb-item text-truncate"><router-link :to="{ name: 'PipelineBuilds', params: { repoSource: this.repoSource, repoOwner: this.repoOwner, repoName: this.repoName }}"><span class="d-none d-md-inline">{{repoSource}}/{{repoOwner}}/</span>{{repoName}}</router-link></li>
        <li class="breadcrumb-item text-truncate active">builds</li>
        <li class="breadcrumb-item text-truncate active" aria-current="page" v-if="build">{{build.buildVersion}}</li>
      </ol>
    </nav>

    <div v-if="build" class="row rounded border pt-3 pr-2 pb-2 pl-2 mt-2 mr-3 mb-2 ml-3" :class="build.buildStatus | bootstrapClass('border')">
      <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="build.buildVersion">
        <div class="small text-muted mb-1">Version</div>
        {{build.buildVersion}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-1 align-middle">
        <div class="small text-muted mb-1">Status</div>
        <router-link :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}" tag="div" class="progress mt-2 clickable">
          <div class="progress-bar" :class="[$options.filters.bootstrapClass(build.buildStatus,'bg'), $options.filters.stripedProgressBarClass(build.buildStatus)]" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" :title="build.buildStatus"></div>
        </router-link>
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="moment(build.insertedAt)">
        <div class="small text-muted mb-1">Built at</div>
        {{build.insertedAt | moment("calendar")}} in <span :class="build.duration | colorDurationClass">{{build.duration | formatDuration}}</span>
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="build.repoBranch">
        <div class="small text-muted mb-1">Branch</div>
        {{build.repoBranch}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2">
        <div class="small text-muted mb-1">Revision</div>
        <commit-link :build="build"/>
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-3">
        <div class="small text-muted mb-1">Commit(s)</div>
        <div v-for="commit in build.commits" v-bind:key="commit.message" :title="commit.message + ' / ' + commit.author.name" class="text-truncate">{{commit.message}} / {{commit.author.name}}</div>
      </div>

      <div v-if="build.labels && build.labels.length > 0" class="col-12"><div class="mt-3 mb-3 w-50 mx-auto border-bottom"></div></div>
      <div v-if="build.labels && build.labels.length > 0" class="mb-2 col-12 col-md-6 text-center text-truncate text-truncate-fade">
        <div class="small text-black-50 mb-1">Labels</div>
        <router-link :to="{ name: 'Pipelines', query: { labels: label.key + '=' + label.value } }" exact class="btn btn-light btn-sm mr-1 mb-1" v-for="label in sortLabels(build.labels)" v-bind:key="label.key">{{label.key}}={{label.value}}</router-link>
      </div>

      <div v-if="user && user.authenticated && build && ((build.buildStatus === 'failed' || build.buildStatus === 'running' || build.buildStatus === 'canceled') || (build.releases && build.releases.length > 0 && build.buildStatus === 'succeeded'))" class="mb-2 col-12 col-md-6 text-center">
        <div class="small text-black-50 mb-1">Actions</div>
        <release-button :pipeline="pipeline" :build="build" :user="user" />
        <rebuild-button :build="build" :user="user" />
        <cancel-button :build="build" :user="user" />
      </div>

    </div>

    <ul class="nav nav-tabs m-3">
      <li class="nav-item">
        <router-link :to="{ name: 'PipelineBuildLogs', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName, id: id }}" class="nav-link">Logs</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'PipelineBuildManifest', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName, id: id }}" class="nav-link">Manifest</router-link>
      </li>
    </ul>

    <router-view :build="build" v-if="build"/>
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
    id: String,
    user: Object
  },
  data: function () {
    return {
      build: null,
      errors: []
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
          if (response.data.buildStatus === 'running') {
            this.periodicallyRefreshBuild(15)
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    periodicallyRefreshBuild (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      this.refreshTimeout = setTimeout(this.loadBuild, timeoutWithJitter)
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
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },

  beforeDestroy () {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
