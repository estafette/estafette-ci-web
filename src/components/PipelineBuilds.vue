<template>
  <div class="m-3">

    <div class="row">
      <div class="col-12 col-md-8 col-lg mb-2 text-center" id="status-filters">
        <router-link :to="{ query: { status: 'all', page: 1 } }" active-class="router-link-active" class="btn btn-outline-primary btn-sm mb-1" :class="{ active: filter.status === 'all' }">All</router-link>
        <router-link :to="{ query: { status: 'succeeded', page: 1 } }" active-class="router-link-active" class="btn btn-outline-success btn-sm mb-1" :class="{ active: filter.status === 'succeeded' }">Succeeded</router-link>
        <router-link :to="{ query: { status: 'failed', page: 1 } }" active-class="router-link-active" class="btn btn-outline-danger btn-sm mb-1" :class="{ active: filter.status === 'failed' }">Failed</router-link>
        <router-link :to="{ query: { status: 'running', page: 1 } }" active-class="router-link-active" class="btn btn-outline-warning btn-sm mb-1" :class="{ active: filter.status === 'running' }">Running</router-link>
        <router-link :to="{ query: { status: 'canceled', page: 1 } }" active-class="router-link-active" class="btn btn-outline-secondary btn-sm mb-1" :class="{ active: filter.status === 'canceled' }">Canceled</router-link>
      </div>
    </div>

    <div class="row rounded border p-2 mt-2 mr-0 mb-2 ml-0 font-weight-bold">
      <div class="col-6 col-md-4 col-xl-2">Version</div>
      <div class="col-6 col-md-4 col-xl-1">Status</div>
      <div class="col-6 col-md-4 col-xl-2 col-xxl-1 d-none d-md-block">Built</div>
      <div class="col-6 col-md-4 col-xl-2 col-xxl-1 d-none d-xl-block">Branch</div>
      <div class="col-6 col-md-4 col-xl-2 col-xxl-1 d-none d-xl-block">Revision</div>
      <div class="col-6 col-md-4 col-xl-3 col-xxl-2 d-none d-xl-block">Commit(s)</div>
      <div class="col-xxl-2 d-none d-xxl-block">Releases</div>
      <div v-if="user && user.authenticated" class="col-xxl-2 d-none d-xxl-block">Actions</div>
    </div>

    <transition-group name="list-complete" tag="div">
    <router-link v-for="build in builds" v-bind:key="build.id" :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}" tag="div" class="row rounded border clickable pt-3 pr-2 pb-2 pl-2 mt-2 mr-0 mb-2 ml-0 list-complete-item" :class="build.buildStatus | bootstrapClass('border')">

        <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="build.buildVersion">
          <div class="small text-black-50 mb-1 d-xl-none">Version</div>
          {{build.buildVersion}}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-1 align-middle">
          <div class="small text-black-50 mb-1 d-xl-none">Status</div>
          <div class="progress mt-1">
              <div class="progress-bar" :class="[$options.filters.bootstrapClass(build.buildStatus,'bg'), $options.filters.stripedProgressBarClass(build.buildStatus)]" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" :title="build.buildStatus"></div>
          </div>
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-2 col-xxl-1 text-truncate" :title="$options.filters.formatDuration(build.duration) + ', ' + $options.filters.formatDatetime(build.insertedAt)">
          <div class="small text-black-50 mb-1 d-xl-none">Built</div>
          <span :class="build.duration | colorDurationClass">{{build.duration | formatDuration}}</span>, {{build.insertedAt | formatDatetime}}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-2 col-xxl-1 text-truncate" :title="build.repoBranch">
          <div class="small text-black-50 mb-1 d-xl-none">Branch</div>
          {{build.repoBranch}}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-2 col-xxl-1">
          <div class="small text-black-50 mb-1 d-xl-none">Revision</div>
          <commit-link :build="build"/>
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-3 col-xxl-2">
          <div class="small text-black-50 mb-1 d-xl-none">Commit(s)</div>
          <div v-for="commit in build.commits" v-bind:key="commit.message" :title="commit.message + ' / ' + commit.author.name" class="text-truncate">{{commit.message}} / {{commit.author.name}}</div>
        </div>
        <div class="mb-2 col-12 col-md-6 col-xxl-2 text-truncate text-truncate-fade">
          <div class="small text-black-50 mb-1 d-xxl-none">Releases</div>
          <router-link v-for="release in pipeline.releases" v-bind:key="release.name" v-if="release.releaseVersion === build.buildVersion" :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}" exact class="btn btn-light btn-sm mr-1">
            {{release.name}} <span class="badge" :class="release.releaseStatus | bootstrapClass('badge')">{{release.releaseStatus | defaultValue('-')}}</span>
          </router-link>
          <span v-if="!showReleases(build)" class="d-xxl-none">-</span>
        </div>
        <div v-if="user && user.authenticated && build && ((build.buildStatus === 'failed' || build.buildStatus === 'running' || build.buildStatus === 'canceled') || (build.releases && build.releases.length > 0 && build.buildStatus === 'succeeded'))" class="mb-2 col-12 col-md-6 col-xxl-2">
          <div class="small text-black-50 mb-1 d-xxl-none">Actions</div>
          <release-button :pipeline="pipeline" :build="build" :user="user" />
          <rebuild-button :build="build" :user="user" />
          <cancel-button :build="build" :user="user" />
        </div>
     </router-link>
     </transition-group>

    <b-pagination-nav size="md" :link-gen="paginationLinkGenerator" use-router :number-of-pages="pagination.totalPages" v-model="pagination.page" align="center" hide-goto-end-buttons/>
  </div>
</template>

<script>
export default {
  props: {
    repoSource: String,
    repoOwner: String,
    repoName: String,
    query: Object,
    user: Object,
    pipeline: Object
  },
  data: function () {
    return {
      builds: [],
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
    this.loadBuilds()
  },

  methods: {
    paginationLinkGenerator (pageNum) {
      return { query: { status: this.filter.status, page: pageNum } }
    },

    setDataFromQueryParams (query) {
      this.pagination.page = query && query.page ? Number.parseInt(query.page, 10) : 1
      this.filter.status = query && query.status ? query.status : 'all'
    },

    loadBuilds () {
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds?filter[status]=${this.filter.status}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.builds = response.data.items
          this.pagination = response.data.pagination

          this.periodicallyRefreshBuilds(15)
        })
        .catch(e => {
          this.errors.push(e)
          this.periodicallyRefreshBuilds(60)
        })
    },

    periodicallyRefreshBuilds (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      this.refreshTimeout = setTimeout(this.loadBuilds, timeoutWithJitter)
    },

    showReleases (build) {
      if (this.pipeline && this.pipeline.releases && this.pipeline.releases.length > 0) {
        return this.pipeline.releases.some(r => r.releaseVersion === build.buildVersion)
      }
      return false
    }
  },

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams(to.query)
      this.loadBuilds()
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
