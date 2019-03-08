<template>
  <div>
    <div class="mt-3 mr-3 ml-3">
      <div class="row">
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
        <div class="col-12">
          <label-filter :filter="filter" />
          <pagination-compact
            :pagination="pagination"
            :link-generator="paginationLinkGenerator"
            class="float-right"
          />
        </div>
      </div>
    </div>

    <div class="mt-0 mr-3 mb-3 ml-3">
      <div class="row rounded border p-2 mt-0 mr-0 mb-2 ml-0 font-weight-bold">
        <div class="col-6 col-md-6 col-xl-5 col-xxl-3 col-xxxl-2">
          Pipeline
        </div>
        <div class="col-6 col-md-6 col-xl-1">
          Version
        </div>
        <div class="col-12 col-md-6 col-xl-1 d-none d-xl-block">
          Status
        </div>
        <div class="col-6 col-md-6 col-xl-1 d-none d-xl-block">
          Built
        </div>
        <div class="col-6 col-md-3 col-xl-1 d-none d-xl-block">
          Branch
        </div>
        <div class="col-6 col-md-3 col-xl-1 d-none d-xl-block">
          Revision
        </div>
        <div class="col-6 col-md-6 col-xl-2 col-xxxl-1 d-none d-xl-block">
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
      >
        <router-link
          v-for="pipeline in pipelines"
          :key="pipeline.repoSource+'/'+pipeline.repoOwner+'/'+pipeline.repoName"
          :to="{ name: 'PipelineBuilds', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName }}"
          tag="div"
          class="row rounded border clickable pt-3 pr-2 pb-2 pl-2 mt-2 mr-0 mb-2 ml-0 list-complete-item"
          :class="pipeline.buildStatus | bootstrapClass('border')"
        >
          <div
            class="mb-2 col-6 col-md-6 col-xl-5 col-xxl-3 col-xxxl-2 text-truncate"
            :title="pipeline.repoSource + '/' + pipeline.repoOwner + '/' + pipeline.repoName"
          >
            <div class="small text-black-50 mb-1 d-xl-none">
              Pipeline
            </div>
            <span class="text-muted d-none d-md-inline">{{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/</span><strong>{{ pipeline.repoName }}</strong>
          </div>
          <div
            class="mb-2 col-6 col-md-6 col-xl-1 text-truncate"
            :title="pipeline.buildVersion"
          >
            <div class="small text-black-50 mb-1 d-xl-none">
              Version
            </div>
            {{ pipeline.buildVersion }}
          </div>
          <div class="mb-2 col-12 col-md-6 col-xl-1 align-middle">
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
            class="mb-2 col-6 col-md-6 col-xl-1 text-truncate"
            :title="$options.filters.formatDuration(pipeline.duration) + ', ' + $options.filters.formatDatetime(pipeline.insertedAt)"
          >
            <div class="small text-black-50 mb-1 d-xl-none">
              Built-at
            </div>
            <span
              v-if="pipeline.duration > 0"
              :class="pipeline.duration | colorDurationClass"
            >
              {{ pipeline.duration | formatDuration }}
            </span> {{ pipeline.insertedAt | formatDatetime }}
          </div>
          <div
            class="mb-2 col-6 col-md-3 col-xl-1 text-truncate"
            :title="pipeline.repoBranch"
          >
            <div class="small text-black-50 mb-1 d-xl-none">
              Branch
            </div>
            {{ pipeline.repoBranch }}
          </div>
          <div class="mb-2 col-6 col-md-3 col-xl-1">
            <div class="small text-black-50 mb-1 d-xl-none">
              Revision
            </div>
            <commit-link :build="pipeline" />
          </div>
          <div class="mb-2 col-6 col-md-6 col-xl-2 col-xxxl-1">
            <div class="small text-black-50 mb-1 d-xl-none">
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
            v-if="(pipeline.labels && pipeline.labels.length > 0) || (pipeline.releaseTargets && pipeline.releaseTargets.length > 0)"
            class="col-12 d-xxl-none"
          >
            <div class="mt-3 mb-3 w-50 mx-auto border-bottom" />
          </div>
          <div
            v-if="pipeline.labels && pipeline.labels.length > 0"
            class="mb-2 col-12 col-xl-6 col-xxl-2 text-center text-xxl-left text-truncate text-truncate-fade"
          >
            <div class="small text-black-50 mb-1 d-xxl-none">
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
            v-if="pipeline.releaseTargets && pipeline.releaseTargets.length > 0"
            class="col-12 d-none d-xxl-flex d-xxxl-none"
          >
            <div class="mt-3 mb-3 w-50 mx-auto border-bottom" />
          </div>
          <div
            v-if="pipeline.releaseTargets && pipeline.releaseTargets.length > 0"
            class="mb-2 col-12 col-xl-6 col-xxl-12 col-xxxl-2 text-center text-xxxl-left text-truncate text-truncate-fade"
          >
            <div class="small text-black-50 mb-1 d-xxxl-none">
              Releases
            </div>
            <release-badge
              v-for="releaseTarget in pipeline.releaseTargets"
              :key="releaseTarget.name"
              :release-target="releaseTarget"
              :pipeline="pipeline"
            />
          </div>
        </router-link>
      </transition-group>
    </div>

    <pagination
      :pagination="pagination"
      :link-generator="paginationLinkGenerator"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

import CommitLink from '@/components/CommitLink'
import ReleaseBadge from '@/components/ReleaseBadge'
import StatusFilter from '@/components/StatusFilter'
import LabelFilter from '@/components/LabelFilter'
import PipelineFilter from '@/components/PipelineFilter'
import SinceSelector from '@/components/SinceSelector'
import PaginationCompact from '@/components/PaginationCompact'
import Pagination from '@/components/Pagination'

export default {
  components: {
    CommitLink,
    ReleaseBadge,
    StatusFilter,
    LabelFilter,
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
      refresh: true
    }
  },

  created () {
    this.setDataFromQueryParams(this.query)
    this.loadPipelines()
  },

  methods: {
    paginationLinkGenerator (pageNum) {
      if (this.filter && this.filter.labels && this.filter.labels !== '') {
        return { query: { status: this.filter.status, since: this.filter.since, labels: this.filter.labels, page: pageNum } }
      }
      return { query: { status: this.filter.status, since: this.filter.since, page: pageNum } }
    },

    setDataFromQueryParams (query) {
      this.pagination.page = query && query.page ? Number.parseInt(query.page, 10) : 1
      this.filter.status = query && query.status ? query.status : 'all'
      this.filter.since = query && query.since ? query.since : '1d'
      this.filter.labels = query && query.labels ? query.labels : ''
      this.filter.search = query && query.search ? query.search : ''
    },

    updateQueryParams () {
      if (this.filter && this.filter.labels && this.filter.labels !== '') {
        this.$router.push({ query: { status: this.filter.status, since: this.filter.since, search: this.filter.search, labels: this.filter.labels, page: this.pagination.page } })
      } else {
        this.$router.push({ query: { status: this.filter.status, since: this.filter.since, search: this.filter.search, page: this.pagination.page } })
      }
    },

    loadPipelines () {
      this.axios.get(`/api/pipelines?filter[status]=${this.filter.status}&filter[since]=${this.filter.since}&filter[search]=${this.filter.search}&filter[labels]=${this.filter.labels}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.pipelines = response.data.items
          this.pagination = response.data.pagination

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
