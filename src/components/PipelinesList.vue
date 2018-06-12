<template>
    <div class="m-3">
        <table class="table">
        <thead>
            <tr>
            <th scope="col">Pipeline</th>
            <th scope="col">Version</th>
            <th scope="col">Branch</th>
            <th scope="col">Revision</th>
            <th scope="col">Status</th>
            <th scope="col">Built at</th>
            <th scope="col" class="d-none d-xl-table-cell">Labels</th>
            <th scope="col">Releases</th>
            </tr>
        </thead>
        <tbody>

        <router-link v-for="pipeline in pipelines" v-bind:key="pipeline.id" :to="{ name: 'PipelineBuilds', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName }}" tag="tr">
            <td scope="row">
                <span class="text-muted d-none d-xl-inline">{{pipeline.repoSource}}/{{pipeline.repoOwner}}/</span><strong>{{pipeline.repoName}}</strong>
            </td>
            <td>{{pipeline.buildVersion}}</td>
            <td>{{pipeline.repoBranch}}</td>
            <td>{{pipeline.repoRevision | git-hash}}</td>
            <td class="align-middle">
                <div class="progress">
                    <div class="progress-bar" :class="pipeline.buildStatus | bgClass" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </td>
            <td>{{pipeline.insertedAt | moment("calendar")}}</td>
            <td class="d-none d-xl-table-cell">
                <button type="button" class="btn btn-light btn-sm mr-1" v-for="label in pipeline.labels" v-bind:key="label.key">{{label.key}}={{label.value}}</button>
            </td>
            <td>
                <button type="button" class="btn btn-light btn-sm mr-1" v-for="targetVersion in pipeline.targetVersions" v-bind:key="targetVersion.target.name">
                    {{targetVersion.target.name}} <span class="badge">{{targetVersion.buildVersion}}</span>
                </button>
            </td>
        </router-link>
        </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PipelinesList',
  data: function () {
    return {
      pipelines: [],
      errors: []
    }
  },

  created () {
    axios.get('/api/pipelines')
      .then(response => {
        this.pipelines = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  filters: {
    bgClass: function (value) {
      if (!value) {
        return 'bg-light'
      }
      value = value.toString()
      if (value === 'succeeded') {
        return 'bg-success'
      }
      if (value === 'running') {
        return 'bg-warning'
      }
      if (value === 'failed') {
        return 'bg-danger'
      }
      return 'bg-light'
    }
  }
}
</script>

<style>

</style>
