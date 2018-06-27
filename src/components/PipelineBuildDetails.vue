<template>
  <div>
    <nav class="m-3" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Pipelines'}">Pipelines</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'PipelineBuilds', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}">{{repoSource}}/{{repoOwner}}/{{repoName}}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{repoRevision | gitHash}}</li>
      </ol>
    </nav>

    <div class="row rounded border pt-3 pr-2 pb-2 pl-2 mt-2 mr-3 mb-2 ml-3" :class="build.buildStatus | bootstrapClass('border')">
      <div class="mb-2 col-6 col-md-4 col-xl-2">
        <div class="small text-muted mb-1">Version</div>
        {{build.buildVersion}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-1 align-middle">
        <div class="small text-muted mb-1">Status</div>
        <div class="progress mt-2">
            <div class="progress-bar" :class="build.buildStatus | bootstrapClass('bg')" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2">
        <div class="small text-muted mb-1">Branch</div>
        {{build.repoBranch}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2">
        <div class="small text-muted mb-1">Revision</div>
        {{build.repoRevision | gitHash}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-3">
        <div class="small text-muted mb-1">Commit(s)</div>
        <div v-for="commit in build.commits" v-bind:key="commit.message" :title="commit.message" class="small">{{commit.message | ellipsis(20)}} / {{commit.author.name}}</div>
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2">
        <div class="small text-muted mb-1">Built at</div>
        {{build.insertedAt | moment("calendar")}}
      </div>
    </div>

    <ul class="nav nav-tabs m-3">
      <li class="nav-item">
        <router-link :to="{ name: 'PipelineBuildLogs', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName, repoRevision: repoRevision }}" class="nav-link">Logs</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'PipelineBuildManifest', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName, repoRevision: repoRevision }}" class="nav-link">Manifest</router-link>
      </li>
    </ul>

    <router-view :build="build"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    repoSource: String,
    repoOwner: String,
    repoName: String,
    repoRevision: String
  },
  data: function () {
    return {
      build: {},
      errors: []
    }
  },

  created () {
    this.loadBuild()
  },

  methods: {
    loadBuild () {
      axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.repoRevision}`)
        .then(response => {
          this.build = response.data
          if (reponse.data.buildStatus === 'running') {
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
    }
  },

  beforeDestroy () {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
