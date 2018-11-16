<template>
  <div>
    <nav class="m-3" aria-label="breadcrumb">
      <ol class="breadcrumb flex-nowrap">
        <li class="breadcrumb-item text-truncate"><router-link :to="{ name: 'Pipelines'}">Pipelines</router-link></li>
        <li class="breadcrumb-item text-truncate active" aria-current="page"><span class="d-none d-md-inline">{{repoSource}}/{{repoOwner}}/</span>{{repoName}}</li>
      </ol>
    </nav>

    <div v-if="pipeline" class="row rounded border pt-3 pr-2 pb-2 pl-2 mt-2 mr-3 mb-2 ml-3" :class="pipeline.buildStatus | bootstrapClass('border')">
      <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="pipeline.buildVersion">
        <div class="small text-muted mb-1">Version</div>
        {{pipeline.buildVersion}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-1 align-middle">
        <div class="small text-muted mb-1">Status</div>
        <router-link :to="{ name: 'PipelineBuildLogs', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName, id: pipeline.id }}" tag="div" class="progress mt-2 clickable">
          <div class="progress-bar" :class="[$options.filters.bootstrapClass(pipeline.buildStatus,'bg'), $options.filters.stripedProgressBarClass(pipeline.buildStatus)]" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" :title="pipeline.buildStatus"></div>
        </router-link>
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="$options.filters.formatDuration(pipeline.duration) + ', ' + $options.filters.formatDatetime(pipeline.insertedAt)">
        <div class="small text-muted mb-1">Built</div>
        <span :class="pipeline.duration | colorDurationClass">{{pipeline.duration | formatDuration}}</span>, {{pipeline.insertedAt | formatDatetime}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="pipeline.repoBranch">
        <div class="small text-muted mb-1">Branch</div>
        {{pipeline.repoBranch}}
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-2">
        <div class="small text-muted mb-1">Revision</div>
        <commit-link :build="pipeline"/>
      </div>
      <div class="mb-2 col-6 col-md-4 col-xl-3">
        <div class="small text-muted mb-1">Commit(s)</div>
        <div v-for="commit in pipeline.commits" v-bind:key="commit.message" :title="commit.message + ' / ' + commit.author.name" class="text-truncate">{{commit.message}} / {{commit.author.name}}</div>
      </div>

      <div v-if="(pipeline.labels && pipeline.labels.length > 0) || (pipeline.releases && pipeline.releases.length > 0)" class="col-12"><div class="mt-3 mb-3 w-50 mx-auto border-bottom"></div></div>
      <div v-if="pipeline.labels && pipeline.labels.length > 0" class="mb-2 col-12 col-xl-6 text-center text-truncate text-truncate-fade">
        <div class="small text-black-50 mb-1">Labels</div>
        <router-link :to="{ name: 'Pipelines', query: { labels: label.key + '=' + label.value } }" exact class="btn btn-light btn-sm mr-1 mb-1" v-for="label in sortLabels(pipeline.labels)" v-bind:key="label.key">{{label.key}}={{label.value}}</router-link>
      </div>
      <div v-if="pipeline.releases && pipeline.releases.length > 0" class="mb-2 col-12 col-xl-6 text-center text-truncate text-truncate-fade">
        <div class="small text-black-50 mb-1">Releases</div>
        <release-badge v-for="release in pipeline.releases" v-bind:key="release.name" :release="release"/>
      </div>

    </div>

    <ul class="nav nav-tabs m-3">
      <li class="nav-item">
        <router-link :to="{ name: 'PipelineBuilds', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}" class="nav-link">Builds</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'PipelineReleases', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}" class="nav-link">Releases</router-link>
      </li>
    </ul>

    <router-view :user="user" :pipeline="pipeline" v-if="pipeline"/>
  </div>
</template>

<script>
export default {
  props: {
    repoSource: String,
    repoOwner: String,
    repoName: String,
    user: Object
  },
  data: function () {
    return {
      pipeline: null,
      errors: []
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
          this.periodicallyRefreshPipeline(15)
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshPipeline(60)
        })
    },

    periodicallyRefreshPipeline (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      this.refreshTimeout = setTimeout(this.loadPipeline, timeoutWithJitter)
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
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
