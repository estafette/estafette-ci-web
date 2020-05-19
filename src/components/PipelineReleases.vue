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
      class="row rounded border p-2 mt-0 mr-0 mb-2 ml-0 font-weight-bold bg-white"
    >
      <div class="col-6 col-md-4 col-xl-2">
        Target
      </div>
      <div class="col-6 col-md-4 col-xl-2">
        Version
      </div>
      <div class="col-6 col-md-4 col-xl-2">
        Status
      </div>
      <div class="col-6 col-md-4 col-xl-2 d-none d-xl-block">
        Released
      </div>
      <div class="col-6 col-md-4 col-xl-2 d-none d-xl-block">
        Triggered by
      </div>
      <div
        v-if="user && user.authenticated"
        class="col-xl-2 d-none d-xl-block"
      >
        Actions
      </div>
    </div>

    <transition-group
      name="list-complete"
      tag="div"
      v-if="releases.length > 0"
    >
      <release
        v-for="release in releases"
        :key="release.id"
        :release="release"
        :row-item="true"
        class="mt-2 mr-0 mb-2 ml-0 list-complete-item"
      />
    </transition-group>
    <div
      v-else-if="loaded"
      class="alert alert-warning text-center p-5"
    >
      There are no releases for the current filters. Please change your filters!
    </div>
    <div v-else>
      <spinner color="primary" />
    </div>

    <pagination
      :pagination="pagination"
      :link-generator="paginationLinkGenerator"
      v-if="releases.length > 0"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from '@/components/Spinner'
import Pagination from '@/components/Pagination'
import StatusFilter from '@/components/StatusFilter'
import Release from '@/components/Release'
import PaginationCompact from '@/components/PaginationCompact'

export default {
  components: {
    Spinner,
    Pagination,
    StatusFilter,
    Release,
    PaginationCompact
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
      releases: [],
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
      var statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += `&filter[status]=pending&filter[status]=canceling`
      }

      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases?${statusFilter}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.releases = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true
        })
        .catch(e => {
          this.periodicallyRefreshRelease(15)
        })
    },

    periodicallyRefreshRelease (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadReleases, timeoutWithJitter)
      }
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
      this.loadReleases()
    },

    pipeline: {
      handler: function (to, from) {
        this.loadReleases()
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

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
