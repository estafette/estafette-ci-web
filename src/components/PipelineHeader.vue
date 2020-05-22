<template>
  <div class="header-block">
    <property-block
      label="Pipeline"
      title
    >
      <repository-title :repo="pipeline" />
    </property-block>
    <!-- <property-block
      label="Version"
      :value="pipeline.buildVersion"
    />
    <property-block label="Built at">
      {{ pipeline.insertedAt | formatDatetime }}
      <duration-label :duration="pipeline.duration" />
    </property-block>
    <property-block
      label="Branch"
      :value="pipeline.repoBranch"
    />
    <property-block label="Commit(s)">
      <commits
        :commits="pipeline.commits"
        :limit="1"
      />
    </property-block> -->
    <div
      v-if="showReleases || showLabels"
      class="block-divider"
    >
      <div />
    </div>
    <!-- <property-block
      v-if="showTriggers"
      label="Triggered by"
      wide
    >
      <triggered-by :events="pipeline.triggerEvents" />
    </property-block> -->
    <property-block
      v-if="showLabels"
      label="Labels"
      wide
    >
      <labels :labels="pipeline.labels" />
    </property-block>
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
  </div>
</template>

<script>
import ReleaseBadge from '@/components/ReleaseBadge'
// import TriggeredBy from '@/components/TriggeredBy'
import PropertyBlock from '@/components/PropertyBlock'
import RepositoryTitle from '@/components/RepositoryTitle'
// import DurationLabel from '@/components/DurationLabel'
// import Commits from '@/components/Commits'
import Labels from '@/components/Labels'

export default {
  components: {
    ReleaseBadge,
    // TriggeredBy,
    PropertyBlock,
    RepositoryTitle,
    // DurationLabel,
    // Commits,
    Labels
  },

  props: {
    pipeline: {
      type: Object,
      default: null
    },
    filter: {
      type: Object,
      default: null
    }
  },

  computed: {
    showReleases () {
      return this.pipeline.releaseTargets && this.pipeline.releaseTargets.length > 0
    },

    showLabels () {
      return this.pipeline.labels && this.pipeline.labels.length > 0
    },

    showTriggers () {
      return this.pipeline.triggerEvents && this.pipeline.triggerEvents.length > 0
    }
  }
}
</script>
