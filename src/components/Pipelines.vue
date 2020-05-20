<template>
  <div class="m-3">
    <div :class="['mt-3', '']">
      <div class="row">
        <div class="col-12 col-lg-6">
          <status-filter :filter="filter" />
        </div>
        <div class="col-12 col-lg-6 col-xxl-2">
          <pipeline-filter
            :model="filter.search"
            :on-input="setSearch"
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

      <div class="row">
        <div class="col-12 col-lg-9">
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
    </div>

    <div class="mb-3">
      <div
        class="row rounded border p-2 mt-0 mr-0 mb-2 ml-0 font-weight-bold bg-white"
      >
        <div class="col-6 col-xxxl-3">
          Pipeline
        </div>
        <div class="col-6 col-xl-3 col-xxxl-1">
          Version
        </div>
        <div class="col-3 col-xxxl-1 d-none d-xl-block">
          Status
        </div>
        <div class="col-2 d-none d-xxxl-block">
          Built
        </div>
        <div class="col-1 d-none d-xxxl-block">
          Branch
        </div>
        <div class="col-1 d-none d-xxxl-block">
          Revision
        </div>
        <div class="col-3 d-none d-xxxl-block">
          Commit(s)
        </div>
      </div>

      <transition-group
        name="list-complete"
        tag="div"
        v-if="pipelines.length > 0"
      >
        <pipeline
          v-for="pipeline in pipelines"
          :key="pipeline.repoSource+'/'+pipeline.repoOwner+'/'+pipeline.repoName"
          :pipeline="pipeline"
          :filter="filter"
          :row-item="true"
          class="mt-2 mb-2 ml-0 mr-0 list-complete-item"
        />
      </transition-group>
      <div
        v-else-if="loaded"
        class="alert alert-warning text-center p-5"
      >
        There are no pipelines for the current filters. Please increase the time range or remove some filters!
      </div>
      <div v-else>
        <spinner color="primary" />
      </div>
    </div>

    <pagination
      :pagination="pagination"
      :link-generator="paginationLinkGenerator"
      v-if="pipelines.length > 0"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

import Spinner from '@/components/Spinner'
import Pipeline from '@/components/Pipeline'
import StatusFilter from '@/components/StatusFilter'
import LabelFilter from '@/components/LabelFilter'
import FrequentLabels from '@/components/FrequentLabels'
import PipelineFilter from '@/components/PipelineFilter'
import SinceSelector from '@/components/SinceSelector'
import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Spinner,
    Pipeline,
    StatusFilter,
    LabelFilter,
    FrequentLabels,
    PipelineFilter,
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
        since: '1d',
        labels: '',
        search: ''
      },
      loaded: false,
      refresh: true
    }
  },

  created () {
    this.filterDefaults = { ...this.filter }
    this.setDataFromQueryParams(this.query)
    this.loadPipelines()
  },

  methods: {
    paginationLinkGenerator (pageNum) {
      var query = this.getPipelinesQueryParams()

      if (pageNum > 1) {
        query.page = pageNum
      } else if (query.page) {
        delete query.page
      }

      return { query: query }
    },

    setDataFromQueryParams (query) {
      this.pagination.page = query && query.page ? Number.parseInt(query.page, 10) : 1
      this.filter.status = query && query.status ? query.status : this.filterDefaults.status
      this.filter.since = query && query.since ? query.since : this.filterDefaults.since
      this.filter.labels = query && query.labels ? query.labels : this.filterDefaults.labels
      this.filter.search = query && query.search ? query.search : this.filterDefaults.search
    },

    getPipelinesQueryParams () {
      var query = { ...this.$route.query }

      if (this.filter && this.filter.status && this.filter.status !== this.filterDefaults.status && this.filter.status !== '') {
        query.status = this.filter.status
      } else if (query.status) {
        delete query.status
      }

      if (this.filter && this.filter.since && this.filter.since !== this.filterDefaults.since && this.filter.since !== '') {
        query.since = this.filter.since
      } else if (query.since) {
        delete query.since
      }

      if (this.filter && this.filter.search && this.filter.search !== this.filterDefaults.search && this.filter.search !== '') {
        query.search = this.filter.search
      } else if (query.search) {
        delete query.search
      }

      if (this.filter && this.filter.labels && this.filter.labels !== this.filterDefaults.labels && this.filter.labels !== '') {
        query.labels = this.filter.labels
      } else if (query.labels) {
        delete query.labels
      }

      if (this.pagination && this.pagination.page && this.pagination.page > 1) {
        query.page = this.pagination.page
      } else if (query.page) {
        delete query.page
      }

      return query
    },

    updateQueryParams () {
      this.$router.push({ query: this.getPipelinesQueryParams() })
    },

    loadPipelines () {
      var labelFilterParams = ''
      if (this.filter && this.filter.labels && this.filter.labels.length > 0) {
        labelFilterParams = this.filter.labels.split(',').join('&filter[labels]=')
      }

      var statusFilter = `filter[status]=${this.filter.status}`
      if (this.filter.status === 'running') {
        statusFilter += `&filter[status]=pending&filter[status]=canceling`
      }

      this.axios.get(`/api/pipelines?${statusFilter}&filter[since]=${this.filter.since}&filter[search]=${this.filter.search}&filter[labels]=${labelFilterParams}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
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

      var max = 1000 * intervalSeconds * 0.75
      var min = 1000 * intervalSeconds * 1.25
      var timeoutWithJitter = Math.floor(Math.random() * (max - min + 1) + min)

      if (this.refresh) {
        this.refreshTimeout = setTimeout(this.loadPipelines, timeoutWithJitter)
      }
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
    ),

    sortLabels (labels) {
      if (!labels) {
        return labels
      }
      return labels.slice().sort(function (a, b) {
        return a.key > b.key
      })
    }
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
