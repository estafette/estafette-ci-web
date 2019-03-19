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

    <div class="row rounded border p-2 mt-0 mr-0 mb-2 ml-0 font-weight-bold">
      <div class="col-6 col-md-4 col-xl-2">
        Name
      </div>
      <div class="col-6 col-md-4 col-xl-2">
        Version
      </div>
      <div class="col-6 col-md-4 col-xl-1">
        Status
      </div>
      <div class="col-6 col-md-4 col-xl-2 d-none d-xl-block">
        Released
      </div>
      <div class="col-6 col-md-4 col-xl-3 d-none d-xl-block">
        By
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
      <router-link
        v-for="release in releases"
        :key="release.id"
        :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
        tag="div"
        class="row rounded border clickable pt-3 pr-2 pb-2 pl-2 mt-2 mr-0 mb-2 ml-0 list-complete-item"
        :class="release.releaseStatus | bootstrapClass('border')"
      >
        <div
          class="mb-2 col-6 col-md-4 col-xl-2 text-truncate"
          :title="release.name"
        >
          <div class="small text-black-50 mb-1 d-xl-none">
            Name
          </div>
          {{ release.name }}<span v-if="release.action">
            / {{ release.action }}
          </span>
        </div>
        <div
          class="mb-2 col-6 col-md-4 col-xl-2 text-truncate"
          :title="release.releaseVersion"
        >
          <div class="small text-black-50 mb-1 d-xl-none">
            Version
          </div>
          {{ release.releaseVersion }}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-1 align-middle">
          <div class="small text-black-50 mb-1 d-xl-none">
            Status
          </div>
          <div class="progress mt-1">
            <div
              class="progress-bar"
              :class="[$options.filters.bootstrapClass(release.releaseStatus,'bg'), $options.filters.stripedProgressBarClass(release.releaseStatus)]"
              role="progressbar"
              style="width: 100%"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              :title="release.releaseStatus"
            />
          </div>
        </div>
        <div
          class="mb-2 col-6 col-md-4 col-xl-2 text-truncate"
          :title="$options.filters.formatDuration(release.duration) + ', ' + $options.filters.formatDatetime(release.insertedAt)"
        >
          <div class="small text-black-50 mb-1 d-xl-none">
            Released
          </div>
          <span
            v-if="release.duration > 0"
            :class="release.duration | colorDurationClass"
          >
            {{ release.duration | formatDuration }}
          </span> {{ release.insertedAt | formatDatetime }}
        </div>
        <div
          class="mb-2 col-6 col-md-4 col-xl-3 text-truncate"
          :title="release.triggeredBy"
        >
          <div class="small text-black-50 mb-1 d-xl-none">
            By
          </div>
          {{ release.triggeredBy }}
        </div>
        <div
          v-if="user && user.authenticated && release && release.releaseStatus === 'running'"
          class="mb-2 col-6 col-md-4 col-xl-2"
        >
          <div class="small text-black-50 mb-1 d-xl-none">
            Actions
          </div>
          <cancel-button
            :release="release"
            :user="user"
          />
        </div>
      </router-link>
    </transition-group>
    <div
      v-else-if="loaded"
      class="alert alert-warning text-center p-5"
    >
      There are no releases for the current pipeline.
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
import Spinner from '@/components/Spinner'
import Pagination from '@/components/Pagination'
import StatusFilter from '@/components/StatusFilter'
import PaginationCompact from '@/components/PaginationCompact'

export default {
  components: {
    Spinner,
    Pagination,
    StatusFilter,
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
      releases: [],
      errors: [],
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
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/releases?filter[status]=${this.filter.status}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.releases = response.data.items
          this.pagination = response.data.pagination

          this.loaded = true
        })
        .catch(e => {
          this.errors.push(e)
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
