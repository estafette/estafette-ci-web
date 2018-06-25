<template>
    <div>
      <div class="m-3">
        <div class="row">
          <div class="col">
            <router-link :to="{ query: { since: filter.since, page: pagination.page } }" exact class="btn btn-outline-primary">All</router-link>
            <router-link :to="{ query: { status: 'succeeded', since: filter.since, page: pagination.page } }" exact class="btn btn-outline-success">Succeeded</router-link>
            <router-link :to="{ query: { status: 'failed', since: filter.since, page: pagination.page } }" exact class="btn btn-outline-danger">Failed</router-link>
            <router-link :to="{ query: { status: 'running', since: filter.since, page: pagination.page } }" exact class="btn btn-outline-warning">Running</router-link>
          </div>
          <div class="col-2 text-right">
            <b-form-select v-model="filter.since" :options="sinceOptions" v-on:change="setSince" class="border-primary text-primary" />
          </div>
        </div>
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
                  <button type="button" class="btn btn-light btn-sm mr-1" v-for="label in sortLabels(pipeline.labels)" v-bind:key="label.key">{{label.key}}={{label.value}}</button>
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

      <b-pagination-nav size="md" :link-gen="paginationLinkGenerator" use-router :number-of-pages="pagination.totalPages" v-model="pagination.page" align="center" hide-goto-end-buttons/>
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
        page: 1,
        size: 20,
        totalPages: 0,
        totalItems: 0
      },
      filter: {
        status: '',
        since: '1w'
      },
      sinceOptions: [
        { value: '1d', text: 'Since 1 day ago' },
        { value: '1w', text: 'Since 1 week ago' },
        { value: '1m', text: 'Since 1 month ago' },
        { value: '1y', text: 'Since 1 year ago' },
        { value: 'eternity', text: 'Since dawn of mankind' }
      ]
    }
  },

  created () {
    this.setDataFromQueryParams(this.query)
    this.loadPipelines()
  },

  methods: {
    paginationLinkGenerator (pageNum) {
      if (this.filter && this.filter.status && this.filter.status !== '') {
        return { query: { status: this.filter.status, since: this.filter.since, page: pageNum } }
      }
      return { query: { since: this.filter.since, page: pageNum } }
    },

    setDataFromQueryParams (query) {
      this.pagination.page = query && query.page ? Number.parseInt(query.page, 10) : 1
      this.filter.status = query && query.status ? query.status : ''
      this.filter.since = query && query.since ? query.since : '1w'

      this.updateQueryParams()
    },

    updateQueryParams () {
      if (this.filter && this.filter.status && this.filter.status !== '') {
        this.$router.push({query: { status: this.filter.status, since: this.filter.since, page: this.pagination.page }})
      } else {
        this.$router.push({query: { since: this.filter.since, page: this.pagination.page }})
      }
    },

    loadPipelines () {
      axios.get(`/api/pipelines?filter[status]=${this.filter.status}&filter[since]=${this.filter.since}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

          this.periodicallyRefreshPipelines(15)
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshPipelines(60)
        })
    },

    periodicallyRefreshPipelines (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      this.refreshTimeout = setTimeout(this.loadPipelines, timeoutWithJitter)
    },

    setSince (value) {
      this.filter.since = value
      this.updateQueryParams()
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

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams(to.query)
      this.loadPipelines()
    }
  },

  beforeDestroy () {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
