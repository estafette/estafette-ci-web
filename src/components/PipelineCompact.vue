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
      v-if="type === ''"
      label="Version"
      :value="pipeline.buildVersion"
    />
    <property-block
      v-if="type === '' || type === 'build'"
      label="Status"
    >
      <router-link :to="{ name: 'PipelineBuildLogs', params: { repoSource: pipeline.repoSource, repoOwner: pipeline.repoOwner, repoName: pipeline.repoName, id: pipeline.id }}">
        <b-progress
          :value="100"
          :variant="$options.filters.bootstrapVariant(pipeline.buildStatus)"
          :animated="$options.filters.animatedProgressBar(pipeline.buildStatus)"
        />
      </router-link>
    </property-block>
    <property-block
      v-if="type === '' || type === 'build'"
      label="Built at"
    >
      {{ pipeline.insertedAt | formatDatetime }}
      <duration-label
        :duration="pipeline.duration"
        :pending-duration="pipeline.pendingDuration"
      />
    </property-block>
    <property-block
      v-if="type === ''"
      label="Branch"
      :value="pipeline.repoBranch"
    />
    <property-block
      v-if="type === ''"
      label="Revision"
    >
      <commit-link :build="pipeline" />
    </property-block>
    <property-block
      v-if="type === ''"
      label="Commit(s)"
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
    },
    type: {
      type: String,
      default: ''
    }
  },

  computed: {
    showReleases () {
      return (this.type === '' || this.type === 'release') && this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0
    }
  }
}
</script>
