<template>
  <router-link
    :to="{ name: 'PipelineBuilds', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName }}"
    tag="div"
    :class="[
      $options.filters.bootstrapClass(pipeline.buildStatus, 'border'),
      dashboardModeActive ? $options.filters.bootstrapClass(pipeline.buildStatus, 'bg') : '',
      dashboardModeActive ? $options.filters.bootstrapTextClass(pipeline.buildStatus) : '',
      'row rounded border clickable pt-3 pr-2 pb-2 pl-2'
    ]"
  >
    <div
      :class="[dashboardModeActive ? 'col-lg-4 col-xxl-3' : 'col-xxxl-2', 'mb-2 col-6 text-truncate']"
      :title="pipeline.repoSource + '/' + pipeline.repoOwner + '/' + pipeline.repoName"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Pipeline
      </div>
      <span :class="[dashboardModeActive ? 'd-none d-md-inline' : 'text-muted d-none d-md-inline']">{{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/</span><strong>{{ pipeline.repoName }}</strong>
    </div>
    <div
      :class="[dashboardModeActive ? 'col-lg-4 col-xxl-2' : 'col-xl-3 col-xxxl-1', 'mb-2 col-6 text-truncate']"
      :title="pipeline.buildVersion"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Version
      </div>
      {{ pipeline.buildVersion }}
    </div>
    <div
      class="mb-2 col-12 col-md-6 col-xl-3 col-xxxl-1 align-middle"
      v-if="!dashboardModeActive"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxxl-none', 'small mb-1']">
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
      :class="[dashboardModeActive ? 'col-lg-4 col-xxl-2' : 'col-xl-2 col-xxxl-1', 'mb-2 col-6 text-truncate']"
      :title="$options.filters.formatDuration(pipeline.duration) + ', ' + $options.filters.formatDatetime(pipeline.insertedAt)"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Built-at
      </div>
      <span
        v-if="!dashboardModeActive && pipeline.duration > 0"
        :class="[$options.filters.colorDurationClass(pipeline.duration), 'd-none d-sm-inline']"
      >
        {{ pipeline.duration | formatDuration }}
      </span> {{ pipeline.insertedAt | formatDatetime }}
    </div>
    <div
      :class="[dashboardModeActive ? 'col-lg-4 col-xxl-2' : 'col-md-3 col-xl-2 col-xxxl-1', 'mb-2 col-6 text-truncate']"
      :title="pipeline.repoBranch"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Branch
      </div>
      {{ pipeline.repoBranch }}
    </div>
    <div
      class="mb-2 col-6 col-md-3 col-xl-2 col-xxxl-1"
      v-if="!dashboardModeActive"
    >
      <div class="small text-black-50 mb-1 d-xxxl-none">
        Revision
      </div>
      <commit-link :build="pipeline" />
    </div>
    <div
      :class="[dashboardModeActive ? 'col-12 col-lg-8 col-xxl-3' : 'col-6 col-xxxl-1', 'mb-2']"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxxl-none', 'small mb-1']">
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
      class="col-12 d-xxxl-none"
    >
      <div class="mt-3 mb-3 w-50 mx-auto border-bottom" />
    </div>
    <div
      v-if="!dashboardModeActive && pipeline.labels && pipeline.labels.length > 0"
      class="mb-2 col-12 col-xxl-6 col-xxxl-2 text-center text-xxxl-left text-truncate text-truncate-fade"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Labels
      </div>
      <router-link
        :to="{ query: { status: filter && filter.status ? filter.status : '', since: filter && filter.since ? filter.since : '', labels: label.key + '=' + label.value, page: 1 } }"
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
      class="mb-2 col-12 col-xl-6 col-xxxl-2 text-center text-xxxl-left"
    />
    <div
      v-if="pipeline.releaseTargets && pipeline.releaseTargets.length > 0"
      :class="[dashboardModeActive ? '' : 'col-xxl-6 col-xxxl-2 text-xxxl-left text-truncate text-truncate-fade', 'mb-2 col-12 text-center']"
    >
      <div :class="[dashboardModeActive ? $options.filters.bootstrapMutedTextClass(pipeline.buildStatus) : 'text-black-50', keepTitles ? '' : 'd-xxxl-none', 'small mb-1']">
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
</template>

<script>
import CommitLink from '@/components/CommitLink'
import ReleaseBadge from '@/components/ReleaseBadge'

export default {
  components: {
    CommitLink,
    ReleaseBadge
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    },
    filter: {
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
    sortLabels (labels) {
      if (!labels) {
        return labels
      }
      return labels.slice().sort(function (a, b) {
        return a.key > b.key
      })
    }
  },

  computed: {
    keepTitles () {
      return this.dashboardModeActive || !this.rowItem
    }
  }
}
</script>
