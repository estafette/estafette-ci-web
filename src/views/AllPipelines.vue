<template>
  <div>
    <div class="row m-0">
      <div class="col-12 col-lg-6 col-xxl-4">
        <status-filter :filter="filter" />
      </div>
      <div class="col-12 col-lg-6 col-xxl-2">
        <pipeline-filter
          :model="filter.search"
          :on-input="setSearch"
        />
      </div>
      <div class="col-12 col-lg-6 col-xxl-2">
        <release-target-filter
          :filter="filter"
          :model="filter.target"
          :on-change="setTarget"
        />
      </div>
      <div class="col-12 col-lg-6 col-xxl-2">
        <frequent-labels :filter="filter" />
      </div>
      <div class="col-12 col-lg-6 col-xxl-2 text-right">
        <since-selector
          :model="filter.since"
          :on-change="setSince"
        />
      </div>
    </div>

    <div class="row m-0">
      <div class="col-12 col-lg-9">
        <user-filter :filter="filter" />
        <label-filter
          :filter="filter"
        />
      </div>
      <div class="d-none d-lg-block col-12 col-lg-3 text-right">
        <pagination-compact
          :pagination="pagination"
          :link-generator="paginationLinkGenerator"
          class="float-right"
        />
      </div>
    </div>

    <div class="row-header ml-3 mr-3">
      <div class="col-3">
        Pipeline
      </div>
      <div class="col-1">
        Version
      </div>
      <div class="col-1">
        Status
      </div>
      <div class="col-2">
        Built
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
    </div>

    <transition-group
      name="list-complete"
      tag="div"
      v-if="pipelines.length > 0"
      class="ml-3 mr-3"
    >
      <pipeline-row
        v-for="pipeline in pipelines"
        :key="pipeline.repoSource+'/'+pipeline.repoOwner+'/'+pipeline.repoName"
        :pipeline="pipeline"
        :filter="filter"
      />
    </transition-group>
    <div
      v-else-if="loaded"
      class="alert alert-warning text-center p-5 m-3"
    >
      There are no pipelines for the current filters. Please increase the time range or remove some filters!
    </div>
    <div v-else>
      <spinner color="primary" />
    </div>

    <pagination
      :pagination="pagination"
      :link-generator="paginationLinkGenerator"
      v-if="pipelines.length > 0"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash/debounce'

import Spinner from '@/components/Spinner'
import PipelineRow from '@/components/PipelineRow'
import StatusFilter from '@/components/StatusFilter'
import UserFilter from '@/components/UserFilter'
import LabelFilter from '@/components/LabelFilter'
import FrequentLabels from '@/components/FrequentLabels'
import PipelineFilter from '@/components/PipelineFilter'
import ReleaseTargetFilter from '@/components/ReleaseTargetFilter'
import SinceSelector from '@/components/SinceSelector'
import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Spinner,
    PipelineRow,
    StatusFilter,
    UserFilter,
    LabelFilter,
    FrequentLabels,
    PipelineFilter,
    ReleaseTargetFilter,
    SinceSelector,
    PaginationCompact,
    Pagination
  },

  props: {
    query: {
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      pipelines: [],
      pagination: {
        page: 1,
        size: 12,
        totalPages: 0,
        totalItems: 0
      },
      filter: {
        status: 'all',
        target: '',
        since: '1d',
        labels: '',
        search: '',
        recentCommitter: 'false',
        recentReleaser: 'false'
      },
      loaded: false,
      refresh: true
    }
  },

  created () {
    this.filterDefaults = { ...this.filter }
    this.setDataFromQueryParams(this.query)
    this.$router.replace({ query: this.getQueryParams() }).catch(() => {})
    this.loadPipelines()
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

      if (this.filter && this.filter.target && this.filter.target !== '') {
        query.target = this.filter.target
      } else if (query.target) {
        delete query.target
      }

      if (this.filter && this.filter.since && this.filter.since !== '') {
        query.since = this.filter.since
      } else if (query.since) {
        delete query.since
      }

      if (this.filter && this.filter.search && this.filter.search !== '') {
        query.search = this.filter.search
      } else if (query.search) {
        delete query.search
      }

      if (this.filter && this.filter.labels && this.filter.labels !== '') {
        query.labels = this.filter.labels
      } else if (query.labels) {
        delete query.labels
      }

      if (this.filter && this.filter.recentCommitter && this.filter.recentCommitter !== '') {
        query.recentCommitter = this.filter.recentCommitter
      } else if (query.recentCommitter) {
        delete query.recentCommitter
      }

      if (this.filter && this.filter.recentReleaser && this.filter.recentReleaser !== '') {
        query.recentReleaser = this.filter.recentReleaser
      } else if (query.recentReleaser) {
        delete query.recentReleaser
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
      this.filter.target = query && query.target ? query.target : this.filterDefaults.target
      this.filter.since = query && query.since ? query.since : this.filterDefaults.since
      this.filter.labels = query && query.labels ? query.labels : this.filterDefaults.labels
      this.filter.search = query && query.search ? query.search : this.filterDefaults.search
      this.filter.recentCommitter = query && query.recentCommitter ? query.recentCommitter : this.filterDefaults.recentCommitter
      this.filter.recentReleaser = query && query.recentReleaser ? query.recentReleaser : this.filterDefaults.recentReleaser
    },

    updateQueryParams () {
      this.$router.push({ query: this.getQueryParams() })
    },

    loadPipelines () {
      let labelFilterParams = ''
      if (this.filter && this.filter.labels && this.filter.labels.length > 0) {
        labelFilterParams = this.filter.labels.split(',').join('&filter[labels]=')
      }

      let statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += '&filter[status]=pending&filter[status]=canceling'
      }

      let sortParams = ''
      let recentCommitterFilterParams = ''
      if (this.user && this.user.active && this.filter && this.filter.recentCommitter === 'true') {
        recentCommitterFilterParams = `&filter[recent-committer]=${this.user.email}`
        sortParams = '&sort=-last_updated_at,repo_source,repo_owner,repo_name'
      }

      let recentReleaserFilterParams = ''
      if (this.user && this.user.active && this.filter && this.filter.recentReleaser === 'true') {
        recentReleaserFilterParams = `&filter[recent-releaser]=${this.user.email}`
        sortParams = '&sort=-last_updated_at,repo_source,repo_owner,repo_name'
      }

      this.axios.get(`/api/pipelines?${statusFilter}${recentCommitterFilterParams}${recentReleaserFilterParams}&filter[since]=${this.filter.since}&filter[target]=${this.filter.target}&filter[search]=${this.filter.search}&filter[labels]=${labelFilterParams}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}${sortParams}`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true

          this.periodicallyRefreshPipelines(5)
        })
        .catch(e => {
          this.periodicallyRefreshPipelines(30)
        })
    },

    periodicallyRefreshPipelines (intervalSeconds) {
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout)
      }

      const max = 1000 * intervalSeconds * 0.75
      const min = 1000 * intervalSeconds * 1.25
      const timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadPipelines, timeoutWithJitter)
      }
    },

    setTarget (value) {
      this.filter.target = value
      this.pagination.page = 1
      this.updateQueryParams()
    },

    setSince (value) {
      this.filter.since = value
      this.pagination.page = 1
      this.updateQueryParams()
    },

    setSearch: debounce(
      function (value) {
        this.filter.search = value
        this.pagination.page = 1
        this.updateQueryParams()
      },
      500
    )
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    })
  },

  watch: {
    '$route' (to, from) {
      this.setDataFromQueryParams(to.query)
      this.loadPipelines()
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
