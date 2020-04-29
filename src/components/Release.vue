<template>
  <router-link
    :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
    tag="div"
    :class="[
      $options.filters.bootstrapClass(release.releaseStatus, 'border'),
      'row rounded border align-items-center clickable pt-3 pr-2 pb-2 pl-2'
    ]"
  >
    <div
      :class="['col-12', 'mb-2 text-truncate text-center']"
      :title="release.repoSource + '/' + release.repoOwner + '/' + release.repoName"
      v-if="showPipelineName"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Pipeline
      </div>
      <span :class="['text-muted d-none d-md-inline']">{{ release.repoSource }}/{{ release.repoOwner }}/</span><strong>{{ release.repoName }}</strong>
      <div
        class="mt-3 mb-3 w-75 mx-auto border-bottom"
      />
    </div>
    <div
      :class="[colClassesTarget, 'mb-2 text-truncate']"
      :title="release.name"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Target <span v-if="release.action">+ action</span>
      </div>
      {{ release.name }}<span v-if="release.action">
        / {{ release.action }}
      </span>
    </div>
    <div
      :class="[colClassesVersion, 'mb-2 text-truncate']"
      :title="release.releaseVersion"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Version
      </div>
      {{ release.releaseVersion }}
    </div>
    <div
      :class="[colClassesStatus, 'mb-2 align-middle']"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Status
      </div>
      <router-link
        :to="{ name: 'PipelineReleaseLogs', params: { repoSource: release.repoSource, repoOwner: release.repoOwner, repoName: release.repoName, releaseID: release.id }}"
        tag="div"
        class="progress"
      >
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
      </router-link>
    </div>
    <div
      :class="[colClassesReleasedAt, 'mb-2 text-truncate']"
      :title="$options.filters.formatDuration(release.duration) + ', ' + $options.filters.formatDatetime(release.insertedAt)"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
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
      :class="[colClassesTriggeredBy, 'mb-2 text-truncate']"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Triggered by
      </div>
      <triggered-by
        :events="release.triggerEvents"
      />
    </div>
    <div
      v-if="user && user.authenticated && release && (release.releaseStatus === 'pending' || release.releaseStatus === 'running' || release.releaseStatus === 'canceling')"
      :class="[colClassesActions, 'mb-2']"
    >
      <div :class="['text-black-50', alwaysShowTitles ? '' : 'd-xl-none', 'small mb-1']">
        Actions
      </div>
      <cancel-button
        :release="release"
        :user="user"
      />
    </div>
  </router-link>
</template>

<script>
import CancelButton from '@/components/CancelButton'
import TriggeredBy from '@/components/TriggeredBy'

export default {
  components: {
    CancelButton,
    TriggeredBy
  },

  props: {
    release: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      default: null
    },
    rowItem: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    alwaysShowTitles () {
      return !this.rowItem
    },
    showPipelineName () {
      return !this.rowItem
    },
    colClassesTarget () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xl-2'
    },
    colClassesVersion () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xl-2'
    },
    colClassesStatus () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xl-2'
    },
    colClassesReleasedAt () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xl-2'
    },
    colClassesTriggeredBy () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xl-2'
    },
    colClassesActions () {
      if (this.rowItem) {
        return 'col-6 col-md-4 col-xl-2'
      }
      return 'col-6 col-md-4 col-xl-2'
    }
  }
}
</script>
