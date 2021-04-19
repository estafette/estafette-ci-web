<template>
  <div class="m-3">
    <div class="row">
      <div class="col-12 text-center">
        <status-filter :filter="filter" />
        <pagination-compact
          :pagination="pagination"
          :link-generator="paginationLinkGenerator"
          class="float-right"
        />
      </div>
    </div>

    <transition-group-header
      :fields="fields"
    />

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
        :all-builds-mode="true"
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
import TransitionGroupHeader from '@/components/TransitionGroupHeader'

export default {
  components: {
    Spinner,
    StatusFilter,
    PaginationCompact,
    BuildRow,
    Pagination,
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
      sort: '-updated_at',
      fields: [
        {
          name: 'Pipeline',
          class: 'col-3',
          isSortable: true,
          sortingQueryParams: { sort: 'repo_source,repo_owner,repo_name' }
        },
        {
          name: 'Version',
          class: 'col-2'
        },
        {
          name: 'Status',
          class: 'col-1'
        },
        {
          name: 'Built',
          class: 'col-2',
          isSortable: true,
          sortingQueryParams: { sort: '-updated_at' }
        },
        {
          name: 'Branch',
          class: 'col-1'
        },
        {
          name: 'Revision',
          class: 'col-1'
        },
        {
          name: 'Commit(s)',
          class: 'col-2'
        }
      ],
      loaded: false,
      refresh: true
    }
  },

  created () {
    this.filterDefaults = { ...this.filter }
    this.sortDefaults = { ...this.sort }
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
      this.sort = query && query.sort ? query.sort : this.sortDefaults
    },

    updateQueryParams () {
      this.$router.push({ query: this.getQueryParams() })
    },

    loadBuilds () {
      let statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }

      this.axios.get(`/api/builds?${statusFilter}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}&sort=${this.sort}`)
        .then(response => {
          this.builds = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true

          this.periodicallyRefreshBuilds(15)
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
