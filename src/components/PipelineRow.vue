<template>
  <router-link
    :to="{ name: 'PipelineOverview', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName }}"
    tag="div"
    class="row-block list-complete-item"
  >
    <property-block
      label="Pipeline"
      class="col-xxxl-3"
    >
      <repository-title :repo="pipeline" />
    </property-block>
    <property-block
      label="Version"
      :value="pipeline.buildVersion"
      class="col-xxxl-1"
    />
    <property-block
      label="Status"
      class="col-xxxl-1"
    >
      <router-link :to="{ name: 'PipelineBuildLogs', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName, id: pipeline.id }}">
        <b-progress
          :value="$options.filters.progressBarValue(pipeline,pipeline,now)"
          :variant="$options.filters.bootstrapVariant(pipeline.buildStatus)"
          :animated="$options.filters.animatedProgressBar(pipeline.buildStatus)"
        />
      </router-link>
    </property-block>
    <property-block
      label="Built at"
      class="col-xxxl-2"
    >
      {{ pipeline.insertedAt | formatDatetime }}
      <duration-label
        :duration="pipeline.duration"
        :pending-duration="pipeline.pendingDuration"
      />
    </property-block>
    <property-block
      label="Branch"
      :value="pipeline.repoBranch"
      class="col-xxxl-1"
    />
    <property-block
      label="Revision"
      class="col-xxxl-1"
    >
      <commit-link :build="pipeline" />
    </property-block>
    <property-block
      label="Commit(s)"
      class="col-xxxl-3"
    >
      <commits
        :commits="pipeline.commits"
        :limit="1"
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
import { BProgress } from 'bootstrap-vue'
import CommitLink from '@/components/CommitLink'
import ReleaseBadge from '@/components/ReleaseBadge'
import PropertyBlock from '@/components/PropertyBlock'
import RepositoryTitle from '@/components/RepositoryTitle'
import DurationLabel from '@/components/DurationLabel'
import Commits from '@/components/Commits'
import refresh from '../helpers/refresh'

export default {
  components: {
    BProgress,
    CommitLink,
    ReleaseBadge,
    PropertyBlock,
    RepositoryTitle,
    DurationLabel,
    Commits
  },

  props: {
    pipeline: {
      type: Object,
      default: null
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
      return this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0
    }
  }
}
</script>
