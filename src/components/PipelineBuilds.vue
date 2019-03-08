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
        Version
      </div>
      <div class="col-6 col-md-4 col-xl-1">
        Status
      </div>
      <div class="col-6 col-md-4 col-xl-2 col-xxl-1 d-none d-md-block">
        Built
      </div>
      <div class="col-6 col-md-4 col-xl-2 col-xxl-1 d-none d-xl-block">
        Branch
      </div>
      <div class="col-6 col-md-4 col-xl-2 col-xxl-1 d-none d-xl-block">
        Revision
      </div>
      <div class="col-6 col-md-4 col-xl-3 col-xxl-2 d-none d-xl-block">
        Commit(s)
      </div>
      <div class="col-xxl-2 d-none d-xxl-block">
        Releases
      </div>
      <div
        v-if="user && user.authenticated"
        class="col-xxl-2 d-none d-xxl-block"
      >
        Actions
      </div>
    </div>

    <transition-group
      name="list-complete"
      tag="div"
    >
      <router-link
        v-for="build in builds"
        :key="build.id"
        :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}"
        tag="div"
        class="row rounded border clickable pt-3 pr-2 pb-2 pl-2 mt-2 mr-0 mb-2 ml-0 list-complete-item"
        :class="build.buildStatus | bootstrapClass('border')"
      >
        <div
          class="mb-2 col-6 col-md-4 col-xl-2 text-truncate"
          :title="build.buildVersion"
        >
          <div class="small text-black-50 mb-1 d-xl-none">
            Version
          </div>
          {{ build.buildVersion }}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-1 align-middle">
          <div class="small text-black-50 mb-1 d-xl-none">
            Status
          </div>
          <div class="progress mt-1">
            <div
              class="progress-bar"
              :class="[$options.filters.bootstrapClass(build.buildStatus,'bg'), $options.filters.stripedProgressBarClass(build.buildStatus)]"
              role="progressbar"
              style="width: 100%"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              :title="build.buildStatus"
            />
          </div>
        </div>
        <div
          class="mb-2 col-6 col-md-4 col-xl-2 col-xxl-1 text-truncate"
          :title="$options.filters.formatDuration(build.duration) + ', ' + $options.filters.formatDatetime(build.insertedAt)"
        >
          <div class="small text-black-50 mb-1 d-xl-none">
            Built
          </div>
          <span
            v-if="build.duration > 0"
            :class="build.duration | colorDurationClass"
          >
            {{ build.duration | formatDuration }}
          </span> {{ build.insertedAt | formatDatetime }}
        </div>
        <div
          class="mb-2 col-6 col-md-4 col-xl-2 col-xxl-1 text-truncate"
          :title="build.repoBranch"
        >
          <div class="small text-black-50 mb-1 d-xl-none">
            Branch
          </div>
          {{ build.repoBranch }}
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-2 col-xxl-1">
          <div class="small text-black-50 mb-1 d-xl-none">
            Revision
          </div>
          <commit-link :build="build" />
        </div>
        <div class="mb-2 col-6 col-md-4 col-xl-3 col-xxl-2">
          <div class="small text-black-50 mb-1 d-xl-none">
            Commit(s)
          </div>
          <div
            v-for="commit in build.commits"
            :key="commit.message"
            :title="commit.message + ' / ' + commit.author.name"
            class="text-truncate"
          >
            {{ commit.message }} / {{ commit.author.name }}
          </div>
        </div>
        <div class="mb-2 col-12 col-md-6 col-xxl-2 text-truncate text-truncate-fade">
          <div class="small text-black-50 mb-1 d-xxl-none">
            Releases
          </div>
          <release-badge-for-build
            v-for="releaseTarget in pipeline.releaseTargets"
            :key="releaseTarget.name"
            :release-target="releaseTarget"
            :build="build"
          />
          <span
            v-if="!showReleases(build)"
            class="d-xxl-none"
          >
            -
          </span>
        </div>
        <div
          v-if="user && user.authenticated && build && ((build.buildStatus === 'failed' || build.buildStatus === 'running' || build.buildStatus === 'canceled') || (pipeline.releaseTargets && pipeline.releaseTargets.length > 0 && build.buildStatus === 'succeeded'))"
          class="mb-2 col-12 col-md-6 col-xxl-2"
        >
          <div class="small text-black-50 mb-1 d-xxl-none">
            Actions
          </div>
          <release-button
            :pipeline="pipeline"
            :build="build"
            :user="user"
          />
          <rebuild-button
            :build="build"
            :user="user"
            :builds="builds"
          />
          <cancel-button
            :build="build"
            :user="user"
          />
        </div>
      </router-link>
    </transition-group>

    <pagination
      :pagination="pagination"
      :link-generator="paginationLinkGenerator"
    />
  </div>
</template>

<script>
import StatusFilter from '@/components/StatusFilter'
import PaginationCompact from '@/components/PaginationCompact'
import CommitLink from '@/components/CommitLink'
import ReleaseButton from '@/components/ReleaseButton'
import RebuildButton from '@/components/RebuildButton'
import CancelButton from '@/components/CancelButton'
import ReleaseBadgeForBuild from '@/components/ReleaseBadgeForBuild'
import Pagination from '@/components/Pagination'

export default {
  components: {
    StatusFilter,
    PaginationCompact,
    CommitLink,
    ReleaseButton,
    RebuildButton,
    CancelButton,
    ReleaseBadgeForBuild,
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
      this.axios.get(`/api/pipelines/${this.repoSource}/${this.repoOwner}/${this.repoName}/builds?filter[status]=${this.filter.status}&page[number]=${this.pagination.page}&page[size]=${this.pagination.size}`)
        .then(response => {
          this.builds = response.data.items
          this.pagination = response.data.pagination
        })
        .catch(e => {
          this.errors.push(e)
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
    },

    showReleases (build) {
      if (this.pipeline && this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0) {
        return this.pipeline.releaseTargets.some(r => r.activeReleases && r.activeReleases.some(ar => ar.releaseVersion === build.buildVersion))
      }
      return false
    },

    isActiveRelease (releaseTarget, build) {
      if (releaseTarget && releaseTarget.activeReleases && releaseTarget.activeReleases.length > 0) {
        return releaseTarget.activeReleases.some(ar => ar.releaseVersion === build.buildVersion)
      }
      return false
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

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
