<template>
  <div class="m-3">
    <table class="table">
    <thead>
        <tr>
        <th scope="col">Version</th>
        <th scope="col">Branch</th>
        <th scope="col">Revision</th>
        <th scope="col">Status</th>
        <th scope="col">Built at</th>
        </tr>
    </thead>
    <tbody>

    <router-link v-for="build in builds" v-bind:key="build.id" :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, repoRevision: build.repoRevision }}" tag="tr">
        <td>{{build.buildVersion}}</td>
        <td>{{build.repoBranch}}</td>
        <td>{{build.repoRevision | gitHash}}</td>
        <td class="align-middle">
            <div class="progress">
            <div class="progress-bar" :class="build.buildStatus | bgClass" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </td>
        <td>{{build.insertedAt | moment("calendar")}}</td>
      </router-link>
    </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    repoSource: String,
    repoOwner: String,
    repoName: String
  },
  data: function () {
    return {
      builds: [],
      errors: []
    }
  },

  created () {
    axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds`)
      .then(response => {
        this.builds = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
