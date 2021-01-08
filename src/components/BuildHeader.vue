<template>
  <div class="header-block">
    <property-block
      label="Build"
      variant="success"
      title
    >
      <repository-title :repo="build" />
    </property-block>
    <property-block
      label="Version"
      :value="build.buildVersion"
    />
    <property-block
      label="Status"
      :value="build.buildStatus"
    >
      <b-progress>
        <b-progress-bar
          :value="$options.filters.buildProgressBarValue(pipeline,build,now)"
          :label="$options.filters.buildProgressBarLabel(pipeline,build,now)"
          :variant="$options.filters.bootstrapVariant(build.buildStatus)"
          :animated="$options.filters.animatedProgressBar(build.buildStatus)"
        />
      </b-progress>
    </property-block>
    <property-block
      label="Built at"
      :value="build.insertedAt | formatDatetime"
    >
      {{ build.insertedAt | formatDatetime }}
      <duration-label
        :duration="build.duration"
        :pending-duration="build.pendingDuration"
      />
    </property-block>
    <property-block
      label="Branch"
      :value="build.repoBranch"
    />
    <property-block
      label="Revision"
    >
      <commit-link :build="build" />
    </property-block>
    <property-block label="Commit(s)">
      <commits :commits="build.commits" />
    </property-block>
    <property-block
      v-if="showTriggers"
      label="Triggered by"
    >
      <triggered-by :events="build.triggerEvents" />
    </property-block>
    <property-block
      v-if="showActions"
      label="Actions"
      no-truncate
    >
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
    </property-block>
    <div
      v-if="showReleases"
      class="block-divider"
    >
      <div />
    </div>
    <property-block
      v-if="showReleases"
      label="Releases"
      wide
    >
      <release-badge-for-build
        v-for="releaseTarget in pipeline.releaseTargets"
        :key="releaseTarget.name"
        :release-target="releaseTarget"
        :build="build"
      />
    </property-block>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BProgress, BProgressBar } from 'bootstrap-vue'
import CommitLink from '@/components/CommitLink'
import ReleaseButton from '@/components/ReleaseButton'
import RebuildButton from '@/components/RebuildButton'
import CancelButton from '@/components/CancelButton'
import ReleaseBadgeForBuild from '@/components/ReleaseBadgeForBuild'
import TriggeredBy from '@/components/TriggeredBy'
import PropertyBlock from '@/components/PropertyBlock'
import RepositoryTitle from '@/components/RepositoryTitle'
import DurationLabel from '@/components/DurationLabel'
import Commits from '@/components/Commits'
import refresh from '../helpers/refresh'

export default {
  components: {
    BProgress,
    BProgressBar,
    CommitLink,
    ReleaseButton,
    RebuildButton,
    CancelButton,
    ReleaseBadgeForBuild,
    TriggeredBy,
    PropertyBlock,
    RepositoryTitle,
    DurationLabel,
    Commits
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

  data () {
    return {
      now: Date.now()
    }
  },

  created () {
    this.updateNow()
  },

  methods: {
    updateNow () {
      this.now = Date.now()
      if (this.build && (this.build.buildStatus === 'pending' || this.build.buildStatus === 'running')) {
        refresh.timeout(this.timeout, this.updateNow, 1)
      }
    }
  },

  beforeDestroy () {
    clearTimeout(this.timeout)
  },

  computed: {
    ...mapState('user', {
      user: 'me'
    }),

    showReleases () {
      if (this.pipeline && this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0) {
        return this.pipeline.releaseTargets.some(r => r.activeReleases && r.activeReleases.some(ar => ar.releaseVersion === this.build.buildVersion))
      }
      return false
    },

    showActions () {
      return this.user && this.user.active && this.build && ((this.build.buildStatus === 'failed' || this.build.buildStatus === 'pending' || this.build.buildStatus === 'running' || this.build.buildStatus === 'canceled' || this.build.buildStatus === 'canceling') || (this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0 && this.build.buildStatus === 'succeeded'))
    },

    showTriggers () {
      return this.build.triggerEvents && this.build.triggerEvents.length > 0
    }
  }
}
</script>
