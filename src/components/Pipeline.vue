<template>
  <router-link
    :to="{ name: 'PipelineOverview', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName }}"
    tag="div"
    :class="[
      $options.filters.bootstrapClass(pipeline.buildStatus, 'border'),
      'row rounded border align-items-center clickable pt-3 pr-2 pb-2 pl-2'
    ]"
  >
    <div
      :class="[ colClassesPipeline, 'mb-2 text-truncate']"
      :title="pipeline.repoSource + '/' + pipeline.repoOwner + '/' + pipeline.repoName"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Pipeline
      </div>
      <span :class="['text-muted d-none d-md-inline']">{{ pipeline.repoSource }}/{{ pipeline.repoOwner }}/</span><strong>{{ pipeline.repoName }}</strong>
    </div>
    <div
      :class="[ colClassesVersion, 'mb-2 text-truncate']"
      :title="pipeline.buildVersion"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Version
      </div>
      {{ pipeline.buildVersion }}
    </div>
    <div
      :class="[ colClassesStatus, 'mb-2 align-middle']"
      v-if="rowItem"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Status
      </div>
      <router-link
        :to="{ name: 'PipelineBuildLogs', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName, id: pipeline.id }}"
        tag="div"
        class="progress"
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
      :class="[ colClassesBuiltAt, 'mb-2 text-truncate']"
      :title="$options.filters.formatDuration(pipeline.duration) + ', ' + $options.filters.formatDatetime(pipeline.insertedAt)"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Built-at
      </div>
      <span
        v-if="pipeline.duration > 0"
        :class="[$options.filters.colorDurationClass(pipeline.duration), 'd-none d-sm-inline']"
      >
        {{ pipeline.duration | formatDuration }}
      </span> {{ pipeline.insertedAt | formatDatetime }}
    </div>
    <div
      :class="[ colClassesBranch, 'mb-2 text-truncate']"
      :title="pipeline.repoBranch"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Branch
      </div>
      {{ pipeline.repoBranch }}
    </div>
    <div
      :class="[ colClassesRevision, 'mb-2']"
      v-if="rowItem"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']">
        Revision
      </div>
      <commit-link
        :build="pipeline"
      />
    </div>
    <div
      :class="[ colClassesCommits, 'mb-2']"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']">
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
      v-if="((!rowItem && pipeline.labels && pipeline.labels.length > 0) || (pipeline.releaseTargets && pipeline.releaseTargets.length > 0))"
      :class="[rowItem ? 'col-12 d-none d-xxxl-block' : 'col-12']"
    >
      <div class="mt-3 mb-3 w-50 mx-auto border-bottom" />
    </div>
    <div
      :class="[ colClassesLabels, 'mb-2 text-center']"
      v-if="!rowItem"
    >
      <div
        :class="['text-black-50', alwaysShowTitles ? '' : 'd-xxxl-none', 'small mb-1']"
        v-if="pipeline.labels && pipeline.labels.length > 0"
      >
        Labels
      </div>
      <router-link
        :to="{ name: 'Pipelines', query: { status: filter && filter.status ? filter.status : '', since: filter && filter.since ? filter.since : '', labels: label.key + '=' + label.value, page: 1 } }"
        exact
        class="btn btn-light btn-sm mr-1"
        v-for="label in sortLabels(pipeline.labels)"
        :key="label.key"
      >
        {{ label.key }}={{ label.value }}
      </router-link>
    </div>
    <div
      :class="[ colClassesTriggeredBy, 'mb-2 text-center']"
      v-if="!rowItem && showTriggeredBy"
    >
      <div
        :class="['text-black-50', alwaysShowTitles ? '' : '', 'small mb-1']"
        v-if="pipeline.triggerEvents && pipeline.triggerEvents.length > 0"
      >
        Triggered by
      </div>
      <triggered-by
        :events="pipeline.triggerEvents"
      />
    </div>
    <div
      :class="[ colClassesReleases, 'mb-2' ]"
      v-if="pipeline.releaseTargets && pipeline.releaseTargets.length > 0"
    >
      <div
        :class="['text-black-50', 'small mb-1']"
      >
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
</template>

<script>
import CommitLink from '@/components/CommitLink'
import ReleaseBadge from '@/components/ReleaseBadge'
import TriggeredBy from '@/components/TriggeredBy'

