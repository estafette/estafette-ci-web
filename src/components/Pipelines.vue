<template>
  <div>
    <div :class="[dashboardModeActive ? '' : 'mt-3', 'mr-3 ml-3']">
      <div
        class="row"
        v-if="!dashboardModeActive"
      >
        <div class="col-12 col-lg-6">
          <status-filter :filter="filter" />
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <pipeline-filter
            :model="filter.search"
            :on-input="setSearch"
          />
        </div>
        <div class="col-12 col-md-6 col-lg-3 text-right">
          <since-selector
            :model="filter.since"
            :on-change="setSince"
          />
        </div>
      </div>

      <div class="row">
        <div :class="[dashboardModeActive ? 'col-12' : 'col-6 col-sm-8 col-md-9 col-xl-10 text-truncate-fade', 'text-truncate']">
          <label-filter
            :filter="filter"
            :dashboard-mode-active="dashboardModeActive"
          />
          <frequent-labels
            :filter="filter"
            v-if="!dashboardModeActive"
          />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xl-2"
          v-if="!dashboardModeActive"
        >
          <pagination-compact
            :pagination="pagination"
            :link-generator="paginationLinkGenerator"
            class="float-right"
          />
        </div>
      </div>
    </div>

    <div class="mt-0 mr-3 mb-3 ml-3">
      <div
        class="row rounded border p-2 mt-0 mr-0 mb-2 ml-0 font-weight-bold"
        v-if="!dashboardModeActive"
      >
        <div class="col-6 col-xl-5 col-xxl-3 col-xxxl-2">
          Pipeline
        </div>
        <div class="col-6 col-xl-1">
          Version
        </div>
        <div class="col-12 col-md-6 col-xl-1 d-none d-xl-block">
          Status
        </div>
        <div class="col-6 col-xl-1 d-none d-xl-block">
          Built
        </div>
        <div class="col-6 col-md-3 col-xl-1 d-none d-xl-block">
          Branch
        </div>
        <div class="col-6 col-md-3 col-xl-1 d-none d-xl-block">
          Revision
        </div>
        <div class="col-6 col-xl-2 col-xxxl-1 d-none d-xl-block">
          Commit(s)
        </div>
        <div class="col-2 d-none d-xxl-block">
          Labels
        </div>
        <div class="col-2 d-none d-xxxl-block">
          Releases
        </div>
      </div>

      <transition-group
        name="list-complete"
        tag="div"
        v-if="pipelines.length > 0"
      >
        <router-link
          v-for="pipeline in pipelines"
          :key="pipeline.repoSource+'/'+pipeline.repoOwner+'/'+pipeline.repoName"
          :to="{ name: 'PipelineBuilds', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName }}"
          tag="div"
          :class="[
            $options.filters.bootstrapClass(pipeline.buildStatus, 'border'),
            dashboardModeActive ? $options.filters.bootstrapClass(pipeline.buildStatus, 'bg') : '',
            dashboardModeActive ? $options.filters.bootstrapTextClass(pipeline.buildStatus) : '',
            dashboardModeActive ? 'row mt-3 mr-0 mb-3 ml-0' : 'row mt-2 mr-0 mb-2 ml-0',
            'rounded border clickable pt-3 pr-2 pb-2 pl-2  list-complete-item'
          ]"
        >
          <div
            :class="[dashboardModeActive ? 'col-lg-4 col-xxl-3' : 'col-xl-5 col-xxl-3 col-xxxl-2', 'mb-2 col-6 text-truncate']"
            :title="pipeline.repoSource + '/' + pipeline.repoOwner + '/' + pipeline.repoName"
          >
            <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50 d-xl-none', 'small  mb-1']">
              Pipeline
            </div>
            <span :class="[dashboardModeActive ? 'd-none d-md-inline' : 'text-muted d-none d-md-inline']">{{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/</span><strong>{{ pipeline.repoName }}</strong>
          </div>
          <div
            :class="[dashboardModeActive ? 'col-lg-4 col-xxl-2' : 'col-xl-1', 'mb-2 col-6 text-truncate']"
            :title="pipeline.buildVersion"
          >
            <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50 d-xl-none', 'small mb-1']">
              Version
            </div>
            {{ pipeline.buildVersion }}
          </div>
          <div
            class="mb-2 col-12 col-md-6 col-xl-1 align-middle"
            v-if="!dashboardModeActive"
          >
            <div class="small text-black-50 mb-1 d-xl-none">
              Status
            </div>
            <router-link
              :to="{ name: 'PipelineBuildLogs', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName, id: pipeline.id }}"
              tag="div"
              class="progress mt-1"
            >
              <div
                class="progress-bar"
                :class="[$options.filters.bootstrapClass(pipeline.buildStatus,'bg'), $options.filters.stripedProgressBarClass(pipeline.buildStatus)]"
                role="progressbar"
                style="width: 100%"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                :title="pipeline.buildStatus"
              />
            </router-link>
          </div>
          <div
            :class="[dashboardModeActive ? 'col-lg-4 col-xxl-2' : 'col-xl-1', 'mb-2 col-6 text-truncate']"
            :title="$options.filters.formatDuration(pipeline.duration) + ', ' + $options.filters.formatDatetime(pipeline.insertedAt)"
          >
            <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50 d-xl-none', 'small mb-1']">
              Built-at
            </div>
            <span
              v-if="!dashboardModeActive && pipeline.duration > 0"
              :class="pipeline.duration | colorDurationClass"
            >
              {{ pipeline.duration | formatDuration }}
            </span> {{ pipeline.insertedAt | formatDatetime }}
          </div>
          <div
            :class="[dashboardModeActive ? 'col-lg-4 col-xxl-2' : 'col-md-3 col-xl-1', 'mb-2 col-6 text-truncate']"
            :title="pipeline.repoBranch"
          >
            <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50 d-xl-none', 'small mb-1']">
              Branch
            </div>
            {{ pipeline.repoBranch }}
          </div>
          <div
            class="mb-2 col-6 col-md-3 col-xl-1"
            v-if="!dashboardModeActive"
          >
            <div class="small text-black-50 mb-1 d-xl-none">
              Revision
            </div>
            <commit-link :build="pipeline" />
          </div>
          <div
            :class="[dashboardModeActive ? 'col-12 col-lg-8 col-xxl-3' : 'col-6 col-xl-2 col-xxxl-1', 'mb-2']"
          >
            <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50 d-xl-none', 'small mb-1']">
              Commit(s)
            </div>
            <div
              v-for="commit in pipeline.commits"
              :key="commit.message"
              :title="commit.message + ' / ' + commit.author.name"
              class="text-truncate"
            >
              {{ commit.message }} / {{ commit.author.name }}
            </div>
          </div>
          <div
            v-if="!dashboardModeActive && ((pipeline.labels && pipeline.labels.length > 0) || (pipeline.releaseTargets && pipeline.releaseTargets.length > 0))"
            class="col-12 d-xxl-none"
          >
            <div class="mt-3 mb-3 w-50 mx-auto border-bottom" />
          </div>
          <div
            v-if="!dashboardModeActive && pipeline.labels && pipeline.labels.length > 0"
            class="mb-2 col-12 col-xl-6 col-xxl-2 text-center text-xxl-left text-truncate text-truncate-fade"
          >
            <div :class="[dashboardModeActive ? '' : 'd-xxl-none', 'small text-black-50 mb-1']">
              Labels
            </div>
            <router-link
              :to="{ query: { status: filter.status, since: filter.since, labels: label.key + '=' + label.value, page: 1 } }"
              exact
              class="btn btn-light btn-sm mr-1 mb-1"
              v-for="label in sortLabels(pipeline.labels)"
              :key="label.key"
            >
              {{ label.key }}={{ label.value }}
            </router-link>
          </div>
          <div
            v-if="(!pipeline.labels || pipeline.labels.length == 0) && pipeline.releaseTargets && pipeline.releaseTargets.length > 0"
            class="mb-2 col-12 col-xl-6 col-xxl-2 text-center text-xxl-left"
          />
          <div
            v-if="!dashboardModeActive && pipeline.releaseTargets && pipeline.releaseTargets.length > 0"
            class="col-12 d-none d-xxl-flex d-xxxl-none"
          >
            <div class="mt-3 mb-3 w-50 mx-auto border-bottom" />
          </div>
          <div
            v-if="pipeline.releaseTargets && pipeline.releaseTargets.length > 0"
            :class="[dashboardModeActive ? '' : 'col-xl-6 col-xxl-12 col-xxxl-2 text-xxxl-left text-truncate text-truncate-fade', 'mb-2 col-12 text-center']"
          >
            <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50 d-xxxl-none', 'small mb-1']">
              Releases
            </div>
            <release-badge
              v-for="releaseTarget in pipeline.releaseTargets"
              :key="releaseTarget.name"
              :release-target="releaseTarget"
              :pipeline="pipeline"
              :dashboard-mode-active="dashboardModeActive"
            />
          </div>
        </router-link>
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
      v-if="!dashboardModeActive && pipelines.length > 0"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

import Spinner from '@/components/Spinner'
import CommitLink from '@/components/CommitLink'
import ReleaseBadge from '@/components/ReleaseBadge'
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
    CommitLink,
    ReleaseBadge,
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
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    }
  },

  data: function () {
    return {
      pipelines: [],
      errors: [],
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

      this.axios.get(`/api/pipelines?filter[status]=${this.filter.status}&filter[since]=${this.filter.since}&filter[search]=${this.filter.search}&filter[labels]=${labelFilterParams}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true

          this.periodicallyRefreshPipelines(5)
        })
        .catch(e => {
          this.errors.push(e)
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

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
