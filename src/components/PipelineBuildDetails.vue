<template>
  <div>
    <nav class="m-3" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Pipelines'}">Pipelines</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'PipelineBuilds', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName }}">{{repoSource}}/{{repoOwner}}/{{repoName}}</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{repoRevision | gitHash}}</li>
      </ol>
    </nav>

    <ul class="nav nav-tabs m-3">
      <li class="nav-item">
        <router-link :to="{ name: 'PipelineBuildLogs', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName, repoRevision: repoRevision }}" class="nav-link">Logs</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'PipelineBuildManifest', params: { repoSource: repoSource, repoOwner: repoOwner, repoName: repoName, repoRevision: repoRevision }}" class="nav-link">Manifest</router-link>
      </li>
    </ul>

    <router-view/>
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
    axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds/${this.repoRevision}`)
      .then(response => {
        this.pipeline = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
