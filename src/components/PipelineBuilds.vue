<template>
  <div class="m-3">
    <div
      class="row"
    >
      <div class="col-12 text-center">
        <status-filter :filter="filter" />
        <pagination-compact
          :pagination="pagination"
          :link-generator="paginationLinkGenerator"
          class="float-right"
        />
      </div>
    </div>

    <div
      class="row rounded border p-2 mt-0 mr-0 mb-2 ml-0 font-weight-bold"
    >
      <div class="col-6 col-md-4 col-xl-2">
        Version
      </div>
      <div class="col-6 col-md-4 col-xl-1">
        Status
      </div>
      <div class="col-4 col-xl-2 col-xxxl-1 d-none d-md-block">
        Built
      </div>
      <div class="col-2 col-xxl-1 d-none d-xl-block">
        Branch
      </div>
      <div class="col-2 col-xxl-1 d-none d-xl-block">
        Revision
      </div>
      <div class="col-3 col-xxl-2 d-none d-xl-block">
        Commit(s)
      </div>
      <div class="col-2 d-none d-xxxl-block">
        Releases
      </div>
      <div
        v-if="user && user.authenticated"
        class="col-xxl-2 d-none d-xxxl-block"
      >
        Actions
      </div>
    </div>

    <transition-group
      name="list-complete"
      tag="div"
      v-if="builds.length > 0"
    >
      <build
        v-for="build in builds"
        :key="build.id"
        :build="build"
        :builds="builds"
        :user="user"
        :pipeline="pipeline"
        :row-item="true"
        class="mt-2 mr-0 mb-2 ml-0 list-complete-item"
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
import Spinner from '@/components/Spinner'
import StatusFilter from '@/components/StatusFilter'
import PaginationCompact from '@/components/PaginationCompact'
import Build from '@/components/Build'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Spinner,
    StatusFilter,
    PaginationCompact,
    Build,
    Pagination
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
    user: {
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
        status: 'all'
      },
      loaded: false,
      refresh: true
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
      var statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += `&filter[status]=pending&filter[status]=canceling`
      }

      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds?${statusFilter}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
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

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadBuilds, timeoutWithJitter)
      }
    }
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
