<template>
  <div class="m-3">
    <table class="table">
    <thead>
        <tr>
        <th scope="col">Version</th>
        <th scope="col">Branch</th>
        <th scope="col">Commit</th>
        <th scope="col">Status</th>
        <th scope="col">Built at</th>
        </tr>
    </thead>
    <tbody>

    <router-link v-for="build in builds" v-bind:key="build.id" :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, repoRevision: build.repoRevision }}" tag="tr">
        <td>{{build.buildVersion}}</td>
        <td>{{build.repoBranch}}</td>
        <td>
          {{build.repoRevision | gitHash}}
          <small v-for="commit in build.commits" v-bind:key="commit.message" class="text-muted" :title="commit.message">{{commit.message | ellipsis(40)}} / {{commit.author.name}}</small>
        </td>
        <td class="align-middle">
            <div class="progress">
            <div class="progress-bar" :class="build.buildStatus | bootstrapClass('bg')" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </td>
        <td>{{build.insertedAt | moment("calendar")}}</td>
      </router-link>
    </tbody>
    </table>

    <b-pagination-nav size="md" :link-gen="paginationLinkGenerator" use-router :number-of-pages="pagination.totalPages" v-model="pagination.page" align="center" hide-goto-end-buttons/>
  </div>
</template>

<script>
import axios from 'axios'

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
