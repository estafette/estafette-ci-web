<template>
  <div class="m-3">
    <div class="row">
      <div class="col-12 col-lg-3">
        <build-branch-filter
          :filter="filter"
          :model="filter.branch"
          :on-change="setBranch"
          :pipeline="pipeline"
        />
      </div>
      <div class="col-7 col-lg-6 text-lg-center">
        <status-filter :filter="filter" />
      </div>
      <div class="col-5 col-lg-3">
        <pagination-compact
          :pagination="pagination"
          :link-generator="paginationLinkGenerator"
          class="float-right"
        />
      </div>
    </div>

    <div class="row-header">
      <div class="col-2">
        Version
      </div>
      <div class="col-1">
        Status
      </div>
      <div class="col-2">
        Built at
      </div>
      <div class="col-1">
        Branch
      </div>
      <div class="col-1">
        Revision
      </div>
      <div class="col-3">
        Commit(s)
      </div>
      <div
        v-if="user && user.active"
        class="col-2"
      >
        Actions
      </div>
    </div>

    <transition-group
      name="list-complete"
      tag="div"
      v-if="builds.length > 0"
    >
      <build-row
        v-for="build in builds"
        :key="build.id"
        :build="build"
        :builds="builds"
        :pipeline="pipeline"
      />
    </transition-group>
    <div
      v-else-if="loaded"
      class="alert alert-warning text-center p-5"
    >
      There are no builds for the current filters. Please change your filters!
    </div>
    <div v-else>
      <spinner color="primary" />
    </div>

    <pagination
      :pagination="pagination"
      :link-generator="paginationLinkGenerator"
      v-if="builds.length > 0"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from '@/components/Spinner'
import StatusFilter from '@/components/StatusFilter'
import PaginationCompact from '@/components/PaginationCompact'
import BuildRow from '@/components/BuildRow'
import Pagination from '@/components/Pagination'
import BuildBranchFilter from '@/components/BuildBranchFilter'

export default {
  components: {
    Spinner,
    StatusFilter,
    PaginationCompact,
    BuildRow,
    Pagination,
    BuildBranchFilter
  },

  props: {
    repoSource: {
      type: String,
      default: null
    },
    repoOwner: {
      type: String,
      default: null
    },
    repoName: {
      type: String,
      default: null
    },
    query: {
      type: Object,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      builds: [],
      pagination: {
        page: 1,
        size: 10,
        totalPages: 0,
        totalItems: 0
      },
      filter: {
        status: 'all',
        branch: ''
      },
      loaded: false,
      refresh: true
    }
  },

  created () {
    this.filterDefaults = { ...this.filter }
    this.setDataFromQueryParams(this.query)
    this.$router.replace({ query: this.getQueryParams() }).catch(() => {})
    this.loadBuilds()
  },

  methods: {
    paginationLinkGenerator (pageNum) {
      const query = this.getQueryParams()

      if (pageNum > 0) {
        query.page = pageNum
      } else if (query.page) {
        delete query.page
      }

      return { query: query }
    },

    getQueryParams () {
      const query = { ...this.$route.query }

      if (this.filter && this.filter.status && this.filter.status !== '') {
        query.status = this.filter.status
      } else if (query.status) {
        delete query.status
      }
      if (this.filter && this.filter.branch && this.filter.branch !== '') {
        query.branch = this.filter.branch
      } else if (query.branch) {
        delete query.branch
      }

      if (this.pagination && this.pagination.page && this.pagination.page > 0) {
        query.page = this.pagination.page
      } else if (query.page) {
        delete query.page
      }

      return query
    },

    setDataFromQueryParams (query) {
      this.pagination.page = query && query.page ? Number.parseInt(query.page, 10) : 1
      this.filter.status = query && query.status ? query.status : this.filterDefaults.status
    },

    updateQueryParams () {
      this.$router.push({ query: this.getQueryParams() })
    },

    loadBuilds () {
      let statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }
      const branchFilter = `filter[branch]=${this.filter.branch}`

      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds?${statusFilter}&${branchFilter}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.builds = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true
        })
        .catch(e => {
          this.periodicallyRefreshBuilds(15)
        })
    },

    periodicallyRefreshBuilds (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadBuilds, timeoutWithJitter)
      }
    },

    setBranch (value) {
      this.filter.branch = value
      this.updateQueryParams()
    }
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  },

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams(to.query)
      this.loadBuilds()
    },

    pipeline: {
      handler: function (to, from) {
        this.loadBuilds()
      },
      deep: true
    }
  },

  beforeDestroy () {
    this.refresh = false
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }
}
</script>