export default {
  components: {
    CommitLink,
    ReleaseBadge,
    TriggeredBy
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
    },

    releaseIsUpToDate (release) {
      return this.pipeline && this.pipeline.buildStatus && this.pipeline.buildStatus === 'succeeded' && this.pipeline.buildVersion && release && release.releaseStatus && release.releaseStatus === 'succeeded' && this.pipeline.buildVersion === release.releaseVersion
    },

    aggregatedStatus (releaseTarget) {
      return releaseTarget && releaseTarget.activeReleases && releaseTarget.activeReleases.length > 0 ? releaseTarget.activeReleases.reduce((acc, release) => {
        const statusPriorities = [
          'pending',
          'running',
          'canceling',
          'failed',
          'canceled',
          'succeeded'
        ]

        statusPriorities.some(statusPriority => {
          if (acc === statusPriority || release.releaseStatus === statusPriority) {
            acc = statusPriority
            return true
          }
        })

        return acc
      }, 'skipped') : 'skipped'
    }
  },

  computed: {
    mergedActionsAndActiveReleases () {
      return (releaseTarget) => {
        if ((!releaseTarget.actions || releaseTarget.actions.length === 0) && (!releaseTarget.activeReleases || releaseTarget.activeReleases.length === 0)) {
          return [{
            name: releaseTarget.name,
            repoSource: this.pipeline.repoSource,
            repoOwner: this.pipeline.repoOwner,
            repoName: this.pipeline.repoName
          }]
        }

        if (!releaseTarget.actions || releaseTarget.actions.length === 0) {
          return releaseTarget.activeReleases
        }

        var releaseActions = []

        releaseTarget.actions.forEach(action => {
          // check if there's an active release for name and action
          var activeRelease = this.getActiveRelease(releaseTarget.activeReleases, action.name)
          if (activeRelease !== undefined) {
            releaseActions.push(activeRelease)
          } else {
            releaseActions.push({
              name: releaseTarget.name,
              action: action.name,
              repoSource: this.pipeline.repoSource,
              repoOwner: this.pipeline.repoOwner,
              repoName: this.pipeline.repoName
            })
          }
        })

        return releaseActions
      }
    },

    alwaysShowTitles () {
      return !this.rowItem
    },
    showTriggeredBy () {
      return !this.rowItem
    },
    showReleases () {
      return this.rowItem
    },
    colClassesPipeline () {
      if (!this.rowItem) {
        return 'col-6 col-lg-4 col-xxl-3'
      }
      return 'col-6 col-xxxl-3'
    },
    colClassesVersion () {
      if (!this.rowItem) {
        return 'col-6 col-lg-4 col-xxl-2'
      }
      return 'col-6 col-xl-3 col-xxxl-1'
    },
    colClassesStatus () {
      if (!this.rowItem) {
        return ''
      }
      return 'col-12 col-md-6 col-xl-3 col-xxxl-1'
    },
    colClassesBuiltAt () {
      if (!this.rowItem) {
        return 'col-6 col-lg-4 col-xxl-2'
      }
      return 'col-6 col-xl-2 col-xxxl-2'
    },
    colClassesBranch () {
      if (!this.rowItem) {
        return 'col-6 col-lg-4 col-xxl-2'
      }
      return 'col-6 col-md-3 col-xl-2 col-xxxl-1'
    },
    colClassesRevision () {
      if (!this.rowItem) {
        return ''
      }
      return 'col-6 col-md-3 col-xl-2 col-xxxl-1'
    },
    colClassesCommits () {
      if (!this.rowItem) {
        return 'col-12 col-lg-8 col-xxl-3'
      }
      return 'col-6 col-xxxl-3 text-truncate text-truncate-fade'
    },
    colClassesLabels () {
      if (this.rowItem) {
        return 'col-12 col-xxl-6 col-xxxl-2 text-xxxl-left text-truncate text-truncate-fade'
      }
      return 'col-12 col-xxxl-6 text-truncate text-truncate-fade'
    },
    colClassesTriggeredBy () {
      if (this.rowItem) {
        return ''
      }
      return 'col-12 col-xxxl-6 text-truncate text-truncate-fade'
    },
    colClassesReleases () {
      if (this.rowItem) {
        return 'col-12 text-left text-xxxl-center text-truncate text-truncate-fade'
      }
      return 'col-12 text-center text-truncate text-truncate-fade'
    }
  }
}
</script>
