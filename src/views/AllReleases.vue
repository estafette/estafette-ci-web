<template>
  <div>
    <div class="row m-0">
      <div class="col-12 col-lg-6 col-xxl-4">
        <status-filter :filter="filter" />
      </div>
      <div class="col-12 col-lg-6 col-xxl-2" />
      <div class="col-12 col-lg-6 col-xxl-2" />
      <div class="col-12 col-lg-6 col-xxl-2" />
      <div class="col-12 col-lg-6 col-xxl-2 text-right">
        <since-selector
          :model="filter.since"
          :on-change="setSince"
        />
      </div>
    </div>

    <div class="row m-0">
      <div class="col-12 col-lg-9" />
      <div class="d-none d-lg-block col-12 col-lg-3 text-right">
        <pagination-compact
          :pagination="pagination"
          :link-generator="paginationLinkGenerator"
          class="float-right"
        />
      </div>
    </div>

    <transition-group-header
      :fields="fields"
      class="ml-3 mr-3"
    />

    <transition-group
      name="list-complete"
      tag="div"
      class="ml-3 mr-3"
      v-if="releases.length > 0"
    >
      <release-row
        v-for="release in releases"
        :key="release.id"
        :release="release"
        :all-releases-mode="true"
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
import SinceSelector from '@/components/SinceSelector'
import ReleaseRow from '@/components/ReleaseRow'
import PaginationCompact from '@/components/PaginationCompact'
import TransitionGroupHeader from '@/components/TransitionGroupHeader'

export default {
  components: {
    Spinner,
    Pagination,
    StatusFilter,
    SinceSelector,
    ReleaseRow,
    PaginationCompact,
    TransitionGroupHeader
  },
  props: {
    query: {
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
        status: 'all',
        since: '1d'
      },
      sort: '-updated_at',
      fields: [
        {
          name: 'Pipeline',
          class: 'col-2',
          isSortable: true,
          sortingQueryParams: { sort: 'repo_source,repo_owner,repo_name' }
        },
        {
          name: 'Target',
          class: 'col-2'
        },
        {
          name: 'Version',
          class: 'col-2'
        },
        {
          name: 'Status',
          class: 'col-2'
        },
        {
          name: 'Released',
          class: 'col-2',
          isSortable: true,
          sortingQueryParams: { sort: '-updated_at' }
        },
        {
          name: 'Triggered by',
          class: 'col-2'
        }
      ],
      loaded: false,
      refresh: true
    }
  },

  created () {
    this.filterDefaults = { ...this.filter }
    this.sortDefaults = this.sort
    this.setDataFromQueryParams(this.query)
    this.$router.replace({ query: this.getQueryParams() }).catch(() => {})
    this.loadReleases()
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

      if (this.filter && this.filter.since && this.filter.since !== '') {
        query.since = this.filter.since
      } else if (query.since) {
        delete query.since
      }

      if (this.pagination && this.pagination.page && this.pagination.page > 0) {
        query.page = this.pagination.page
      } else if (query.page) {
        delete query.page
      }

      if (this.sort) {
        query.sort = this.sort
      } else if (query.sort) {
        delete query.sort
      }

      return query
    },

    setDataFromQueryParams (query) {
      this.pagination.page = query && query.page ? Number.parseInt(query.page, 10) : 1
      this.filter.status = query && query.status ? query.status : this.filterDefaults.status
      this.filter.since = query && query.since ? query.since : this.filterDefaults.since
      this.sort = query && query.sort ? query.sort : this.sortDefaults
    },

    updateQueryParams () {
      this.$router.push({ query: this.getQueryParams() })
    },

    loadReleases () {
      let statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }

      this.axios.get(`/api/releases?${statusFilter}&filter[since]=${this.filter.since}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}&sort=${this.sort}`)
        .then(response => {
          this.releases = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true

          this.periodicallyRefreshRelease(15)
        })
        .catch(e => {
          this.periodicallyRefreshRelease(15)
        })
    },

    periodicallyRefreshRelease (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadReleases, timeoutWithJitter)
      }
    },

    setSince (value) {
      this.filter.since = value
      this.pagination.page = 1
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
