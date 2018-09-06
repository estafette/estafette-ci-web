<template>
  <div class="m-3">

    <div class="row rounded border p-2 mt-2 mr-0 mb-2 ml-0 font-weight-bold">
      <div class="col-6 col-md-4 col-xl-2">Version</div>
      <div class="col-6 col-md-4 col-xl-1">Status</div>
      <div class="col-6 col-md-4 col-xl-2 d-none d-md-block">Built at</div>
      <div class="col-6 col-md-4 col-xl-2 d-none d-xl-block">Branch</div>
      <div class="col-6 col-md-4 col-xl-2 d-none d-xl-block">Revision</div>
      <div class="col-6 col-md-4 col-xl-3 d-none d-xl-block">Commit(s)</div>
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
              <div class="progress-bar" :class="build.buildStatus | bootstrapClass('bg')" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="moment(build.insertedAt)">
          <div class="small text-black-50 mb-1 d-xl-none">Built at</div>
          {{build.insertedAt | moment("calendar")}}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-2 text-truncate" :title="build.repoBranch">
          <div class="small text-black-50 mb-1 d-xl-none">Branch</div>
          {{build.repoBranch}}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-2">
          <div class="small text-black-50 mb-1 d-xl-none">Revision</div>
          {{build.repoRevision | gitHash}}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-3">
          <div class="small text-black-50 mb-1 d-xl-none">Commit(s)</div>
          <div v-for="commit in build.commits" v-bind:key="commit.message" :title="commit.message + ' / ' + commit.author.name" class="text-truncate">{{commit.message}} / {{commit.author.name}}</div>
        </div>

     </router-link>
     </transition-group>

    <b-pagination-nav size="md" :link-gen="paginationLinkGenerator" use-router :number-of-pages="pagination.totalPages" v-model="pagination.page" align="center" hide-goto-end-buttons/>
  </div>
</template>

<script>
import axios from 'axios'
const moment = require('moment')
require('moment/locale/en-il')

export default {
  props: {
    repoSource: String,
    repoOwner: String,
    repoName: String,
    query: Object
  },
  data: function () {
    return {
      builds: [],
      errors: [],
      pagination: {
        page: 1,
        size: 20,
        totalPages: 0,
        totalItems: 0
      }
    }
  },

  created () {
    this.setDataFromQueryParams(this.query)
    this.loadBuilds()
  },

  methods: {
    paginationLinkGenerator (pageNum) {
      return { query: { page: pageNum } }
    },

    setDataFromQueryParams (query) {
      this.pagination.page = query && query.page ? Number.parseInt(query.page, 10) : 1
    },

    loadBuilds () {
      axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds?page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
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

    moment (value) {
      return moment(value).calendar()
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
