<template>
  <router-link
    :to="{ name: 'PipelineOverview', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName }}"
    tag="div"
    class="compact-block list-complete-item"
  >
    <property-block
      label="Pipeline"
    >
      <repository-title :repo="pipeline" />
    </property-block>
    <property-block
      label="Version"
      :value="pipeline.buildVersion"
    />
    <property-block
      v-if="type === 'build'"
      label="Status"
      wide
      :value="pipeline.buildStatus"
    >
      <router-link :to="{ name: 'PipelineBuildLogs', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName, id: pipeline.id }}">
        <b-progress>
          <b-progress-bar
            :value="$options.filters.buildProgressBarValue(pipeline,pipeline,now)"
            :label="$options.filters.buildProgressBarLabel(pipeline,pipeline,now)"
            :variant="$options.filters.bootstrapVariant(pipeline.buildStatus)"
            :animated="$options.filters.animatedProgressBar(pipeline.buildStatus)"
          />
        </b-progress>
      </router-link>
    </property-block>
    <property-block
      v-if="type === 'build'"
      label="Built at"
      wide
      :value="pipeline.insertedAt | formatDatetime"
    >
      {{ pipeline.insertedAt | formatDatetime }}
      <duration-label
        :duration="pipeline.duration"
        :pending-duration="pipeline.pendingDuration"
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
      <release-badge
        v-for="releaseTarget in pipeline.releaseTargets"
        :key="releaseTarget.name"
        :release-target="releaseTarget"
        :pipeline="pipeline"
      />
    </property-block>
  </router-link>
</template>

<script>
import { BProgress, BProgressBar } from 'bootstrap-vue'
import ReleaseBadge from '@/components/ReleaseBadge'
import PropertyBlock from '@/components/PropertyBlock'
import RepositoryTitle from '@/components/RepositoryTitle'
import DurationLabel from '@/components/DurationLabel'
import refresh from '../helpers/refresh'

export default {
  components: {
    BProgress,
    BProgressBar,
    ReleaseBadge,
    PropertyBlock,
    RepositoryTitle,
    DurationLabel
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: ''
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
      if (this.pipeline && (this.pipeline.buildStatus === 'pending' || this.pipeline.buildStatus === 'running')) {
        refresh.timeout(this.timeout, this.updateNow, 1)
      }
    }
  },

  beforeDestroy () {
    clearTimeout(this.timeout)
  },

  computed: {
    showReleases () {
      return (this.type === '' || this.type === 'release') && this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0
    }
  }
}
</script>
