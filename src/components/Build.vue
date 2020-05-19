<template>
  <router-link
    :to="{ name: 'PipelineBuildLogs', params: { repoSource: build.repoSource, repoOwner: build.repoOwner, repoName: build.repoName, id: build.id }}"
    tag="div"
    :class="[
      'row rounded border align-items-center clickable pt-3 pr-2 pb-2 pl-2 bg-white'
    ]"
  >
    <div
      :class="['col-12', 'mb-2 text-truncate text-center']"
      :title="build.repoSource + '/' + build.repoOwner + '/' + build.repoName"
      v-if="showPipelineName"
    >
      <div :class="[alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Pipeline
      </div>
      <span :class="['text-muted d-none d-md-inline']">{{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/</span><strong>{{ pipeline.repoName }}</strong>
      <div
        class="mt-3 mb-3 w-75 mx-auto border-bottom"
      />
    </div>
    <div
      :class="[colClassesVersion, 'mb-2 text-truncate']"
      :title="build.buildVersion"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Version
      </div>
      {{ build.buildVersion }}
    </div>
    <div
      :class="[colClassesStatus, 'mb-2 align-middle']"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Status
      </div>
      <b-progress
        :value="100"
        :variant="$options.filters.bootstrapVariant(build.buildStatus)"
        :animated="$options.filters.animatedProgressBar(build.buildStatus)"
      />
    </div>
    <div
      :class="[colClassesBuiltAt, 'mb-2 text-truncate']"
      :title="$options.filters.formatDuration(build.duration) + ', ' + $options.filters.formatDatetime(build.insertedAt)"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
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
      :class="[colClassesBranch, 'mb-2 text-truncate']"
      :title="build.repoBranch"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Branch
      </div>
      {{ build.repoBranch }}
    </div>
    <div
      :class="[colClassesRevision, 'mb-2']"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Revision
      </div>
      <commit-link
        :build="build"
      />
    </div>
    <div :class="[colClassesCommits, 'mb-2']">
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
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
      v-if="(showReleases(build) || (user && user.authenticated && build && ((build.buildStatus === 'failed' || build.buildStatus === 'running' || build.buildStatus === 'canceled') || (pipeline.releaseTargets && pipeline.releaseTargets.length > 0 && build.buildStatus === 'succeeded'))))"
      :class="[ { 'col-12' : !rowItem, 'col-12 d-xxxl-none' : rowItem }]"
    >
      <div class="mt-3 mb-3 w-50 mx-auto border-bottom" />
    </div>
    <div
      :class="[ colClassesTriggeredBy, 'mb-2 text-center']"
      v-if="showTriggeredBy"
    >
      <div
        :class="['text-black-50', alwaysShowTitles ? '' : '', 'small mb-1']"
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
    >
      <div
        :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']"
        v-if="showReleases(build)"
      >
        Releases
      </div>
      <release-badge-for-build
        v-for="releaseTarget in pipeline.releaseTargets"
        :key="releaseTarget.name"
        :release-target="releaseTarget"
        :build="build"
      />
    </div>
    <div
      v-if="user && user.authenticated && build && ((build.buildStatus === 'failed' || build.buildStatus === 'pending' || build.buildStatus === 'running' || build.buildStatus === 'canceled' || build.buildStatus === 'canceling') || (pipeline.releaseTargets && pipeline.releaseTargets.length > 0 && build.buildStatus === 'succeeded'))"
      :class="[colClassesActions, 'mb-2 text-center']"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Actions
      </div>
      <div :class="[rowItem ? 'justify-content-xxxl-start' : '', 'd-flex justify-content-center']">
        <release-button
          :pipeline="pipeline"
          :build="build"
        />
        <rebuild-button
          :build="build"
          :builds="builds"
        />
        <cancel-button
          :build="build"
        />
      </div>
    </div>
  </router-link>
</template>

<script>
import { BProgress } from 'bootstrap-vue'
import CommitLink from '@/components/CommitLink'
import ReleaseButton from '@/components/ReleaseButton'
import RebuildButton from '@/components/RebuildButton'
import CancelButton from '@/components/CancelButton'
import ReleaseBadgeForBuild from '@/components/ReleaseBadgeForBuild'
import TriggeredBy from '@/components/TriggeredBy'

export default {
  components: {
    BProgress,
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
    pipeline: {
      type: Object,
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
    user () {
      return this.$store.state.user.me
    },
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
      return !this.rowItem
    },
    showPipelineName () {
      return !this.rowItem
    },
    showTriggeredBy () {
      return !this.rowItem
    },
    colClassesVersion () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xxxl-2'
    },
    colClassesStatus () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-1'
      }
      return 'col-6 col-md-4 col-xxxl-1'
    },
    colClassesBuiltAt () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2 col-xxxl-1'
      }
      return 'col-6 col-md-4 col-xxxl-2'
    },
    colClassesBranch () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2 col-xxl-1'
      }
      return 'col-6 col-md-4 col-xxxl-2'
    },
    colClassesRevision () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2 col-xxl-1'
      }
      return 'col-6 col-md-4 col-xxxl-1'
    },
    colClassesCommits () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-3 col-xxl-5 col-xxxl-2'
      }
      return 'col-6 col-md-4 col-xxxl-4'
    },
    colClassesTriggeredBy () {
      if (this.rowItem) {
        return ''
      }
      return 'col-12 col-xxl-3 text-truncate text-truncate-fade'
    },
    colClassesReleases () {
      if (this.rowItem) {
        return 'col-12 col-md-6 col-xxxl-2 text-xxxl-left text-truncate text-truncate-fade'
      }
      return 'col-12 col-xxl-6'
    },
    colClassesActions () {
      if (this.rowItem) {
        return 'col-12 col-md-6 col-xxxl-2 text-xxxl-left'
      }
      return 'col-12 col-xxl-3'
    }
  }
}
</script>
