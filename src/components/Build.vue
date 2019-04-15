<template>
  <router-link
    :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}"
    tag="div"
    :class="[
      $options.filters.bootstrapClass(build.buildStatus, 'border'),
      dashboardModeActive ? $options.filters.bootstrapClass(build.buildStatus, 'bg') : '',
      dashboardModeActive ? $options.filters.bootstrapTextClass(build.buildStatus) : '',
      'row rounded border align-items-center clickable pt-3 pr-2 pb-2 pl-2'
    ]"
  >
    <div
      :class="['col-12', 'mb-2 text-truncate text-center']"
      :title="build.repoSource + '/' + build.repoOwner + '/' + build.repoName"
      v-if="showPipelineName"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Pipeline
      </div>
      <span :class="[dashboardModeActive ? 'd-none d-md-inline' : 'text-muted d-none d-md-inline']">{{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/</span><strong>{{ pipeline.repoName }}</strong>
      <div
        class="mt-3 mb-3 w-75 mx-auto border-bottom"
        v-if="!dashboardModeActive"
      />
    </div>
    <div
      :class="[colClassesVersion, 'mb-2 text-truncate']"
      :title="build.buildVersion"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Version
      </div>
      {{ build.buildVersion }}
    </div>
    <div
      :class="[colClassesStatus, 'mb-2 align-middle']"
      v-if="!dashboardModeActive"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Status
      </div>
      <div class="progress">
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
      :class="[colClassesBuiltAt, 'mb-2 text-truncate']"
      :title="$options.filters.formatDuration(build.duration) + ', ' + $options.filters.formatDatetime(build.insertedAt)"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
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
      :class="[colClassesBranch, 'mb-2 text-truncate']"
      :title="build.repoBranch"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Branch
      </div>
      {{ build.repoBranch }}
    </div>
    <div
      :class="[colClassesRevision, 'mb-2']"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Revision
      </div>
      <commit-link
        :build="build"
        :dashboard-mode-active="dashboardModeActive"
      />
    </div>
    <div :class="[colClassesCommits, 'mb-2']">
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Commit(s)
      </div>
      <div
        v-for="commit in limitCommits"
        :key="commit.message"
        :title="commit.message + ' / ' + commit.author.name"
        class="text-truncate"
      >
        {{ commit.message }} / {{ commit.author.name }}
      </div>
    </div>
    <div
      v-if="!dashboardModeActive && (showReleases(build) || (user && user.authenticated && build && ((build.buildStatus === 'failed' || build.buildStatus === 'running' || build.buildStatus === 'canceled') || (pipeline.releaseTargets && pipeline.releaseTargets.length > 0 && build.buildStatus === 'succeeded') || (build.triggerEvents && build.triggerEvents.length > 0))))"
      :class="[ { 'col-12' : !rowItem, 'col-12' : rowItem }]"
    >
      <div class="mt-3 mb-3 w-50 mx-auto border-bottom" />
    </div>
    <div
      :class="[ colClassesTriggeredBy, 'mb-2 text-center']"
    >
      <div
        :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(build.buildStatus) : 'text-black-50', 'small mb-1']"
        v-if="build.triggerEvents && build.triggerEvents.length > 0"
      >
        Triggered by
      </div>
      <triggered-by
        :events="build.triggerEvents"
      />
    </div>
    <div
      :class="[colClassesReleases, 'mb-2 text-center']"
      v-if="!dashboardModeActive"
    >
      <div
        :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', 'small mb-1']"
        v-if="showReleases(build)"
      >
        Releases
      </div>
      <release-badge-for-build
        v-for="releaseTarget in pipeline.releaseTargets"
        :key="releaseTarget.name"
        :release-target="releaseTarget"
        :build="build"
        :dashboard-mode-active="dashboardModeActive"
      />
    </div>
    <div
      v-if="!dashboardModeActive && user && user.authenticated && build && ((build.buildStatus === 'failed' || build.buildStatus === 'running' || build.buildStatus === 'canceled' || build.buildStatus === 'canceling') || (pipeline.releaseTargets && pipeline.releaseTargets.length > 0 && build.buildStatus === 'succeeded'))"
      :class="[colClassesActions, 'mb-2 text-center']"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', 'small mb-1']">
        Actions
      </div>
      <div :class="[!dashboardModeActive && rowItem ? '' : '', 'd-flex justify-content-center']">
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
    </div>
  </router-link>
</template>

<script>
import CommitLink from '@/components/CommitLink'
import ReleaseButton from '@/components/ReleaseButton'
import RebuildButton from '@/components/RebuildButton'
import CancelButton from '@/components/CancelButton'
import ReleaseBadgeForBuild from '@/components/ReleaseBadgeForBuild'
import TriggeredBy from '@/components/TriggeredBy'

export default {
  components: {
    CommitLink,
    ReleaseButton,
    RebuildButton,
    CancelButton,
    ReleaseBadgeForBuild,
    TriggeredBy
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
    limitCommits () {
      if (!this.build || !this.build.commits) {
        return []
      }
      var limit = 3
      if (this.build.commits.length <= limit) {
        return this.build.commits
      }
      return this.build.commits.slice(0, limit)
    },
    alwaysShowTitles () {
      return this.dashboardModeActive || !this.rowItem
    },
    showPipelineName () {
      return !this.rowItem
    },
    colClassesVersion () {
      if (this.dashboardModeActive) {
        return 'col-6 col-md-4 col-lg-3 col-xxl-2'
      }
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xxxl-2'
    },
    colClassesStatus () {
      if (this.dashboardModeActive) {
        return 'col-6 col-md-4'
      }
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-1'
      }
      return 'col-6 col-md-4 col-xxxl-1'
    },
    colClassesBuiltAt () {
      if (this.dashboardModeActive) {
        return 'col-6 col-md-4 col-lg-3 col-xxl-2'
      }
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xxxl-2'
    },
    colClassesBranch () {
      if (this.dashboardModeActive) {
        return 'col-6 col-md-4 col-lg-3 col-xxl-2'
      }
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xxxl-2'
    },
    colClassesRevision () {
      if (this.dashboardModeActive) {
        return 'col-6 col-md-4 col-lg-3 col-xxl-2'
      }
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2 col-xxl-1'
      }
      return 'col-6 col-md-4 col-xxxl-1'
    },
    colClassesCommits () {
      if (this.dashboardModeActive) {
        return 'col-12 col-md-8 col-lg-12 col-xxl-4'
      }
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-3 col-xxl-4'
      }
      return 'col-6 col-md-4 col-xxxl-4'
    },
    colClassesTriggeredBy () {
      if (this.dashboardModeActive) {
        return 'col-12 col-xxl-4'
      }
      if (this.rowItem) {
        return 'col-12 col-xxl-4 text-truncate text-truncate-fade'
      }
      return 'col-12 col-xxl-4'
    },
    colClassesReleases () {
      if (this.dashboardModeActive) {
        return 'col-12 col-xxl-4'
      }
      if (this.rowItem) {
        return 'col-12 col-xxl-4 text-truncate text-truncate-fade'
      }
      return 'col-12 col-xxl-4'
    },
    colClassesActions () {
      if (this.dashboardModeActive) {
        return 'col-12 col-xxl-4'
      }
      if (this.rowItem) {
        return 'col-12 col-xxl-4'
      }
      return 'col-12 col-xxl-4'
    }
  }
}
</script>
