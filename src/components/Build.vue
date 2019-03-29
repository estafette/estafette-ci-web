<template>
  <router-link
    :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}"
    tag="div"
    :class="[
      $options.filters.bootstrapClass(build.buildStatus, 'border'),
      dashboardModeActive ? $options.filters.bootstrapClass(build.buildStatus, 'bg') : '',
      dashboardModeActive ? $options.filters.bootstrapTextClass(build.buildStatus) : '',
      'row rounded border clickable pt-3 pr-2 pb-2 pl-2 mt-2 mr-0 mb-2 ml-0 list-complete-item'
    ]"
  >
    <div
      :class="[dashboardModeActive ? 'col-lg-4 col-xxl-3' : 'col-xxxl-2', 'mb-2 col-6 text-truncate']"
      :title="build.repoSource + '/' + build.repoOwner + '/' + build.repoName"
      v-if="keepTitles"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxl-none', 'small mb-1']">
        Pipeline
      </div>
      <span :class="[dashboardModeActive ? 'd-none d-md-inline' : 'text-muted d-none d-md-inline']">{{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/</span><strong>{{ pipeline.repoName }}</strong>
    </div>
    <div
      :class="[dashboardModeActive ? 'col-lg-3 col-xxl-2' : 'col-xl-2', 'mb-2 col-6 col-md-4 text-truncate']"
      :title="build.buildVersion"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxl-none', 'small mb-1']">
        Version
      </div>
      {{ build.buildVersion }}
    </div>
    <div
      class="mb-2 col-6 col-md-4 col-xl-1 align-middle"
      v-if="!dashboardModeActive"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxl-none', 'small mb-1']">
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
      :class="[dashboardModeActive ? 'col-lg-3 col-xxl-2' : 'col-xl-2 col-xxl-1', 'mb-2 col-6 col-md-4 text-truncate']"
      :title="$options.filters.formatDuration(build.duration) + ', ' + $options.filters.formatDatetime(build.insertedAt)"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxl-none', 'small mb-1']">
        Built
      </div>
      <span
        v-if="!dashboardModeActive && build.duration > 0"
        :class="build.duration | colorDurationClass"
      >
        {{ build.duration | formatDuration }}
      </span> {{ build.insertedAt | formatDatetime }}
    </div>
    <div
      :class="[dashboardModeActive ? 'col-lg-3 col-xxl-2' : 'col-xl-2 col-xxl-1', 'mb-2 col-6 col-md-4 text-truncate']"
      :title="build.repoBranch"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxl-none', 'small mb-1']">
        Branch
      </div>
      {{ build.repoBranch }}
    </div>
    <div
      class="mb-2 col-6 col-md-4 col-xl-2 col-xxl-1"
      v-if="!dashboardModeActive"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxl-none', 'small mb-1']">
        Revision
      </div>
      <commit-link :build="build" />
    </div>
    <div :class="[dashboardModeActive ? 'col-md-12 col-lg-3 col-xxl-6' : 'col-md-4 col-xl-3 col-xxl-2', 'mb-2 col-6']">
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxl-none', 'small mb-1']">
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
    <div
      class="mb-2 col-12 col-md-6 col-xxl-2 text-center text-xxxl-left text-truncate text-truncate-fade"
      v-if="!dashboardModeActive"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxl-none', 'small mb-1']">
        Releases
      </div>
      <release-badge-for-build
        v-for="releaseTarget in pipeline.releaseTargets"
        :key="releaseTarget.name"
        :release-target="releaseTarget"
        :build="build"
        :dashboard-mode-active="dashboardModeActive"
      />
      <span
        v-if="!showReleases(build)"
        class="d-xxl-none"
      >
        -
      </span>
    </div>
    <div
      v-if="!dashboardModeActive && user && user.authenticated && build && ((build.buildStatus === 'failed' || build.buildStatus === 'running' || build.buildStatus === 'canceled') || (pipeline.releaseTargets && pipeline.releaseTargets.length > 0 && build.buildStatus === 'succeeded'))"
      class="mb-2 col-12 col-md-6 col-xxl-2 text-center text-xxxl-left"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxl-none', 'small mb-1']">
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
</template>

<script>
import CommitLink from '@/components/CommitLink'
import ReleaseButton from '@/components/ReleaseButton'
import RebuildButton from '@/components/RebuildButton'
import CancelButton from '@/components/CancelButton'
import ReleaseBadgeForBuild from '@/components/ReleaseBadgeForBuild'

export default {
  components: {
    CommitLink,
    ReleaseButton,
    RebuildButton,
    CancelButton,
    ReleaseBadgeForBuild
  },

  props: {
    build: {
      type: Object,
      default: null
    },
    builds: {
      type: Array,
      default: null
    },
    user: {
      type: Object,
      default: null
    },
    pipeline: {
      type: Object,
      default: null
    },
    dashboardModeActive: {
      type: Boolean,
      default: null
    },
    rowItem: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    showReleases (build) {
      if (this.pipeline && this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0) {
        return this.pipeline.releaseTargets.some(r => r.activeReleases && r.activeReleases.some(ar => ar.releaseVersion === build.buildVersion))
      }
      return false
    }
  },

  computed: {
    keepTitles () {
      return this.dashboardModeActive || !this.rowItem
    }
  }
}
</script>
