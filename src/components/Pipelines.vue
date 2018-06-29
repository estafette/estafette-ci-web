<template>
    <div>
      <div class="m-3">
        <div class="row">
          <div class="col-12 col-md-8 col-lg mb-2" id="status-filters">
            <router-link :to="{ query: { since: filter.since, page: pagination.page } }" exact class="btn btn-outline-primary">All</router-link>
            <router-link :to="{ query: { status: 'succeeded', since: filter.since, page: pagination.page } }" exact class="btn btn-outline-success">Succeeded</router-link>
            <router-link :to="{ query: { status: 'failed', since: filter.since, page: pagination.page } }" exact class="btn btn-outline-danger">Failed</router-link>
            <router-link :to="{ query: { status: 'running', since: filter.since, page: pagination.page } }" exact class="btn btn-outline-warning">Running</router-link>
          </div>
          <div class="col-12 col-md-4 col-lg-2 mb-2 text-right">
            <b-form-select v-model="filter.since" :options="sinceOptions" v-on:change="setSince" class="border-primary text-primary" />
          </div>
        </div>
      </div>

      <div class="m-3">

          <div class="row rounded border p-2 mt-2 mr-0 mb-2 ml-0 font-weight-bold">
            <div class="col-6 col-md-6 col-xl-5">Pipeline</div>
            <div class="col-6 col-md-6 col-xl-1">Version</div>
            <div class="col-12 col-md-6 col-xl-1 d-none d-xl-block">Status</div>
            <div class="col-6 col-md-6 col-xl-1 d-none d-xl-block">Built at</div>
            <div class="col-6 col-md-3 col-xl-1 d-none d-xl-block">Branch</div>
            <div class="col-6 col-md-3 col-xl-1 d-none d-xl-block">Revision</div>
            <div class="col-6 col-md-6 col-xl-2 d-none d-xl-block">Commit(s)</div>
          </div>

          <router-link v-for="pipeline in pipelines" v-bind:key="pipeline.id" :to="{ name: 'PipelineBuilds', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName }}" tag="div" class="row rounded border pt-3 pr-2 pb-2 pl-2 mt-2 mr-0 mb-2 ml-0" :class="pipeline.buildStatus | bootstrapClass('border')">
              <div class="mb-2 col-6 col-md-6 col-xl-5 text-truncate" :title="pipeline.repoSource + '/' + pipeline.repoOwner + '/' + pipeline.repoName">
                <div class="small text-black-50 mb-1 d-xl-none">Pipeline</div>
                <span class="text-muted d-none d-md-inline">{{pipeline.repoSource}}/{{pipeline.repoOwner}}/</span><strong>{{pipeline.repoName}}</strong>
              </div>
              <div class="mb-2 col-6 col-md-6 col-xl-1 text-truncate" :title="pipeline.buildVersion">
                <div class="small text-black-50 mb-1 d-xl-none">Version</div>
                {{pipeline.buildVersion}}
              </div>
              <div class="mb-2 col-12 col-md-6 col-xl-1 align-middle">
                <div class="small text-black-50 mb-1 d-xl-none">Status</div>
                <div class="progress mt-1">
                    <div class="progress-bar" :class="pipeline.buildStatus | bootstrapClass('bg')" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div class="mb-2 col-6 col-md-6 col-xl-1 text-truncate" :title="moment(pipeline.insertedAt)">
                <div class="small text-black-50 mb-1 d-xl-none">Built-at</div>
                {{pipeline.insertedAt | moment("calendar")}}
              </div>
              <div class="mb-2 col-6 col-md-3 col-xl-1 text-truncate" :title="pipeline.repoBranch">
                <div class="small text-black-50 mb-1 d-xl-none">Branch</div>
                {{pipeline.repoBranch}}
              </div>
              <div class="mb-2 col-6 col-md-3 col-xl-1">
                <div class="small text-black-50 mb-1 d-xl-none">Revision</div>
                {{pipeline.repoRevision | gitHash}}
              </div>
              <div class="mb-2 col-6 col-md-6 col-xl-2">
                <div class="small text-black-50 mb-1 d-xl-none">Commit(s)</div>
                <div v-for="commit in pipeline.commits" v-bind:key="commit.message" :title="commit.message + '/' + commit.author.name" class="text-truncate">{{commit.message}} / {{commit.author.name}}</div>
              </div>
              <div class="col-12"><div class="mt-3 mb-3 w-50 mx-auto border-bottom"></div></div>
              <div class="mb-2 col-12 col-xl-6 text-center">
                <div class="small text-black-50 mb-1" v-if="pipeline.labels">Labels</div>
                <button type="button" class="btn btn-light btn-sm mr-1 mb-1" v-for="label in sortLabels(pipeline.labels)" v-bind:key="label.key">{{label.key}}={{label.value}}</button>
              </div>
              <div class="mb-2 col-12 col-xl-6 text-center">
                <div class="small text-black-50 mb-1" v-if="pipeline.targetVersions">Releases</div>
                <button type="button" class="btn btn-light btn-sm mr-1 mb-1" v-for="targetVersion in pipeline.targetVersions" v-bind:key="targetVersion.target.name">
                    {{targetVersion.target.name}} <span class="badge" :class="targetVersion.buildStatus | bootstrapClass('badge')">{{targetVersion.buildVersion}}</span>
                </button>
              </div>
            </router-link>
      </div>

      <b-pagination-nav size="md" :link-gen="paginationLinkGenerator" use-router :number-of-pages="pagination.totalPages" v-model="pagination.page" align="center" hide-goto-end-buttons/>
    </div>
</template>

<script>
import axios from 'axios'
const moment = require('moment')
require('moment/locale/en-il')

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
    },

    moment (value) {
      return moment(value).calendar()
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
