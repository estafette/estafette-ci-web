<template>
  <div class="m-3">

    <div class="row">
      <div class="col-12 col-md-8 col-lg mb-2 text-center" id="status-filters">
        <router-link :to="{ query: { status: 'all', page: 1 } }" active-class="router-link-active" class="btn btn-outline-primary btn-sm mb-1" :class="{ active: filter.status === 'all' }">All</router-link>
        <router-link :to="{ query: { status: 'succeeded', page: 1 } }" active-class="router-link-active" class="btn btn-outline-success btn-sm mb-1" :class="{ active: filter.status === 'succeeded' }">Succeeded</router-link>
        <router-link :to="{ query: { status: 'failed', page: 1 } }" active-class="router-link-active" class="btn btn-outline-danger btn-sm mb-1" :class="{ active: filter.status === 'failed' }">Failed</router-link>
        <router-link :to="{ query: { status: 'running', page: 1 } }" active-class="router-link-active" class="btn btn-outline-warning btn-sm mb-1" :class="{ active: filter.status === 'running' }">Running</router-link>
        <router-link :to="{ query: { status: 'canceled', page: 1 } }" active-class="router-link-active" class="btn btn-outline-secondary btn-sm mb-1" :class="{ active: filter.status === 'running' }">Canceled</router-link>
      </div>
    </div>

    <div class="row rounded border p-2 mt-2 mr-0 mb-2 ml-0 font-weight-bold">
      <div class="col-6 col-md-4 col-xl-2">Name</div>
      <div class="col-6 col-md-4 col-xl-2">Version</div>
      <div class="col-6 col-md-4 col-xl-1">Status</div>
      <div class="col-6 col-md-4 col-xl-2 d-none d-md-block">Triggered at</div>
      <div class="col-6 col-md-4 col-xl-3 d-none d-xl-block">Triggered by</div>
      <div v-if="user && user.authenticated" class="col-xl-2 d-none d-xl-block">Actions</div>
    </div>

    <transition-group name="list-complete" tag="div">
    <router-link v-for="release in releases" v-bind:key="release.id" :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}" tag="div" class="row rounded border clickable pt-3 pr-2 pb-2 pl-2 mt-2 mr-0 mb-2 ml-0 list-complete-item" :class="release.releaseStatus | bootstrapClass('border')">

        <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="release.name">
          <div class="small text-black-50 mb-1 d-xl-none">Name</div>
          {{release.name}}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="release.releaseVersion">
          <div class="small text-black-50 mb-1 d-xl-none">Version</div>
          {{release.releaseVersion}}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-1 align-middle">
          <div class="small text-black-50 mb-1 d-xl-none">Status</div>
          <div class="progress mt-1">
              <div class="progress-bar" :class="[$options.filters.bootstrapClass(release.releaseStatus,'bg'), $options.filters.stripedProgressBarClass(release.releaseStatus)]" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" :title="release.releaseStatus"></div>
          </div>
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="moment(release.insertedAt)">
          <div class="small text-black-50 mb-1 d-xl-none">Triggered at</div>
          {{release.insertedAt | moment("calendar")}}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-3 text-truncate" :title="release.triggeredBy">
          <div class="small text-black-50 mb-1 d-xl-none">Triggered by</div>
          {{release.triggeredBy}}
        </div>
        <div v-if="user && user.authenticated && release && release.releaseStatus === 'running'" class="mb-2 col-6 col-md-4 col-xl-2">
          <div class="small text-black-50 mb-1 d-xl-none">Actions</div>
          <cancel-button :release="release" :user="user" />
        </div>

     </router-link>
     </transition-group>

    <b-pagination-nav size="md" :link-gen="paginationLinkGenerator" use-router :number-of-pages="pagination.totalPages" v-model="pagination.page" align="center" hide-goto-end-buttons/>
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
    query: Object,
    user: Object
  },
  data: function () {
    return {
      releases: [],
      errors: [],
      pagination: {
        page: 1,
        size: 10,
        totalPages: 0,
        totalItems: 0
      },
      filter: {
        status: 'all'
      }
    }
  },

  created () {
    this.setDataFromQueryParams(this.query)
    this.loadReleases()
  },

  methods: {
    paginationLinkGenerator (pageNum) {
      return { query: { status: this.filter.status, page: pageNum } }
    },

    setDataFromQueryParams (query) {
      this.pagination.page = query && query.page ? Number.parseInt(query.page, 10) : 1
      this.filter.status = query && query.status ? query.status : 'all'
    },

    loadReleases () {
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases??filter[status]=${this.filter.status}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.releases = response.data.items
          this.pagination = response.data.pagination

          this.periodicallyRefreshReleases(15)
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshRelease(60)
        })
    },

    periodicallyRefreshRelease (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      this.refreshTimeout = setTimeout(this.loadReleases, timeoutWithJitter)
    },

    moment (value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams(to.query)
      this.loadReleases()
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
