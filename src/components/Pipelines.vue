<template>
    <div>
      <div class="m-3 justify-content-center">
          <router-link :to="{ name: 'Pipelines', query: { page: pagination.currentPage } }" exact class="btn btn-outline-primary">All</router-link>
          <router-link :to="{ name: 'Pipelines', query: { status: 'succeeded', page: pagination.currentPage } }" exact class="btn btn-outline-success">Succeeded</router-link>
          <router-link :to="{ name: 'Pipelines', query: { status: 'failed', page: pagination.currentPage } }" exact class="btn btn-outline-danger">Failed</router-link>
          <router-link :to="{ name: 'Pipelines', query: { status: 'running', page: pagination.currentPage } }" exact class="btn btn-outline-warning">Running</router-link>
      </div>

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
              <td>{{pipeline.repoRevision | gitHash}}</td>
              <td class="align-middle">
                  <div class="progress">
                      <div class="progress-bar" :class="pipeline.buildStatus | bootstrapClass('bg')" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </td>
              <td>{{pipeline.insertedAt | moment("calendar")}}</td>
              <td class="d-none d-xl-table-cell">
                  <button type="button" class="btn btn-light btn-sm mr-1" v-for="label in pipeline.labels" v-bind:key="label.key">{{label.key}}={{label.value}}</button>
              </td>
              <td>
                  <button type="button" class="btn btn-light btn-sm mr-1" v-for="targetVersion in pipeline.targetVersions" v-bind:key="targetVersion.target.name">
                      {{targetVersion.target.name}} <span class="badge" :class="targetVersion.buildStatus | bootstrapClass('badge')">{{targetVersion.buildVersion}}</span>
                  </button>
              </td>
            </router-link>
          </tbody>
          </table>
      </div>

      <b-pagination-nav size="md" :link-gen="paginationLinkGenerator" use-router :number-of-pages="pagination.numberOfPages" v-model="pagination.currentPage" align="center"/>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    query: Object
  },

  data: function () {
    return {
      pipelines: [],
      errors: [],
      pagination: {
        totalRows: 500,
        currentPage: 1,
        rowsPerPage: 20,
        numberOfPages: 25
      },
      filter: {
        status: ''
      }
    }
  },

  created () {
    this.setDataFromQueryParams(this.query)
    this.loadPipelines()
  },

  methods: {
    paginationLinkGenerator (pageNum) {
      return { name: 'Pipelines', query: { status: this.filter.status, page: pageNum } }
    },

    setDataFromQueryParams (query) {
      this.pagination.currentPage = query && query.page ? Number.parseInt(query.page, 10) : 1
      this.filter.status = query && query.status ? query.status : ''
    },

    loadPipelines () {
      axios.get(`/api/pipelines?filter[status]=${this.filter.status}&page[number]=${this.pagination.currentPage}&page[size]=${this.pagination.rowsPerPage}`)
        .then(response => {
          this.pipelines = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams(to.query)
      this.loadPipelines()
    }
  }
}
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
